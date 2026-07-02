/**
 * Bootstrap 5 adapter.
 * Requires: bootstrap installed via pnpm.
 *
 * HTML changes needed vs Materialize:
 *   - Replace <ul class="sidenav"> with Bootstrap offcanvas component
 *   - Replace <div class="carousel carousel-slider"> with Bootstrap carousel
 *   - Replace Materialize grid classes (col s12 m6) with Bootstrap grid (col-12 col-md-6)
 */

import { Offcanvas, Carousel } from 'bootstrap'

/** @type {import('./interface.js').UIAdapter} */
export const bootstrapAdapter = {
  initSidenav() {
    document.querySelectorAll('[data-bs-toggle="offcanvas"]').forEach((el) => {
      new Offcanvas(document.querySelector(el.dataset.bsTarget))
    })
  },

  initCarousel() {
    document.querySelectorAll('.carousel').forEach((el) => {
      new Carousel(el, { ride: 'carousel' })
    })
  },

  showAlert(msg) {
    alert(msg)
  },
}
