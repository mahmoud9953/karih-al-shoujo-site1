import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',      // enable SSR so dynamic routes don't need getStaticPaths
  adapter: vercel(),     // Vercel adapter (v7.x works with Astro v4)
  integrations: [prefetch()],
  site: 'https://example.com' // optional
});
