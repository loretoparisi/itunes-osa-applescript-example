/**
* Example node module to control iTunes via Apple Open Script Architecture (OSA)
* @author Loreto Parisi (loretoparisi at gmail dot com)
* @see https://github.com/loretoparisi/itunes-osa-applescript-example
*/
(function() {

  // https://www.npmjs.com/package/osa
  var osa = require('osa');

  var iTunesScrobblerOSA
    , commands;

  iTunesScrobblerOSA = (function() {

    /**
     * iTunes Scrobbler module
     * @uses OSA Apple Script Bridging API
     * @author Loreto Parisi (loreto at musixmatch dot com)
     * @2015-2016 Musixmatch Spa.
     */
    function iTunesScrobblerOSA(options, logger) {
      var self=this;

      // defaults
      this._options = {
        // true to debug
        debug : false,
        // true to show errors
        error : true
      };

      // override defaults
      for (var attrname in options) { this._options[attrname] = options[attrname]; }

      /**
       * OSA Get Player State
       */
      this._OSAGetPlayerState = function() {

        var itunes = Application('iTunes');
        var playerState = itunes.playerState();
        var currentTrack, currentPlaylist;

        var status = {};
        status.track={};
        status.player={};
        status.playlists = {};

        status.player['player_state'] = playerState;

        if (playerState != "stopped") {
          currentTrack = itunes.currentTrack;
          currentPlaylist = itunes.currentPlaylist;

          status.track['id'] = currentTrack.persistentID();
          status.track['name'] = currentTrack.name();
          status.track['artist'] = currentTrack.artist();
          status.track['album'] = currentTrack.album();
          status.track['duration'] = currentTrack.duration();
          if (currentTrack.year()) {
            status.track['album'] += " (" + currentTrack.year() + ")";
          }
          status.playlists['current'] = currentPlaylist.name();
        }

        status.player['volume'] = itunes.soundVolume();
        status.player['muted'] = itunes.mute();
        status.player['position'] = itunes.playerPosition();

        console.log ( "osa - _OSAGetPlayerState");

        return status;

     } //_OSAGetPlayerState

     /**
      * OSA Get Current Track
      */
     this._OSAGetCurrentTrack = function() {
       var itunes = Application('iTunes');
       var playerState = itunes.playerState();
       var currentTrack = null;
       var props={};
       if (playerState != "stopped") {
         currentTrack = itunes.currentTrack;
         props = currentTrack.properties();
       }
       console.log ( "osa - OSAGetCurrentTrack");
       return props;

     }//_OSAGetCurrentTrack

     /**
      * OSA Get Playlists
      */
     this._OSAGetPlaylists = function() {
       var itunes = Application('iTunes');

       var status = {};
       status.playlists = {};

       var radioTunerPlaylists = itunes.radioTunerPlaylists();
       var userPlaylists = itunes.userPlaylists();
       var subscriptionPlaylists = itunes.subscriptionPlaylists();
       var libraryPlaylists = itunes.playlists();
       var currentPlaylist = itunes.currentPlaylist;

       console.log( "Current Playlist " + currentPlaylist.name());

       for(var idx=0;idx<currentPlaylist.tracks().length;idx++) {
         var track=currentPlaylist.tracks[idx];
         console.log("Current playlist track " + track.name() + " artist " + track.artist() + " album " + track.album());
       }

       for(var idx=0;idx<userPlaylists.length;idx++){
         var pl=userPlaylists[idx];
         var sTracks = pl.tracks();
         if(!sTracks) sTracks = [];
         console.log( "Playlist " + pl.name() + " streaming tracks " + sTracks.length );
       }

       status.playlists.radio = radioTunerPlaylists.map(function(item,index) { return { name : item.name(), count : item.URLTracks().length } });
       status.playlists.subscription = subscriptionPlaylists.map(function(item,index) { return { name : item.name(), count : item.URLTracks().length } });
       status.playlists.user = userPlaylists.map(function(item,index) { return { name : item.name(), count : item.tracks().length } });

       console.log ( "osa - _OSAGetPlaylists");

       return status;

     }//_OSAGetPlaylists

    }

    /**
     * Get Player state
     */
    iTunesScrobblerOSA.prototype.GetCurrentTrack = function(fail, done) {
      var self=this;
      osa(self._OSAGetCurrentTrack
        , function (error, state, log) {

        if(self._options.debug) { // osa logging
          console.log( log );
        }

        if (error) {
          console.log(error);
          return fail( error );
        } else {
          console.log( JSON.stringify(state,null,2) );
          return done( state );
        }
      })
    } //GetCurrentTrack

    /**
     * Get playlists
     */
    iTunesScrobblerOSA.prototype.GetPlaylists = function(fail, done) {
      var self=this;
      osa(self._OSAGetPlaylists
        , function (error, state, log) {

        if(self._options.debug) { // osa logging
          console.log( log );
        }

        if (error) {
          console.log(error);
          return fail( error );
        } else {
          console.log( JSON.stringify(state,null,2) );
          return done( state );
        }
      })
    } //GetPlaylists

    /**
     * Get Player state
     */
    iTunesScrobblerOSA.prototype.GetPlayerState = function(fail, done) {
      var self=this;
      osa(self._OSAGetPlayerState
        , function (error, state, log) {

        if(self._options.debug) { // osa logging
          console.log( log );
        }

        if (error) {
          console.log(error);
          return fail( error );
        } else {
          console.log( JSON.stringify(state,null,2) );
          return done( state );
        }
      })
    } //GetPlayerState

    return iTunesScrobblerOSA;

  })();

  module.exports = iTunesScrobblerOSA;

}).call(this);
