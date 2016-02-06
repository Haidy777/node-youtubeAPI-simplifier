var Pact = require('bluebird');
var wrapper = require('./wrapper');
var videosWrapper = wrapper.videos;

var videoFunctions = {
    _getDetailsForVideoIds: function (videoIds, pageToken) {
        var params = {
            part: 'snippet,statistics',
            maxResults: 50,
            id: ''
        };

        if(pageToken){
            params.pageToken = pageToken;
        }

        for (var i = 0; i < videoIds.length; i++) {
            params.id = params.id + videoIds[i] + ',';
        }

        //remove last ,
        if (params.id.substr(-1) === ',') {
            params.id = params.id.substr(0, params.id.length - 1);
        }

        return videosWrapper.list(params).then(function (data) {
            var videoDetails = [],
                items = data.items,
                nextPageToken = data.nextPageToken || '';

            for(var i = 0; i < items.length; i++){
                var video = items[i],
                    snippet = video.snippet;

                videoDetails.push({
                    id: video.id,
                    title: snippet.title,
                    description: snippet.description,
                    publishedAt: snippet.publishedAt,
                    thumbnails: snippet.thumbnails,
                    statistics: video.statistics,
                    channelId: snippet.channelId
                });
            }

            if(nextPageToken !== ''){
                return videoFunctions._getDetailsForVideoIds(videoIds.slice(49), nextPageToken).then(function (data) {
                   return videoDetails.concat(data);
                });
            }

            return Pact.all(videoDetails);
        });
    },

    getDetailsForVideoIds: function (videoIds) {
        return videoFunctions._getDetailsForVideoIds(videoIds);
    }
};

module.exports = videoFunctions;