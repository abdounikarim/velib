/**
 * UI adapter loader.
 * Reads VITE_UI from .env and returns the matching adapter.
 * Defaults to 'materialize'.
 *
 * Usage:
 *   import { uiAdapter } from './adapters/ui/index.js'
 *   uiAdapter.initSidenav()
 *   uiAdapter.initCarousel()
 */

const framework = import.meta.env.VITE_UI ?? 'materialize'

let adapter

if (framework === 'bootstrap') {
  const { bootstrapAdapter } = await import('./bootstrap.js')
  adapter = bootstrapAdapter
} else if (framework === 'bulma') {
  const { bulmaAdapter } = await import('./bulma.js')
  adapter = bulmaAdapter
} else if (framework === 'tailwind') {
  const { tailwindAdapter } = await import('./tailwind.js')
  adapter = tailwindAdapter
} else {
  const { materializeAdapter } = await import('./materialize.js')
  adapter = materializeAdapter
}

export const uiAdapter = adapter
