# VideoAnnotator for LabSystem

Labsystem can be downloaded from [here](sourceforge.net/projects/labsystem/).

## Backend API Design

The VideoAnnotator uses REST API to access data in json format. The required APIs are documented below.

URL | Description
--- | ---
`GET /video/:id` | Returns json attributes of video with `{url:'', title: ''}`
`GET /video/:id/comments` | Returns an array of comments with `[{title: '', body: '', time: 5, video_id: id}, {...}, {...}]`
`POST /comment` | With `{title: '', body: '', time: 5, video_id: id}` creates a new comment and returns the comment including the id of the comment.
