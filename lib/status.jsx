// -----------------------------------------------------------------------------
// Avida Michaud - Jibo programming challenge
//

import React from 'react';

//------------------------------------------------------------------------------
// StatusView - knows how to render the status heading
//
//this exports a reference to a React class as the default export
export default React.createClass({

  // Tinkering with "re-usable components" with React by making this a "propTypes"
  // and having validation checks on the message prop
  propTypes: {
    message: React.PropTypes.oneOf(['youwon','youlost','playing','start','paused']).isRequired
  },

    /**
     * This must return a JSX element.
     * @returns {XML}
     */
    render() {
        var texts = {
          youwon:'You Won!',
          youlost:'You Lost! (cycle detected)',
          playing:'Playing...',
          start:'Click Play!',
          paused:'Paused...'
        };
    return <div className='status' ref='status'>
               <h2>{texts[this.props.message]}</h2>
           </div>;
  },

  /**
  * After a component mounts (ie the component is added to the DOM), this
  * function is called. Here you can get a reference to the DOMElement by
  * using reacts ref mechanism.
  */
  componentDidMount() {
     // alert
     let elem = React.findDOMNode(this.refs.status);
     elem.style.color = 'white';
     elem.style.backgroundColor = '#777777';
     elem.style.textAlign = "center";
  }
  
});

