# itunes-osa-applescript-example
Example node module to control iTunes via Apple Open Script Architecture (OSA)
## Examples
First import the module

```javascript
var itunes = new iTunesOSA( { debug : true, error : true } );
```

Then to get the player state

```javascript
  // Get Player State
  itunes.GetPlayerState(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });
```

To retrieve the current playing track

```javascript
// Retrieve Current Track
  itunes.GetCurrentTrack(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });
```

To retrieve all available playlists

```javascript
// Retrieve playlists
  itunes.GetPlaylists(
    function(error) {
      console.log( error );
    }
    , function(results) {
      console.log( JSON.stringify(results,null,2) );
    });
```
