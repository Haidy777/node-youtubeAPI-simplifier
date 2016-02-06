var youtubeAPI = require('youtube-api');

var youtubeAPISimplifier = {
    /**
     * The Youtube-API Key which will be used for all Requests.
     *
     * @property {String} _APIKEY
     * @private
     */
    _APIKEY: '',

    /**
     * Setup function, needs to be called first!
     *
     * @method setup
     * @param  {String}    apiKEY
     */
    setup: function (apiKEY) {
        this._APIKEY = apiKEY;
        youtubeAPI.authenticate({
            type: 'key',
            key: apiKEY
        });
    },

    channelFunctions: require('./lib/channel-functions'),

    playlistFunctions: require('./lib/playlist-functions'),

    searchFunctions: require('./lib/search-functions'),

    videoFunctions: require('./lib/video-functions')
};

module.exports = youtubeAPISimplifier;