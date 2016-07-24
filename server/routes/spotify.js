var spotify = require('spotify')({appKey: '../../spotify_appkey.key'});

var ready = function(){
  var starredPlaylist = spotify.sessionUser.starredPlaylist;
  spotify.player.play(starredPlaylist.getTrack(0));
};

spotify.on({
  ready: ready
});

spotify.login('sasham43', 'chibbers', false, false);
