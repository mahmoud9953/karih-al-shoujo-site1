import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  output: 'server',          // SSR so no getStaticPaths needed
  adapter: vercel(),         // Vercel adapter (works with the package you installed)
  integrations: [prefetch()],
  site: 'https://example.com', // optional
});
