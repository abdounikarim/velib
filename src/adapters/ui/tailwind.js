/**
 * Tailwind CSS adapter.
 * Requires: tailwindcss + @tailwindcss/vite installed via pnpm.
 *
 * HTML changes needed vs Materialize:
 *   - Remove all Materialize classes, replace with Tailwind utilities
 *   - Sidenav: custom drawer with JS toggle
 *   - Carousel: use Splide or Embla Carousel
 *
 * TODO: implement initSidenav and initCarousel.
 */

/** @type {import('./interface.js').UIAdapter} */
export const tailwindAdapter = {
  initSidenav() {
    console.warn('Tailwind sidenav not yet implemented.')
  },

  initCarousel() {
    console.warn('Tailwind carousel not yet implemented — consider Splide or Embla.')
  },

  showAlert(msg) {
    alert(msg)
  },
}
