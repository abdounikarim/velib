#!/usr/bin/env node
import * as p from '@clack/prompts'
import { execSync } from 'node:child_process'
import { writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

function run(cmd) {
  execSync(cmd, { cwd: ROOT, stdio: 'inherit' })
}

function writeEnv(values) {
  const lines = Object.entries(values)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')
  writeFileSync(join(ROOT, '.env'), lines + '\n')
}

const MAP_DEPS = {
  google: [],
  mapbox: ['mapbox-gl'],
  leaflet: ['leaflet'],
}

const UI_DEPS = {
  materialize: [],
  bootstrap: ['bootstrap'],
  bulma: ['bulma'],
  tailwind: ['tailwindcss', '@tailwindcss/vite'],
}

async function main() {
  console.clear()
  p.intro(' Velib setup wizard ')

  const map = await p.select({
    message: 'Map provider',
    options: [
      { value: 'google', label: 'Google Maps', hint: 'requires an API key' },
      { value: 'mapbox', label: 'Mapbox GL', hint: 'requires an access token' },
      { value: 'leaflet', label: 'Leaflet', hint: 'open source — no key needed' },
    ],
    initialValue: 'google',
  })
  if (p.isCancel(map)) {
    p.cancel('Aborted.')
    process.exit(0)
  }

  const ui = await p.select({
    message: 'UI framework',
    options: [
      { value: 'materialize', label: 'Materialize CSS v1', hint: 'current' },
      { value: 'bootstrap', label: 'Bootstrap 5' },
      { value: 'bulma', label: 'Bulma' },
      { value: 'tailwind', label: 'Tailwind CSS v4' },
    ],
    initialValue: 'materialize',
  })
  if (p.isCancel(ui)) {
    p.cancel('Aborted.')
    process.exit(0)
  }

  const city = await p.text({
    message: 'JCDecaux city contract',
    placeholder: 'Lyon',
    defaultValue: 'Lyon',
    validate: (v) => (!v.trim() ? 'Please enter a city name.' : undefined),
  })
  if (p.isCancel(city)) {
    p.cancel('Aborted.')
    process.exit(0)
  }

  const jcdecauxKey = await p.text({
    message: 'JCDecaux API key',
    placeholder: '9d5ce692...',
    validate: (v) => (!v.trim() ? 'A JCDecaux API key is required.' : undefined),
  })
  if (p.isCancel(jcdecauxKey)) {
    p.cancel('Aborted.')
    process.exit(0)
  }

  let mapKey = ''
  if (map === 'google') {
    mapKey = await p.text({
      message: 'Google Maps API key',
      placeholder: 'AIzaSy...',
      validate: (v) => (!v.trim() ? 'An API key is required for Google Maps.' : undefined),
    })
    if (p.isCancel(mapKey)) {
      p.cancel('Aborted.')
      process.exit(0)
    }
  }

  if (map === 'mapbox') {
    mapKey = await p.text({
      message: 'Mapbox access token',
      placeholder: 'pk.eyJ1...',
      validate: (v) => (!v.trim() ? 'An access token is required for Mapbox.' : undefined),
    })
    if (p.isCancel(mapKey)) {
      p.cancel('Aborted.')
      process.exit(0)
    }
  }

  p.note([`Map:  ${map}`, `UI:   ${ui}`, `City: ${city}`].join('\n'), 'Your configuration')

  const confirmed = await p.confirm({ message: 'Proceed with this configuration?' })
  if (p.isCancel(confirmed) || !confirmed) {
    p.cancel('Aborted.')
    process.exit(0)
  }

  const s = p.spinner()

  s.start('Writing .env')
  writeEnv({
    VITE_MAP: map,
    VITE_UI: ui,
    VITE_JCDECAUX_CONTRACT: city,
    VITE_JCDECAUX_API_KEY: jcdecauxKey,
    ...(map === 'google' ? { VITE_GOOGLE_MAPS_KEY: mapKey } : {}),
    ...(map === 'mapbox' ? { VITE_MAPBOX_TOKEN: mapKey } : {}),
  })
  s.stop('.env written')

  const extraDeps = [...MAP_DEPS[map], ...UI_DEPS[ui]]
  s.start(extraDeps.length ? `Installing ${extraDeps.join(', ')}` : 'Installing dependencies')
  run(extraDeps.length ? `pnpm add ${extraDeps.join(' ')}` : 'pnpm install')
  s.stop('Dependencies installed')

  p.outro(`Done! Run \`task dev\` to start the app → https://localhost:5173`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
