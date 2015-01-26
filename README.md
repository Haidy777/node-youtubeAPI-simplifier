#node-youtubeAPI-simplifier
[![NPM](https://nodei.co/npm/node-youtubeapi-simplifier.png)](https://www.npmjs.com/package/node-youtubeapi-simplifier)

The Youtube-API probably isn't the simplest api in the world.
So why isn't there a simplifier? Well, don't worry, now there is one :)

I already implemented a bunch of functions regarding channels, playlists and (a basic & simple) video search.

Examples can be found in the examples directory and at the end of this readme.

##Contribute
Because my time for developing isn't unlimited Pull-Requests are always welcome, just look at my implementations and make yours look the same, so we have a little bit of readability and structure.

##Known Bugs
* There shouldn't be any.

##Example Usages
###ChannelFunctions
####Retrieving Details for an User
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.channelFunctions.getDetailsForUser('Youtube Username').then(function (data) {
		console.log('ChannelId: ' + data.channelId);
		console.log('Title: ' + data.title);
		console.log('Description: ' + data.description);
		console.log('Published at: ' + data.publishedAt);
		console.log('Avatar Urls:');
		console.log(data.avatar);
		console.log('Likes Playlist: ' + data.likesPlaylist);
		console.log('Favorites Playlist: ' + data.favoritesPlaylist);
		console.log('Uploads Playlist: ' + data.uploadsPlaylist);
	});
	
####Get the ChannelId for an User
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.channelFunctions.getChannelIdForUser('Youtube Username').then(function (data) {
		console.log('ChannelId: ' + data.channelId);
	});
	
####Get statistics for an User
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.channelFunctions.getStatisticsForUser('Youtube Username').then(function (data) {
		console.log('Views: ' + data.viewCount);
		console.log('Comments: ' + data.commentCount);
		console.log('Subscriber: ' + data.subscriberCount);
		console.log('Videos: ' + data.videoCount);
	});
	
###PlaylistFunctions
####Get a list of playlists for an User
#####All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getPlaylistsForUser('Youtube Username').then(function (data) {
		console.log(data);
	});
#####Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getPlaylistsForUser('Youtube Username', 10).then(function (data) {
		console.log(data);
	});
####Get a list of Videos for a playlist
#####All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getVideosForPlaylist('PlaylistID').then(function (data) {
		console.log(data);
	});
#####Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.playlistFunctions.getVideosForPlaylist('PlaylistID', 10).then(function (data) {
		console.log(data);
	});
###SearchFunctions
####Simple Search (always returns first 50 Elements | might change)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.simpleSearch('Search String').then(function (data) {
		console.log(data);
	});
####Channel Internal Search
#####All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.channelInternalSearch('Youtube Username', 'Search String').then(function (data) {
		console.log(data);
	});
#####Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.channelInternalSearch('Youtube Username', 'Search String', 10).then(function (data) {
		console.log(data);
	});