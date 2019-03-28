"use strict";

if (supportsAudioType() === "maybe") {
  document.addEventListener('DOMContentLoaded', function () {
    var noJS = document.querySelector('.no-js');
    var withJS = document.querySelector('.with-js');
    noJS.parentNode.removeChild(noJS);
    showElement(withJS);
    appendData();
    var keyDivs = document.querySelectorAll('.key');
    Array.prototype.forEach.call(keyDivs, function (key) {
      key.addEventListener('click', playClickedSound);
      key.addEventListener('transitionend', removeClass);
    });
    document.addEventListener('keydown', function (key) {
      playPressedSound(key);
      handleFirstTab(key);
    });
  });
}

function appendData() {
  var keyContainer = document.querySelector('.key-container');
  var keys = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];
  var soundFiles = ['ahh.mp3', 'boom.mp3', 'breath.mp3', 'buff.mp3', 'clap.mp3', 'click.mp3', 'crack.mp3', 'hat.mp3', 'hiss.mp3', 'kick.mp3', 'pop.mp3', 'snare.mp3']

  for (var i in keys) {
    var keyElement = document.createElement('button');
    keyElement.className = 'key';
    keyElement.setAttribute('data-keycode', "".concat(keyCodes[i]));
    keyElement.insertAdjacentHTML('beforeend', "<span class=\"letter\">".concat(keys[i], "</span>\n       <span class=\"sound-name\">").concat(soundNames[i], "</span>\n       <audio class=\"").concat(soundNames[i].toLowerCase(), "\">\n         <source src=\"./sounds/").concat(soundFiles[i], "\" type=\"audio/wav\">\n       </audio>"));
    keyContainer.appendChild(keyElement);
  }
};

function playPressedSound(key) {
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];

  for (var i in keyCodes) {
    var sound = document.querySelector(".".concat(soundNames[i].toLowerCase()));
    if (key.keyCode == keyCodes[i]) soundHandler(sound);
  }
};

function playClickedSound(key) {
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];

  for (var i in keyCodes) {
    var sound = document.querySelector(".".concat(soundNames[i].toLowerCase()));
    if (key.currentTarget.dataset.keycode == keyCodes[i]) soundHandler(sound);
  }
};

function soundHandler(sound) {
  var loopInput = document.querySelector('.loop');
  var button = sound.parentNode;

  if (loopInput.checked) {
    if (button.classList.contains('looped-key')) {
      button.classList.remove('looped-key');
      button.querySelector('audio').loop = false;
    } else {
      sound.loop = true;
      button.classList.add('looped-key');
    }
  } else {
    sound.loop = false;
  }

  sound.paused ? sound.play() : sound.currentTime = 0;
  button.classList.add('active-key');
  loopInput.addEventListener("change", turnOffLoop);
};

function showElement(element) {
  return element.style.display = "block";
};

function handleFirstTab(key) {
  if (key.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    document.removeEventListener('keydown', handleFirstTab);
    document.addEventListener('mousedown', handleMouseDownOnce);
  }
};

function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing');
  document.removeEventListener('mousedown', handleMouseDownOnce);
  document.addEventListener('keydown', handleFirstTab);
};

function turnOffLoop() {
  var audioFiles = document.querySelectorAll('audio');

  if (!this.checked) {
    audioFiles.forEach(function (audio) {
      audio.pause();
      audio.parentNode.classList.remove('looped-key');
    });
  }
}

function removeClass() {
  this.classList.remove('active-key');
}

function supportsAudioType() {
  var audio;

  if (!audio) audio = document.createElement('audio');
  return audio.canPlayType('audio/wav');
}