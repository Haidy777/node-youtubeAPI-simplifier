var Promise = require('bluebird'),
    wrapper = require('./wrapper'),
    searchWrapper = wrapper.listOnly.search;

var searchFunctions = {
    /**
     * Simple search function. Only searches for a specified string.
     *
     * @param {String} searchString
     * @returns {Promise}
     */
    simpleSearch: function (searchString) {
        var params = {
            part: 'snippet',
            maxResults: 50,
            q: searchString
        };

        return searchWrapper(params).then(function (data) {
            var items = data.items,
                videos = [];

            for(var i = 0; i < items.length; i++){
                var item = items[i],
                    itemSnippet = item.snippet;
                videos.push({
                    videoId: item.id.videoId,
                    title: itemSnippet.title,
                    thumbnails: itemSnippet.thumbnails,
                    publishedAt: itemSnippet.publishedAt,
                    description: itemSnippet.description,
                    channel: {
                        channelId: itemSnippet.channelId,
                        channelTitle: itemSnippet.channelTitle
                    }
                });
            }

            return Promise.all(videos);
        });
    }
};

module.exports = searchFunctions;