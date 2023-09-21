// Get references to the video element and player controls
const video = document.querySelector('.player__video');
const playButton = document.querySelector('.player__button');
const volumeSlider = document.querySelector('.player__slider[name="volume"]');
const playbackSpeedSlider = document.querySelector('.player__slider[name="playbackRate"]');
const skipButtons = document.querySelectorAll('[data-skip]');
const progressBar = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

// Function to toggle play/pause
function togglePlay() {
  if (video.paused) {
    video.play();
    playButton.textContent = '❚ ❚';
  } else {
    video.pause();
    playButton.textContent = '►';
  }
}

// Function to update volume and playback speed
function handleSliderUpdate() {
  video[this.name] = this.value;
}

// Function to skip forward or backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Function to update progress bar
function updateProgressBar() {
  const percent = (video.currentTime / video.duration) * 100;
  progressFilled.style.flexBasis = `${percent}%`;
}

// Add event listeners to the player controls
playButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', handleSliderUpdate);
playbackSpeedSlider.addEventListener('input', handleSliderUpdate);
skipButtons.forEach(button => button.addEventListener('click', skip));
video.addEventListener('timeupdate', updateProgressBar);

// Initialize the progress bar
video.addEventListener('loadedmetadata', () => {
  progressFilled.style.flexBasis = '0%';
});

// Add logic for clicking on the progress bar to seek to a specific time
progressBar.addEventListener('click', (e) => {
  const newTime = (e.offsetX / progressBar.offsetWidth) * video.duration;
  video.currentTime = newTime;
});
