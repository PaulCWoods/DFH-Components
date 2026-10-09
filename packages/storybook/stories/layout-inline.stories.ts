import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Layout Utilities/Inline & Responsive',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
**Inline Primitive (\`.inline\`)** provides a 1-dimensional horizontal row layout.
**Responsive Inline (\`.inline-responsive--*\`)** switches dynamically from a vertical stack on small container widths to a horizontal row when container width exceeds the breakpoint.
Defined in \`layout/inline.css\`.

### Available Classes:
- \`.inline\`: Always horizontal flex row with vertical centering.
- \`.inline--tight\`: Zero gap between items.
- \`.inline-responsive--{2xs|xs|sm|md|lg|xl|2xl}\`: Container-driven responsive inline row.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const DefaultInline: Story = {
  render: () => `
    <div class="inline" style="background: var(--surface-muted); padding: var(--spacing-16); border-radius: var(--radius);">
      <span class="badge badge--accent"><span>Badge 1</span></span>
      <span class="badge badge--success"><span>Badge 2</span></span>
      <span class="badge badge--warning"><span>Badge 3</span></span>
      <span class="badge badge--danger"><span>Badge 4</span></span>
    </div>
  `,
};

export const ResponsiveInline: Story = {
  render: () => `
    <div class="stack gap">
      <p class="font-size-sm color-muted">Resize your browser or container to see it switch from a vertical stack to a horizontal row at <strong>48em (768px)</strong>:</p>
      <div class="container-inline" style="border: 1px dashed var(--border-color-muted); padding: var(--spacing-16); border-radius: var(--radius);">
        <div class="inline-responsive inline-responsive--md" style="justify-content: space-between;">
          <div class="inline gap-sm">
            <div class="avatar"><span>DF</span></div>
            <div>
              <p class="font-weight-bold font-size-sm">Project Workspace</p>
              <p class="font-size-xs color-muted">Container-driven adaptive layout</p>
            </div>
          </div>
          <div class="inline gap-sm">
            <button type="button" class="button button--subtle button--sm"><span>Cancel</span></button>
            <button type="button" class="button button--primary button--sm"><span>Save Changes</span></button>
          </div>
        </div>
      </div>
    </div>
  `,
};
