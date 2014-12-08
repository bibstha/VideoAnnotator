var React = require('react');
var ReactPropTypes = React.PropTypes;
var AnnotatorStore = require('../stores/AnnotatorStore');
var VAActions = require('../actions/VAActions');

var AnnotationItem     = require('./AnnotationItem.react');
var AnnotationItemList = require('./AnnotationItemList.react')
var AnnotationForm     = require('./AnnotationForm.react')

var Annotator = React.createClass({
  render: function() {
    return (
      <div className='chat-container'>
        <h4>Annotations</h4>
        <AnnotationItemList/>
        <AnnotationForm/>
      </div>
    );
  }
});

module.exports = Annotator;
