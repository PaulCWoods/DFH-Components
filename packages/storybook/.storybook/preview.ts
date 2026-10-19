// packages/storybook/.storybook/preview.ts
import type { Preview } from '@storybook/html';

// 👇 Import tokens and component styles
import '../../css/src/index.css';
// 👇 Import Storybook demo harness utilities
import './demo.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      name: 'Color Scheme',
      description: 'Global color scheme for components (native light-dark)',
      defaultValue: 'auto',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'auto', icon: 'browser', title: 'System (Auto)' },
          { value: 'light', icon: 'sun', title: 'Light Mode' },
          { value: 'dark', icon: 'moon', title: 'Dark Mode' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    (story, context) => {
      const theme = context.globals.theme || 'auto';
      const root = document.documentElement;

      if (theme === 'dark') {
        root.style.colorScheme = 'dark';
      } else if (theme === 'light') {
        root.style.colorScheme = 'light';
      } else {
        root.style.colorScheme = 'light dark';
      }

      return story();
    },
  ],
  parameters: {
    backgrounds: {
      disable: true,
    },
    options: {
      storySort: {
        method: 'alphabetical',
        order: ['Tokens', 'Atoms', 'Molecules', 'Organisms', 'Layout', 'Utilities', 'Recipes', '*'],
        locales: 'en-US',
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // 👇 Global Accessibility Settings
    a11y: {
      // Optional: Set test behavior ('error', 'todo', or 'off') if using Storybook's test runner
      test: 'error', 
      config: {
        rules: [
          // Example: fine-tune or customize specific axe rules if needed
          {
            id: 'color-contrast',
            enabled: true,
          },
        ],
      },
    },
  },
};

export default preview;