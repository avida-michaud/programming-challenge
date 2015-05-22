// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';
import {Label} from 'react-bootstrap'


//------------------------------------------------------------------------------
// CheckerView - doesn't know much; might not be needed if not doing fancy 
//               rendering yet
//
//this exports a reference to a React class as the default export
export default React.createClass({

    /**
     * In React state is maintained by the component itself.
     * @returns {{}} The initial state
     */
    getInitialState() {
        return {};
    },

    /**
     * This must return a JSX element.
     * @returns {XML}
     */
    render() {
        //this will set the CSS style of the div we're returning.
        //this.props are injected by the entity that instantiated
        //this react class.
       //let style = {
       //    width: this.props.size * 0.25,
       //    height: this.props.size * 0.25
       //};


        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
        return <div className='checker' ref='checker'/>
//        return <div><Label>CHECKER</Label> </div>
    }

});