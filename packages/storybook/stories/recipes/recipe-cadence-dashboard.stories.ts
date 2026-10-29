import type { Meta, StoryObj } from '@storybook/html';

const meta: Meta = {
  title: 'Recipes/Cadence Dashboard',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
### Developer & Designer Notes: "Cadence" Live Audio Stream & Station Manager Dashboard

**Cadence** is a web-based, mission-critical Live Audio Stream and Broadcast Station Manager dashboard engineered entirely with **Design For Humans** primitives, tokens, and zero-style-tag layout orchestrators.

---

#### 1. Composed Primitives & Architecture

- **Adaptive Double Navigation Layout (\`.app__workspace\`, \`.sidebar--rail\`, \`.sidebar\`, \`.tab-list--docked\`):**
  Orchestrates an advanced, multi-tiered responsive layout designed to stress-test UI library resilience:
  - **Desktop View (Wide Viewports):** A slim, permanent **Primary Rail** (\`.sidebar.sidebar--rail\`, 4.5rem) with brand logo, icon-only navigation tier buttons (Broadcast, Schedule, Library, Analytics, Settings), search, and user profile avatar. Sitting immediately alongside is a **Submenu Sidebar** (\`.sidebar\`, 16rem) with text-labeled hierarchical sub-navigation and badges under the active tier.
  - **Mobile View (Small Viewports):** The primary rail gracefully disappears; its identity and utilities migrate to a compact **Mobile Top Navigation Bar** (\`.header.md:hide\`) with drawer toggle button; the main navigation buttons migrate to a **Floating Tab Bar Dock** (\`.tab-list--docked\`) at the bottom of the viewport; and the submenu sidebar transforms into an off-canvas **Slide-Over Drawer** with accessible dark blurred backdrop (\`.backdrop\`).

- **Application Holy Grail Frame (\`.app.app--viewport\` & \`.main.main--viewport\`):**
  Uses the canonical Holy Grail grid defined in \`layout/app.css\` with modern dynamic viewport height (\`100dvb\`) and desktop viewport containment (\`.app--viewport\`). Keeps the **Station Header** and **Persistent Audio Dock** firmly anchored while enabling individual panels in the **Main Workspace** (\`.main--viewport\` + \`.split--stretch\` + \`.card__body--scrollable\`) to scroll internally.

- **Station Header & Telemetry (\`.header.header--sticky.header--translucent\`):**
  Sticky glassmorphism header featuring station selector (\`.select.select--sm\`), stream health badge (\`.badge\` with live indicator dot and \`data-status="online"\`), quick metrics stat cards (\`.card.card--compact\`), and global emergency action buttons (\`.button--danger\`, \`.button--danger\`).

- **Leading Sidebar Deck A (\`.deck.deck--on-air.deck--panel.deck--bordered\`):**
  Dedicated playback station composed with the **Deck Organism** (\`deck.css\`) featuring rotating vinyl turntable artwork (\`.deck__art--vinyl.is-spinning\`), typographic lockup (\`.deck__identity.lockup\`), live timeline scrubber (\`.range.range--sm.deck__scrubber\`), primary transport toolbar (\`.deck__transport.button-group\`), level output faders (\`.deck__volume\`), and stereo VU peak monitoring (\`<meter class="meter meter--sm">\`).

- **Expanding Main Workspace: Program Timetable (\`.card\` with \`.card__body--scrollable\`):**
  Broadcast queue and scheduled asset rundown composed with the patterns established in the **Tally & Sprout Recipe**:
  - **Toolbar & Live Count:** Filter pills (\`.button-group.button-group--joined.buttons-subtle\`), search field (\`.input.input--sm\`), and live screen-reader feedback (\`role="status"\` & \`aria-live="polite"\`).
  - **Dynamic Multi-Select & Batch Action Bar:** Row checkboxes with "Select All" table header checkbox and a floating action bar ("Cue Next", "Remove Selected").
  - **Strict Table Geometry:** Uses \`.table.table--striped.table--hover.table--sticky-header\` with token-driven column helpers (\`.table__col--index\`, \`.table__col--fit\`, \`.table__col--lg\`, \`.table__col--center\`, \`.table__cell--center\`).
  - **Typographic Lockup:** Title and artist paired via the \`.lockup\` primitive.
  - **Expandable Telemetry Sub-Rows:** Expandable row toggles (\`aria-expanded\`, \`aria-controls\`) revealing audio engineering telemetry (LUFS integrated loudness, ingest encoding, musical key/BPM, and ISRC identifier) formatted with \`<dl class="telemetry-group">\` and \`.telemetry.telemetry--stacked.telemetry--bordered\`.

- **Persistent Master Audio Dock (\`.deck.deck--dock.deck--translucent.deck--flush\`):**
  Docked at the bottom of the viewport using the canonical horizontal dock modifier (\`.deck--dock\`), orchestrating album art with live spinning vinyl, track lockup, central transport and timeline scrub controls, persistent level fader, and mini stereo VU peak monitoring with declarative settings modal invoker (\`commandfor="cadence-settings-dialog" command="show-modal"\`).

---

#### 2. WCAG 2.2 Level AA / AAA Conformance

| Criterion | Level | Implementation |
| :--- | :---: | :--- |
| **1.3.1 Info & Relationships** | **A** | Semantic HTML5 landmark tags (\`<header>\`, \`<main>\`, \`<section>\`, \`<aside>\`, \`<footer>\`, \`<dialog>\`, \`<table>\`, \`<caption>\`, \`<th scope="col/row">\`, \`<dl class="telemetry-group">\`). |
| **2.1.1 Keyboard Operability** | **A** | All interactive controls (dialogs, drawers, expandable sub-rows, transport buttons, batch actions) operate via standard Tab, Space, Enter, and Esc keys. |
| **2.4.1 Bypass Blocks** | **A** | High-contrast \`.skip-link\` at the top of the document jumping directly to \`#main-content\`. |
| **2.4.7 Focus Visible** | **AA/AAA** | 2px high-contrast focus rings with offset (\`--focus-ring-offset: 2px\`) across all interactive elements. |
| **2.5.5 / 2.5.8 Target Sizes** | **AA/AAA** | Action buttons, inputs, and faders maintain standard 48px / compact 32px heights exceeding the 24x24px minimum touch targets. |
| **4.1.2 Name, Role, Value** | **A** | Sliders provide synchronized ARIA states (\`aria-valuenow\`, \`aria-valuetext\`). Sub-row buttons maintain \`aria-expanded\` and \`aria-controls\`. |
| **4.1.3 Status Messages** | **AA** | Live listener counters, queue tallies, and batch selection announcements declare \`role="status"\` and \`aria-live="polite"\`. |
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Mock Broadcast Queue Data with Technical Ingest Telemetry
 */
interface QueueItem {
  id: string;
  time: string;
  title: string;
  artist: string;
  type: 'music' | 'stager' | 'ad';
  typeLabel: string;
  duration: string;
  status: 'Live' | 'Enqueued' | 'Upcoming' | 'Manual Override';
  statusVariant: 'success' | 'accent' | 'warning' | 'danger';
  lufs: string;
  format: string;
  bpmKey: string;
  isrc: string;
}

const INITIAL_QUEUE: QueueItem[] = [
  {
    id: 'q-1',
    time: '11:24 AM',
    title: 'Celestial Horizon',
    artist: 'Aura & Tycho',
    type: 'music',
    typeLabel: 'Music',
    duration: '03:52',
    status: 'Live',
    statusVariant: 'success',
    lufs: '-14.2 LUFS',
    format: 'FLAC 24-bit / 96kHz',
    bpmKey: '124 BPM • E Minor',
    isrc: 'US-AT2-24-00192',
  },
  {
    id: 'q-2',
    time: '11:28 AM',
    title: 'Cadence Station ID (FM 98.5)',
    artist: 'Voiceover & Synth Bed',
    type: 'stager',
    typeLabel: 'Stager',
    duration: '00:15',
    status: 'Enqueued',
    statusVariant: 'accent',
    lufs: '-13.8 LUFS',
    format: 'WAV 24-bit / 48kHz',
    bpmKey: '120 BPM • C Major',
    isrc: 'US-WDF-26-00001',
  },
  {
    id: 'q-3',
    time: '11:28 AM',
    title: 'Hyperdrive Pulse',
    artist: 'Neon Velocity',
    type: 'music',
    typeLabel: 'Music',
    duration: '04:12',
    status: 'Upcoming',
    statusVariant: 'accent',
    lufs: '-14.0 LUFS',
    format: 'FLAC 24-bit / 44.1kHz',
    bpmKey: '128 BPM • A Minor',
    isrc: 'GB-AYE-25-88301',
  },
  {
    id: 'q-4',
    time: '11:32 AM',
    title: 'Sponsor: Audio Precision Labs',
    artist: 'Commercial Spot A',
    type: 'ad',
    typeLabel: 'Ad Break',
    duration: '00:30',
    status: 'Upcoming',
    statusVariant: 'warning',
    lufs: '-14.1 LUFS',
    format: 'AAC 320kbps / 48kHz',
    bpmKey: 'Spoken Word • Stereo',
    isrc: 'US-ADV-26-10492',
  },
  {
    id: 'q-5',
    time: '11:33 AM',
    title: 'Midnight Resonator',
    artist: 'Solar Fields & Carbon Based Lifeforms',
    type: 'music',
    typeLabel: 'Music',
    duration: '05:44',
    status: 'Upcoming',
    statusVariant: 'accent',
    lufs: '-14.4 LUFS',
    format: 'FLAC 24-bit / 96kHz',
    bpmKey: '118 BPM • D Minor',
    isrc: 'SE-SFL-23-44019',
  },
  {
    id: 'q-6',
    time: '11:39 AM',
    title: 'Live News & Weather Bulletin',
    artist: 'Studio Newsroom',
    type: 'stager',
    typeLabel: 'Stager',
    duration: '01:00',
    status: 'Upcoming',
    statusVariant: 'accent',
    lufs: '-13.9 LUFS',
    format: 'Dante Live Feed 24-bit',
    bpmKey: 'Live Broadcast',
    isrc: 'WDFH-LIVE-NEWS',
  },
  {
    id: 'q-7',
    time: '11:40 AM',
    title: 'Sponsor: Design For Humans Global',
    artist: 'Commercial Spot B',
    type: 'ad',
    typeLabel: 'Ad Break',
    duration: '00:30',
    status: 'Upcoming',
    statusVariant: 'warning',
    lufs: '-14.0 LUFS',
    format: 'AAC 320kbps / 48kHz',
    bpmKey: 'Spoken Word + Bed',
    isrc: 'US-DFH-26-00042',
  },
  {
    id: 'q-8',
    time: '11:41 AM',
    title: 'Equinox Sunset (Club Mix)',
    artist: 'Bonobo & Kiasmos',
    type: 'music',
    typeLabel: 'Music',
    duration: '04:58',
    status: 'Manual Override',
    statusVariant: 'danger',
    lufs: '-13.7 LUFS',
    format: 'FLAC 24-bit / 96kHz',
    bpmKey: '122 BPM • F# Minor',
    isrc: 'GB-BNB-24-91204',
  },
];

/**
 * Format seconds to mm:ss
 */
function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

/**
 * 1. LiveDashboard (Primary Interactive View)
 * Production-ready live broadcast console featuring real-time playback simulation,
 * horizontal audio player dock, Sprout-pattern data table with batch actions and telemetry,
 * interactive stereo VU peak meters, and accessible stream settings dialog.
 */
export const LiveDashboard: Story = {
  render: () => {
    // Unique session ID to isolate DOM instances
    const sessionId = 'cadence-app';

    queueMicrotask(() => {
      const container = document.getElementById(sessionId);
      if (!container) return;

      // State
      let isPlaying = true;
      let isMuted = false;
      let volume = 85;
      let prevVolume = 85;
      let elapsedSeconds = 134;
      const totalDuration = 232; // 03:52
      let queueData = [...INITIAL_QUEUE];
      let activeFilter = 'all';
      let searchQuery = '';
      let isMasterMuted = false;
      const selectedIds = new Set<string>();

      // DOM Elements - Transport & Timeline
      const deckPlayBtn = container.querySelector('#deck-play-btn');
      const deckPlayIcon = container.querySelector('#deck-play-icon use');
      const dockPlayBtn = container.querySelector('#dock-play-btn');
      const dockPlayIcon = container.querySelector('#dock-play-icon use');
      const deckArtVinyl = container.querySelector('#deck-art-vinyl');
      const dockArtVinyl = container.querySelector('#dock-art-vinyl');

      const deckScrubber = container.querySelector<HTMLInputElement>('#deck-scrubber');
      const dockScrubber = container.querySelector<HTMLInputElement>('#dock-scrubber');
      const deckElapsed = container.querySelector('#deck-elapsed');
      const deckRemaining = container.querySelector('#deck-remaining');
      const dockElapsed = container.querySelector('#dock-elapsed');
      const dockRemaining = container.querySelector('#dock-remaining');

      // Volume & Mute Elements
      const deckVolumeSlider = container.querySelector<HTMLInputElement>('#deck-volume');
      const dockVolumeSlider = container.querySelector<HTMLInputElement>('#dock-volume');
      const deckVolReadout = container.querySelector('#deck-vol-readout');
      const dockVolReadout = container.querySelector('#dock-vol-readout');
      const btnDeckMute = container.querySelector('#btn-deck-mute');
      const btnDockMute = container.querySelector('#dock-mute-btn');
      const deckMuteIcon = container.querySelector('#deck-mute-icon use');
      const dockMuteIcon = container.querySelector('#dock-mute-icon use');

      // Header Actions & Badges
      const btnMasterMute = container.querySelector<HTMLButtonElement>('#btn-master-mute');
      const btnEmergencyCart = container.querySelector<HTMLButtonElement>('#btn-emergency-cart');
      const streamHealthBadge = container.querySelector('#stream-health-badge');

      // VU Meters (Sidebar Deck & Horizontal Dock)
      const vuLeft = container.querySelector<HTMLMeterElement>('#vu-left');
      const vuRight = container.querySelector<HTMLMeterElement>('#vu-right');
      const vuLeftVal = container.querySelector('#vu-left-val');
      const vuRightVal = container.querySelector('#vu-right-val');
      const vuHeadroomBadge = container.querySelector('#vu-headroom-badge span');
      const dockVuLeft = container.querySelector<HTMLMeterElement>('#dock-vu-left');
      const dockVuRight = container.querySelector<HTMLMeterElement>('#dock-vu-right');

      // Queue Table & Filter Toolbar
      const queueTbody = container.querySelector('#queue-tbody');
      const queueCountSummary = container.querySelector('#queue-count-summary');
      const queueSearchInput = container.querySelector<HTMLInputElement>('#queue-search-input');
      const filterButtons = container.querySelectorAll<HTMLButtonElement>('[data-filter]');

      // Batch Action Floating Bar Elements
      const selectAllCb = container.querySelector<HTMLInputElement>('#select-all-queue-cb');
      const batchActionBar = container.querySelector<HTMLElement>('#batch-action-bar');
      const batchCounterBadge = container.querySelector<HTMLElement>('#batch-counter-badge .badge__text');
      const btnBatchCue = container.querySelector<HTMLButtonElement>('#btn-batch-cue');
      const btnBatchRemove = container.querySelector<HTMLButtonElement>('#btn-batch-remove');

      // Settings Modal Elements
      const settingBuffer = container.querySelector<HTMLInputElement>('#setting-buffer');
      const bufferReadout = container.querySelector('#buffer-readout');
      const metricLatency = container.querySelector('#metric-latency');

      // Sync scrubber display
      const updateScrubberDisplay = () => {
        const percent = ((elapsedSeconds / totalDuration) * 100).toFixed(1);

        if (deckScrubber) {
          deckScrubber.value = elapsedSeconds.toString();
          deckScrubber.style.setProperty('--value', `${percent}%`);
          deckScrubber.setAttribute('aria-valuenow', elapsedSeconds.toString());
          deckScrubber.setAttribute(
            'aria-valuetext',
            `${formatTime(elapsedSeconds)} of ${formatTime(totalDuration)}`
          );
        }
        if (dockScrubber) {
          dockScrubber.value = elapsedSeconds.toString();
          dockScrubber.style.setProperty('--value', `${percent}%`);
          dockScrubber.setAttribute('aria-valuenow', elapsedSeconds.toString());
        }
        if (deckElapsed) deckElapsed.textContent = formatTime(elapsedSeconds);
        if (deckRemaining)
          deckRemaining.textContent = `-${formatTime(totalDuration - elapsedSeconds)}`;
        if (dockElapsed) dockElapsed.textContent = formatTime(elapsedSeconds);
        if (dockRemaining)
          dockRemaining.textContent = `-${formatTime(totalDuration - elapsedSeconds)}`;
      };

      // Sync volume display
      const updateVolumeDisplay = (val: number) => {
        volume = val;
        const percent = `${volume}%`;
        if (deckVolumeSlider) {
          deckVolumeSlider.value = volume.toString();
          deckVolumeSlider.style.setProperty('--value', percent);
        }
        if (dockVolumeSlider) {
          dockVolumeSlider.value = volume.toString();
          dockVolumeSlider.style.setProperty('--value', percent);
        }
        if (deckVolReadout) deckVolReadout.textContent = percent;
        if (dockVolReadout) dockVolReadout.textContent = percent;

        const isCurrentlyMuted = volume === 0;
        const iconId = isCurrentlyMuted
          ? '#Muted'
          : volume > 50
            ? '#VolumeOn'
            : volume > 0
              ? '#VolumeLow'
              : '#VolumeOff';
        if (deckMuteIcon) deckMuteIcon.setAttribute('href', iconId);
        if (dockMuteIcon) dockMuteIcon.setAttribute('href', iconId);
      };

      // Play/Pause Toggle Handler (with Vinyl Turntable Animation)
      const togglePlay = () => {
        isPlaying = !isPlaying;
        const iconId = isPlaying ? '#Pause' : '#Play';
        const label = isPlaying ? 'Pause broadcast playback' : 'Start broadcast playback';

        if (deckPlayIcon) deckPlayIcon.setAttribute('href', iconId);
        if (dockPlayIcon) dockPlayIcon.setAttribute('href', iconId);
        if (deckPlayBtn) deckPlayBtn.setAttribute('aria-label', label);
        if (dockPlayBtn) dockPlayBtn.setAttribute('aria-label', label);

        if (deckArtVinyl) {
          deckArtVinyl.classList.toggle('is-spinning', isPlaying);
        }
        if (dockArtVinyl) {
          dockArtVinyl.classList.toggle('is-spinning', isPlaying);
        }
      };

      deckPlayBtn?.addEventListener('click', togglePlay);
      dockPlayBtn?.addEventListener('click', togglePlay);

      // Scrubber Seek
      const handleSeek = (e: Event) => {
        const target = e.target as HTMLInputElement;
        elapsedSeconds = parseInt(target.value, 10);
        updateScrubberDisplay();
      };
      deckScrubber?.addEventListener('input', handleSeek);
      dockScrubber?.addEventListener('input', handleSeek);

      // Volume Sliders
      const handleVolumeChange = (e: Event) => {
        const target = e.target as HTMLInputElement;
        const val = parseInt(target.value, 10);
        if (val > 0) isMuted = false;
        updateVolumeDisplay(val);
      };
      deckVolumeSlider?.addEventListener('input', handleVolumeChange);
      dockVolumeSlider?.addEventListener('input', handleVolumeChange);

      // Mute Toggles
      const toggleMute = () => {
        if (isMuted || volume === 0) {
          isMuted = false;
          updateVolumeDisplay(prevVolume > 0 ? prevVolume : 85);
        } else {
          prevVolume = volume;
          isMuted = true;
          updateVolumeDisplay(0);
        }
      };
      btnDeckMute?.addEventListener('click', toggleMute);
      btnDockMute?.addEventListener('click', toggleMute);

      // Emergency Master Mute
      btnMasterMute?.addEventListener('click', () => {
        isMasterMuted = !isMasterMuted;
        btnMasterMute.setAttribute('aria-pressed', isMasterMuted.toString());
        if (isMasterMuted) {
          btnMasterMute.classList.remove('button--danger');
          btnMasterMute.classList.add('button--danger');
          if (streamHealthBadge) {
            streamHealthBadge.className = 'status status--danger';
            const text = streamHealthBadge.querySelector('.status__text');
            if (text) text.textContent = 'Muted (off-air)';
          }
          updateVolumeDisplay(0);
        } else {
          btnMasterMute.classList.remove('button--danger');
          btnMasterMute.classList.add('button--danger');
          if (streamHealthBadge) {
            streamHealthBadge.className = 'status status--success';
            const text = streamHealthBadge.querySelector('.status__text');
            if (text) text.textContent = 'Live • 320k AAC';
          }
          updateVolumeDisplay(prevVolume || 85);
        }
      });

      // Emergency Backup Cart
      btnEmergencyCart?.addEventListener('click', () => {
        alert('Automation Failsafe: Switching instantly to Local Emergency Cart #1 (WDFH-SAFE-LOOP).');
      });

      // Buffer Setting Slider
      settingBuffer?.addEventListener('input', () => {
        if (bufferReadout) bufferReadout.textContent = `${settingBuffer.value} ms`;
        if (metricLatency) metricLatency.textContent = `${settingBuffer.value}ms`;
        const pct = ((parseInt(settingBuffer.value, 10) / 250) * 100).toFixed(1);
        settingBuffer.style.setProperty('--value', `${pct}%`);
      });

      // Update Batch Action Bar State
      const updateBatchBar = (selectableCount: number) => {
        if (!batchActionBar || !batchCounterBadge) return;
        const count = selectedIds.size;
        if (count > 0) {
          batchActionBar.style.display = 'flex';
          batchCounterBadge.textContent = `${count} selected`;
        } else {
          batchActionBar.style.display = 'none';
        }

        if (selectAllCb) {
          selectAllCb.checked = count > 0 && count === selectableCount;
          selectAllCb.indeterminate = count > 0 && count < selectableCount;
        }
      };

      // Render Queue Table (Applying Sprout Recipe Patterns)
      const renderQueue = () => {
        if (!queueTbody) return;

        const filtered = queueData.filter((item) => {
          const matchesType = activeFilter === 'all' || item.type === activeFilter;
          const matchesSearch =
            !searchQuery ||
            item.title.toLowerCase().includes(searchQuery) ||
            item.artist.toLowerCase().includes(searchQuery) ||
            item.typeLabel.toLowerCase().includes(searchQuery) ||
            item.isrc.toLowerCase().includes(searchQuery);
          return matchesType && matchesSearch;
        });

        // Non-live items are selectable for batch actions
        const selectableFiltered = filtered.filter((i) => i.status !== 'Live');
        updateBatchBar(selectableFiltered.length);

        if (filtered.length === 0) {
          queueTbody.innerHTML = `
            <tr>
              <td colspan="7" class="padding-block-xl text-center text-muted">
                <div class="empty-state empty-state--compact" style="margin: 0 auto;">
                  <div class="empty-state__visual" aria-hidden="true"><svg class="icon font-size-lg" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg></div>
                  <div class="empty-state__content">
                    <p class="empty-state__title font-weight-medium">No assets matching filter</p>
                    <p class="empty-state__description font-size-xs text-muted">Try clearing the search term or switching to "All".</p>
                  </div>
                </div>
              </td>
            </tr>
          `;
          return;
        }

        queueTbody.innerHTML = filtered
          .map((item, index) => {
            const isLive = item.status === 'Live';
            const isChecked = selectedIds.has(item.id);
            const iconRef =
              item.type === 'music' ? '#Music' : item.type === 'stager' ? '#Radio' : '#Star';

            return `
              <tr data-id="${item.id}" class="queue-row ${isLive ? 'is-selected font-weight-medium' : ''} ${isChecked ? 'is-selected' : ''}">
                <!-- Multi-Select Checkbox Column -->
                <td class="table__col--index">
                  <label class="choice visually-hidden" for="cb-${item.id}">Select ${item.title}</label>
                  <input 
                    type="checkbox" 
                    id="cb-${item.id}" 
                    class="checkbox-input queue-checkbox" 
                    data-id="${item.id}" 
                    ${isChecked ? 'checked' : ''} 
                    ${isLive ? 'disabled aria-disabled="true"' : ''} 
                  />
                </td>

                <!-- Timestamp (Fit to prevent wrap) -->
                <td class="table__col--fit table__col--center font-mono text-muted font-size-sm">
                  ${item.time}
                </td>

                <!-- Track Title & Artist (Lockup primitive) -->
                <td class="table__col--lg">
                  <div class="inline align-items-center">
                    <div class="avatar avatar--sm border-none" style="--avatar-bg: var(--surface-subtle); --avatar-text: var(--foreground-muted);" aria-hidden="true">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="${iconRef}"/></svg>
                    </div>
                    <div class="lockup">
                      <b class="${isLive ? 'color-accent' : ''}">${item.title}</b>
                      <small class="text-muted">${item.artist}</small>
                    </div>
                  </div>
                </td>

                <!-- Type Chip (Fit & Center aligned) -->
                <td class="table__col--fit table__col--center">
                  <span class="chip chip--subtle chip--sm"><span class="chip__text">${item.typeLabel}</span></span>
                </td>

                <!-- Duration (Fit & Center aligned) -->
                <td class="table__col--fit table__col--center font-mono font-size-sm text-muted">
                  ${item.duration}
                </td>

                <!-- Status Badge (Fit & Center aligned) -->
                <td class="table__col--fit table__col--center">
                  <span class="status status--${item.statusVariant} status--sm">
                    <span class="status__text">${item.status}</span>
                  </span>
                </td>

                <!-- Actions: Telemetry Expand Button & Row Reorder/Delete -->
                <td class="table__col--fit table__cell--center">
                  <div class="inline align-items-center gap-xs">
                    <button type="button" class="button button--subtle button--icon button--sm btn-row-up" data-id="${item.id}" ${index === 0 ? 'disabled' : ''} aria-label="Move ${item.title} up">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowUp"/></svg>
                    </button>
                    <button type="button" class="button button--subtle button--icon button--sm btn-row-down" data-id="${item.id}" ${index === filtered.length - 1 ? 'disabled' : ''} aria-label="Move ${item.title} down">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ArrowDown"/></svg>
                    </button>
                    <button type="button" class="button button--danger button--icon button--sm btn-row-del" data-id="${item.id}" ${isLive ? 'disabled' : ''} aria-label="Remove ${item.title} from queue">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                    </button>
                    <button 
                      type="button" 
                      class="button button--plain button--icon button--sm btn-toggle-subrow"
                      aria-expanded="false"
                      aria-controls="subrow-${item.id}"
                      aria-label="Toggle technical ingest telemetry for ${item.title}"
                    >
                      <svg class="icon icon--dir" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- Expandable Sub-Row (Technical Ingest Telemetry) -->
              <tr id="subrow-${item.id}" class="queue-subrow" hidden>
                <td colspan="7" class="padding-0" style="background-color: var(--surface-translucent, transparent);">
                  <div class="padding-md stack gap-sm" style="border-inline-start: 4px solid var(--border-color-accent, currentColor);">
                    <div class="inline justify-content-between align-items-center flex-wrap gap-xs">
                      <strong class="text-accent font-size-xs">Ingest Pipeline & Audio Rights Telemetry for "${item.title}"</strong>
                      <span class="chip chip--sm"><span class="chip__text">${item.typeLabel} Stream</span></span>
                    </div>

                    <!-- Telemetry responsive grid using DFH Telemetry Primitive (<dl class="telemetry-group">) -->
                    <dl class="telemetry-group grid grid--auto-fit grid--2xs" aria-label="Audio engineering telemetry for ${item.title}">
                      <div class="telemetry telemetry--stacked telemetry--bordered">
                        <dt class="telemetry__label">Integrated Loudness</dt>
                        <dd class="telemetry__value font-mono">${item.lufs} <small class="text-muted ml-sm">(Target: -14)</small></dd>
                      </div>
                      <div class="telemetry telemetry--stacked telemetry--bordered">
                        <dt class="telemetry__label">Audio Codec / Ingest</dt>
                        <dd class="telemetry__value font-mono">${item.format}</dd>
                      </div>
                      <div class="telemetry telemetry--stacked telemetry--bordered">
                        <dt class="telemetry__label">Tempo & Musical Key</dt>
                        <dd class="telemetry__value font-sans font-weight-medium">${item.bpmKey}</dd>
                      </div>
                      <div class="telemetry telemetry--stacked telemetry--bordered">
                        <dt class="telemetry__label">ISRC / License ID</dt>
                        <dd class="telemetry__value font-mono">${item.isrc}</dd>
                      </div>
                    </dl>
                  </div>
                </td>
              </tr>
            `;
          })
          .join('');

        if (queueCountSummary) {
          queueCountSummary.textContent = `${queueData.length} items queued • Total remaining airtime: 34m 18s`;
        }

        // Attach Row Checkbox Change Handlers
        queueTbody.querySelectorAll<HTMLInputElement>('.queue-checkbox').forEach((cb) => {
          cb.addEventListener('change', (e) => {
            const id = (e.target as HTMLInputElement).dataset.id;
            if (!id) return;
            if ((e.target as HTMLInputElement).checked) {
              selectedIds.add(id);
            } else {
              selectedIds.delete(id);
            }
            const row = (e.target as HTMLInputElement).closest('.queue-row');
            if (row) {
              row.classList.toggle('is-selected', (e.target as HTMLInputElement).checked);
            }
            updateBatchBar(selectableFiltered.length);
          });
        });

        // Attach Expandable Sub-Row Toggle Handlers
        queueTbody.querySelectorAll('.btn-toggle-subrow').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const button = e.currentTarget as HTMLButtonElement;
            const targetId = button.getAttribute('aria-controls');
            const subrow = container.querySelector(`#${targetId}`);
            if (subrow) {
              const isExpanded = button.getAttribute('aria-expanded') === 'true';
              button.setAttribute('aria-expanded', (!isExpanded).toString());
              if (isExpanded) {
                subrow.setAttribute('hidden', '');
              } else {
                subrow.removeAttribute('hidden');
              }
            }
          });
        });

        // Attach Row Up/Down/Delete Handlers
        queueTbody.querySelectorAll('.btn-row-up').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            const idx = queueData.findIndex((i) => i.id === id);
            if (idx > 0) {
              const temp = queueData[idx - 1];
              queueData[idx - 1] = queueData[idx];
              queueData[idx] = temp;
              renderQueue();
            }
          });
        });

        queueTbody.querySelectorAll('.btn-row-down').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            const idx = queueData.findIndex((i) => i.id === id);
            if (idx < queueData.length - 1) {
              const temp = queueData[idx + 1];
              queueData[idx + 1] = queueData[idx];
              queueData[idx] = temp;
              renderQueue();
            }
          });
        });

        queueTbody.querySelectorAll('.btn-row-del').forEach((btn) => {
          btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            queueData = queueData.filter((i) => i.id !== id);
            selectedIds.delete(id || '');
            renderQueue();
          });
        });
      };

      // Select All Checkbox Handler
      selectAllCb?.addEventListener('change', () => {
        const selectable = queueData.filter(
          (i) =>
            i.status !== 'Live' &&
            (activeFilter === 'all' || i.type === activeFilter) &&
            (!searchQuery ||
              i.title.toLowerCase().includes(searchQuery) ||
              i.artist.toLowerCase().includes(searchQuery))
        );

        if (selectAllCb.checked) {
          selectable.forEach((i) => selectedIds.add(i.id));
        } else {
          selectedIds.clear();
        }
        renderQueue();
      });

      // Batch Action: Cue Next
      btnBatchCue?.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        const selectedItems = queueData.filter((i) => selectedIds.has(i.id));
        const remainingItems = queueData.filter((i) => !selectedIds.has(i.id));
        const liveIdx = remainingItems.findIndex((i) => i.status === 'Live');
        const insertPos = liveIdx >= 0 ? liveIdx + 1 : 0;
        remainingItems.splice(insertPos, 0, ...selectedItems);
        queueData = remainingItems;
        selectedIds.clear();
        renderQueue();
      });

      // Batch Action: Remove Selected
      btnBatchRemove?.addEventListener('click', () => {
        if (selectedIds.size === 0) return;
        queueData = queueData.filter((i) => i.status === 'Live' || !selectedIds.has(i.id));
        selectedIds.clear();
        renderQueue();
      });

      // Search & Filters
      queueSearchInput?.addEventListener('input', (e) => {
        searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
        renderQueue();
      });

      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          filterButtons.forEach((b) => {
            b.classList.remove('is-active');
            b.setAttribute('aria-checked', 'false');
          });
          btn.classList.add('is-active');
          btn.setAttribute('aria-checked', 'true');
          activeFilter = btn.dataset.filter || 'all';
          renderQueue();
        });
      });

      renderQueue();

      // Timers: Playback scrubber progression
      const playbackTimer = setInterval(() => {
        if (!isPlaying) return;
        elapsedSeconds += 1;
        if (elapsedSeconds > totalDuration) {
          elapsedSeconds = 0;
        }
        updateScrubberDisplay();
      }, 1000);

      // Stereo VU fluctuation simulation (Syncing sidebar deck and bottom dock)
      const vuTimer = setInterval(() => {
        if (!isPlaying || isMuted || isMasterMuted) {
          if (vuLeft) vuLeft.value = 0;
          if (vuRight) vuRight.value = 0;
          if (dockVuLeft) dockVuLeft.value = 0;
          if (dockVuRight) dockVuRight.value = 0;
          if (vuLeftVal) vuLeftVal.textContent = '-∞ dB';
          if (vuRightVal) vuRightVal.textContent = '-∞ dB';
          if (vuHeadroomBadge) vuHeadroomBadge.textContent = 'Muted';
          return;
        }

        // Realistic broadcast peak fluctuations
        const randL = Math.floor(70 + Math.random() * 18);
        const randR = Math.floor(68 + Math.random() * 20);
        const dbL = (-(100 - randL) * 0.18).toFixed(1);
        const dbR = (-(100 - randR) * 0.18).toFixed(1);

        if (vuLeft) vuLeft.value = randL;
        if (vuRight) vuRight.value = randR;
        if (dockVuLeft) dockVuLeft.value = randL;
        if (dockVuRight) dockVuRight.value = randR;
        if (vuLeftVal) vuLeftVal.textContent = `${dbL} dB`;
        if (vuRightVal) vuRightVal.textContent = `${dbR} dB`;

        const maxDb = Math.max(parseFloat(dbL), parseFloat(dbR));
        if (vuHeadroomBadge) {
          vuHeadroomBadge.textContent = `${maxDb.toFixed(1)} dB Headroom`;
        }
      }, 180);

      // Drawer Toggle & Navigation Sync
      const drawerToggle = container.querySelector<HTMLButtonElement>('#cadence-drawer-toggle');
      const drawerClose = container.querySelector<HTMLButtonElement>('#cadence-drawer-close');
      const submenu = container.querySelector<HTMLElement>('#cadence-submenu');
      const backdrop = container.querySelector<HTMLElement>('#cadence-backdrop');

      const openDrawer = () => {
        if (!submenu || !drawerToggle || !backdrop) return;
        submenu.classList.add('is-open');
        drawerToggle.setAttribute('aria-expanded', 'true');
        backdrop.removeAttribute('hidden');
      };

      const closeDrawer = () => {
        if (!submenu || !drawerToggle || !backdrop) return;
        submenu.classList.remove('is-open');
        drawerToggle.setAttribute('aria-expanded', 'false');
        backdrop.setAttribute('hidden', '');
      };

      drawerToggle?.addEventListener('click', () => {
        const isOpen = submenu?.classList.contains('is-open');
        if (isOpen) closeDrawer();
        else openDrawer();
      });

      drawerClose?.addEventListener('click', closeDrawer);
      backdrop?.addEventListener('click', closeDrawer);

      // Primary Rail & Mobile Bottom Dock Tab Navigation Sync
      const tierButtons = container.querySelectorAll<HTMLButtonElement>('[data-tier]');
      const submenuTitle = container.querySelector<HTMLElement>('#cadence-submenu-title');
      const tierTitles: Record<string, string> = {
        broadcast: 'Broadcast Studio',
        schedule: 'Program Schedule',
        library: 'Audio Vault & Media',
        analytics: 'Stream Telemetry',
        settings: 'Station Config',
      };

      tierButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const tier = btn.dataset.tier || 'broadcast';
          tierButtons.forEach((b) => {
            if (b.dataset.tier === tier) {
              b.classList.add('is-active');
              b.setAttribute('aria-current', 'page');
            } else {
              b.classList.remove('is-active');
              b.removeAttribute('aria-current');
            }
          });
          if (submenuTitle && tierTitles[tier]) {
            submenuTitle.textContent = tierTitles[tier];
          }
        });
      });

      // Cleanup on Story teardown
      (window as any)._cadenceCleanup = () => {
        clearInterval(playbackTimer);
        clearInterval(vuTimer);
      };
    });

    return `
      <!-- Accessibility Landmark Skip Link (WCAG 2.4.1) -->
      <a href="#main-content" class="skip-link"><span>Skip to broadcast workspace</span></a>

      <!-- Holy Grail Application Shell (.app.app--viewport) -->
      <div class="app app--viewport" id="cadence-app" style="background-color: var(--surface); color: var(--foreground);">
        
        <!-- ================================================================== -->
        <!-- 0. Mobile / Short-Viewport Top Navigation Bar                       -->
        <!-- ================================================================== -->
        <header class="color-scheme-dark header header--sticky header--translucent padding-block-xs padding-inline-sm app-unlocked:show" aria-label="Mobile Navigation Bar">
          <div class="inline justify-content-between align-items-center inline-full">
            <div class="inline align-items-center gap-xs">
              <button 
                type="button" 
                class="button button--plain button--icon" 
                id="cadence-drawer-toggle"
                aria-controls="cadence-submenu" 
                aria-expanded="false" 
                aria-label="Toggle broadcast sub-navigation drawer"
              >
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Navigation"/></svg>
              </button>
              <div class="inline align-items-center">
              
                <svg class="icon" width="1em" height="1em" style="--icon-size: 2em;" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
                <strong class="font-size-sm">Cadence</strong>
              </div>
            </div>

            <div class="inline align-items-center gap-xs">
              <button type="button" class="button button--plain button--icon button--sm" aria-label="Search broadcast station">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              </button>
              <button type="button" class="button button--avatar button--round" aria-label="Alex Morgan profile" title="Station Manager Alex Morgan" data-status="online">
                AM
              </button>
            </div>
          </div>
        </header>

        <!-- ================================================================== -->
        <!-- Main Workspace Shell: Orchestrates Dual Sidebars + Content Canvas   -->
        <!-- ================================================================== -->
        <div class="app__workspace">

          <!-- ---------------------------------------------------------------- -->
          <!-- 1. Main Primary Sidebar (Far Left Slim Rail, Desktop ONLY >= 48em & > 36em) -->
          <!-- ---------------------------------------------------------------- -->
          <header class="color-scheme-dark sidebar sidebar--rail max-md:hide short:hide" aria-label="Main Navigation">
            
            <!-- Top: Brand Logo / Station Identity -->
            <div class="sidebar__header">
              <a href="#broadcast" class="link inline align-items-center justify-content-center" aria-label="Cadence Station Home" title="Cadence Broadcast Studio">
                  <svg class="icon" width="1em" height="1em" style="--icon-size: 2em;" aria-hidden="true" focusable="false"><use href="#BrandDesignForHumans"/></svg>
              </a>
            </div>

            <!-- Middle: Vertical Icon Navigation Tier (Home/Broadcast, Schedule, Library, Analytics, Settings) -->
            <div class="sidebar__scroller">
              <nav class="tab-list tab-list--vertical tab-list--subtle tab-list--segmented tab-list--sm" aria-label="Primary Station Tiers">
                <ul>
                  <li>
                    <button type="button" class="tab" aria-current="page" data-tier="broadcast" aria-label="Broadcast Live Stream" title="Broadcast Live Stream">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg>
                      <span class="visually-hidden">Broadcast</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="tab" data-tier="schedule" aria-label="Broadcast Schedule" title="Broadcast Schedule">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Calendar"/></svg>
                      <span class="visually-hidden">Schedule</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="tab" data-tier="library" aria-label="Media Library & Audio Vault" title="Media Library & Audio Vault">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Folder"/></svg>
                      <span class="visually-hidden">Library</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="tab" data-tier="analytics" aria-label="Station Telemetry & Analytics" title="Station Telemetry & Analytics">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg>
                      <span class="visually-hidden">Analytics</span>
                    </button>
                  </li>
                  <li>
                    <button type="button" class="tab" data-tier="settings" aria-label="Station Configuration" title="Station Configuration">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                      <span class="visually-hidden">Settings</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Bottom: Search Icon Button & Account Avatar Trigger -->
            <div class="sidebar__footer flex-direction-column gap-xs">
              <button type="button" class="button button--plain button--icon button--sm" aria-label="Search station">
                <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
              </button>
              <button type="button" class="button button--avatar" aria-label="Alex Morgan profile" title="Station Manager Alex Morgan" data-status="online">
                AM
              </button>
            </div>

          </header>

          <!-- ---------------------------------------------------------------- -->
          <!-- 2. Submenu Sidebar (Immediate Right of Primary Rail)             -->
          <!-- Desktop: Permanent Drawer. Mobile: Slide-Over Off-Canvas Panel   -->
          <!-- ---------------------------------------------------------------- -->
          <aside class="sidebar sidebar--flush cadence-submenu" id="cadence-submenu" aria-label="Sub-navigation">
            
            <header class="sidebar__header">
              <div class="inline justify-content-between align-items-center inline-full">
                <div class="lockup">
                  <h3 class="small-heading margin-0" id="cadence-submenu-title">Broadcast Studio</h3>
                  <small class="text-muted">Active Stream Tier</small>
                </div>
                <button 
                  type="button" 
                  class="button button--plain button--icon button--sm md:hide" 
                  id="cadence-drawer-close"
                  aria-label="Close navigation drawer"
                >
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                </button>
              </div>
            </header>

            <div class="sidebar__scroller">
              <nav class="tab-list tab-list--vertical tab-list--plain tab-list--flush tab-list--sm" aria-label="Broadcast Sub-Navigation">
                <ul>
                  <li>
                    <span class="tab-list__content micro-heading text-muted">Operations</span>
                    <ul>
                      <li>
                        <a href="#live-stream" class="tab" aria-current="page">
                          <span class="tab__text">Live Stream</span>
                          <span class="status status--success status--sm"><span class="status__text">On Air</span></span>
                        </a>
                      </li>
                      <li>
                        <a href="#schedule-events" class="tab">
                          <span class="tab__text">Schedule & Events</span>
                        </a>
                      </li>
                      <li>
                        <a href="#playlists-queues" class="tab">
                          <span class="tab__text">Playlists & Queues</span>
                          <span class="badge badge--sm"><span class="badge__text">8 Queued</span></span>
                        </a>
                      </li>
                      <li>
                        <a href="#automation-carts" class="tab">
                          <span class="tab__text">Automation Carts</span>
                        </a>
                      </li>
                      <li>
                        <a href="#ad-manager" class="tab">
                          <span class="tab__text">Ad Manager</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <span class="tab-list__content micro-heading text-muted">Station Audio</span>
                    <ul>
                      <li>
                        <a href="#dsp-processing" class="tab">
                          <span class="tab__text">DSP & Dynamics</span>
                        </a>
                      </li>
                      <li>
                        <a href="#ingest-monitoring" class="tab">
                          <span class="tab__text">Ingest Monitoring</span>
                        </a>
                      </li>
                      <li>
                        <a href="#alerts" class="tab">
                          <span class="tab__text">Log & Alerts</span>
                          <span class="badge badge--danger badge--sm"><span class="badge__text">2</span></span>
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>

            <footer class="sidebar__footer">
              <small class="text-muted font-size-xs">Cadence Engine v2.4 • Stream OK</small>
            </footer>

          </aside>

          <!-- ---------------------------------------------------------------- -->
          <!-- 3. Content Canvas (.main.main--viewport)                         -->
          <!-- ---------------------------------------------------------------- -->
          <main class="main main--viewport" id="main-content" style="padding: 0;">
            
            <!-- Desktop Station Header & Live Broadcast Status (Desktop ONLY >= 48em) -->
            <header class="header header--sticky header--translucent py-sm px-md max-md:hide" aria-label="Station Header and Controls">
              <div class="inline justify-content-between align-items-center flex-wrap gap-sm ui-compact buttons-subtle controls-plain">
                
                <!-- Left: Station Selector & Health Badge -->
                <div class="cluster align-items-center gap-sm">
                  <div class="inline align-items-center gap-xs">
                    <label for="station-selector" class="visually-hidden">Select broadcast station</label>
                    <select id="station-selector" class="select">
                      <option value="wdfh-main" selected>WDFH 98.5 FM — Main Studio</option>
                      <option value="cadence-chill">Cadence Chill (HD-2 Stream)</option>
                      <option value="cadence-underground">Cadence Underground (Web 320k)</option>
                    </select>

                    <span id="stream-health-badge" class="status status--success" role="status" aria-live="polite">
                      <svg class="icon font-size-xs" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Record"/></svg>
                      <span class="status__text">Live • 320k AAC</span>
                    </span>
                  </div>
                </div>

                <!-- Center: Quick Metrics Strip -->
                <div class="telemetry-group max-md:hide" role="region" aria-label="Station live metrics">
                  
                  <!-- Metric 1: Active Listeners -->
                  <div class="telemetry">
                    <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
                    <div class="telemetry__content">
                      <span class="telemetry__label">Listeners</span>
                      <strong id="metric-listeners" class="telemetry__value">14,820</strong>
                    </div>
                  </div>

                  <!-- Metric 2: Peak Today -->
                  <div class="telemetry">
                    <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
                    <div class="telemetry__content">
                      <span class="telemetry__label">Peak</span>
                      <strong id="metric-peak" class="telemetry__value">28,450</strong>
                    </div>
                  </div>

                  <!-- Metric 3: Broadcast Uptime -->
                  <div class="telemetry" data-status="online">
                    <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Record"/></svg>
                    <div class="telemetry__content">
                      <span class="telemetry__label">Uptime</span>
                      <strong id="metric-uptime" class="telemetry__value">99.98%</strong>
                    </div>
                  </div>

                  <!-- Metric 4: Buffer Latency -->
                  <div class="telemetry">
                    <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                    <div class="telemetry__content">
                      <span class="telemetry__label">Latency</span>
                      <strong id="metric-latency" class="telemetry__value">42ms</strong>
                    </div>
                  </div>

                </div>

                <!-- Right: Global Emergency Actions -->
                <div class="inline align-items-center gap-xs">
                  <button type="button" class="button button--danger button--sm" id="btn-master-mute" aria-pressed="false" aria-label="Toggle Emergency Master Mute">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" id="master-mute-icon" focusable="false"><use href="#Muted"/></svg>
                    <span>Mute Master</span>
                  </button>

                  <button type="button" class="button button--danger button--sm" id="btn-emergency-cart" aria-label="Trigger Backup Automation Cart">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Play"/></svg>
                    <span class="max-sm:hide">Backup Cart</span>
                  </button>

                  <button 
                    type="button" 
                    class="button button--subtle button--icon button--sm" 
                    commandfor="cadence-settings-dialog" 
                    command="show-modal" 
                    aria-haspopup="dialog" 
                    aria-label="Stream Encoder Settings"
                  >
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                  </button>
                </div>

              </div>
            </header>

            <!-- ============================================================== -->
            <!-- Station Workspace: Split Layout (Deck A + Timetable Table)     -->
            <!-- ============================================================== -->
            <div class="split split--sm split--stretch" style="--split-sidebar-width: 25rem; gap: var(--spacing-16); padding: var(--spacing-16);">
            
            <!-- -------------------------------------------------------------- -->
            <!-- Left Pane: Leading Sidebar Deck A (.deck.deck--on-air)         -->
            <!-- -------------------------------------------------------------- -->
            <section class="deck deck--on-air deck--panel deck--bordered" aria-label="Deck A On-Air Controls">
              <div class="deck__content">
                
                <!-- Deck Header & Metadata Popover -->
                <header class="deck__header">
                  <div class="deck__status inline align-items-center" style="--gap: var(--spacing-6);">
                    <span class="status status--success status--plain" aria-hidden="true"></span>
                    <h2 class="deck__channel micro-heading">Deck A • On Air</h2>
                  </div>

                  <!-- Metadata Popover Trigger Button -->
                  <div class="deck__header-actions inline align-items-center gap-xs" style="position: relative;">
                    <button 
                      type="button" 
                      class="button button--subtle button--icon button--sm" 
                      id="btn-track-meta"
                      popovertarget="track-meta-popover"
                      aria-label="Inspect Track Metadata and ISRC"
                    >
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
                    </button>

                    <!-- Anchored Popover -->
                    <div id="track-meta-popover" popover class="popover" style="min-inline-size: 20rem;">
                      <article class="card card--compact card--translucent card--ruled">
                        <header class="card__header">
                          <h3 class="card__title font-size-sm font-weight-bold">Licensing & Asset Inspector</h3>
                        </header>
                        <div class="card__body card__body--flush">
                          <div class="table-container">
                            <table class="table table--compact font-size-xs">
                              <tbody>
                                <tr><th scope="row" class="text-muted">ISRC</th><td><code>US-AT2-24-00192</code></td></tr>
                                <tr><th scope="row" class="text-muted">PRO / Rights</th><td><span class="chip chip--sm"><span class="chip__text">ASCAP / BMI</span></span></td></tr>
                                <tr><th scope="row" class="text-muted">Format</th><td>FLAC 24-bit / 96kHz</td></tr>
                                <tr><th scope="row" class="text-muted">Loudness</th><td>-14.2 LUFS (Target: -14)</td></tr>
                                <tr><th scope="row" class="text-muted">BPM / Key</th><td>124 BPM • E Minor</td></tr>
                                <tr><th scope="row" class="text-muted">Label / Year</th><td>2026 Ghostly International</td></tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </header>

                <div class="deck__body">
                  <!-- Visual Vinyl Turntable Art & Title (Composed with .inline & .lockup) -->
                  <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                    <div 
                      class="deck__art-frame" 
                      aria-hidden="true"
                    >
                      <div 
                      class="deck__art deck__art--vinyl is-spinning" 
                      id="deck-art-vinyl" 
                    >
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                    </div>
                      <span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>
                    </div>

                    <div class="deck__identity lockup">
                      <div class="deck__tags">
                        <span class="chip chip--subtle chip--sm"><span class="chip__text">Heavy Rotation</span></span>
                      </div>
                      <h3 id="current-track-title" class="deck__title small-heading">Celestial Horizon</h3>
                      <p id="current-track-artist" class="deck__artist small-text">Aura & Tycho — Continuum LP</p>
                    </div>
                  </div>

                  <!-- Live Scrubber & Time Readout -->
                  <div class="deck__timeline" role="region" aria-label="Current Track Playback Scrubber">
                    <div class="deck__time">
                      <span id="deck-elapsed" class="deck__elapsed font-mono">02:14</span>
                      <span id="deck-remaining" class="deck__remaining font-mono">-01:38</span>
                    </div>
                    <input 
                      type="range" 
                      class="range range--sm deck__scrubber" 
                      id="deck-scrubber" 
                      min="0" 
                      max="232" 
                      value="134" 
                      style="--value: 58%;" 
                      aria-label="Track seek scrubber" 
                      aria-valuemin="0" 
                      aria-valuemax="232" 
                      aria-valuenow="134"
                      aria-valuetext="2 minutes 14 seconds of 3 minutes 52 seconds"
                    />
                  </div>

                  <!-- Transport Controls -->
                  <div class="deck__transport button-group" role="group" aria-label="Playback transport controls">
                    <button type="button" class="button button--subtle button--icon deck__cue" id="deck-cue-btn" aria-label="Cue to start">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
                    </button>

                    <button 
                      type="button" 
                      class="button button--strong button--accent button--round deck__play" 
                      id="deck-play-btn" 
                      aria-label="Pause playback"
                    >
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" id="deck-play-icon" focusable="false"><use href="#Pause"/></svg>
                    </button>

                    <button type="button" class="button button--subtle button--icon deck__skip" id="deck-skip-btn" aria-label="Skip to next queued track">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
                    </button>
                  </div>

                  <hr class="divider">

                  <!-- Volume Slider with Integrated Mute via Range Group -->
                  <div class="deck__volume">
                    <div class="deck__volume-header">
                      <label class="deck__volume-label" for="deck-volume">Deck Output Level</label>
                      <output class="deck__volume-output" for="deck-volume" id="deck-vol-readout">85%</output>
                    </div>
                    <div class="deck__volume-controls inline align-items-center">
                      <button type="button" class="button button--subtle button--icon button--sm deck__mute" id="btn-deck-mute" aria-label="Toggle Deck Mute">
                        <svg class="icon font-size-sm" width="1em" height="1em" aria-hidden="true" id="deck-mute-icon" focusable="false"><use href="#VolumeOn"/></svg>
                      </button>
                      <input 
                        type="range" 
                        class="range range--sm deck__fader" 
                        id="deck-volume" 
                        min="0" 
                        max="100" 
                        value="85" 
                        style="--value: 85%;" 
                        aria-label="Deck output volume" 
                      />
                    </div>
                  </div>
                </div>

                <!-- Stereo Master Peak VU Visualization -->
                <div class="deck__meters" role="region" aria-label="Stereo Master Peak Meters">
                  <div class="deck__meters-header">
                    <span class="deck__meters-title">Stereo Peak (dBFs)</span>
                    <span class="status status--success status--sm" id="vu-headroom-badge"><span class="status__text">-1.8 dB Headroom</span></span>
                  </div>

                  <!-- Channel Left -->
                  <div class="deck__channel-meter inline align-items-center">
                    <span class="deck__meter-ch">L</span>
                    <meter id="vu-left" class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
                    <span id="vu-left-val" class="deck__meter-val">-2.1 dB</span>
                  </div>

                  <!-- Channel Right -->
                  <div class="deck__channel-meter inline align-items-center">
                    <span class="deck__meter-ch">R</span>
                    <meter id="vu-right" class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
                    <span id="vu-right-val" class="deck__meter-val">-2.8 dB</span>
                  </div>
                </div>

              </div>
            </section>

            <!-- -------------------------------------------------------------- -->
            <!-- Right Pane: Broadcast Queue & Program Timetable                -->
            <!-- -------------------------------------------------------------- -->
            <section class="card" aria-label="Broadcast Playback Queue">
              
              <!-- Queue Header & Filter Toolbar -->
              <header class="card__header container-type-inline-size">
                <hgroup class="card__hgroup">
                  <h2 class="card__title subheading">Broadcast Queue & Schedule</h2>
                  <p class="card__subtitle micro-heading" id="queue-count-summary" role="status" aria-live="polite">8 items queued • Total remaining airtime: 34m 18s</p>
                </hgroup>
                <div class="cluster gap-xs align-items-center @max-md:hide-labels">
                  <button type="button" class="button button--sm" id="btn-balance-queue" aria-label="Auto-Balance Queue Clocks">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Sortable"/></svg>
                    <span>Auto-Balance</span>
                  </button>
                  <button type="button" class="button button--strong button--accent button--sm" id="btn-insert-asset" aria-label="Insert Asset to Queue">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Plus"/></svg>
                    <span>Insert Track</span>
                  </button>
                </div>

                <!-- Search & Category Filters -->
                <div class="card__header-line inline justify-content-between align-items-center flex-wrap gap-xs margin-top">
                  <!-- Search Input -->
                  <div class="flex flex-grow-1" style="max-inline-size: 22rem;">
                    <input 
                      type="search" 
                      class="input input--sm" 
                      id="queue-search-input" 
                      placeholder="Search tracks, stagers, ads, ISRC..." 
                      aria-label="Filter queued broadcast assets"
                    />
                  </div>

                  <!-- Category Pills -->
                  <div class="button-group button-group--joined buttons-subtle" role="radiogroup" aria-label="Queue Category Filter">
                    <button type="button" class="button button--sm is-active" data-filter="all" role="radio" aria-checked="true"><span>All</span></button>
                    <button type="button" class="button button--sm" data-filter="music" role="radio" aria-checked="false"><span>Music</span></button>
                    <button type="button" class="button button--sm" data-filter="stager" role="radio" aria-checked="false"><span>Stagers</span></button>
                    <button type="button" class="button button--sm" data-filter="ad" role="radio" aria-checked="false"><span>Ads</span></button>
                  </div>
                </div>

                <!-- Dynamic Multi-Select Batch Action Floating Bar (Sprout Pattern) -->
                <div id="batch-action-bar" class="inline justify-content-between align-items-center padding-xs margin-block-start-xs radius-sm" style="display: none; background-color: var(--surface-translucent, transparent); border: var(--border-width, 1px) solid var(--border-color-accent, currentColor);">
                  <div class="inline align-items-center gap-sm">
                    <span class="badge badge--accent badge--sm" id="batch-counter-badge"><span class="badge__text">0 selected</span></span>
                    <span class="font-size-xs">Batch actions for selected tracks:</span>
                  </div>
                  <div class="inline gap-xs">
                    <button type="button" class="button button--plain button--sm" id="btn-batch-cue">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Play"/></svg>
                      <span>Cue Next</span>
                    </button>
                    <button type="button" class="button button--plain button--sm" id="btn-batch-remove">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Delete"/></svg>
                      <span>Remove Selected</span>
                    </button>
                  </div>
                </div>
              </header>

              <!-- Queue Data Table with Sprout Recipe Standards -->
              <div class="card__body card__body--flush card__body--scrollable">
                <div class="table-container" tabindex="0" role="region" aria-label="Scheduled broadcast queue timetable">
                  <table class="table table--striped table--hover table--sticky-header" id="queue-table">
                    <caption class="visually-hidden">Live broadcast queue and scheduled program rundown listing upcoming tracks, audio assets, and station automation.</caption>
                    <thead>
                      <tr>
                        <th scope="col" class="table__col--index">
                          <label class="choice visually-hidden" for="select-all-queue-cb">Select all rows</label>
                          <input type="checkbox" id="select-all-queue-cb" class="checkbox-input" />
                        </th>
                        <th scope="col" class="table__col--fit table__col--center">Time</th>
                        <th scope="col" class="table__col--fill">Asset / Track Title</th>
                        <th scope="col" class="table__col--fit table__col--center">Type</th>
                        <th scope="col" class="table__col--fit table__col--center">Duration</th>
                        <th scope="col" class="table__col--fit table__col--center">Status</th>
                        <th scope="col" class="table__col--fit table__cell--center"><span class="visually-hidden">Actions</span></th>
                      </tr>
                    </thead>
                    <tbody id="queue-tbody">
                      <!-- Populated dynamically by microtask -->
                    </tbody>
                  </table>
                </div>
              </div>

              <!-- Queue Automation Status Footer -->
              <footer class="card__footer inline justify-content-between align-items-center text-muted font-size-xs">
                <div class="inline align-items-center gap-xs">
                  <svg class="icon font-size-xs" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
                  <span>Automation Engine: AutoDJ Active (Next ad break window at 11:45 AM)</span>
                </div>
                <span>Sync: Primary Master (0 dropped frames)</span>
              </footer>

            </section>

          </div>
        </main>
      </div> <!-- End .app__workspace -->

        <!-- ================================================================== -->
        <!-- 3. Persistent Master Audio Dock (.deck.deck--dock)                 -->
        <!-- ================================================================== -->
        <footer class="footer padding-0 bt bd-quiet shadow-md" style="z-index: var(--z-index-sticky, 100);" aria-label="Persistent Audio Player Dock">
          <section class="deck deck--dock deck--translucent deck--flush" aria-label="Master Audio Dock Controls">
            <div class="deck__content">
              <div class="deck__body">
                
                <!-- Left: Track Identity & Artwork with Spinning Vinyl -->
                <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                  <div class="deck__art-frame" aria-hidden="true">
                    <div class="deck__art deck__art--vinyl is-spinning" id="dock-art-vinyl">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                    </div>
                  </div>
                  <div class="deck__identity lockup">
                    <div class="deck__tags">
                      <span class="status status--success status--plain" aria-hidden="true"></span>
                      <span class="chip chip--subtle chip--sm"><span class="chip__text">ON AIR</span></span>
                    </div>
                    <strong id="dock-track-title" class="deck__title small-heading">Celestial Horizon</strong>
                    <p id="dock-track-artist" class="deck__artist small-text">Aura & Tycho • 320k AAC</p>
                  </div>
                </div>

                <!-- Center: Transport Controls & Scrubber Timeline -->
                <div class="deck__timeline-transport-group">
                  <div class="deck__transport button-group" role="group" aria-label="Dock playback controls">
                    <button type="button" class="button button--subtle button--icon button--sm" id="dock-prev-btn" aria-label="Cue previous track">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg>
                    </button>
                    <button type="button" class="button button--strong button--accent button--round deck__play" id="dock-play-btn" aria-label="Pause playback">
                      <svg class="icon font-size-xs" width="1em" height="1em" id="dock-play-icon" aria-hidden="true" focusable="false"><use href="#Pause"/></svg>
                    </button>
                    <button type="button" class="button button--subtle button--icon button--sm" id="dock-next-btn" aria-label="Skip to next track">
                      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg>
                    </button>
                  </div>

                  <div class="deck__timeline" role="region" aria-label="Dock track progress">
                    <div class="deck__time">
                      <span id="dock-elapsed" class="deck__elapsed font-mono">02:14</span>
                      <span id="dock-remaining" class="deck__remaining font-mono">-01:38</span>
                    </div>
                    <input 
                      type="range" 
                      class="range range--sm deck__scrubber" 
                      id="dock-scrubber" 
                      min="0" 
                      max="232" 
                      value="134" 
                      style="--value: 58%;" 
                      aria-label="Persistent dock track position seek" 
                    />
                  </div>
                </div>

                <!-- Right: Volume Fader, Mini Stereo Peak Meters & Settings Trigger -->
                <div class="deck__volume-meters-group">
                  <div class="deck__volume">
                    <div class="deck__volume-controls inline align-items-center">
                      <button type="button" class="button button--subtle button--icon button--sm deck__mute" id="dock-mute-btn" aria-label="Mute dock audio">
                        <svg class="icon font-size-sm" width="1em" height="1em" id="dock-mute-icon" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg>
                      </button>
                      <input 
                        type="range" 
                        class="range range--sm deck__fader" 
                        id="dock-volume" 
                        min="0" 
                        max="100" 
                        value="85" 
                        style="--value: 85%; inline-size: 5.5rem;" 
                        aria-label="Persistent dock volume slider" 
                      />
                      <output for="dock-volume" id="dock-vol-readout" class="font-size-xs font-mono text-muted max-md:hide">85%</output>
                    </div>
                  </div>

                  <div class="deck__meters max-sm:hide" role="region" aria-label="Dock Mini Peak VU Meter">
                    <div class="deck__channel-meter inline align-items-center">
                      <span class="deck__meter-ch">L</span>
                      <meter id="dock-vu-left" class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
                    </div>
                    <div class="deck__channel-meter inline align-items-center">
                      <span class="deck__meter-ch">R</span>
                      <meter id="dock-vu-right" class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
                    </div>
                  </div>

                  <!-- Stream Settings Modal Trigger -->
                  <button 
                    type="button" 
                    class="button button--sm" 
                    commandfor="cadence-settings-dialog" 
                    command="show-modal" 
                    aria-haspopup="dialog"
                    aria-label="Stream Encoder Settings"
                  >
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg>
                    <span class="max-md:hide">Settings</span>
                  </button>
                </div>

              </div>
            </div>
          </section>
        </footer>

        <!-- ================================================================== -->
        <!-- 4. Broadcast & DSP Settings Modal Dialog (<dialog>)                -->
        <!-- ================================================================== -->
        <dialog id="cadence-settings-dialog" class="dialog" aria-labelledby="cadence-dialog-title" aria-describedby="cadence-dialog-desc">
          <article class="card card--ruled wrapper wrapper--md" style="margin: 0 auto;">
            
            <!-- Dialog Header -->
            <header class="card__header">
              <hgroup>
                <h2 id="cadence-dialog-title" class="card__title heading">Stream & Broadcast Settings</h2>
                <p id="cadence-dialog-desc" class="card__subtitle small-text">Configure primary audio pipeline, DSP codecs, and automation failsafes.</p>
              </hgroup>
              <form method="dialog">
                <button type="submit" class="button button--subtle button--icon" commandfor="cadence-settings-dialog" command="close" aria-label="Close settings dialog">
                  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
                </button>
              </form>
            </header>

            <!-- Dialog Body -->
            <div class="card__body card__body--scrollable">
              <div class="form controls-subtle">
              
              <!-- Audio Source -->
              <div class="field">
                <label for="setting-audio-source" class="field__label">Primary Sound Device / Audio Interface</label>
                <select id="setting-audio-source" class="select">
                  <option value="interface-1" selected>Universal Audio Apollo x8 (Channels 1-2 Master Out)</option>
                  <option value="interface-2">Dante Virtual Soundcard (Network Bus A)</option>
                  <option value="interface-3">Built-in CoreAudio Virtual Aggregate</option>
                </select>
              </div>

              <!-- Codec Selection -->
              <div class="field">
                <label for="setting-codec" class="field__label">Broadcast Encoding Codec & Bitrate</label>
                <select id="setting-codec" class="select">
                  <option value="aac-320" selected>320 kbps AAC-LC (High Fidelity Stereo - Current)</option>
                  <option value="aac-192">192 kbps AAC-HE (Mobile Optimized)</option>
                  <option value="mp3-320">320 kbps MP3 (Legacy Fallback Stream)</option>
                  <option value="flac">FLAC Lossless 24-bit (Archival Feed)</option>
                </select>
              </div>
              <hr class="divider" />

              <!-- Loudness Normalization Switch -->
              <label class="switch">
                <span class="switch__label">
                  <strong>EBU R128 / ReplayGain Loudness Processing</strong>
                  <small>Enforces consistent -14 LUFS integrated volume across tracks</small>
                </span>
                <input type="checkbox" role="switch" class="visually-hidden" checked id="switch-loudness" />
                <span class="switch__control" aria-hidden="true">
                  <span class="switch__option switch__option--off">Off</span>
                  <span class="switch__option switch__option--on">On</span>
                </span>
              </label>

              <!-- Emergency Failsafe Switch -->
              <label class="switch">
                <span class="switch__label">
                  <strong>Auto-Failover to Emergency Cart</strong>
                  <small>Triggers emergency backup rotation if buffer drops under 10ms</small>
                </span>
                <input type="checkbox" role="switch" class="visually-hidden" checked id="switch-failsafe" />
                <span class="switch__control" aria-hidden="true">
                  <span class="switch__option switch__option--off">Off</span>
                  <span class="switch__option switch__option--on">On</span>
                </span>
              </label>

              <!-- Buffer Latency Slider -->
              <hr class="divider" />
              <div class="field">
                <div class="inline justify-content-between align-items-center">
                  <label for="setting-buffer" class="field__label">Buffer Latency Safety Margin</label>
                  <output for="setting-buffer" id="buffer-readout" class="font-size-xs font-weight-bold font-mono">42 ms</output>
                </div>
                <input type="range" class="range range--sm" id="setting-buffer" min="10" max="250" value="42" style="--value: 17%;" />
              </div>
              </div>

            </div>

            <!-- Dialog Footer -->
            <footer class="card__footer inline justify-content-end">
              <form method="dialog" class="inline">
                <button type="submit" class="button" commandfor="cadence-settings-dialog" command="close">
                  <span>Cancel</span>
                </button>
                <button type="submit" value="save" class="button button--strong button--accent" id="btn-save-settings">
                  <span>Save Configuration</span>
                </button>
              </form>
            </footer>

          </article>
        </dialog>

        <!-- ================================================================== -->
        <!-- 4. Mobile Floating Tab Bar Dock (Bottom Navigation, icons only)    -->
        <!-- ================================================================== -->
        <div class="app-unlocked:show">
          <nav class="bg-accent bg-effect-translucent-50 color-scheme-dark tab-list tab-list--segmented tab-list--round tab-list--floating tab-list--docked" style="z-index: calc(var(--z-index-sticky, 100) + 1);" aria-label="Mobile Bottom Navigation">
            <button type="button" class="tab tab--icon" aria-current="page" data-tier="broadcast" aria-label="Broadcast Live Stream"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Radio"/></svg></button>
            <button type="button" class="tab tab--icon" data-tier="schedule" aria-label="Broadcast Schedule"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Calendar"/></svg></button>
            <button type="button" class="tab tab--icon" data-tier="library" aria-label="Media Library"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Folder"/></svg></button>
            <button type="button" class="tab tab--icon" data-tier="analytics" aria-label="Station Telemetry"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChartBar"/></svg></button>
            <button type="button" class="tab tab--icon" data-tier="settings" aria-label="Station Configuration"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Settings"/></svg></button>
          </nav>
        </div>

        <!-- ================================================================== -->
        <!-- 5. Accessible Backdrop for Mobile Slide-Over Drawer                -->
        <!-- ================================================================== -->
        <div id="cadence-backdrop" class="backdrop" hidden></div>

      </div>
    `;
  },
};

/**
 * 2. BufferingState
 * Demonstrates how the dashboard gracefully communicates a stream disruption or network stall.
 */
export const BufferingState: Story = {
  render: () => `
    <div class="app app--viewport" style="background-color: var(--surface); color: var(--foreground);">
      
      <!-- Header in Buffering State -->
      <header class="header header--sticky header--translucent padding-block-xs padding-inline-md">
        <div class="inline justify-content-between align-items-center flex-wrap gap-sm">
          <div class="cluster align-items-center gap-sm">
            <strong class="font-size-md">Cadence</strong>
            <span class="status status--warning" role="status" aria-live="assertive">
              <span class="status__text">Reconnecting • Buffer Depleted</span>
            </span>
          </div>

          <div class="inline align-items-center gap-xs">
            <button type="button" class="button button--danger button--sm">
              <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Play"/></svg>
              <span>Force Backup Cart</span>
            </button>
          </div>
        </div>
      </header>

      <!-- Main Workspace with Alert Banner -->
      <main class="main main--viewport" style="padding: var(--spacing-16);">
        <div class="stack gap-md">
          
          <!-- Global Warning Alert -->
          <div class="banner banner--warning">
            <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
            <div class="banner__body">
              <h3 class="text font-bold">Audio stream stalled (ingest server timeout)</h3>
              <p class="small-text">The ingest uplink from WDFH Main Studio has exceeded the 250ms threshold. Automated fallback cart will activate in 12 seconds.</p>
            </div>
            <button type="button" class="button banner__action"><span>Retry connection</span></button>
          </div>

          <!-- Skeleton Queue Loading Grid -->
          <div class="card stack gap-sm">
            <h3 class="card__title font-size-sm">Broadcast Queue (Holding Pattern)</h3>
            <div class="stack gap-xs" aria-busy="true" aria-label="Re-synchronizing queue timetable">
              <p class="visually-hidden" role="status">Re-synchronizing the queue…</p>
              <span class="skeleton skeleton--heading skeleton--w-75" aria-hidden="true"></span>
              <span class="skeleton skeleton--text" aria-hidden="true"></span>
              <span class="skeleton skeleton--text skeleton--w-50" aria-hidden="true"></span>
            </div>
          </div>

        </div>
      </main>

      <!-- Persistent Dock in Paused/Disabled State using .deck.deck--dock.deck--translucent.deck--flush -->
      <footer class="footer padding-0" style="z-index: var(--z-index-sticky, 100);" aria-label="Persistent Master Audio Dock (Offline)">
        <section class="deck deck--dock deck--translucent deck--flush deck--dense" aria-label="Master Audio Dock Controls">
          <div class="deck__content">
            <div class="deck__body">
              <div class="deck__track inline align-items-center" style="--gap: var(--_deck-gap);">
                <div class="deck__art-frame" aria-hidden="true">
                  <div class="deck__art">
                    <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
                  </div>
                </div>
                <div class="deck__identity lockup">
                  <div class="deck__tags">
                    <span class="status status--warning status--plain status--sm"><span class="status__text">Buffering...</span></span>
                  </div>
                  <strong class="deck__title small-heading">Celestial Horizon</strong>
                  <p class="deck__artist small-text">Signal paused — awaiting reconnect</p>
                </div>
              </div>
              <div class="inline align-items-center gap-sm">
                <span class="status status--warning status--sm"><span class="status__text">Auto-Recovery Active</span></span>
                <button type="button" class="button button--subtle button--sm" disabled>
                  <span>Connecting...</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </footer>

    </div>
  `,
};
