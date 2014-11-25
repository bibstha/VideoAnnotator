var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var VAConstants = require('../constants/VAConstants');

var CHANGE_EVENT = 'change';
var _video = null;

var VideoPlayerStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function(callback) {
    this.emit(CHANGE_EVENT);
  },
  
  getVideo: function() {
    return _video;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {
    case VAConstants.VA_VBOX_CLICK:
      _video = action.video;
      break;
      
    default:
      // prevents calling of emitChange
      return true;
  }
  
  VideoPlayerStore.emitChange();
  return true;
});

module.exports = VideoPlayerStore;
