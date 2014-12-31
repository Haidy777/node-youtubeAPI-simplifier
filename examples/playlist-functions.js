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

YTAPI.playlistFunctions.getAllPlaylistsForUser('gronkh').then(function (data) {
    console.log('All Playlists:');
    console.log(data);
});

//The used playlistID is just another playlist from gronkh.
YTAPI.playlistFunctions.getAllVideosForPlaylist('PLGWGc5dfbzn_pvtJg7XskLva9XZpNTI88').then(function (data) {
    console.log('All Videos:');
    console.log(data);
});