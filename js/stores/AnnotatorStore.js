var Parse = require('../vendors/Parse');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var VAConstants = require('../constants/VAConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _video = null;
var _comments = [];
var _video_time = 0;

var AnnotatorStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  getVideo: function() {
    return _video;
  },
  getComments: function() {
    return _comments;
  },
  getVideoTime: function() {
    return _video_time;
  }
});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  
  switch(action.actionType) {
    case VAConstants.VA_VBOX_CLICK:
      _video = action.video;
      loadComments(_video.id);
      break;
      
    case VAConstants.VA_COMMENT_CREATE:
      params = action.params;
      createComment(params);
      break;
      
    case VAConstants.VA_VIDEO_PLAYER_PROGRESS:
      params = action.params;
      updateVideoPlayerProgress(params);
      break;
      
    default:
      return true;
  }
  
  return true;
});

function loadComments(video_id) {
  var Comment = Parse.Object.extend('Comment');
  var query = new Parse.Query(Comment);
  query.equalTo("video_id", video_id).ascending('time');
  query.find({
    success: function(comments) {
      _comments = comments;
      AnnotatorStore.emitChange();
    },
    error: function(error) {
      console.log("Error: " + error.code + " " + error.message);
    }
  });
}

function createComment(params) {
  var Comment = Parse.Object.extend('Comment');
  var newComment = new Comment();
  newComment.set('user_email', params.user_email);
  newComment.set('body', params.body);
  newComment.set('time', params.time);
  newComment.set('video_id', params.video.id);
  newComment.save(null, {
    success: function(newComment) {
      loadComments(newComment.get('video_id'));
    },
    error: function(newComment, error) {
      console.log('Failed to create new object, with error code: ' + error.message);
    }
  });
}

function updateVideoPlayerProgress(params) {
  _video_time = params.time;
}

module.exports = AnnotatorStore;
