//Global variables
var yt_link = 'LXDAu8DnALw';
var start_time = 0;
var end_time = 1000;


//get yt_link
function getYtLink() {
    let full_link = document.getElementById('yt-link').value.split("v=");
    if(full_link.length > 1 && full_link[0].slice(0, 4) == "http") {
      yt_link = full_link[1];
    }
    else {
      yt_link = full_link[0];
    }
    player.loadVideoById(yt_link, start_time, "Large");
    console.log("link: " + yt_link.split("v="));
}

//get settings
function getSettings() {
  let minutes = parseInt(document.getElementById('start').value.split(":")[0]);
  let seconds = parseInt(document.getElementById('start').value.split(":")[1]);


  start_time = (minutes * 60) + seconds;
  console.log("min: " + minutes);
  end_time = parseInt(document.getElementById('end').value, 10) + 1;
  console.log("sec: " + seconds);
  player.loadVideoById(yt_link, start_time, "Large");
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
    width: '640',
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
var done = false;
function onPlayerStateChange(event) {
  console.log("in change");
  console.log("start: " + start_time);
  console.log("end: " + end_time);
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(startLoop, end_time * 1000);
  }
}
function stopVideo() {
  player.stopVideo();
}
function pauseVideo() {
  player.pauseVideo();
}
function playVideo() {
  player.playVideo();
}
function startLoop() {
  done = true;
  player.seekTo(start_time);
  setTimeout(startLoop, end_time * 1000);
}