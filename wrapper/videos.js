var youtubeAPI = require('youtube-api'),
    Promise = require('bluebird');

var videos = {
    /**
     * Wrapper function for YoutubeAPI videos.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Promise(function (resolve, reject) {
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