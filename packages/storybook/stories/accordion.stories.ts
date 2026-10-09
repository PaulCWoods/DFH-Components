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
    <div class="wrapper wrapper--lg">
      <details class="accordion">
        <summary>What is Design For Humans?</summary>
        <p class="text">
          Design For Humans is a modern, accessible, token-driven UI component library built on native web platform standards. It relies on native browser primitives like &lt;dialog&gt;, &lt;details&gt;, and Popover API rather than heavy JavaScript polyfills.
        </p>
      </details>
    </div>
  `,
};

export const ExclusiveAccordionGroup: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <h3 class="heading" style="margin-block-end: var(--spacing-16);">
        Frequently Asked Questions (Native Exclusive Group)
      </h3>
      <div class="accordion-group">
        <details class="accordion" name="faq-group" open>
          <summary>How does the native exclusive group work?</summary>
          <p class="text">
            By adding the standard <code>name="faq-group"</code> attribute to multiple <code>&lt;details&gt;</code> elements, the browser natively ensures only one disclosure item is open at a time—with zero JavaScript event listeners.
          </p>
        </details>

        <details class="accordion" name="faq-group">
          <summary>How does smooth height animation work?</summary>
          <p class="text">
            We use CSS <code>interpolate-size: allow-keywords;</code> combined with the <code>::details-content</code> pseudo-element. This allows CSS to smoothly transition <code>block-size: 0</code> to <code>block-size: auto</code> without measuring scrollHeight in JavaScript.
          </p>
        </details>

        <details class="accordion" name="faq-group">
          <summary>Are these components accessible to screen readers?</summary>
          <p class="text">
            Yes! Native <code>&lt;summary&gt;</code> has native disclosure semantics built-in, toggling <code>expanded</code> states automatically in the accessibility tree and supporting standard Space and Enter keyboard interactions out of the box.
          </p>
        </details>
      </div>
    </div>
  `,
};

export const WithoutIcons: Story = {
  render: () => `
    <div class="wrapper wrapper--lg">
      <h3 class="heading" style="margin-block-end: var(--spacing-16);">
        Accordion Without Icons (Opt-Out)
      </h3>
      <div class="accordion-group accordion-group--no-icons">
        <details class="accordion" name="no-icon-group" open>
          <summary>Section without icon</summary>
          <p class="text">
            Icon suppressed via <code>.accordion-group--no-icons</code> or <code>.accordion--no-icon</code>.
          </p>
        </details>
        <details class="accordion" name="no-icon-group">
          <summary>Another clean section</summary>
          <p class="text">
            Content here.
          </p>
        </details>
      </div>
    </div>
  `,
};

