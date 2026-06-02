import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/songs': {
        target: 'https://www.jiosaavn.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => {
          const incomingUrl = new URL(path, 'http://localhost')
          const language = incomingUrl.searchParams.get('language') || ''
          const params = new URLSearchParams({
            __call: 'content.getAlbums',
            api_version: '4',
            _format: 'json',
            _marker: '0',
            n: '50',
            p: '1',
            ctx: 'web6dot0',
            languages: language,
          })
          return `/api.php?${params.toString()}`
        },
      },
    },
  },
})
