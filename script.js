//Global variables
var yt_link;
var start_time;
var end_time;
var window_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
if(window_width < 768) {
  window_width = '280';
}
else {
  window_width = '720';
}

//get yt_link
function getYtLink() {
    let full_link = document.getElementById('yt-link').value.split("v=");
    if(full_link.length > 1 && full_link[0].slice(0, 4) == "http") {
      yt_link = full_link[1];
    }
    else {
      yt_link = full_link[0];
    }
}

//get time_settings
function getSettings() {
  let minutes = parseInt(document.getElementById('start').value.split(":")[0]);
  let seconds = parseInt(document.getElementById('start').value.split(":")[1]);

  start_time = (minutes * 60) + seconds;
  if(document.getElementById('end').value.toLowerCase() == "end") {
    end_time = 1000000;
  }
  else {
    end_time = start_time + parseInt(document.getElementById('end').value, 10) + 1;
  }
}

//update_all_settings 
function updateAll() {
  getYtLink();
  getSettings();
  player.loadVideoById({'videoId': yt_link,
               'startSeconds': start_time,
               'endSeconds': end_time,
               'suggestedQuality': 'large'});
}

//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//This function creates an <iframe> (and YouTube player)
//after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: window_width,
    videoId: yt_link,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

//The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

//The API calls this function when the player's state changes.
//The function indicates that when playing a video (state=1),
//the player should play for six seconds and then stop.

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.ENDED) {
    restartVideo();
  }
}

function playVideo() {
  player.playVideo();
}

function restartVideo() {
  player.seekTo(start_time);
  player.playVideo();
}

updateAll();