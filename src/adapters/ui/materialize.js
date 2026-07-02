/**
 * Materialize CSS v1 adapter.
 * Requires: Materialize JS loaded via CDN (exposes global M).
 */

/** @type {import('./interface.js').UIAdapter} */
export const materializeAdapter = {
  initSidenav() {
    M.Sidenav.init(document.querySelectorAll('.sidenav'))
  },

  initCarousel() {
    M.Carousel.init(document.querySelectorAll('.carousel'), { indicators: true })
  },

  showAlert(msg) {
    alert(msg)
  },
}
