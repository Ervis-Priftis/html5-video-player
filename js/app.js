window.addEventListener('load', function() {

  // Video Container
  video = document.getElementById('video');

  // Progress Bar Container
  pbar = document.getElementById('pbar');

  // Buttons Container
  playButton = document.getElementById('play-button');

  video.load();
  video.addEventListener('canplay', function() {
    playButton.addEventListener('click', playOrPause, false);

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
