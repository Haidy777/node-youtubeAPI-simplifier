### PlaylistFunctions
#### Get a list of playlists for an User
##### All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getPlaylistsForUser('Youtube Username').then(function (data) {
		console.log(data);
	});
##### Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getPlaylistsForUser('Youtube Username', 10).then(function (data) {
		console.log(data);
	});
#### Get a list of Videos for a playlist
##### All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getVideosForPlaylist('PlaylistID').then(function (data) {
		console.log(data);
	});
##### Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getVideosForPlaylist('PlaylistID', 10).then(function (data) {
		console.log(data);
	});