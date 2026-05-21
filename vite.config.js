import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a base path on GitHub Pages (served from /design-catalogue/),
// but keep root '/' for local dev and other hosts (e.g. Netlify).
const isGhPages = process.env.GITHUB_PAGES === 'true';

export default defineConfig({
  base: isGhPages ? '/design-catalogue/' : '/',
  plugins: [react()],
});
