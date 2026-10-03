import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Components/Field & Form',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const FieldWithRequiredIndicator: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 24rem;">
      <label for="req-field-demo" class="field__label">Full Legal Name</label>
      <input id="req-field-demo" type="text" class="input" required placeholder="Ada Lovelace" />
    </div>
  `,
};

export const FieldWithHintAndErrors: Story = {
  render: () => `
    <div class="field" style="max-inline-size: 24rem;">
      <label for="error-field-demo" class="field__label">Workspace Subdomain</label>
      <p id="error-field-hint" class="field__hint">Must be 4-32 characters and contain only lowercase letters and hyphens.</p>
      <input 
        id="error-field-demo" 
        type="text" 
        class="input" 
        value="My Invalid Workspace!" 
        aria-invalid="true" 
        aria-describedby="error-field-hint error-field-errors" 
      />
      <ul id="error-field-errors" class="field__errors" role="alert">
        <li>Subdomain cannot contain spaces.</li>
        <li>Subdomain cannot contain punctuation or capital letters.</li>
      </ul>
    </div>
  `,
};

export const FieldsetGroup: Story = {
  render: () => `
    <fieldset class="fieldset" style="max-inline-size: 26rem;">
      <legend class="legend">Contact Preferences</legend>
      <div class="choices">
        <label class="choice" for="contact-email">
          <input type="checkbox" id="contact-email" class="checkbox-input" checked />
          <span>Email notifications</span>
        </label>
        <label class="choice" for="contact-sms">
          <input type="checkbox" id="contact-sms" class="checkbox-input" />
          <span>SMS text alerts</span>
        </label>
      </div>
    </fieldset>
  `,
};

export const CompleteAccessibleForm: Story = {
  render: () => `
    <form class="form" style="max-inline-size: 32rem;" onsubmit="event.preventDefault();">
      <div class="field">
        <label for="form-name" class="field__label">Full Name</label>
        <input id="form-name" type="text" class="input" required placeholder="Ada Lovelace" />
      </div>

      <div class="field">
        <label for="form-email" class="field__label">Email Address</label>
        <p id="form-email-hint" class="field__hint">We will never share your personal information.</p>
        <input 
          id="form-email" 
          type="email" 
          class="input" 
          required 
          placeholder="ada@example.com" 
          aria-describedby="form-email-hint"
        />
      </div>

      <div class="field">
        <label for="form-role" class="field__label">Organizational Role</label>
        <select id="form-role" class="select" required>
          <option value="">Select your role...</option>
          <option value="accessibility-specialist">Digital Accessibility Specialist</option>
          <option value="design-engineer">Design System Engineer</option>
          <option value="product-owner">Product Owner</option>
        </select>
      </div>

      <div class="field">
        <label for="form-notes" class="field__label">Project Goals</label>
        <textarea 
          id="form-notes" 
          class="textarea" 
          placeholder="Briefly describe your team's compliance targets..."
          rows="3"
        ></textarea>
      </div>

      <fieldset class="fieldset">
        <legend class="legend">Agreement</legend>
        <label class="choice" for="form-terms">
          <input type="checkbox" id="form-terms" class="checkbox-input" required />
          <span>I certify that all provided details conform to WCAG 2.2 standards</span>
        </label>
      </fieldset>

      <div class="form__submission form__submission--right">
        <button type="reset" class="button button--subtle">
          <span>Cancel</span>
        </button>
        <button type="submit" class="button button--primary">
          <span>Submit Registration</span>
        </button>
      </div>
    </form>
  `,
};
