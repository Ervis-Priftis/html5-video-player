window.addEventListener('load', function() {

  // Video Container
  video = document.getElementById('video');

  // Progress Bar Container
  pbarContainer = document.getElementById('pbar-container');
  pbar = document.getElementById('pbar');

  // Buttons Container
  playButton = document.getElementById('play-button');

  video.load();
  video.addEventListener('canplay', function() {
    playButton.addEventListener('click', playOrPause, false);
    pbarContainer.addEventListener('click', skip, false);

  }, false);

}, false);

function playOrPause() {
  if (video.paused) {
    video.play();
    playButton.src = 'images/pause.png';
    update = setInterval(updatePlayer, 30);
  } else {
    video.pause();
    playButton.src = 'images/play.png';
    window.clearInterval(update);
  }
}

function updatePlayer() {
  var percentage = (video.currentTime/video.duration) * 100;
  pbar.style.width = percentage + '%';
  if (video.ended) {
    window.clearInterval(update);
    playButton.src = 'images/replay.png';
  }
  console.log(pbar.style.width);
}

function skip(ev) {
  var mouseX = ev.pageX - pbarContainer.offsetLeft;
  var barWidth = window.getComputedStyle(pbarContainer).getPropertyValue('width');
  barWidth = parseFloat(barWidth.substr(0, barWidth.length - 2));

  video.currentTime = (mouseX/barWidth) * video.duration;
  updatePlayer();
  console.log(mouseX / barWidth) * video.duration;
  // console.log(barWidth);
}
