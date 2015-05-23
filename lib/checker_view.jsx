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
        //To set a div's class in React you must use the 'className' attribute, instead of the
        //usual 'class' attribute. This is because 'class' is a reserved keyword in ECMAScript 6.
        let foregroundStyle = { backgroundImage: this.props.foreground };
       
        return <div className='checker' ref='checker'>
                <div className='checkerForeground' style={foregroundStyle}> 
                </div>
                </div>
    }

});