var Pact = require('bluebird');
var wrapper = require('./wrapper');
var channelFunctions = require('./channel-functions');
var searchWrapper = wrapper.listOnly.search;

var searchFunctions = {
    /**
     * Simple search function. Only searches for a specified string.
     *
     * @method simpleSearch
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

            for (var i = 0; i < items.length; i++) {
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

            return Pact.all(videos);
        });
    },

    /**
     * Gets all SearchResults for a channelId and searchString
     *
     * @method _channelInternalSearch
     * @param channelId
     * @param searchString
     * @param maxResults
     * @param pageToken
     * @returns {Promise}
     * @private
     */
    _channelInternalSearch: function (channelId, searchString, maxResults, pageToken) {
        maxResults = maxResults || null;

        var params = {
            part: 'snippet',
            maxResults: 50,
            channelId: channelId,
            q: searchString,
            pageToken: pageToken || ''
        };

        if (maxResults < 50 && maxResults !== null) {
            params.maxResults = maxResults;
        }

        return searchWrapper(params).then(function (data) {
            var items = data.items,
                nextPageToken = data.nextPageToken || '',
                videos = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    itemSnippet = item.snippet;

                videos.push({
                    videoId: item.id.videoId,
                    title: itemSnippet.title,
                    thumbnails: itemSnippet.thumbnails,
                    publishedAt: itemSnippet.publishedAt,
                    description: itemSnippet.description
                });
            }

            if ((items.length < maxResults || maxResults === null) && nextPageToken !== '') {
                if (maxResults !== null) {
                    maxResults = maxResults - items.length
                }
                return searchFunctions._channelInternalSearch(channelId, searchString, maxResults, nextPageToken).then(function (data) {
                    return videos.concat(data);
                });
            }

            return Pact.all(videos);
        });
    },

    /**
     * Gets all SearchResults for a channel (username) and searchString
     * (Results can be limited by supplying maxResults)
     *
     * @method channelInternalSearch
     * @param {String}  username
     * @param {String}  searchString
     * @param {Number}  maxResults (optional) simple Number to limit results
     * @returns {Promise}
     */
    channelInternalSearch: function (username, searchString, maxResults) {
        return channelFunctions.getChannelIdForUser(username).then(function (channelId) {
            return searchFunctions._channelInternalSearch(channelId.channelId, searchString, maxResults);
        });
    }
};

module.exports = searchFunctions;