var Pact = require('bluebird');
var wrapper = require('./wrapper');
var activitiesWrapper = wrapper.activities;
var channelFunctions = require('./channel-functions');

var activitiesFunctions = {
    _listAllActivitiesForChannelId: function (channelId, maxResults, pageToken) {
        maxResults = maxResults || null;

        var params = {
            part: 'contentDetails,snippet',
            maxResults: 50,
            channelId: channelId,
            pageToken: pageToken || ''
        };

        if (maxResults < 50 && maxResults !== null) {
            params.maxResults = maxResults;
        }

        return activitiesWrapper.list(params).then(function (data) {
            var items = data.items,
                nextPageToken = data.nextPageToken || '',
                activities = [];

            for (var i = 0; i < items.length; i++) {
                var item = items[i],
                    itemSnippet = item.snippet,
                    itemContentDetails = item.contentDetails;

                var itemToPush = {
                    title: itemSnippet.title,
                    description: itemSnippet.description,
                    publishedAt: itemSnippet.publishedAt,
                    type: itemSnippet.type
                };

                if(itemToPush.type === 'upload'){
                    itemToPush.thumbnails = itemSnippet.thumbnails;
                    itemToPush.videoId = itemContentDetails.upload.videoId;
                }

                activities.push(itemToPush);
            }

            if ((items.length < maxResults || maxResults === null) && nextPageToken !== '') {
                if (maxResults !== null) {
                    maxResults = maxResults - items.length;
                }

                return activitiesFunctions._listAllActivitiesForChannelId(channelId, maxResults, nextPageToken).then(function (data) {
                    return activities.concat(data);
                });
            }

            return Pact.all(activities);
        });
    },

    /**
     * Gets activities for a user.
     * (Results can be limited by supplying maxResults)
     *
     * @method listActivitiesForUser
     * @param {String}  username
     * @param {Number}  maxResults (optional) simple Number to limit results
     * @returns {Promise}
     */
    listActivitiesForUser: function (username, maxResults) {
        return channelFunctions.getChannelIdForUser(username).then(function (channelId) {
            return activitiesFunctions._listAllActivitiesForChannelId(channelId.channelId, maxResults, null);
        });
    }
};

module.exports = activitiesFunctions;