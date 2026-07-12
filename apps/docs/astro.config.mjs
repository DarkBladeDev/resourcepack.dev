import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://darkbladedev.github.io',
  base: '/resourcepack.dev',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    starlight({
      title: 'ResourcePack.dev',
      customCss: ['./src/tailwind.css'],
      sidebar: [
        {
          label: 'Models',
          items: [{ autogenerate: { directory: 'models' } }]
        },
        {
          label: 'Blockstates',
          items: [{ autogenerate: { directory: 'blockstates' } }]
        },
        {
          label: 'Metadata',
          items: [{ autogenerate: { directory: 'pack-mcmeta' } }]
        }
      ],
    }),
  ],
});
