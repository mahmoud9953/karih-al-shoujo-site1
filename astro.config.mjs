import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',                     // SSR (no getStaticPaths needed)
  adapter: vercel({ runtime: 'nodejs20.x' }), // <-- force Node 20 on Vercel
  integrations: [prefetch()],
  site: 'https://example.com' // optional
});
