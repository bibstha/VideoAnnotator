var EventEmitter = require('events').EventEmitter;
var VAConstants = require('../constants/VAConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var AnnotatorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

module.exports = AnnotatorStore;
