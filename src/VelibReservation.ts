import type { StationMarker } from './types'
import { VelibMarker } from './VelibMarker'
import { VelibCanvas } from './VelibCanvas'
import { VelibInfo } from './VelibInfo'

export const VelibReservation = {
  _destroyTimer: null as ReturnType<typeof setTimeout> | null,

  checkSession(): void {
    if (sessionStorage.getItem('date')) {
      this.countDown()
    }
  },

  checkStation(marker: StationMarker): void {
    if (sessionStorage.getItem('station') === marker.name) {
      $('#btnreservation')
        .html(
          '<span class="span_btn">Réservation en cours</span> <i class="material-icons">directions_bike</i>'
        )
        .addClass('disabled')
        .on('click', () => {
          alert('Vous avez déjà réservé un vélo dans cette station')
          $('#reservation').remove()
        })
    }
  },

  countDown(): void {
    const interval = setInterval(() => {
      const dateExp = Number(sessionStorage.getItem('date')) + 1000 * 60 * 20
      const dateNow = new Date().getTime()
      const expiration = dateExp - dateNow
      const min = Math.floor((expiration % (1000 * 60 * 60)) / (1000 * 60))
      const sec = Math.floor((expiration % (1000 * 60)) / 1000)
      if (min >= 0 && sec >= 0) {
        $('#isReservation').html(
          `1 réservation à la station : ${sessionStorage.getItem('station')} pendant ${min} minutes et ${sec} secondes`
        )
      } else {
        clearInterval(interval)
        $('#isReservation').html('Réservation expirée')
      }
    }, 1000)
  },

  createBlock(marker: StationMarker): void {
    this.removeBlock()
    const block = `<div id="reservation" class="grid-example col s12 m6 l4 xl3 green accent-3"><h4>Réservation</h4><p>Réserver un vélo à la station : <br>${marker.name}</p></div>`
    $(block).insertAfter('#infos').hide().fadeIn(2000)
    if (VelibInfo.responsive() < 600) {
      this.move()
    }
    VelibCanvas.createCanvas(marker)
  },

  destroyBlock(): void {
    $('#reservation').fadeOut(2000)
    VelibReservation._destroyTimer = setTimeout(() => {
      VelibReservation.removeBlock()
    }, 2000)
  },

  move(): void {
    $('html, body').animate({ scrollTop: $('#reservation').offset()!.top }, 1000)
  },

  removeBike(marker: StationMarker): void {
    const station = sessionStorage.getItem('station')
    const bikes = parseInt($('#available_bike').text(), 10)
    const left = bikes - 1
    if (station === marker.name) {
      $('#available_bike').html(String(left))
      sessionStorage.setItem('bikes', String(left))
    }
  },

  removeBlock(): void {
    if (VelibReservation._destroyTimer) {
      clearTimeout(VelibReservation._destroyTimer)
      VelibReservation._destroyTimer = null
    }
    $('#reservation').remove()
  },

  sessionSave(date: number, marker: StationMarker): void {
    sessionStorage.setItem('date', String(date))
    sessionStorage.setItem('station', marker.name)
    sessionStorage.setItem('bikes', String(marker.available_bikes))
  },

  validate(marker: StationMarker): void {
    $('#valider').on('click', () => {
      VelibMarker.stop()
      const dateNow = new Date().getTime()
      VelibReservation.sessionSave(dateNow, marker)
      VelibReservation.checkStation(marker)
      VelibReservation.countDown()
      VelibReservation.removeBike(marker)
      VelibMarker.check(marker)
      VelibReservation.destroyBlock()
    })
  },
}
