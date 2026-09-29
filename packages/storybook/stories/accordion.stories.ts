import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Accordion',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => `
    <div style="max-inline-size: 38rem; margin-inline: auto;">
      <details class="accordion">
        <summary>
          <span>What is Design For Humans?</span>
          <span class="accordion__icon" aria-hidden="true"></span>
        </summary>
        <p style="margin: 0 0 var(--spacing-0-5);">
          Design For Humans is a modern, accessible, token-driven UI component library built on native web platform standards. It relies on native browser primitives like &lt;dialog&gt;, &lt;details&gt;, and Popover API rather than heavy JavaScript polyfills.
        </p>
      </details>
    </div>
  `,
};

export const ExclusiveAccordionGroup: Story = {
  render: () => `
    <div style="max-inline-size: 38rem; margin-inline: auto;">
      <h3 style="font-family: var(--typography-font-family-sans); font-size: var(--heading-font-size); margin-block-end: var(--spacing-1); color: var(--foreground-base);">
        Frequently Asked Questions (Native Exclusive Group)
      </h3>
      <div class="accordion-group">
        <details class="accordion" name="faq-group" open>
          <summary>
            <span>How does the native exclusive group work?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </summary>
          <p style="margin: 0 0 var(--spacing-0-5);">
            By adding the standard <code>name="faq-group"</code> attribute to multiple <code>&lt;details&gt;</code> elements, the browser natively ensures only one disclosure item is open at a time—with zero JavaScript event listeners.
          </p>
        </details>

        <details class="accordion" name="faq-group">
          <summary>
            <span>How does smooth height animation work?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </summary>
          <p style="margin: 0 0 var(--spacing-0-5);">
            We use CSS <code>interpolate-size: allow-keywords;</code> combined with the <code>::details-content</code> pseudo-element. This allows CSS to smoothly transition <code>block-size: 0</code> to <code>block-size: auto</code> without measuring scrollHeight in JavaScript.
          </p>
        </details>

        <details class="accordion" name="faq-group">
          <summary>
            <span>Are these components accessible to screen readers?</span>
            <span class="accordion__icon" aria-hidden="true"></span>
          </summary>
          <p style="margin: 0 0 var(--spacing-0-5);">
            Yes! Native <code>&lt;summary&gt;</code> has native disclosure semantics built-in, toggling <code>expanded</code> states automatically in the accessibility tree and supporting standard Space and Enter keyboard interactions out of the box.
          </p>
        </details>
      </div>
    </div>
  `,
};
