var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var listOnly = {
    /**
     * Wrapper function for YoutubeAPI guideCategories.list
     *
     * @method guideCategories
     * @param {Object} params
     * @returns {Promise}
     */
    guideCategories: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.guideCategories.list(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    },

    /**
     * Wrapper function for YoutubeAPI search.list
     *
     * @method search
     * @param {Object} params
     * @returns {Promise}
     */
    search: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.search.list(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};

module.exports = listOnly;