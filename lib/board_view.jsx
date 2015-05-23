// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';
import Square from './square_view'


//------------------------------------------------------------------------------
// BoardView - knows about the squares and how to render them; also passes along
//             which square has the checker in it
//
export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        //this example just creates a row of squares. Use CSS styling to
        //get the checkers into a mxm size board

        //create a new array of squares
        let squares = [];
        var key = 0;
        for(let row = 0; row < this.props.game.size; row++) {
            let isEvenRow = (row % 2 == 0);
            for(let col = 0; col < this.props.game.size; col++) {
                let isEvenCol = (col % 2 == 0);

                // allow variable board sizes by making sure black squares are same even or odd 
                // row/col combo and red squares are the ones that aren't even or odd.
                let color = (isEvenRow == isEvenCol) ? '#333333' : '#FF3333'; 

                let isTortoise = key == this.props.game.tortoise.currentKey;
                let isHare = key == this.props.game.hare.currentKey;

                // add our sqaure to the board at index 'key', with designated size and color
                squares.push(
                    <Square key={key} 
                            size={this.props.game.squareSize} 
                            color={color} 
                            arrow={this.props.game.squares[key]}
                            drawTortoise={isTortoise}
                            drawHare={isHare}/>)

               key++;
            }
        }

        // +2 to account for lines draw between squares
        let size = (this.props.game.squareSize + 2) * this.props.game.size;
        let style = {
            width: size,
            height: size
        };
        return <div className='board' ref='board' style={style}>
                  {squares}
               </div>;
    }

});