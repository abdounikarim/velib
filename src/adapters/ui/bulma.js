/**
 * Bulma adapter.
 * Requires: bulma installed via pnpm (CSS only — no JS).
 *
 * HTML changes needed vs Materialize:
 *   - Replace Materialize grid (col s12 m6) with Bulma columns (column is-12 is-half)
 *   - Replace <nav class="light-blue"> with Bulma <nav class="navbar">
 *   - Replace sidenav with Bulma navbar-burger + navbar-menu
 *
 * TODO: implement initCarousel (use bulma-carousel or Splide).
 */

/** @type {import('./interface.js').UIAdapter} */
export const bulmaAdapter = {
  initSidenav() {
    const burger = document.querySelector('.navbar-burger')
    const menu   = document.querySelector(`#${burger?.dataset.target}`)
    if (burger && menu) {
      burger.addEventListener('click', () => {
        burger.classList.toggle('is-active')
        menu.classList.toggle('is-active')
      })
    }
  },

  initCarousel() {
    console.warn('Bulma carousel not yet implemented — consider bulma-carousel or Splide.')
  },

  showAlert(msg) {
    alert(msg)
  },
}
