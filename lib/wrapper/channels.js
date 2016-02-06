var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var channels = {
    /**
     * Wrapper function for YoutubeAPI channels.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.channels.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = channels;