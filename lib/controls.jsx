// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';
import {Button, Input, ButtonToolbar} from 'react-bootstrap'


//------------------------------------------------------------------------------
// ControlsView - knows about the toolbar buttons and sizing option 
//
export default React.createClass({
    getInitialState() {
        return {};
    },

    render() {
        let isPlaying = this.props.control.isPlaying();
        let style = {}
        return (
            <div className='controls' ref='controls'>
                <Input
                    label="Set Size:"
                    type='number'
                    step="1.0"
                    min={3.0}
                    max={10.0}
                    value={this.props.control.getSize()}
                    disabled={isPlaying}
                    onChange={this.onSetSize}
                    ref='sizeInput'>
                </Input>
                <ButtonToolbar>
                  <Button bsStyle={isPlaying ? "danger" : "success"}
                        onClick={isPlaying ? this.onStop : this.onPlay}>
                        {isPlaying ? 'Stop' : 'Play'}
                    </Button>
                    <Button bsStyle="primary" 
                        disabled={isPlaying}
                        onClick={!isPlaying ? this.onReset : null}>
                        Reset
                    </Button>
               </ButtonToolbar>
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
        this.props.control.setSize(size);
    },

         /**
  * After a component mounts (ie the component is added to the DOM), this
  * function is called. Here you can get a reference to the DOMElement by
  * using reacts ref mechanism.
  */
//  componentDidMount() {
//     let elem = React.findDOMNode(this.refs.controls);
//     elem.style.backgroundColor = '#7777777';
//  }
});