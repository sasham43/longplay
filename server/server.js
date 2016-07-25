require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

////////////import modules//////////
var index = require('./routes/index');



//////////// config /////////////
app.use(express.static('server/public'));
app.use(bodyParser.json());




///////////routes/////////////
app.use('/', index);




//////// spotify testing ///////
var spotify = require('node-spotify')({appkeyFile: './spotify_appkey.key'});
var spotifyUser = process.env.SPOTIFY_USER;
var spotifyPass = process.env.SPOTIFY_PASS;

var ready = function(){
  var starredPlaylist = spotify.sessionUser.starredPlaylist;
  // var track = starredPlaylist.getTrack(0);
  var album = spotify.createFromLink('spotify:album:71QyofYesSsRMwFOTafnhB');
  var player = spotify.player;
  album.browse(function(err, thisAlbum){
    if(err){
      console.log('error browsing ablum:', err);
    } else {
      var tracks = thisAlbum.tracks;
      // var track = tracks[0];
      // spotify.player.play(track);
      var trackCount = 2;
      var playAlbum = function(){
        var track = tracks[trackCount];
        player.play(track);
        console.log('playing:', track.name);
        player.on({
          endOfTrack: function(){
          console.log('track ended.');
          trackCount++;
          playAlbum();
        }
      });
      };
      playAlbum();
    }
  });
  // spotify.player.play(starredPlaylist.getTrack(0));
  // console.log('spotify playlist:', track);
};

spotify.on({
  ready: ready
});

spotify.login(spotifyUser, spotifyPass, false, false);











//listen
app.listen(port, function() {
  console.log('listening on port', port);
});
