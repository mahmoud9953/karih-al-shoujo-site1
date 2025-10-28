
import { defineConfig } from 'astro/config';
import prefetch from '@astrojs/prefetch';

export default defineConfig({
  integrations: [prefetch()],
  site: 'https://example.com', // TODO: replace with your domain (optional)
  build: {
    format: 'directory'
  }
});
