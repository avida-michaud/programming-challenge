// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';
import {Button, Input} from 'react-bootstrap'


//------------------------------------------------------------------------------
// ControlsView - knows about the toolbar buttons and sizing option 
//
export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        let isPlaying = this.props.control.isPlaying();
        return (
            <div className='controls' ref='controls'>
                <p className='sizeHeader'>
                    Set Size
                </p>
                <Input className='sizeInput' ref='sizeInput'
                    type='number'
                    step={1.0}
                    min={3.0}
                    max={10.0}
                    maxLength={2}
                    value={this.props.control.getSize()}
                    disabled={isPlaying}
                    onChange={this.onSetSize}>
                </Input>
                <div className="buttons">
                  <Button bsStyle={isPlaying ? "danger" : "success"}
                        onClick={isPlaying ? this.onStop : this.onPlay}>
                        {isPlaying ? 'Stop' : 'Play'}
                    </Button>
                    <Button bsStyle="primary" 
                        disabled={isPlaying}
                        onClick={!isPlaying ? this.onReset : null}>
                        Reset
                    </Button>
               </div>
            </div>
        );
    },


    onPlay() {
        this.props.control.play();
    },


    onStop() {
        this.props.control.pause();
    },


    onReset() {
        this.props.control.reset();
    },

    onSetSize() {
        let size = parseInt(this.refs.sizeInput.getValue());
        // @TODO- do validation check here...
        this.props.control.setSize(size);
    }
});