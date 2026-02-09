import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site is at .../professional-portfolio/ — base must match
export default defineConfig({
  plugins: [react()],
  base: '/professional-portfolio/',
})
