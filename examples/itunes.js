/**
* Example node module to control iTunes via Apple Open Script Architecture (OSA)
* @author Loreto Parisi (loretoparisi at gmail dot com)
* @see https://github.com/loretoparisi/itunes-osa-applescript-example
*/
(function() {

  var iTunesOSA = require('../lib/index');
  var itunes = new iTunesOSA( { debug : true, error : true } );

  // Get Player State
  itunes.GetPlayerState(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });

  // Retrieve Current Track
  itunes.GetCurrentTrack(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });

  // Retrieve playlists
  itunes.GetPlaylists(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });


}).call(this);
