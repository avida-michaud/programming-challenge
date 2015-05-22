// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';
import Checker from './checker_view'
import {Label, Glyphicon} from 'react-bootstrap'


//------------------------------------------------------------------------------
// SquareView - knows whether or not to draw the checker
//
//this exports a reference to a React class as the default export
export default React.createClass({

    /**
     * In React state is maintained by the component itself.
     * @returns {{}} The initial state
     */
    getInitialState() {
        return {
            passed : false
        };
    },

    /**
     * This must return a JSX element.
     * @returns {XML}
     */
    render() {
        //this will set the CSS style of the div we're returning.
        //this.props are injected by the entity that instantiated
        //this react class.
        let style = {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: this.props.color
        };

       
        // @NOTE- move this with data or pass it down instead of the enum
        let glyphs = ['arrow-left', 'arrow-right', 'arrow-up', 'arrow-down'];
        
        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
        return <div className='square' ref='square' style={style}>
                    <Label>{this.key}</Label>
                    <Label bsStyle={this.props.glyphStyle}>
                        <Glyphicon glyph={glyphs[this.props.arrow]}/>
                    </Label>
                    {this.props.drawChecker ? <Checker size={this.props.size}/> : null}
                </div>
    },

    /**
     * After a component mounts (ie the component is added to the DOM), this
     * function is called. Here you can get a reference to the DOMElement by
     * using reacts ref mechanism.
     */
  //  componentDidMount() {
  //      //checker is a reference to a DOMElement.
  //      let checker = React.findDOMNode(this.refs.square);
  //  }
});