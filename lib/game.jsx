// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

//------------------------------------------------------------------------------
// Gloal sound effect manaager
//
// our easy "play sound" module
var SoundEffectManager = require('sound-effect-manager');
var sfxMgr = new SoundEffectManager();
sfxMgr.loadFile('./sfx/smb_powerup.wav', 'win');
sfxMgr.loadFile('./sfx/smb_bowserfalls.wav', 'lose');
sfxMgr.loadFile('./sfx/smb_fireball.wav', 'move');


// -----------------------------------------------------------------------------
// Global enumerations
//
// (using 'freeze' to avoid any changes object)
var ArrowDir = Object.freeze({LEFT:0, RIGHT:1, UP:2, DOWN:3})
var MoveReturn = Object.freeze({CONTINUE:0, WIN:1, LOSE:2})


// -----------------------------------------------------------------------------
// Game - holds our model/data for the board, game iterator(s) and knows how to 
//        reset
class Game
{
    constructor(size,squareSize) {
        // board properties
        this.size = size;
        this.squareSize = squareSize;
        this.reset();
    }

    // Reset squares' arrows and re-init game iterator(s)
    reset() {
        this.status = 'start';
        this.playing = false;
        this.hareFirst = true;
    
        this.squares = []; // does this make sure it's deleted/gc'd?
        this.tortoise = {};
        this.hare = {};

        // create the board data
        this.squares = this.createSquares();

        let numSquares = (this.size*this.size) - 1;
        let startKey = Math.floor(Math.random()*numSquares);

        this.tortoise = new GameIterator(this, startKey);
        this.hare = new GameIterator(this, startKey);
    }

    // Returns an array with all entries initialized to a random arrow based on board size
    createSquares() {
        let squares = [];
        let key = 0;
        for (var row = 0; row < this.size; row++) {
            for (var col = 0; col < this.size; col++) {
                squares[key] = Math.floor(Math.random()*4); // set random arrow
                key++;
            }
        }
        
        return squares;
    }

    // start/pause the game
    start() {
        this.playing = true;
        this.status = 'playing';
    }

    pause() {
        this.playing = false;
        this.status = 'paused';
    }

    // Poll method (moves iterator(s) and checks if we won or if we're in a cyle)
    // also is the thing that updates the status; returns true if has something to update
    poll() {
        if (!this.playing)
            return false; // bail out early

         // move hare 2x and tortoise 1x (hare must go first); in order to get
         // visual feedback on the hare's first move, we need to cache off the
         // move count and have the hare's 2-move jump go over 2 polls/2 renders
        let won = false;
        if (this.hareFirst)
        {
            // is this the hare's first move?
            won = !this.hare.move();
            this.hareFirst = false;
        }
        else
        {
            won = !(this.hare.move() && this.tortoise.move());
            this.hareFirst = true;
        }

        if (won)
        {
            // hare went off the board so hurray! we won.
            this.playing = false;
            this.status = 'youwon';
            sfxMgr.play('win');

            console.log("You won!");
        }
        else
        {
            // if none of the moves went off the board, then check if 
            // the tortoise and hare are in the same position (key); if so,
            // then we're in a loop
            if (this.hare.currentKey == this.tortoise.currentKey)
            {
                // loop detected!
                this.playing = false;
                this.status = 'youlost';
                sfxMgr.play('lose');

                console.log("You lost! (in a cycle)");
            }
            else
            {
                // keep playing
                 sfxMgr.play('move');
            }
        }
      
        return true;
    }

    //
    // accessors

    // Returns the arrow enumeration (direction) of the given square (key)
    getDirection(key) {
        if (key <= this.squares.length)
            return this.squares[key];
    
        return -1;
    }

    // Update the board size
    setSize(newSize) {
        this.size = newSize;
    }
}

// -----------------------------------------------------------------------------
// GameIterator - knows where it is and knows how to move along board
//

class GameIterator
{
    constructor(game, startKey) {
        // "pointer" to the game
        this.game = game;     
                               
        this.currentKey = -1;
        
        // set our initial position
        this.setCurrentKey(startKey);
    }

    // Update the current key
    setCurrentKey(newKey) {
        // set it 
        if (this.currentKey != newKey)
            this.currentKey = newKey;
    }

    // Returns false if moved off the board (i.e. "won")
    move() {
        let won = false;
        let direction = this.game.getDirection(this.currentKey);
        let newKey = this.currentKey;

        // use current position to figure out what our new position will be
        if (newKey != -1)
        {
            switch (direction)
            {
                case ArrowDir.LEFT:
                    if (newKey % this.game.size == 0) // currently at left-most spot?
                    {
                        newKey = -1;
                        won = true; // off board!
                    }
                    else
                        --newKey;
                    break;

                case ArrowDir.RIGHT:
                    ++newKey;                       // does going right wrap us?
                    if (newKey % this.game.size == 0)
                    {
                        newKey = -1;
                        won = true; // off board!
                    }
                    break;

                case ArrowDir.UP:
                    newKey -= this.game.size;   // currently at top-most row?
                    if (newKey < 0)
                        won = true; // off board!
                    break;

                case ArrowDir.DOWN:
                    newKey += this.game.size;  // currently at bottom-most row?
                    if (newKey >= (this.game.size*this.game.size))
                        won = true; // off board!
                    break;
            }
        }

        // If we didn't win yet, update our position/key
        this.setCurrentKey(newKey); 
        
        return !won;
    }
}


export default Game;
