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
  }
}

module.exports = VAActions;
