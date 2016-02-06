### ChannelFunctions
#### Retrieving Details for an User
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
	
#### Get the ChannelId for an User
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.channelFunctions.getChannelIdForUser('Youtube Username').then(function (data) {
		console.log('ChannelId: ' + data.channelId);
	});
	
#### Get statistics for an User
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.channelFunctions.getStatisticsForUser('Youtube Username').then(function (data) {
		console.log('Views: ' + data.viewCount);
		console.log('Comments: ' + data.commentCount);
		console.log('Subscriber: ' + data.subscriberCount);
		console.log('Videos: ' + data.videoCount);
	});