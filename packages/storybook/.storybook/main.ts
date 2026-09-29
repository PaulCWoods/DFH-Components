// packages/storybook/.storybook/main.ts
import type { StorybookConfig } from '@storybook/html-vite';

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx|mdx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y', // 👈 Automated WCAG accessibility audit panel
  ],
  framework: {
    name: '@storybook/html-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
};

export default config;