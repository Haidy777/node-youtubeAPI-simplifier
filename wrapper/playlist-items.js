var youtubeAPI = require('youtube-api'),
    Promise = require('bluebird');

var playlistItems = {
    /**
     * Wrapper function for YoutubeAPI playlistItems.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Promise(function (resolve, reject) {
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