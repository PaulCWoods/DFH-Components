import type { Meta, StoryObj } from '@storybook/html';

interface DeckArgs {
  channel: string;
  title: string;
  artist: string;
  status: 'online' | 'away' | 'busy' | 'offline';
  statusLabel: string;
  onAir: boolean;
  cue: boolean;
  compact: boolean;
  horizontal: boolean;
  bordered: boolean;
  translucent: boolean;
  hasVinyl: boolean;
  isPlaying: boolean;
  elapsedSeconds: number;
  totalSeconds: number;
  volume: number;
  vuLeft: number;
  vuRight: number;
  tag: string;
}

/**
 * Format seconds to mm:ss
 */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

const meta: Meta<DeckArgs> = {
  title: 'Organisms/Deck',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
### Developer & Designer Notes: Deck Primitive

The **Deck** (\`.deck\`) primitive styles interactive audio and media playback decks, broadcast consoles, DAW channel strips, turntables, and streaming media docks.
It orchestrates track metadata, artwork, seek scrubbing, transport toolbars, level faders, and stereo VU peak monitoring within a native **Container Query** boundary (\`container-name: deck\`).

Directly aligned with Design For Humans architecture (\`deck.css\`, \`_deck.scss\`, and \`_component-library.twig\`).

---

#### 1. Canonical Semantic Markup Signatures
AI agents and developers MUST strictly use the following semantic patterns:

\`\`\`html
<!-- 1. Standard On-Air Broadcast Deck -->
<section class="deck deck--on-air" aria-label="Deck A • On Air">
  <div class="deck__content">
    
    <!-- Deck Header (Composed with .micro-heading) -->
    <header class="deck__header">
      <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
        <span class="status status--success status--plain" aria-hidden="true"></span>
        <h2 class="deck__channel micro-heading">Deck A • On Air</h2>
      </div>
      <div class="deck__header-actions inline align-items-center gap-xs">
        <button type="button" class="button button--subtle button--icon button--sm" aria-label="Deck options">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
        </button>
      </div>
    </header>

    <!-- Deck Body -->
    <div class="deck__body">
      
      <!-- Track Identity & Artwork (Composed with .inline & .lockup) -->
      <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
          </div>
          <span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>
        </div>
        <div class="deck__identity lockup">
          <div class="deck__tags">
            <span class="chip chip--subtle chip--sm"><span class="chip__text">Heavy Rotation</span></span>
          </div>
          <h3 class="deck__title small-heading">Celestial Horizon</h3>
          <p class="deck__artist small-text">Aura & Tycho — Continuum LP</p>
        </div>
      </div>

      <!-- Scrubber & Timeline -->
      <div class="deck__timeline" role="region" aria-label="Playback progress">
        <div class="deck__time">
          <span class="deck__elapsed">02:14</span>
          <span class="deck__remaining">-01:38</span>
        </div>
        <input 
          type="range" 
          class="range range--sm deck__scrubber" 
          min="0" 
          max="232" 
          value="134" 
          style="--value: 58%;"
          aria-label="Track seek scrubber"
        />
      </div>

      <!-- Playback Transport Controls (Composed with .button-group.button-group--center) -->
      <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Playback transport">
        <button type="button" class="button button--subtle button--icon deck__cue" aria-label="Cue to start">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
        </button>
        <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause playback">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg>
        </button>
        <button type="button" class="button button--subtle button--icon deck__skip" aria-label="Skip to next track">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
        </button>
      </div>

      <!-- Volume Output & Mute -->
      <div class="deck__volume">
        <div class="deck__volume-header">
          <label class="deck__volume-label" for="deck-vol">Output Level</label>
          <output class="deck__volume-output" for="deck-vol">85%</output>
        </div>
        <div class="deck__volume-controls inline align-items-center">
          <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Toggle mute">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
          </button>
          <input type="range" class="range range--sm deck__fader" id="deck-vol" min="0" max="100" value="85" style="--value: 85%;" aria-label="Volume level" />
        </div>
      </div>

    </div>

    <!-- Stereo VU Peak Meters -->
    <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
      <div class="deck__meters-header">
        <span class="deck__meters-title">Stereo Peak (dBFs)</span>
        <span class="status status--success status--sm"><span class="status__text">-1.8 dB Headroom</span></span>
      </div>
      <div class="deck__channel-meter inline align-items-center">
        <span class="deck__meter-ch">L</span>
        <meter class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
        <span class="deck__meter-val">-2.1 dB</span>
      </div>
      <div class="deck__channel-meter inline align-items-center">
        <span class="deck__meter-ch">R</span>
        <meter class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
        <span class="deck__meter-val">-2.8 dB</span>
      </div>
    </div>

  </div>
</section>
\`\`\`

---

#### 2. WCAG 2.2 Conformance Matrix

| Criterion | Level | Implementation Strategy |
| :--- | :---: | :--- |
| **2.5.5 Target Size (Enhanced)** | **AAA** | Primary \`.deck__play\` action provides a prominent touch target (>= 48×48px, minimum \`--_deck-play-size: 3rem\`). |
| **2.5.8 Target Size (Minimum)** | **AA** | Secondary buttons (\`.deck__cue\`, \`.deck__skip\`, \`.deck__mute\`) maintain >= 24×24px with 4px+ target spacing. |
| **1.4.3 Contrast (Minimum)** | **AA / AAA** | High-contrast token ladder (\`CanvasText\` / \`--foreground\`, \`--foreground-muted\`) achieves >= 4.5:1 text contrast. |
| **1.4.11 Non-Text Contrast** | **AA** | \`.deck--on-air\` perimeter glow and solid border meet 3:1 graphical contrast against adjacent surfaces; enhanced under \`prefers-contrast: more\`. |
| **2.4.7 Focus Visible** | **AA** | High-contrast focus ring with 2px offset ensures keyboard visibility across all buttons and range inputs. |
| **4.1.2 Name, Role, Value** | **A** | Toolbar uses \`role="toolbar"\`, scrubber uses \`<input type="range">\` with valid min/max/value/aria-label, and meters use semantic \`<meter>\`. |
| **2.3.3 Animation from Interactions** | **AAA** | Rotating disc animations (\`.deck__art--vinyl.is-spinning\`) are disabled automatically under \`@media (prefers-reduced-motion: reduce)\`. |

---

#### 3. CSS Custom Property Contract Table

| Custom Property | Fallback | Intended Purpose |
| :--- | :--- | :--- |
| \`--deck-bg\` | \`var(--surface-card, Canvas)\` | Main deck container surface fill |
| \`--deck-border-color\` | \`var(--panel-border-color, currentColor)\` | Perimeter border color |
| \`--deck-border-width\` | \`var(--panel-border-width, 1px)\` | Perimeter border stroke thickness |
| \`--deck-radius\` | \`var(--panel-radius, 0.5rem)\` | Outer container corner rounding |
| \`--deck-padding\` | \`var(--spacing-16, 1rem)\` | Container internal padding |
| \`--deck-gap\` | \`var(--spacing-12, 0.75rem)\` | Space between deck regions |
| \`--deck-art-size\` | \`var(--spacing-80, 5rem)\` | Album/media art square dimension |
| \`--deck-art-radius\` | \`var(--radius-md, 0.375rem)\` | Artwork corner radius |
| \`--deck-play-size\` | \`var(--spacing-48, 3rem)\` | Play/pause button diameter (WCAG 2.5.5) |
| \`--deck-on-air-border\`| \`var(--foreground-accent, #008076)\`| Active on-air border & glow accent |
| \`--deck-transition\` | \`var(--duration-sm, 150ms)\` | State transition timing |
        `,
      },
    },
  },
  args: {
    channel: 'Deck A • On Air',
    title: 'Celestial Horizon',
    artist: 'Aura & Tycho — Continuum LP',
    status: 'online',
    statusLabel: 'On Air',
    onAir: true,
    cue: false,
    compact: false,
    horizontal: false,
    bordered: true,
    translucent: false,
    hasVinyl: false,
    isPlaying: true,
    elapsedSeconds: 134,
    totalSeconds: 232,
    volume: 85,
    vuLeft: 82,
    vuRight: 79,
    tag: 'Heavy Rotation',
  },
  argTypes: {
    channel: {
      control: 'text',
      description: 'Deck channel identifier heading',
    },
    title: {
      control: 'text',
      description: 'Current track title',
    },
    artist: {
      control: 'text',
      description: 'Artist and album name',
    },
    status: {
      control: 'select',
      options: ['online', 'away', 'busy', 'offline'],
      description: 'Status indicator dot state',
    },
    onAir: {
      control: 'boolean',
      description: 'Applies active on-air accent glow (.deck--on-air)',
    },
    cue: {
      control: 'boolean',
      description: 'Applies headphone cue/audition mode (.deck--cue)',
    },
    compact: {
      control: 'boolean',
      description: 'Applies compact density (.deck--compact)',
    },
    horizontal: {
      control: 'boolean',
      description: 'Applies horizontal dock layout (.deck--horizontal)',
    },
    bordered: {
      control: 'boolean',
      description: 'Applies explicit perimeter border (.deck--bordered)',
    },
    translucent: {
      control: 'boolean',
      description: 'Applies frosted glass backdrop filter (.deck--translucent)',
    },
    hasVinyl: {
      control: 'boolean',
      description: 'Renders animated vinyl disc art (.deck__art--vinyl)',
    },
    isPlaying: {
      control: 'boolean',
      description: 'Toggle play/pause state',
    },
    volume: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Master deck output volume',
    },
    vuLeft: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Left channel VU level',
    },
    vuRight: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Right channel VU level',
    },
    tag: {
      control: 'text',
      description: 'Rotation tag badge text',
    },
  },
};

export default meta;
type Story = StoryObj<DeckArgs>;

/**
 * 1. Playground (Interactive Sandbox)
 */
export const Playground: Story = {
  render: (args) => {
    const elapsed = formatTime(args.elapsedSeconds);
    const remaining = `-${formatTime(Math.max(0, args.totalSeconds - args.elapsedSeconds))}`;
    const scrubberPercent = Math.round((args.elapsedSeconds / args.totalSeconds) * 100);

    const classes = [
      'deck',
      args.onAir && 'deck--on-air',
      args.cue && 'deck--cue',
      args.compact && 'deck--compact',
      args.horizontal && 'deck--horizontal',
      args.bordered && 'deck--bordered',
      args.translucent && 'deck--translucent',
    ]
      .filter(Boolean)
      .join(' ');

    const playIcon = args.isPlaying ? 'Pause' : 'Play';
    const volIcon = args.volume === 0 ? 'Muted' : args.volume > 50 ? 'VolumeOn' : 'VolumeLow';
    const vinylClass = args.hasVinyl ? `deck__art--vinyl ${args.isPlaying ? 'is-spinning' : ''}` : '';

    if (args.horizontal) {
      return `
        <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
          <div style="inline-size: 100%; max-inline-size: 64rem; margin-inline: auto;">
            <section class="${classes}" aria-label="${args.channel}">
              <div class="deck__content">
                <div class="deck__body">
                  
                  <!-- Left: Track & Art (Composed with .inline & .lockup) -->
                  <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                    <div class="deck__art-frame" aria-hidden="true">
                      <div class="deck__art ${vinylClass}">
                        ${args.hasVinyl
          ? ''
          : '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>'
        }
                      </div>
                      ${!args.hasVinyl
          ? '<span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>'
          : ''
        }
                    </div>
                    <div class="deck__identity lockup">
                      <div class="deck__tags">
                        <span class="status status--plain" aria-hidden="true"></span>
                        <span class="chip chip--subtle chip--sm"><span class="chip__text">${args.tag}</span></span>
                      </div>
                      <h3 class="deck__title small-heading">${args.title}</h3>
                      <p class="deck__artist small-text">${args.artist}</p>
                    </div>
                  </div>

                  <!-- Center: Timeline & Transport -->
                  <div class="deck__timeline-transport-group">
                    <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Playback transport">
                      <button type="button" class="button button--subtle button--icon button--sm deck__cue" aria-label="Cue to start">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
                      </button>
                      <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="${args.isPlaying ? 'Pause playback' : 'Start playback'}">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${playIcon}"/></svg>
                      </button>
                      <button type="button" class="button button--subtle button--icon button--sm deck__skip" aria-label="Skip to next track">
                        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
                      </button>
                    </div>

                    <div class="deck__timeline" role="region" aria-label="Track progress">
                      <div class="deck__time">
                        <span class="deck__elapsed">${elapsed}</span>
                        <span class="deck__remaining">${remaining}</span>
                      </div>
                      <input 
                        type="range" 
                        class="range range--sm deck__scrubber" 
                        min="0" 
                        max="${args.totalSeconds}" 
                        value="${args.elapsedSeconds}" 
                        style="--value: ${scrubberPercent}%;"
                        aria-label="Track seek scrubber"
                      />
                    </div>
                  </div>

                  <!-- Right: Volume & Meters -->
                  <div class="deck__volume-meters-group">
                    <div class="deck__volume">
                      <div class="deck__volume-controls inline align-items-center">
                        <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Toggle mute">
                          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${volIcon}"/></svg>
                        </button>
                        <input 
                          type="range" 
                          class="range range--sm deck__fader" 
                          min="0" 
                          max="100" 
                          value="${args.volume}" 
                          style="--value: ${args.volume}%;"
                          aria-label="Volume level"
                        />
                      </div>
                    </div>

                    <div class="deck__meters" role="region" aria-label="Stereo VU meters" style="inline-size: 8rem;">
                      <div class="deck__channel-meter inline align-items-center">
                        <span class="deck__meter-ch">L</span>
                        <meter class="meter meter--sm deck__meter-bar" value="${args.vuLeft}" min="0" max="100" low="65" high="90" optimum="50">${args.vuLeft}%</meter>
                      </div>
                      <div class="deck__channel-meter inline align-items-center">
                        <span class="deck__meter-ch">R</span>
                        <meter class="meter meter--sm deck__meter-bar" value="${args.vuRight}" min="0" max="100" low="65" high="90" optimum="50">${args.vuRight}%</meter>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </div>
        </div>
      `;
    }

    return `
      <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
        <div style="inline-size: 100%; max-inline-size: 26rem; margin-inline: auto;">
          <section class="${classes}" aria-label="${args.channel}">
            <div class="deck__content">
              
              <!-- Deck Header -->
              <header class="deck__header">
                <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                  <span class="status status--plain" aria-hidden="true"></span>
                  <h2 class="deck__channel micro-heading">${args.channel}</h2>
                </div>
                <div class="deck__header-actions inline align-items-center gap-xs">
                  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Deck options">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                  </button>
                </div>
              </header>

              <!-- Deck Body -->
              <div class="deck__body">
                
                <!-- Track Presentation (Composed with .inline & .lockup) -->
                <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                  <div class="deck__art-frame" aria-hidden="true">
                    <div class="deck__art ${vinylClass}">
                      ${args.hasVinyl
          ? ''
          : '<svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>'
        }
                    </div>
                    ${!args.hasVinyl
          ? '<span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>'
          : ''
        }
                  </div>
                  <div class="deck__identity lockup">
                    <div class="deck__tags">
                      <span class="chip chip--subtle chip--sm"><span class="chip__text">${args.tag}</span></span>
                    </div>
                    <h3 class="deck__title small-heading">${args.title}</h3>
                    <p class="deck__artist small-text">${args.artist}</p>
                  </div>
                </div>

                <!-- Timeline Scrubber -->
                <div class="deck__timeline" role="region" aria-label="Track progress">
                  <div class="deck__time">
                    <span class="deck__elapsed">${elapsed}</span>
                    <span class="deck__remaining">${remaining}</span>
                  </div>
                  <input 
                    type="range" 
                    class="range range--sm deck__scrubber" 
                    min="0" 
                    max="${args.totalSeconds}" 
                    value="${args.elapsedSeconds}" 
                    style="--value: ${scrubberPercent}%;"
                    aria-label="Track seek scrubber"
                  />
                </div>

                <!-- Playback Transport (Composed with .button-group.button-group--center) -->
                <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Playback transport">
                  <button type="button" class="button button--subtle button--icon deck__cue" aria-label="Cue to start">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
                  </button>
                  <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="${args.isPlaying ? 'Pause playback' : 'Start playback'}">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${playIcon}"/></svg>
                  </button>
                  <button type="button" class="button button--subtle button--icon deck__skip" aria-label="Skip to next track">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
                  </button>
                </div>

                <hr class="divider">

                <!-- Output Level -->
                <div class="deck__volume">
                  <div class="deck__volume-header">
                    <label class="deck__volume-label" for="deck-vol-field">Deck Output Level</label>
                    <output class="deck__volume-output" for="deck-vol-field">${args.volume}%</output>
                  </div>
                  <div class="deck__volume-controls inline align-items-center">
                    <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Toggle mute">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#${volIcon}"/></svg>
                    </button>
                    <input 
                      type="range" 
                      class="range range--sm deck__fader" 
                      id="deck-vol-field" 
                      min="0" 
                      max="100" 
                      value="${args.volume}" 
                      style="--value: ${args.volume}%;"
                      aria-label="Volume level"
                    />
                  </div>
                </div>

              </div>

              <!-- Stereo VU Meters -->
              <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
                <div class="deck__meters-header">
                  <span class="deck__meters-title">Stereo Peak (dBFs)</span>
                  <span class="status status--success status--sm"><span class="status__text">-1.8 dB Headroom</span></span>
                </div>
                <div class="deck__channel-meter inline align-items-center">
                  <span class="deck__meter-ch">L</span>
                  <meter class="meter meter--sm deck__meter-bar" value="${args.vuLeft}" min="0" max="100" low="65" high="90" optimum="50">${args.vuLeft}%</meter>
                  <span class="deck__meter-val">-2.1 dB</span>
                </div>
                <div class="deck__channel-meter inline align-items-center">
                  <span class="deck__meter-ch">R</span>
                  <meter class="meter meter--sm deck__meter-bar" value="${args.vuRight}" min="0" max="100" low="65" high="90" optimum="50">${args.vuRight}%</meter>
                  <span class="deck__meter-val">-2.8 dB</span>
                </div>
              </div>

            </div>
          </section>
        </div>
      </div>
    `;
  },
};

/**
 * 2. OnAirDeck (Primary Broadcast State)
 * Standard on-air master playback deck featuring live status ring, track metadata,
 * seek scrubber, volume control, and dual stereo VU peak meters.
 */
export const OnAirDeck: Story = {
  render: () => `
    <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
      <div style="inline-size: 100%; max-inline-size: 26rem; margin-inline: auto;">
        <section class="deck deck--on-air deck--bordered" aria-label="Deck A • On Air">
          <div class="deck__content">
            
            <header class="deck__header">
              <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                <span class="status status--success status--plain" aria-hidden="true"></span>
                <h2 class="deck__channel micro-heading">Deck A • On Air</h2>
              </div>
              <div class="deck__header-actions inline align-items-center gap-xs">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Inspect Track Metadata and ISRC">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
                </button>
              </div>
            </header>

            <div class="deck__body">
              
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div 
                    class="deck__art" 
                    style="background: linear-gradient(135deg, var(--foreground-accent), #1a1a2e); color: #ffffff;"
                  >
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                  </div>
                  <span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>
                </div>
                <div class="deck__identity lockup">
                  <div class="deck__tags">
                    <span class="chip chip--subtle chip--sm"><span class="chip__text">Heavy Rotation</span></span>
                  </div>
                  <h3 class="deck__title small-heading">Celestial Horizon</h3>
                  <p class="deck__artist small-text">Aura & Tycho — Continuum LP</p>
                </div>
              </div>

              <div class="deck__timeline" role="region" aria-label="Current Track Playback Scrubber">
                <div class="deck__time">
                  <span class="deck__elapsed">02:14</span>
                  <span class="deck__remaining">-01:38</span>
                </div>
                <input 
                  type="range" 
                  class="range range--sm deck__scrubber" 
                  min="0" 
                  max="232" 
                  value="134" 
                  style="--value: 58%;" 
                  aria-label="Track seek scrubber"
                />
              </div>

              <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Playback transport controls">
                <button type="button" class="button button--subtle button--icon deck__cue" aria-label="Cue to start">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
                </button>
                <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause playback">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg>
                </button>
                <button type="button" class="button button--subtle button--icon deck__skip" aria-label="Skip to next queued track">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
                </button>
              </div>

              <hr class="divider">

              <div class="deck__volume">
                <div class="deck__volume-header">
                  <label for="deck-a-volume" class="deck__volume-label">Deck Output Level</label>
                  <output for="deck-a-volume" class="deck__volume-output">85%</output>
                </div>
                <div class="deck__volume-controls inline align-items-center">
                  <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Toggle Deck Mute">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
                  </button>
                  <input 
                    type="range" 
                    class="range range--sm deck__fader" 
                    id="deck-a-volume" 
                    min="0" 
                    max="100" 
                    value="85" 
                    style="--value: 85%;" 
                    aria-label="Deck output volume" 
                  />
                </div>
              </div>

            </div>

            <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
              <div class="deck__meters-header">
                <span class="deck__meters-title">Stereo Peak (dBFs)</span>
                <span class="status status--success status--sm"><span class="status__text">-1.8 dB Headroom</span></span>
              </div>
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">L</span>
                <meter class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
                <span class="deck__meter-val">-2.1 dB</span>
              </div>
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">R</span>
                <meter class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
                <span class="deck__meter-val">-2.8 dB</span>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  `,
};

/**
 * 3. DualDeckConsole (Broadcast Split Studio Setup)
 * Deck A (Active On Air) paired with Deck B (Cued / In Audition Preview)
 * demonstrating realistic dual-deck DJ / broadcast workflow.
 */
export const DualDeckConsole: Story = {
  render: () => `
    <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
      <div class="split split--sm" style="--split-sidebar-width: 50%; gap: var(--spacing-16); inline-size: 100%; max-inline-size: 56rem; margin-inline: auto;">
        
        <!-- Deck A: On Air -->
        <section class="deck deck--on-air deck--bordered" aria-label="Deck A • On Air">
          <div class="deck__content">
            <header class="deck__header">
              <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                <span class="status status--success status--plain" aria-hidden="true"></span>
                <h2 class="deck__channel micro-heading">Deck A • On Air</h2>
              </div>
              <span class="status status--accent status--sm"><span class="status__text">ON AIR</span></span>
            </header>

            <div class="deck__body">
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div class="deck__art" style="background: linear-gradient(135deg, var(--foreground-accent), #1a1a2e); color: #fff;">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                  </div>
                </div>
                <div class="deck__identity lockup">
                  <h3 class="deck__title small-heading">Celestial Horizon</h3>
                  <p class="deck__artist small-text">Aura & Tycho</p>
                </div>
              </div>

              <div class="deck__timeline" role="region" aria-label="Deck A progress">
                <div class="deck__time">
                  <span class="deck__elapsed">03:12</span>
                  <span class="deck__remaining">-00:40</span>
                </div>
                <input type="range" class="range range--sm deck__scrubber" min="0" max="232" value="192" style="--value: 82%;" aria-label="Deck A seek" />
              </div>

              <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Deck A transport">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Cue"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
                <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Skip"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg></button>
              </div>

              <div class="deck__volume">
                <div class="deck__volume-controls inline align-items-center">
                  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Mute"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg></button>
                  <input type="range" class="range range--sm deck__fader" value="90" style="--value: 90%;" aria-label="Deck A Volume" />
                </div>
              </div>
            </div>

            <div class="deck__meters">
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">L</span>
                <meter class="meter meter--sm deck__meter-bar" value="84" min="0" max="100" low="65" high="90" optimum="50">84%</meter>
                <span class="deck__meter-val">-1.6 dB</span>
              </div>
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">R</span>
                <meter class="meter meter--sm deck__meter-bar" value="81" min="0" max="100" low="65" high="90" optimum="50">81%</meter>
                <span class="deck__meter-val">-2.3 dB</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Deck B: Cued Preview -->
        <section class="deck deck--cue deck--bordered" aria-label="Deck B • Headphone Cue">
          <div class="deck__content">
            <header class="deck__header">
              <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                <span class="status status--warning status--plain" aria-hidden="true"></span>
                <h2 class="deck__channel micro-heading">Deck B • Headphone Cue</h2>
              </div>
              <span class="status status--warning status--sm"><span class="status__text">CUED</span></span>
            </header>

            <div class="deck__body">
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div class="deck__art" style="background: linear-gradient(135deg, #e65100, #263238); color: #fff;">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                  </div>
                </div>
                <div class="deck__identity lockup">
                  <h3 class="deck__title small-heading">Solaris Drift</h3>
                  <p class="deck__artist small-text">Kiasmos & Olafur Arnalds</p>
                </div>
              </div>

              <div class="deck__timeline" role="region" aria-label="Deck B progress">
                <div class="deck__time">
                  <span class="deck__elapsed">00:00</span>
                  <span class="deck__remaining">-04:15</span>
                </div>
                <input type="range" class="range range--sm deck__scrubber" min="0" max="255" value="0" style="--value: 0%;" aria-label="Deck B seek" />
              </div>

              <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Deck B transport">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Cue"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
                <button type="button" class="button button--round deck__play" aria-label="Play"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Play"/></svg></button>
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Skip"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg></button>
              </div>

              <div class="deck__volume">
                <div class="deck__volume-controls inline align-items-center">
                  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Unmute"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOff"/></svg></button>
                  <input type="range" class="range range--sm deck__fader" value="0" style="--value: 0%;" aria-label="Deck B Volume" />
                </div>
              </div>
            </div>

            <div class="deck__meters">
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">L</span>
                <meter class="meter meter--sm deck__meter-bar" value="0" min="0" max="100" low="65" high="90" optimum="50">0%</meter>
                <span class="deck__meter-val">-∞ dB</span>
              </div>
              <div class="deck__channel-meter inline align-items-center">
                <span class="deck__meter-ch">R</span>
                <meter class="meter meter--sm deck__meter-bar" value="0" min="0" max="100" low="65" high="90" optimum="50">0%</meter>
                <span class="deck__meter-val">-∞ dB</span>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  `,
};

/**
 * 4. CompactDeck (Dense Multi-Deck & Cart Player)
 * High-density deck modifier (\`.deck--compact\`) optimized for 4-deck consoles,
 * cart wall players, and responsive split sidebars.
 */
export const CompactDeck: Story = {
  render: () => `
    <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
      <div style="inline-size: 100%; max-inline-size: 20rem; margin-inline: auto;">
        <section class="deck deck--compact deck--bordered deck--on-air" aria-label="Aux Cart Deck 1">
          <div class="deck__content">
            
            <header class="deck__header">
              <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                <span class="status status--success status--plain" aria-hidden="true"></span>
                <h3 class="deck__channel micro-heading">Cart 01 • Stager</h3>
              </div>
              <span class="chip chip--subtle chip--sm"><span class="chip__text">00:15</span></span>
            </header>

            <div class="deck__body">
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div class="deck__art" style="background: var(--surface-darker, #111); color: #fff;">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg>
                  </div>
                </div>
                <div class="deck__identity lockup">
                  <h4 class="deck__title small-heading">Station Top-of-Hour ID</h4>
                  <p class="deck__artist small-text">DFH Radio Network</p>
                </div>
              </div>

              <div class="deck__timeline" role="region" aria-label="Stager progress">
                <input type="range" class="range range--sm deck__scrubber" min="0" max="15" value="6" style="--value: 40%;" aria-label="Cart scrubber" />
              </div>

              <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Cart controls">
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Restart"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
                <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
                <button type="button" class="button button--subtle button--icon button--sm" aria-label="Eject"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg></button>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  `,
};

/**
 * 5. HorizontalDock (Bottom Sticky Player Bar)
 * Horizontal dock layout (`.deck--horizontal`) for sticky bottom player strips
 * with automatic container query reflow.
 */
export const HorizontalDock: Story = {
  render: () => `
    <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
      <div style="inline-size: 100%; max-inline-size: 64rem; margin-inline: auto;">
        <section class="deck deck--horizontal deck--bordered deck--on-air" aria-label="Master Broadcast Player Dock">
          <div class="deck__content">
            <div class="deck__body">
              
              <!-- Left: Artwork & Track Identity (Composed with .inline & .lockup) -->
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div class="deck__art" style="background: linear-gradient(135deg, var(--foreground-accent), #0f172a); color: #fff;">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                  </div>
                </div>
                <div class="deck__identity lockup">
                  <div class="deck__tags">
                    <span class="status status--success status--plain" aria-hidden="true"></span>
                    <span class="chip chip--subtle chip--sm"><span class="chip__text">On Air</span></span>
                  </div>
                  <h3 class="deck__title small-heading">Equinox Sunset (Club Mix)</h3>
                  <p class="deck__artist small-text">Bonobo & Kiasmos</p>
                </div>
              </div>

              <!-- Center: Transport & Scrubber -->
              <div class="deck__timeline-transport-group">
                <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Dock playback controls">
                  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Previous track"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
                  <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause playback"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
                  <button type="button" class="button button--subtle button--icon button--sm" aria-label="Next track"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg></button>
                </div>

                <div class="deck__timeline" role="region" aria-label="Dock track progress">
                  <div class="deck__time">
                    <span class="deck__elapsed">01:45</span>
                    <span class="deck__remaining">-03:13</span>
                  </div>
                  <input type="range" class="range range--sm deck__scrubber" min="0" max="298" value="105" style="--value: 35%;" aria-label="Dock seek scrubber" />
                </div>
              </div>

              <!-- Right: Volume Fader & Peak Meter -->
              <div class="deck__volume-meters-group">
                <div class="deck__volume">
                  <div class="deck__volume-controls inline align-items-center">
                    <button type="button" class="button button--subtle button--icon button--sm" aria-label="Toggle mute"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg></button>
                    <input type="range" class="range range--sm deck__fader" value="85" style="--value: 85%;" aria-label="Master Dock Volume" />
                  </div>
                </div>

                <div class="deck__meters" role="region" aria-label="Mini Peak VU Meter" style="inline-size: 8rem;">
                  <div class="deck__channel-meter inline align-items-center">
                    <span class="deck__meter-ch">L</span>
                    <meter class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">${82}%</meter>
                  </div>
                  <div class="deck__channel-meter inline align-items-center">
                    <span class="deck__meter-ch">R</span>
                    <meter class="meter meter--sm deck__meter-bar" value="78" min="0" max="100" low="65" high="90" optimum="50">${78}%</meter>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </div>
  `,
};

/**
 * 6. VinylTurntable (Rotating Vinyl Media Variation)
 * Audiophile turntable variation with continuous vinyl grooves animation (`.deck__art--vinyl.is-spinning`),
 * respecting `@media (prefers-reduced-motion: reduce)`.
 */
export const VinylTurntable: Story = {
  render: () => `
    <div class="demo-stage demo-stage--lg demo-stage--card" style="padding: var(--spacing-24);">
      <div style="inline-size: 100%; max-inline-size: 26rem; margin-inline: auto;">
        <section class="deck deck--bordered" aria-label="Analog Vinyl Deck">
          <div class="deck__content">
            
            <header class="deck__header">
              <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                <span class="status status--success status--plain" aria-hidden="true"></span>
                <h2 class="deck__channel micro-heading">Turntable 1 • 33⅓ RPM</h2>
              </div>
              <span class="chip chip--sm"><span class="chip__text">ANALOG LINE-IN</span></span>
            </header>

            <div class="deck__body">
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame"><div class="deck__art deck__art--vinyl is-spinning" aria-label="Spinning vinyl record"></div></div>
                <div class="deck__identity lockup">
                  <div class="deck__tags">
                    <span class="chip chip--subtle chip--sm"><span class="chip__text">Direct Drive</span></span>
                  </div>
                  <h3 class="deck__title small-heading">Kind of Blue (Master Cut)</h3>
                  <p class="deck__artist small-text">Miles Davis Quintet</p>
                </div>
              </div>

              <div class="deck__timeline" role="region" aria-label="Vinyl needle position">
                <div class="deck__time">
                  <span class="deck__elapsed">04:22</span>
                  <span class="deck__remaining">-05:03</span>
                </div>
                <input type="range" class="range range--sm deck__scrubber" min="0" max="565" value="262" style="--value: 46%;" aria-label="Tonearm position" />
              </div>

              <div class="deck__transport button-group button-group--center" role="toolbar" aria-label="Turntable motor controls">
                <button type="button" class="button button--subtle button--icon" aria-label="Start motor"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
                <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Stop rotation"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
                <button type="button" class="button button--subtle button--icon" aria-label="33 / 45 RPM switch"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Refresh"/></svg></button>
              </div>

              <div class="deck__volume">
                <div class="deck__volume-controls inline align-items-center">
                  <label for="preamp-fader" class="small-heading text-muted" style="inline-size: 4rem;">Pre-Amp</label>
                  <input type="range" class="range range--sm deck__fader" id="preamp-fader" value="75" style="--value: 75%;" aria-label="Pre-amp gain" />
                </div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  `,
};
