window.addEventListener('load', function() {

  // Video Container
  video = document.getElementById('video');
  pauseScreen = document.getElementById('screen');

  // Progress Bar Container
  pbarContainer = document.getElementById('pbar-container');
  pbar = document.getElementById('pbar');
  screenButton = document.getElementById('screen-button');

  // Buttons Container
  playButton = document.getElementById('play-button');
  timeField = document.getElementById('time-field');
  soundButton = document.getElementById('sound-button');
  sbarContainer = document.getElementById('sbar-container');
  sbar = document.getElementById('sbar');
  fullscreenButton = document.getElementById('fullscreen-button');

  video.load();
  video.addEventListener('canplay', function() {

    playButton.addEventListener('click', playOrPause, false);
    pbarContainer.addEventListener('click', skip, false);
    updatePlayer();
    soundButton.addEventListener('click', muteOrUnmute, false);
    sbarContainer.addEventListener('click', changeVolume, false);
    fullscreenButton.addEventListener('click', fullscreen, false);
    screenButton.addEventListener('click', playOrPause, false);

  }, false);

}, false);

function playOrPause() {
  if (video.paused) {
    video.play();
    playButton.src = 'images/pause.png';
    update = setInterval(updatePlayer, 30);

    pauseScreen.style.display = 'none';
    screenButton.src = 'images/play.png';
  } else {
    video.pause();
    playButton.src = 'images/play.png';
    window.clearInterval(update);

    pauseScreen.style.display = 'block';
    screenButton.src = 'images/play.png';
  }
}

function updatePlayer() {
  var percentage = (video.currentTime/video.duration) * 100;
  pbar.style.width = percentage + '%';
  timeField.innerHTML = getFormattedTime();
  if (video.ended) {
    window.clearInterval(update);
    playButton.src = 'images/replay.png';

    pauseScreen.style.display = 'block';
    screenButton.src = 'images/replay.png';
  } else if (video.paused) {
    playButton.src = 'images/play.png';
    screenButton.src = 'images/play.png';
  }
  // console.log(pbar.style.width);
}

function skip(ev) {
  var mouseX = ev.pageX - pbarContainer.offsetLeft;
  var barWidth = window.getComputedStyle(pbarContainer).getPropertyValue('width');
  barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));

  video.currentTime = (mouseX/barWidth) * video.duration;
  updatePlayer();
  // console.log(mouseX / barWidth) * video.duration;
  // console.log(barWidth);
}

function getFormattedTime(arguments) {
  var seccods = Math.round(video.currentTime);
  var mitutes = Math.floor(seccods / 60);
  if (mitutes > 0) seccods -= mitutes * 60;
  if (seccods.toString().length === 1) seccods = '0' + seccods;

  var totalSeconds = Math.round(video.duration);
  var totalMinutes = Math.floor(totalSeconds/60);
  if (totalMinutes > 0) totalSeconds -= totalMinutes * 60;
  if (totalSeconds.toString().length === 1) totalSeconds = '0' + totalSeconds;

  return mitutes + ':' + seccods + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute() {
  if (!video.muted) {
    video.muted = true;
    soundButton.src = 'images/mute.png';
    sbar.style.display = 'none';
  } else {
    video.muted = false;
    soundButton.src = 'images/sound.png';
    sbar.style.display = 'block';
  }
}

function changeVolume (ev) {
  var mouseX = ev.pageX - sbarContainer.offsetLeft;
  var barWidth = window.getComputedStyle(sbarContainer).getPropertyValue('width');
  barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));

  video.volume = (mouseX/barWidth);
  sbar.style.width = (mouseX/barWidth) * 100 + '%';
  video.muted = false;
  soundButton.src = 'images/sound.png';
  sbar.style.display = 'block';

  console.log(video.volume);
}

function fullscreen () {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.webkitRequestFullscreen) {
    video.webkitRequestFullscreen();
  } else if (video.mozRequestFullscreen) {
    video.mozRequestFullscreen();
  } else if (video.msRequestFullscreen) {
    video.msRequestFullscreen();
  }
}
