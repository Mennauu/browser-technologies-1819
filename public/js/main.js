if (supportsAudioType() === "maybe") {
  document.addEventListener('DOMContentLoaded', () => {
    const noJS = document.querySelector('.no-js')
    const withJS = document.querySelector('.with-js')

    noJS.parentNode.removeChild(noJS)
    showElement(withJS)
    appendData()
    const keyDivs = document.querySelectorAll('.key')

    Array.prototype.forEach.call(keyDivs, (key) => {
      key.addEventListener('click', playClickedSound)
      key.addEventListener('transitionend', removeClass)
    })

    document.addEventListener('keydown', (key) => {
      playPressedSound(key)
      handleFirstTab(key)
    })
  })
}

const appendData = () => {
  const keyContainer = document.querySelector('.key-container')
  const keys = ['Q', 'W', 'E', 'R', 'A', 'S', 'D', 'F', 'Z', 'X', 'C', 'V']
  const keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86]
  const soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare']
  const soundFiles = ['ahh.wav', 'boom.wav', 'breath.wav', 'buff.wav', 'clap.wav', 'click.wav', 'crack.wav', 'hat.wav', 'hiss.wav', 'kick.wav', 'pop.wav', 'snare.wav']

  for (let i in keys) {
    const keyElement = document.createElement('button')

    keyElement.className = 'key'
    keyElement.setAttribute('data-keycode', `${keyCodes[i]}`)
    keyElement.insertAdjacentHTML('beforeend',
      `<span class="letter">${keys[i]}</span>
       <span class="sound-name">${soundNames[i]}</span>
       <audio class="${soundNames[i].toLowerCase()}">
         <source src="./sounds/${soundFiles[i]}" type="audio/wav">
       </audio>`)
    keyContainer.appendChild(keyElement)
  }
}

const playPressedSound = (key) => {
  const keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86]
  const soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare']

  for (let i in keyCodes) {
    const sound = document.querySelector(`.${soundNames[i].toLowerCase()}`)
    if (key.keyCode == keyCodes[i]) soundHandler(sound)
  }
}

const playClickedSound = (key) => {
  const keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86]
  const soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare']

  for (let i in keyCodes) {
    const sound = document.querySelector(`.${soundNames[i].toLowerCase()}`)
    if (key.currentTarget.dataset.keycode == keyCodes[i]) soundHandler(sound)
  }
}

const soundHandler = (sound) => {
  const loopInput = document.querySelector('.loop')
  const button = sound.parentNode

  if (loopInput.checked) {
    if (button.classList.contains('looped-key')) {
      button.classList.remove('looped-key')
      button.querySelector('audio').loop = false
    } else {
      sound.loop = true
      button.classList.add('looped-key')
    }
  } else {
    sound.loop = false
  }

  sound.paused ? sound.play() : sound.currentTime = 0
  button.classList.add('active-key')
  loopInput.addEventListener("change", turnOffLoop)
}

const showElement = (element) => element.style.display = "block"

const handleFirstTab = (key) => {
  if (key.keyCode === 9) {
    document.body.classList.add('user-is-tabbing')

    document.removeEventListener('keydown', handleFirstTab)
    document.addEventListener('mousedown', handleMouseDownOnce)
  }
}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  document.removeEventListener('mousedown', handleMouseDownOnce)
  document.addEventListener('keydown', handleFirstTab)
}

/* This refers to the window object when using arrow functions */
function turnOffLoop() {
  const audioFiles = document.querySelectorAll('audio')

  if (!this.checked) {
    audioFiles.forEach(audio => {
      audio.pause()
      audio.parentNode.classList.remove('looped-key')
    })
  }
}

function removeClass() {
  this.classList.remove('active-key')
}

function supportsAudioType() {
  let audio

  if (!audio) audio = document.createElement('audio')

  return audio.canPlayType('audio/wav')
}
