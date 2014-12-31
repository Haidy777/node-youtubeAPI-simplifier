var Promise = require('bluebird'),
    playlistWrapper = require('./wrapper').playlists,
    channelFunctions = require('./channel-functions');

var playlistFunctions = {
    /**
     * Gets all Playlists for a specified user.
     *
     * Example Usage:
     * getAllPlaylistsForUser('gronkh').then(function (data){
     *       console.log(data);
     * });
     *
     * @method getAllPlaylistsForUser
     * @param username
     * @param pageToken
     * @returns {*}
     */
    getAllPlaylistsForUser: function (username, pageToken) {
        return channelFunctions.getChannelIdForUser(username).then(function (channelId) {
            var params = {
                channelId: channelId.channelId,
                part: 'contentDetails,snippet',
                maxResults: 50,
                pageToken: pageToken || ''
            };

            return playlistWrapper.list(params).then(function (data) {
                return data;
            });
        }).then(function (data) {
            var dataItems = data.items,
                nextPageToken = data.nextPageToken || '',
                playlists = [];

            for (var i = 0; i < dataItems.length; i++) {
                var playlist = dataItems[i];
                playlists.push({
                    playlistId: playlist.id,
                    videoCount: playlist.contentDetails.itemCount,
                    title: playlist.snippet.title,
                    description: playlist.snippet.description,
                    publishedAt: playlist.snippet.publishedAt
                });
            }

            if (nextPageToken !== '') {
                return playlistFunctions.getAllPlaylistsForUser(username, nextPageToken).then(function (data) {
                    return playlists.concat(data);
                });
            }

            return Promise.all(playlists);
        });
    }
};

module.exports = playlistFunctions;