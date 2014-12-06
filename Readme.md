# VideoAnnotator for LabSystem

Labsystem can be downloaded from [here](sourceforge.net/projects/labsystem/).

## Backend API Design

The VideoAnnotator uses REST API to access data in json format. The required APIs are documented below.

URL | Description
-- | --
`GET /video/:id` | Returns json attributes of video with `{url:'', title: ''}`
`GET /comment/:id` | Returns json attributes of comment with `{video_id:'', title: '', body: '', time: ''}`
