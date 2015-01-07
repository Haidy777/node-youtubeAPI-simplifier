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

//Gets all playlists for user 'gronkh'
YTAPI.playlistFunctions.getPlaylistsForUser('gronkh').then(function (data) {
    console.log('All Playlists:');
    console.log(data);
});

//Gets only 10 playlists for user 'gronkh'
YTAPI.playlistFunctions.getPlaylistsForUser('gronkh', 10).then(function (data) {
    console.log('All Playlists:');
    console.log(data);
});

//Gets all videos for specified playlistID.
YTAPI.playlistFunctions.getVideosForPlaylist('PLGWGc5dfbzn_pvtJg7XskLva9XZpNTI88').then(function (data) {
    console.log('All Videos:');
    console.log(data);
});

//Gets 10 videos for specified playlistID.
YTAPI.playlistFunctions.getVideosForPlaylist('PLGWGc5dfbzn_pvtJg7XskLva9XZpNTI88', 10).then(function (data) {
    console.log('All Videos:');
    console.log(data);
});