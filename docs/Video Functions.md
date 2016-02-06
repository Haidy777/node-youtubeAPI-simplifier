### VideoFunctions
#### Get details for VideoIds
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.videoFunctions.getDetailsForVideoIds(['VideoID']).then(function (data) {
		console.log(data);
	});