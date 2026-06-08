import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Use a base path on GitHub Pages (served from /design-catalogue/),
// but keep root '/' for local dev and other hosts (e.g. Netlify).
const isGhPages = process.env.GITHUB_PAGES === 'true';

// Serve the Netlify Function locally during `vite` dev so the GitHub feed
// shows live data instead of falling back to the seeded mock. Netlify runs
// this function in production at the same `/api/...` path.
function netlifyFunctionsDev() {
  return {
    name: 'netlify-functions-dev',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url || !req.url.startsWith('/api/github-contributions')) return next();
        try {
          const mod = await server.ssrLoadModule('/netlify/functions/github-contributions.mjs');
          const response = await mod.default(new Request(`http://localhost${req.url}`), {});
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(await response.text());
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('content-type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  base: isGhPages ? '/design-catalogue/' : '/',
  plugins: [react(), netlifyFunctionsDev()],
});
