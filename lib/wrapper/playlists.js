var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var playlists = {
    /**
     * Wrapper function for YoutubeAPI playlists.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Pact(function (resolve, reject) {
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