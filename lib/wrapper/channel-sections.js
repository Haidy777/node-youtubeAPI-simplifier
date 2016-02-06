var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var channelsSections = {
    /**
     * Wrapper function for YoutubeAPI channelsSections.list
     *
     * @method list
     * @param {Object}params
     * @returns {Promise}
     */
    list: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.channelsSections.list(params, function(err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
};

module.exports = channelsSections;