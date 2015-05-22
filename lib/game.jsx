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
var Game = function(size, squareSize) {
    // board properties
    this.size = size;
    this.squareSize = squareSize;
    this.reset();
};


// Reset squares' arrows and re-init game iterator(s)
Game.prototype.reset = function() {
    this.status = 'start';
    this.playing = false;

    this.squares = []; // does this make sure it's deleted/gc'd?
    this.iterator = {};

    this.squares = this.createSquares(this.size);
    this.iterator = new GameIterator(this.size);
}


// Returns an array with all entries initialized to a random arrow based on board size
Game.prototype.createSquares = function(size) {
    let squares = [];
    let key = 0;
    for (var row = 0; row < size; row++) {
        for (var col = 0; col < size; col++) {
            squares[key] = Math.floor(Math.random()*4); // set random arrow
            key++;
        }
    }
    return squares;
};


// start & pause the game
Game.prototype.start = function() {
    this.playing = true;
};


Game.prototype.pause = function() {
    this.playing = false;
    this.status = 'paused';
};


// poll method (moves iterator(s) and checks if we won or if we're in a cyle)
// also is the thing that updates the status; returns true if has something to update
Game.prototype.poll = function() {
    
    if (!this.playing)
        return false; // bail out early

    let direction = this.getDirection(this.iterator.currentKey);
    let retVal = this.iterator.move(direction);
    
    this.status = 'playing';

    if (retVal == MoveReturn.WIN)
    {
        this.status = 'youwon';
        console.log("You won!");
        this.playing = false;
    }
    else if (retVal == MoveReturn.LOSE)
    {
        this.status = 'youlost';
        this.playing = false;
        console.log("You lost! (in a cycle)");
    }

    return true;
}

//
// accessors
//

// Returns current status message
Game.prototype.getStatusMessage = function() {
    return this.status;
}


Game.prototype.isPlaying = function() {
    return this.playing;
}


// Returns the arrow enumeration (direction) of the given square (key)
Game.prototype.getDirection = function(key) {
    if (key <= this.squares.length)
        return this.squares[key];
    
    return -1;
}


// Returns the current key (position) of the iterator
Game.prototype.getCurrentKey = function() {
    return this.iterator.currentKey;
}


// update the board size
Game.prototype.setSize = function(newSize) {
    this.size = newSize;
}


// ask current iterator if it's visited a specific key
Game.prototype.hasVisited = function(key) {
    return this.iterator.hasVisited(key);
}


// -----------------------------------------------------------------------------
// GameIterator - knows where it is and knows how to move along board
//
var GameIterator = function(size) {
    // iterator properties
    this.boardSize = size;
    this.currentKey = -1;
 
    this.visited = {}; // for 0(1) lookups

    // set our initial position
    let numSquares = (this.boardSize*this.boardSize) - 1;
    let startKey = Math.floor(Math.random()*numSquares);
    this.setCurrentKey(startKey);
};


// update the current key
GameIterator.prototype.setCurrentKey = function(newKey) {
    if (this.currentKey != newKey)
    {
        // set it 
        this.currentKey = newKey;

        // mark it visited
        this.visited[this.currentKey] = true;
    }
}


GameIterator.prototype.hasVisited = function(key) {
    return this.visited[key];
}


// Returns true if moved off the board (i.e. "won")
GameIterator.prototype.move = function(direction) {

    let retVal = MoveReturn.CONTINUE;
    let newKey = this.currentKey;

    // use current position to figure out what our new position will be
    if (newKey != -1)
    {
        switch (direction)
        {
            case ArrowDir.LEFT:
                if (newKey % this.boardSize == 0) // currently at left-most spot?
                {
                    newKey = -1;
                    retVal = MoveReturn.WIN; // off board!
                }
                else
                    --newKey;
                break;

            case ArrowDir.RIGHT:
                ++newKey;                       // does going right wrap us?
                if (newKey % this.boardSize == 0)
                {
                    newKey = -1;
                    retVal = MoveReturn.WIN; // off board!
                }
                break;

            case ArrowDir.UP:
                newKey -= this.boardSize;   // currently at top-most row?
                if (newKey < 0)
                    retVal = MoveReturn.WIN; // off board!
                break;

            case ArrowDir.DOWN:
                newKey += this.boardSize;  // currently at bottom-most row?
                if (newKey >= (this.boardSize*this.boardSize))
                    retVal = MoveReturn.WIN; // off board!
                break;
        }
    }

    // if we didn't win yet, then check if been here before; otherwise, set new key
    if (retVal == MoveReturn.WIN)
    {
        sfxMgr.play('win');
    }
    else
    {
        console.log("Moving to ", newKey);
        if (this.hasVisited(newKey))
        {
            retVal = MoveReturn.LOSE;   // we've already been here
            // boo
            sfxMgr.play('lose');
        }
        else
        {
            sfxMgr.play('move');
        }

        this.setCurrentKey(newKey); // move along
    }

    return retVal;
}

export default Game;
