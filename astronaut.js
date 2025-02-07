import { game } from './index.js'

function Astronaut (coorx, coory) {
  this.width = 32
  this.height = 90
  this.coorx = parseInt(coorx)
  this.coory = parseInt(coory)
  this.dom = document.querySelector('.astronaut')
  this.dom.style.width = this.width + 'px'
  this.dom.style.height = this.height + 'px'
  this.upTimerId = null
  this.downTimerId = null
  this.isJumping = false
  this.Wind = false
  this.canvas = document.querySelector('.canvas')
  this.canvas2 = document.querySelector('.canvas2')
}

Astronaut.prototype.jump = function () {
  clearInterval(this.downTimerId)
  this.isJumping = true
  let cont = 0
  const self = this
  this.upTimerId = setInterval(function () {
    self.coory += 8
    self.dom.style.bottom = self.coory + 'px'
    cont++
    // Astronauta sale por encima
    const canvas = document.querySelector('.canvas')
    const canvas2 = document.querySelector('.canvas2')

    for (let i = 0; i < game.platforms.length; i++) {
      if (game.platforms[i].isEnemie === true) {
        if (self.coorx >= game.platforms[i].left && self.coorx <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          self.gameOver()
        } else if (self.coorx + self.width >= game.platforms[i].left && self.coorx + self.width <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          self.gameOver()
        }
      }
    }
    if (self.coory >= 760 && game.platforms[1].isEnemie === false) {
      self.coorx = game.platforms[1].left
      self.dom.style.left = self.coorx + 'px'

      self.coory = 300
      self.dom.style.bottom = 200 + 'px'
      if (!this.Wind) {
        canvas.classList.remove('canvas')
        canvas.classList.add('canvas2')
        this.Wind = true
      } else {
        canvas2.classList.remove('canvas2')
        canvas2.classList.add('canvas')
        this.Wind = false
      }
    }
    if (cont > 20) {
      clearInterval(self.upTimerId)
      self.isJumping = false
      self.fall()
    }
  }, 40)
}

Astronaut.prototype.fall = function () {
  const self = this
  this.downTimerId = setInterval(function () {
    for (let i = 0; i < game.platforms.length; i++) {
      if (game.platforms[i].isEnemie === true) {
        if (self.coorx >= game.platforms[i].left && self.coorx <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          self.gameOver()
        } else if (self.coorx + self.width >= game.platforms[i].left && self.coorx + self.width <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          self.gameOver()
        }
      } else {
        if (self.coorx >= game.platforms[i].left && self.coorx <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          if (i !== 0) {
            game.checkMove(i)
          }
          self.cargarSonido(1)
          // self.coory += 10
          clearInterval(self.downTimerId)
          self.jump()
        } else if (self.coorx + self.width >= game.platforms[i].left && self.coorx + self.width <= game.platforms[i].left + game.platforms[i].width && self.coory >= game.platforms[i].bottom - 30 && self.coory <= game.platforms[i].bottom - 30 + game.platforms[i].height) {
          if (i !== 0) {
            game.checkMove(i)
          }
          self.cargarSonido(1)

          // self.coory += 10
          clearInterval(self.downTimerId)
          self.jump()
        }
      }
    }
    self.coory -= 10
    self.dom.style.bottom = self.coory + 'px'
    if (parseInt(self.coory) <= 0) {
      return self.gameOver()
    }
  }, 40)
}
Astronaut.prototype.left = function () {
  this.coorx -= 10
  if (this.coorx < -25) {
    this.coorx = 620
  }
  this.dom.style.left = this.coorx + 'px'
}
Astronaut.prototype.rigth = function () {
  this.coorx += 10
  if (this.coorx > 640) {
    this.coorx = -25
  }
  this.dom.style.left = this.coorx + 'px'
}
Astronaut.prototype.gameOver = function () {
  clearInterval(this.upTimerId)
  clearInterval(this.downTimerId)
  this.coory = 0
  this.cargarSonido(2)
  this.dom.style.bottom = 0 + 'px'
  this.gameOverr = document.querySelector('.gameover')
  this.gameOverr.classList.add('see')
  document.removeEventListener('keydown', game.move2)
}
Astronaut.prototype.cargarSonido = function (num) {
  let audio
  if (num === 1) {
    audio = new Audio('./jump.wav')
  } else if (num === 2) {
    audio = new Audio('./game_over.wav')
    // audio = new Audio({ volume: 1, src:["./game_over.wav"] })
  }

  audio.play()
}

export default Astronaut
