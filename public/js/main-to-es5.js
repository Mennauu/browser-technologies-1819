"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var noJS = document.querySelector('.no-js');
  var withJS = document.querySelector('.with-js');

  noJS.remove(); // Show element if JavaScript is enabled
  showElement(withJS); // Trigger appendData
  appendData(); // After data is set, select all key elements

  var keyDivs = document.querySelectorAll('.key');
  keyDivs.forEach(function (key) {
    // Trigger playSound on button click
    key.addEventListener('click', playClickedSound);
    // If element has ended with transitioning, trigger removeClass
    key.addEventListener('transitionend', removeClass);
  });
  // Trigger playSound on keydown
  document.addEventListener('keydown', function (key) {
    playPressedSound(key);
    handleFirstTab(key);
  });
});
/* TO-DO: If browser does not support audio element, show no-js version


*/

var appendData = function appendData() {
  var keyContainer = document.querySelector('.key-container');
  var keys = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V'];
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];
  var soundFiles = ['ahh.wav', 'boom.wav', 'breath.wav', 'buff.wav', 'clap.wav', 'click.wav', 'crack.wav', 'hat.wav', 'hiss.wav', 'kick.wav', 'pop.wav', 'snare.wav'];

  for (var i in keys) {
    var keyElement = document.createElement('button');
    keyElement.className = 'key';
    keyElement.setAttribute('data-keycode', "".concat(keyCodes[i]));
    keyElement.insertAdjacentHTML('beforeend', "<span class=\"letter\">".concat(keys[i], "</span>\n       <span class=\"sound-name\">").concat(soundNames[i], "</span>\n       <audio class=\"").concat(soundNames[i].toLowerCase(), "\">\n         <source src=\"./sounds/").concat(soundFiles[i], "\" type=\"audio/wav\">\n       </audio>"));
    keyContainer.appendChild(keyElement);
  }
};

var playPressedSound = function playPressedSound(key) {
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];

  for (var i in keyCodes) {
    var sound = document.querySelector(".".concat(soundNames[i].toLowerCase()));
    if (key.keyCode == keyCodes[i]) soundHandler(sound);
  }
};

var playClickedSound = function playClickedSound(key) {
  var keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86];
  var soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare'];

  for (var i in keyCodes) {
    var sound = document.querySelector(".".concat(soundNames[i].toLowerCase()));
    if (key.currentTarget.dataset.keycode == keyCodes[i]) soundHandler(sound);
  }
};

var soundHandler = function soundHandler(sound) {
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

var showElement = function showElement(element) {
  return element.style.display = "block";
};

var handleFirstTab = function handleFirstTab(key) {
  if (key.keyCode === 9) {
    document.body.classList.add('user-is-tabbing');
    document.removeEventListener('keydown', handleFirstTab);
    document.addEventListener('mousedown', handleMouseDownOnce);
  }
};

var handleMouseDownOnce = function handleMouseDownOnce() {
  document.body.classList.remove('user-is-tabbing');
  document.removeEventListener('mousedown', handleMouseDownOnce);
  document.addEventListener('keydown', handleFirstTab);
};
/* This refers to the window object when using arrow functions */


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