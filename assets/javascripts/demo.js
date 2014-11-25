Parse.initialize("oNJMBXObkXjgPMXGks1Js2RhPe8t6PhxU8Zd3UYT", "lfi4fX499vACFsNqcblIm6AL2Uqcf7ITFAVSy8kG");

var Video = Parse.Object.extend("Video");
var VideoCollection = Parse.Collection.extend({
  model: Video
});

var videoCollection = new VideoCollection();
// videoCollection.fetch({
//   success: function(collection) {
//     collection.each(function(video) {
//       console.log(video.get('title')); 
//     });
//   },
//   error: function(collection, error) {
//     console.log(error);
//   }
// })

