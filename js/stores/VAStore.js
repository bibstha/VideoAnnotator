var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var VAConstants = require('../constants/VAConstants');
var Parse = require('../vendors/Parse');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _videos = [];

var VAStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return _videos;
  },
  
  getSelectedVideo: function() {
    return 1;
  },
  
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {
    case VAConstants.VA_VBOX_CLICK:
      break;
      
    case VAConstants.VA_VBOX_READY:
      break;
      
    default:
      return true;
  }
  
  VAStore.emitChange();
  
  return true;
});

function loadAllVideos() {
  var Video = Parse.Object.extend("Video");
  var VideoCollection = Parse.Collection.extend({
    model: Video
  });
  
  var collection = new VideoCollection();
  collection.fetch({
    success: function(collection) {
      _videos = collection;
      VAStore.emitChange();
    }
  });
}

loadAllVideos();


module.exports = VAStore;
