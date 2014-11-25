var React = require('react');
var AnnotatorStore = require('../stores/AnnotatorStore');

var Annotator = React.createClass({
  componentDidMount: function() {
    AnnotatorStore.addChangeListener(this._onChange);
  },
  componentDidUnmount: function() {
    AnnotatorStore.removeChangeListener(this._onChange);
  },
  render: function() {
    return <div>Annotator</div>;
  },
  
  _onChange: function() {
    // change state if necessary
  }
});



module.exports = Annotator;
