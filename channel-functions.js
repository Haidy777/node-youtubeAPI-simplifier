var channelWrapper = require('./wrapper').channels;

var channelFunctions = {
    /**
     * Gets the statistics for a specified user.
     *
     * Example Usage:
     * getStatisticsForUser('gronkh').then(function (data){
     *       console.log(data);
     * });
     *
     * @method getStatisticsForUser
     * @param {String} username
     * @returns {Promise}
     */
    getStatisticsForUser: function (username) {
        var params = {
            part: 'statistics',
            forUsername: username
        };
        return channelWrapper.list(params).then(function (data) {
            var dataItem = data.items[0].statistics;
            return {
                viewCount: dataItem.viewCount,
                commentCount: dataItem.commentCount,
                subscriberCount: dataItem.subscriberCount,
                videoCount: dataItem.videoCount
            }
        });
    }
};

module.exports = channelFunctions;