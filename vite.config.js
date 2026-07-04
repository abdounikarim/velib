import { defineConfig } from 'vite'
import fs from 'fs'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'

  const serverConfig = {
    host: true,
    port: 5173,
  }

  if (isDev && fs.existsSync('certs/tls.key') && fs.existsSync('certs/tls.pem')) {
    serverConfig.https = {
      key: fs.readFileSync('certs/tls.key'),
      cert: fs.readFileSync('certs/tls.pem'),
    }
  }

  return {
    server: serverConfig,
    preview: {
      port: 4173,
    },
  }
})
