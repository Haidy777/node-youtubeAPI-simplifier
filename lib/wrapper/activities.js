var youtubeAPI = require('youtube-api');
var Pact = require('bluebird');

var activities = {
    list: function (params) {
        return new Pact(function (resolve, reject) {
            youtubeAPI.activities.list(params, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
};

module.exports = activities;