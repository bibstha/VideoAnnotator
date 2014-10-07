var getComments = function() {
  return [{
    "id" : 1007,
    "comment" : "Hello World 1",
    "time" : 5,
    "user" : {
      "user_id" : 1,
      "name" : "User 1"
    }
  },
  {
    "id" : 2005,
    "comment" : "Hello World 2",
    "time" : 10,
    "user" : {
      "user_id" : 2,
      "name" : "User 2"
    }
  }];
};

var renderComments = function() {
  var source = $("#comment-template").html();
  var template = Handlebars.compile(source);

  var commentPlaceholder = $("#comments");
  getComments().forEach(function(comment) {
    commentPlaceholder.append(template(comment));
  });
};

var setCuePoints = function() {
  var comments = getComments();
  $('.flowplayer').flowplayer({
    playlist: [
      [{ webm: "http://media.blacktrash.org/fp/enc/drive-vp9.webm" }],
    ],
    cuepoints: comments
  });

  var previousCommentSelector = undefined;
  $('.flowplayer').on("cuepoint", function(e, api, cuepoint) {
    var selector = "#comments p[data-id=" + cuepoint.id + "]";
    if (previousCommentSelector) {
      $(previousCommentSelector).removeClass("highlighted-comment");
    }
    $(selector).addClass("highlighted-comment");
    previousCommentSelector = selector;
  });
};

$(document).ready(function() {
  renderComments();
  setCuePoints();
});