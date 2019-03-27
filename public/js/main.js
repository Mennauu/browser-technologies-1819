document.addEventListener('DOMContentLoaded', () => {
  const noJS = document.querySelector('.no-js')
  const withJS = document.querySelector('.with-js')

  // Remove element if JavaScript is enabled
  noJS.remove()
  // Show element if JavaScript is enabled
  showElement(withJS)
  // Trigger appendData
  appendData()
  // After data is set, select all key elements
  const keyDivs = document.querySelectorAll('.key')

  keyDivs.forEach(key => {
    // Trigger playSound on button click
    key.addEventListener('click', playSound)
    // If element has ended with transitioning, trigger removeClass
    key.addEventListener('transitionend', removeClass)
  })
  // Trigger playSound on keydown
  document.addEventListener('keydown', playSound)
})

/* TO-DO: If browser does not support audio element, show no-js version


*/

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

const playSound = (key) => {
  const soundNames = ['Ahh', 'Boom', 'Breath', 'Buff', 'Clap', 'Click', 'Crack', 'Hat', 'Hiss', 'Kick', 'Pop', 'Snare']
  const keyCodes = [81, 87, 69, 82, 65, 83, 68, 70, 90, 88, 67, 86]
  const loopInput = document.querySelector('.loop')

  for (let i in keyCodes) {
    if (key.keyCode == keyCodes[i] || key.path[1].dataset.keycode == keyCodes[i]) {
      const sound = document.querySelector(`.${soundNames[i].toLowerCase()}`)
      const audioFiles = document.querySelectorAll('audio')

      sound.paused ? sound.play() : sound.currentTime = 0
      sound.parentNode.classList.add('active-key')

      if (loopInput.checked) {
        sound.loop = true
      } else {
        audioFiles.forEach(audio => audio.currentTime = 0)
      }
    }
  }
}

const showElement = (element) => element.style.display = "block"

function removeClass() {
  this.classList.remove('active-key')
}
