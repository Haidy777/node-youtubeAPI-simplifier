var Promise = require('bluebird'),
    wrapper = require('./wrapper'),
    playlistWrapper = wrapper.playlists,
    playlistItemsWrapper = wrapper.playlistItems,
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
     * @param {String}  username
     * @param {String}  pageToken (optional)
     * @returns {Promise}
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
                    publishedAt: playlist.snippet.publishedAt,
                    thumbnails: playlist.snippet.thumbnails
                });
            }

            if (nextPageToken !== '') {
                return playlistFunctions.getAllPlaylistsForUser(username, nextPageToken).then(function (data) {
                    return playlists.concat(data);
                });
            }

            return Promise.all(playlists);
        });
    },

    /**
     * Gets all videos for a specified playlist.
     *
     * @method getAllVideosForPlaylist
     * @param {String}  playlistId
     * @param {String}  pageToken (optional)
     * @returns {Promise}
     */
    getAllVideosForPlaylist: function (playlistId, pageToken) {
        var params = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 50,
            pageToken: pageToken || ''
        };

        return playlistItemsWrapper.list(params).then(function (data) {
            var videos = [],
                nextPageToken = data.nextPageToken || '',
                dataItems = data.items;

            for(var i = 0; i < dataItems.length; i++){
                var video = dataItems[i].snippet;
                videos.push({
                    videoId: video.resourceId.videoId,
                    title: video.title,
                    description: video.description,
                    publishedAt: video.publishedAt,
                    thumbnails: video.thumbnails
                });
            }

            if(nextPageToken !== ''){
                return playlistFunctions.getAllVideosForPlaylist(playlistId, nextPageToken).then(function (data) {
                    return videos.concat(data);
                });
            }

            return Promise.all(videos);
        });
    }
};

module.exports = playlistFunctions;