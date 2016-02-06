var youtubeAPI = require('youtube-api'),
    Promise = require('bluebird');

var playlists = {
    /**
     * Wrapper function for YoutubeAPI playlists.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Promise(function (resolve, reject) {
            youtubeAPI.playlists.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = playlists;