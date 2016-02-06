var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var playlistItems = {
    /**
     * Wrapper function for YoutubeAPI playlistItems.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.playlistItems.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = playlistItems;