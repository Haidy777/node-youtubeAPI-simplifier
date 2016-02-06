var Pact = require('bluebird');
var wrapper = require('./wrapper');
var playlistWrapper = wrapper.playlists;
var playlistItemsWrapper = wrapper.playlistItems;
var channelFunctions = require('./channel-functions');

var playlistFunctions = {
    /**
     * Gets all Playlists for a specified channelId.
     * Used to clean up playlistFunctions.getPlaylistsForUser
     *
     * @method _getPlaylistsForChannelId
     * @param channelId
     * @param maxResults
     * @param pageToken
     * @returns {Promise}
     * @private
     */
    _getPlaylistsForChannelId: function (channelId, maxResults, pageToken) {
        maxResults = maxResults || null;

        var params = {
            channelId: channelId,
            part: 'contentDetails,snippet',
            maxResults: 50,
            pageToken: pageToken || ''
        };

        if (maxResults < 50 && maxResults !== null) {
            params.maxResults = maxResults;
        }

        return playlistWrapper.list(params).then(function (data) {
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

            if ((dataItems.length < maxResults || maxResults === null) && nextPageToken !== '') {
                if (maxResults !== null) {
                    maxResults = maxResults - dataItems.length
                }
                return playlistFunctions._getPlaylistsForChannelId(channelId, maxResults, nextPageToken).then(function (data) {
                    return playlists.concat(data);
                });
            }

            return Pact.all(playlists);
        });
    },

    /**
     * Gets all Videos for a playlist.
     * Used to clean up playlistFunctions.getVideosForPlaylist
     *
     * @param playlistId
     * @param maxResults
     * @param pageToken
     * @returns {Promise}
     * @private
     */
    _getVideosForPlaylist: function (playlistId, maxResults, pageToken) {
        maxResults = maxResults || null;

        var params = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 50,
            pageToken: pageToken || ''
        };

        if (maxResults < 50 && maxResults !== null) {
            params.maxResults = maxResults;
        }

        return playlistItemsWrapper.list(params).then(function (data) {
            var videos = [],
                nextPageToken = data.nextPageToken || '',
                dataItems = data.items;

            for (var i = 0; i < dataItems.length; i++) {
                var video = dataItems[i].snippet;
                videos.push({
                    videoId: video.resourceId.videoId,
                    title: video.title,
                    description: video.description,
                    publishedAt: video.publishedAt,
                    thumbnails: video.thumbnails
                });
            }

            if ((dataItems.length < maxResults || maxResults === null) && nextPageToken !== '') {
                if (maxResults !== null) {
                    maxResults = maxResults - dataItems.length
                }
                return playlistFunctions._getVideosForPlaylist(playlistId, maxResults, nextPageToken).then(function (data) {
                    return videos.concat(data);
                });
            }

            return Pact.all(videos);
        });
    },

    /**
     * Gets all Playlists for a specified user.
     * (Results can be limited by supplying maxResults)
     *
     * Example Usage:
     * getPlaylistsForUser('gronkh').then(function (data){
     *       console.log(data);
     * });
     *
     * getPlaylistsForUser('gronkh', 10).then(function (data){ //Retuns a maximum of 10 playlists.
     *       console.log(data);
     * });
     *
     * @method getPlaylistsForUser
     * @param {String}  username
     * @param {Number}  maxResults (optional) simple Number to limit results
     * @returns {Promise}
     */
    getPlaylistsForUser: function (username, maxResults) {
        return channelFunctions.getChannelIdForUser(username).then(function (channelId) {
            return playlistFunctions._getPlaylistsForChannelId(channelId.channelId, maxResults);
        });
    },

    /**
     * Gets all videos for a specified playlist.
     * (Results can be limited by supplying maxResults)
     *
     * @method getVideosForPlaylist
     * @param {String}  playlistId
     * @param {Number}  maxResults (optional) simple Number to limit results
     * @returns {Promise}
     */
    getVideosForPlaylist: function (playlistId, maxResults) {
        return playlistFunctions._getVideosForPlaylist(playlistId, maxResults);
    }
};

module.exports = playlistFunctions;