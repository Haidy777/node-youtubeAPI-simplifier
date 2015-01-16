var YTAPI = require('../index');

/**
 * APIKEY must be replaced by a real API Key from Google.
 * To find out how to get one see: https://developers.google.com/youtube/registering_an_application (you need the API Key)
 */

var APIKEY = '###########'; //Must be Replaced by your API-Key

YTAPI.setup(APIKEY);

//Gets only 50 results
YTAPI.searchFunctions.simpleSearch('Dr Who').then(function (data) {
    console.log('Search results for Dr. Who');
    console.log(data);
});

//Gets 100 results for channel "gronkh" and string "minecraft"
YTAPI.searchFunctions.channelInternalSearch('gronkh', 'minecraft', 100).then(function (data) {
    console.log('Search results for Channel "gronkh" and searchString "minecraft": ');
    console.log(data);
});

//Gets all results for channel "gronkh" and string "minecraft"
YTAPI.searchFunctions.channelInternalSearch('gronkh', 'minecraft').then(function (data) {
    console.log('Search results for Channel "gronkh" and searchString "minecraft": ');
    console.log(data);
});