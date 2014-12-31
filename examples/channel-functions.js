var YTAPI = require('../index');

/**
 * The used Youtube-User 'gronkh' is a famous german lets player,
 * I just used him to test this functions. Every other should also be working.
 *
 * APIKEY must be replaced by a real API Key from Google.
 * To find out how to get one see: https://developers.google.com/youtube/registering_an_application (you need the API Key)
 */

var APIKEY = '###########'; //Must be Replaced by your API-Key

YTAPI.setup(APIKEY);

YTAPI.channelFunctions.getStatisticsForUser('gronkh').then(function (data) {
    console.log('Statistics:');
    console.log(data);
});

YTAPI.channelFunctions.getChannelIdForUser('gronkh').then(function (data) {
    console.log('ChannelId: ');
    console.log(data);
});

YTAPI.channelFunctions.getDetailsForUser('gronkh').then(function (data) {
    console.log('ChannelDetails:');
    console.log(data);
});