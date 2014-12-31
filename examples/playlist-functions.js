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