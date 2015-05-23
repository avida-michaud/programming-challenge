// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

//all import statements must go at the top of the file.
import React from 'react';
import BoardView from './board_view';
import Controls from './controls';
import Status from './status';
import Game from './game';

//get the content DOMElemet create in index.html
let content = document.getElementById('content');

//------------------------------------------------------------------------------
// MainView - knows about the BoardView, Controls and Status display
//
// This is a React class. It's main methods are 'getInitialState', and 'render'.
let MainView = React.createClass({

    getInitialState() {
        return {
            game: this.props.game // keeping the game data as a state
        };
    },

    render() {
        return <div>
                <Status message={this.state.game.status} />
                <Controls control={this}/>
                <BoardView game={this.state.game}/>
               </div>;
    },

    play() {
        // update the playing state 
        this.state.game.start();
    },

    pause() {
        // update the playing state
        this.state.game.pause();

        // update status message here because we won't in the poll
        let statusMsg = this.state.game.status;
        this.setState({game: this.state.game, message: statusMsg});
    },

    reset() {
        // re-init game (re-shuffle arrows, highlight reset, etc.)
        this.state.game.reset();

       // update status message here because we won't in the poll
        let statusMsg = this.state.game.status;
        this.setState({game: this.state.game, message: statusMsg});
    },

    setSize(newSize) {
        // setting our state forces a re-render, which in turn will call the 
        // render() method of this class. This is how everything gets redrawn 
        // and how you 'react' to user input to change the state of the DOM.
        this.state.game.setSize(newSize);
        this.reset();
    },

    getSize() {
        return this.state.game.size;
    },

    isPlaying() {
        return this.state.game.playing;
    },

    componentDidMount: function(){

        // componentDidMount is called by react when the component 
        // has been rendered on the page. We can set the interval here:
        this.timer = setInterval(this.poll, 1000);
    },

    componentWillUnmount: function(){

        // This method is called immediately before the component is removed
        // from the page and destroyed. We can clear the interval here:
        clearInterval(this.timer);
    },

    poll(){

        // This function is called every 1000 ms. It updates the game state and
        // calling setState causes the component to be re-rendered
        let update = this.state.game.poll();
        
        if (update)
        {
            let statusMsg = this.state.game.status;
            this.setState({game: this.state.game, message: statusMsg});
        }
    },

});

// initialize game data to be 5 x 5 grid with squares at 80 x 80 pixels
var game = new Game(5, 80);

//this is the entry point into react. From here on out we deal almost exclusively with the
//virtual DOM. Here we tell React to attach everything to the content DOM element.
React.render(<MainView game={game}/>, content, () => {
    console.log("Rendered!");
});

