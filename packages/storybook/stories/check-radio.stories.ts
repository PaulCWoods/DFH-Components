import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Check & Radio',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const SingleCheckbox: Story = {
  render: () => `
    <label class="choice" for="terms-agree">
      <input type="checkbox" id="terms-agree" class="checkbox-input" required />
      <span>I agree to the Digital Accessibility standards and terms of use</span>
    </label>
  `,
};

export const CheckboxGroup: Story = {
  render: () => `
    <fieldset class="fieldset" style="max-inline-size: 26rem;">
      <legend class="legend">Accessible Audit Deliverables</legend>
      <div class="choices">
        <label class="choice" for="cb-axe">
          <input type="checkbox" id="cb-axe" class="checkbox-input" checked />
          <span>Automated axe-core compliance scanner</span>
        </label>
        <label class="choice" for="cb-screenreader">
          <input type="checkbox" id="cb-screenreader" class="checkbox-input" checked />
          <span>Screen reader validation (VoiceOver / NVDA)</span>
        </label>
        <label class="choice" for="cb-keyboard">
          <input type="checkbox" id="cb-keyboard" class="checkbox-input" checked />
          <span>Keyboard focus & navigation trapping review</span>
        </label>
        <label class="choice" for="cb-motion">
          <input type="checkbox" id="cb-motion" class="checkbox-input" />
          <span>Prefers-reduced-motion animation verification</span>
        </label>
      </div>
    </fieldset>
  `,
};

export const RadioGroup: Story = {
  render: () => `
    <fieldset class="fieldset" style="max-inline-size: 26rem;">
      <legend class="legend">Figma Synchronization Strategy</legend>
      <div class="choices">
        <label class="choice" for="radio-unified">
          <input type="radio" id="radio-unified" name="figma-strategy" class="radio-input" checked />
          <span>Unified ($0 Free Tier, Single Collection)</span>
        </label>
        <label class="choice" for="radio-modular">
          <input type="radio" id="radio-modular" name="figma-strategy" class="radio-input" />
          <span>Modular Enterprise (01 Color, 02 Viewport, 03 Structure)</span>
        </label>
        <label class="choice" for="radio-studio">
          <input type="radio" id="radio-studio" name="figma-strategy" class="radio-input" />
          <span>Tokens Studio (W3C DTCG Format)</span>
        </label>
      </div>
    </fieldset>
  `,
};

export const HorizontalChoices: Story = {
  render: () => `
    <fieldset class="fieldset">
      <legend class="legend">Notification Frequency</legend>
      <div class="choices choices--inline">
        <label class="choice" for="freq-realtime">
          <input type="radio" id="freq-realtime" name="freq" class="radio-input" checked />
          <span>Real-time</span>
        </label>
        <label class="choice" for="freq-daily">
          <input type="radio" id="freq-daily" name="freq" class="radio-input" />
          <span>Daily Digest</span>
        </label>
        <label class="choice" for="freq-weekly">
          <input type="radio" id="freq-weekly" name="freq" class="radio-input" />
          <span>Weekly Summary</span>
        </label>
      </div>
    </fieldset>
  `,
};

export const DisabledChoices: Story = {
  render: () => `
    <fieldset class="fieldset" style="max-inline-size: 26rem;">
      <legend class="legend">Experimental Feature Flags</legend>
      <div class="choices">
        <label class="choice" for="cb-active">
          <input type="checkbox" id="cb-active" class="checkbox-input" checked />
          <span>CSS Anchor Positioning (Active)</span>
        </label>
        <label class="choice" for="cb-disabled-checked">
          <input type="checkbox" id="cb-disabled-checked" class="checkbox-input" checked disabled />
          <span>Interpolate Size (Managed by browser baseline)</span>
        </label>
        <label class="choice" for="cb-disabled-unchecked">
          <input type="checkbox" id="cb-disabled-unchecked" class="checkbox-input" disabled />
          <span>Web Bluetooth Bridge (Disabled by administrator)</span>
        </label>
      </div>
    </fieldset>
  `,
};
