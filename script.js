// Function to initialize TTS
function initTTS() {
  // Get elements
  var textarea = document.getElementById('text');
  var select = document.getElementById('select');
  var playPauseButton = document.getElementById('play-pause-button');
  var restartButton = document.getElementById('restart-button');

  // Play or pause TTS
  var isPlaying = false;
  var utterance = new SpeechSynthesisUtterance();

  function restartListen() {
    if(textarea.value === null || textarea.value.trim() === ''){
      
      return;
    }
    speechSynthesis.cancel();
    utterance.text = textarea.value.trim();
    var selectedVoice = voices[select.value];
    utterance.voice = selectedVoice;
    speechSynthesis.speak(utterance);
    isPlaying = true;
    playPauseButton.textContent = 'Pause';
  }

  // Populate select options with available voices
  var voices = speechSynthesis.getVoices();
  voices.forEach(function (voice, index) {
    var option = document.createElement('option');
    option.value = index;
    option.textContent = voice.name;
    select.appendChild(option);
  });

  select.addEventListener('change', function() {
    restartListen();
  });

  playPauseButton.addEventListener('click', function () {
    if (!isPlaying) {
      if (speechSynthesis.speaking) {
        speechSynthesis.resume();
        isPlaying = true;
        playPauseButton.textContent = 'Pause';
      } else {
        restartListen();
      }
    } else {
      isPlaying = false;
      speechSynthesis.pause();
      playPauseButton.textContent = 'Resume';
    }
  });

  // Restart TTS
  restartButton.addEventListener('click', restartListen);

  // Event listener to change button text when speech ends
  utterance.onend = function() {
    isPlaying = false;
    playPauseButton.textContent = 'Play';
  };
}

// Check if voices are loaded before initializing TTS
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = initTTS;
} else {
  initTTS();
}
