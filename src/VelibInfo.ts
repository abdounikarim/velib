import type { StationMarker, MarkerColor } from './types'
import { VelibReservation } from './VelibReservation'

const MATERIALIZE_COLORS: Record<MarkerColor, string> = {
  green: 'green accent-3',
  blue: 'light-blue lighten-1',
  red: 'red lighten-1',
}

export const VelibInfo = {
  canBook(marker: StationMarker): void {
    if (marker.status === 'Ouverte' && marker.available_bikes > 0) {
      const button =
        '<div id="blockReservation"><button class="waves-effect waves-light btn" id="btnreservation">' +
        '<span class="span_btn">Réserver</span> <i class="material-icons">check_circle</i></button></div>'
      $('#infos').append(button)
      this.reservation(marker)
    } else if (marker.status === 'Ouverte' && marker.available_bikes === 0) {
      const button =
        '<div id="blockNoReservation"><button class="btn disabled" id="btnnoreservation">' +
        '<span class="span_btn">Aucun vélo disponible</span> <i class="material-icons">directions_bike</i></button></div>'
      $('#infos').append(button)
      this.noReservation()
    } else {
      const button =
        '<div id="blockClosed"><button class="btn disabled" id="btnclosed">' +
        '<span class="span_btn">Fermée</span> <i class="material-icons">cancel</i></button></div>'
      $('#infos').append(button)
      this.closed()
    }
  },

  checkBonus(marker: StationMarker): string {
    if (marker.bonus === 'True' || marker.bonus === 'true' || marker.bonus === 'Oui') {
      marker.bonus = 'Oui'
      return marker.bonus
    }
    marker.bonus = 'Non'
    return marker.bonus
  },

  checkStatus(marker: StationMarker): string {
    if (marker.status === 'OPEN' || marker.status === 'Ouverte') {
      marker.status = 'Ouverte'
      return marker.status
    }
    marker.status = 'Fermée'
    return marker.status
  },

  closed(): void {
    $('#btnclosed').on('click', () => {
      alert('Cette station est fermée, pas de réservation possible')
    })
  },

  createBlock(marker: StationMarker, bgcolor: MarkerColor): void {
    const colorClass = MATERIALIZE_COLORS[bgcolor]
    this.checkBonus(marker)
    this.checkStatus(marker)
    $('#map').after(
      `<div id="infos" class="grid-example col s12 m6 l4 xl3 ${colorClass}">` +
        '<h3>Informations de station</h3>' +
        `<p>Nom de la station : <span class="infos_span">${marker.name}</span></p>` +
        `<p>Adresse de la station : <span class="infos_span">${marker.address}</span></p>` +
        `<p>Vélos disponibles : <span id="available_bike" class="infos_span">${marker.available_bikes}</span></p>` +
        `<p>Emplacements disponibles : <span class="infos_span">${marker.available_bike_stands}</span></p>` +
        `<p>Emplacements de vélos : <span class="infos_span">${marker.bike_stands}</span></p>` +
        `<p>Station bonus : <span class="infos_span">${marker.bonus}</span></p>` +
        `<p>Station : <span class="infos_span">${marker.status}</span></p>` +
        '</div>'
    )
    $('#infos').hide().fadeIn(2000)
    this.canBook(marker)
    if (this.responsive() < 600) {
      const backToMap =
        '<br><div id="backToMap"><button class="blue darken-1 waves-effect waves-light btn" id="btnback">' +
        '<span class="span_btn">Retour à la carte</span> <i class="material-icons">map</i></button></div>'
      $('#infos').append(backToMap)
      this.move()
    }
  },

  destroyBlock(): void {
    $('#infos').remove()
  },

  move(): void {
    $('#btnback').on('click', () => {
      $('html, body').animate({ scrollTop: $('#map').offset()!.top }, 1000)
    })
    $('html, body').animate({ scrollTop: $('#infos').offset()!.top }, 1000)
  },

  noReservation(): void {
    $('#btnnoreservation').on('click', () => {
      alert("Cette station n'a pas de vélo disponible, pas de réservation possible")
    })
  },

  reduceMap(): void {
    $('#map').removeClass('l12 xl12').addClass('l8 xl9')
  },

  reservation(marker: StationMarker): void {
    $('#btnreservation').on('click', () => {
      $('#btnreservation').addClass('disabled')
      VelibReservation.createBlock(marker)
    })
  },

  responsive(): number {
    return $(window).width() ?? 0
  },

  show(marker: StationMarker): void {
    this.destroyBlock()
    this.reduceMap()
    this.createBlock(marker, marker.bgcolor)
  },
}
