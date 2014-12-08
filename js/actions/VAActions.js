var AppDispatcher = require('../dispatcher/AppDispatcher');
var VAConstants   = require('../constants/VAConstants');

var VAActions = {
  loadVideos: function() {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_VBOX_READY
    });
  },
  
  clickVideo: function(video) {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_VBOX_CLICK,
      video: video
    });
  },
  
  createComment: function(params) {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_COMMENT_CREATE,
      params: params
    });
  },
  
  // This might cause performance issue as this is called every 250ms
  // afaik all registered callbacks are called during each function
  updateVideoPlayerProgress: function(params) {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_VIDEO_PLAYER_PROGRESS,
      params: params
    });
  },
  
  pauseVideoPlayer: function() {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_VIDEO_PLAYER_PAUSE
    });
  },
  
  seekVideoPlayer: function(params) {
    AppDispatcher.handleViewAction({
      actionType: VAConstants.VA_VIDEO_PLAYER_SEEK,
      params: params
    });
  }
}

module.exports = VAActions;
