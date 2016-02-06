var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var videos = {
    /**
     * Wrapper function for YoutubeAPI videos.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.videos.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = videos;