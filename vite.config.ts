/// <reference types="vitest" /> 
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { jsx } from '@emotion/react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], 
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true
  }
})
