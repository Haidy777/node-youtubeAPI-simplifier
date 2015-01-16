var YTAPI = require('../index');

/**
 * APIKEY must be replaced by a real API Key from Google.
 * To find out how to get one see: https://developers.google.com/youtube/registering_an_application (you need the API Key)
 */

var APIKEY = '###########'; //Must be Replaced by your API-Key

YTAPI.setup(APIKEY);

YTAPI.searchFunctions.simpleSearch('Dr Who').then(function (data) {
    console.log('Search results for Dr. Who');
    console.log(data);
});