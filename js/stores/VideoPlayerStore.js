var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var VAConstants = require('../constants/VAConstants');

var CHANGE_EVENT = 'change';
var PLAYER_EVENT = 'player';
var _video = null;

var VideoPlayerStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  addPlayerListener: function(callback) {
    this.on(PLAYER_EVENT, callback);
  },
  removePlayerListener: function(callback) {
    this.removeListener(PLAYER_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  emitPlayerEvent: function(type) {
    this.emit(PLAYER_EVENT, type);
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
      VideoPlayerStore.emitChange();
      break;
      
    case VAConstants.VA_VIDEO_PLAYER_PAUSE:
      VideoPlayerStore.emitPlayerEvent('pause');
      break;
  }
  
  return true;
});

module.exports = VideoPlayerStore;
