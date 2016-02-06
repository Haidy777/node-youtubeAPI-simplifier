### SearchFunctions
#### Simple Search (always returns first 50 Elements | might change)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.simpleSearch('Search String').then(function (data) {
		console.log(data);
	});
#### Channel Internal Search
##### All (without Limitations - Warning: Can take long!)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.channelInternalSearch('Youtube Username', 'Search String').then(function (data) {
		console.log(data);
	});
##### Limited to a specified amount (in this case: 10)
	var ytapi = require('node-youtubeapi-simplifier');
	ytapi.setup('YOUR API KEY');
	ytapi.searchFunctions.channelInternalSearch('Youtube Username', 'Search String', 10).then(function (data) {
		console.log(data);
	});