import type { StationMarker } from './types'
import { VelibReservation } from './VelibReservation'

export const VelibCanvas = {
  canvas: null as HTMLCanvasElement | null,
  ctx: null as CanvasRenderingContext2D | null,
  height: 0,
  width: 0,
  currX: 0,
  currY: 0,
  prevX: 0,
  prevY: 0,
  flag: false,
  dot_flag: false,

  clearCanvas(): void {
    $('#deleteCanvas').on('click', () => {
      VelibCanvas.ctx!.clearRect(0, 0, VelibCanvas.width, VelibCanvas.height)
    })
  },

  createCanvas(marker: StationMarker): void {
    const block =
      '<div id="divCanvas">' +
      '<canvas id="canvas" height="290" width="300"></canvas>' +
      '<div id="blockSubmit"><button class="btn" id="valider"><span class="span_btn">Valider la réservation</span> <i class="material-icons">check_circle</i></button></div><br>' +
      '<div id="blockCancel"><button id="deleteCanvas" class="btn waves-effect waves-light red darken-2"><span class="span_btn">Effacer la signature</span> <i class="material-icons">cancel</i></button></div><br>' +
      '<div id="backToMap2"><button class="blue darken-1 waves-effect waves-light btn" id="btnback2"><span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i></button></div>' +
      '</div>'
    $(block).appendTo('#reservation')
    this.move()
    this.init()
    VelibReservation.validate(marker)
  },

  draw(): void {
    const ctx = VelibCanvas.ctx!
    ctx.beginPath()
    ctx.moveTo(VelibCanvas.prevX, VelibCanvas.prevY)
    ctx.lineTo(VelibCanvas.currX, VelibCanvas.currY)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 5
    ctx.stroke()
    ctx.closePath()
  },

  events(): void {
    const canvas = VelibCanvas.canvas!
    if (this.responsive() <= 768) {
      canvas.addEventListener('touchmove', (e) => VelibCanvas.launch('move', e), false)
      canvas.addEventListener('touchstart', (e) => VelibCanvas.launch('down', e), false)
      canvas.addEventListener('touchend', (e) => VelibCanvas.launch('up', e), false)
    } else {
      canvas.addEventListener('mousemove', (e) => VelibCanvas.launch('move', e), false)
      canvas.addEventListener('mousedown', (e) => VelibCanvas.launch('down', e), false)
      canvas.addEventListener('mouseup', (e) => VelibCanvas.launch('up', e), false)
      canvas.addEventListener('mouseout', (e) => VelibCanvas.launch('out', e), false)
    }
  },

  init(): void {
    VelibCanvas.initCanvas()
    VelibCanvas.events()
    VelibCanvas.clearCanvas()
  },

  initCanvas(): void {
    VelibCanvas.canvas = document.querySelector('#canvas') as HTMLCanvasElement
    VelibCanvas.ctx = VelibCanvas.canvas.getContext('2d')!
    VelibCanvas.height = VelibCanvas.canvas.height
    VelibCanvas.width = VelibCanvas.canvas.width
    VelibCanvas.currX = VelibCanvas.currY = VelibCanvas.prevX = VelibCanvas.prevY = 0
    VelibCanvas.flag = VelibCanvas.dot_flag = false
  },

  launch(action: string, e: MouseEvent | TouchEvent): void {
    let eX: number
    let eY: number
    const canvas = VelibCanvas.canvas!
    if (this.responsive() <= 768) {
      e.preventDefault()
      const touch = (e as TouchEvent).changedTouches[0]
      eX = touch.pageX - canvas.offsetLeft
      eY = touch.pageY - canvas.offsetTop
    } else {
      eX = (e as MouseEvent).pageX - canvas.offsetLeft
      eY = (e as MouseEvent).pageY - canvas.offsetTop
    }
    if (action === 'down') {
      VelibCanvas.prevX = VelibCanvas.currX
      VelibCanvas.prevY = VelibCanvas.currY
      VelibCanvas.currX = eX
      VelibCanvas.currY = eY
      VelibCanvas.flag = true
      VelibCanvas.dot_flag = true
      if (VelibCanvas.dot_flag) {
        const ctx = VelibCanvas.ctx!
        ctx.beginPath()
        ctx.fillStyle = 'black'
        ctx.fillRect(VelibCanvas.currX, VelibCanvas.currY, 2, 2)
        ctx.closePath()
        VelibCanvas.dot_flag = false
      }
    }
    if (action === 'up' || action === 'out') {
      VelibCanvas.flag = false
    }
    if (action === 'move' && VelibCanvas.flag) {
      VelibCanvas.prevX = VelibCanvas.currX
      VelibCanvas.prevY = VelibCanvas.currY
      VelibCanvas.currX = eX
      VelibCanvas.currY = eY
      VelibCanvas.draw()
    }
  },

  move(): void {
    $('#btnback2').on('click', () => {
      $('html, body').animate({ scrollTop: $('#map').offset()!.top }, 1000)
    })
  },

  responsive(): number {
    return $(window).width() ?? 0
  },
}
