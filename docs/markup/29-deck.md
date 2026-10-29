# 29. Deck (Out of v1 Core — Moving to Recipes)
`deck` is a domain-specific stress test of the token system, not a library component. It is moving from `packages/css/src/organisms/` to `packages/storybook/stories/recipes/`. Do not use it in new library work or copy its patterns into core components. Markup is kept here for reference until the move.
```html
<!-- 1. Standard On-Air Broadcast Deck -->
<section class="deck deck--on-air deck--bordered" aria-label="Deck A • On Air">
  <div class="deck__content">
    
    <!-- Deck Header -->
    <header class="deck__header">
      <div class="deck__status">
        <span class="status status--success status--plain" aria-hidden="true"></span>
        <h2 class="deck__channel">Deck A • On Air</h2>
      </div>
      <div class="deck__header-actions">
        <button type="button" class="button button--subtle button--icon button--sm" aria-label="Deck options">
          <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg>
        </button>
      </div>
    </header>

    <!-- Deck Body -->
    <div class="deck__body">
      
      <!-- Track Presentation & Artwork -->
      <div class="deck__track">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art">
            <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg>
          </div>
          <span class="status status--accent status--sm status--round deck__badge"><span class="status__text">LIVE</span></span>
        </div>
        <div class="deck__identity">
          <div class="deck__tags">
            <span class="chip chip--subtle chip--sm"><span class="chip__text">Heavy Rotation</span></span>
          </div>
          <h3 class="deck__title">Celestial Horizon</h3>
          <p class="deck__artist">Aura & Tycho — Continuum LP</p>
        </div>
      </div>

      <!-- Scrubber & Timeline -->
      <div class="deck__timeline" role="region" aria-label="Track progress">
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

      <!-- Playback Transport Controls -->
      <div class="deck__transport" role="group" aria-label="Playback transport">
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
        <div class="deck__volume-controls">
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
      <div class="deck__channel-meter">
        <span class="deck__meter-ch">L</span>
        <meter class="meter meter--sm deck__meter-bar" value="82" min="0" max="100" low="65" high="90" optimum="50">82%</meter>
        <span class="deck__meter-val">-2.1 dB</span>
      </div>
      <div class="deck__channel-meter">
        <span class="deck__meter-ch">R</span>
        <meter class="meter meter--sm deck__meter-bar" value="79" min="0" max="100" low="65" high="90" optimum="50">79%</meter>
        <span class="deck__meter-val">-2.8 dB</span>
      </div>
    </div>

  </div>
</section>

<!-- 2. Horizontal Player Dock Bar (.deck--horizontal) -->
<section class="deck deck--horizontal deck--bordered deck--on-air" aria-label="Player Dock">
  <div class="deck__content">
    <div class="deck__body">
      <div class="deck__track">
        <div class="deck__art-frame" aria-hidden="true">
          <div class="deck__art"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Disc"/></svg></div>
        </div>
        <div class="deck__identity">
          <h3 class="deck__title">Celestial Horizon</h3>
          <p class="deck__artist">Aura & Tycho</p>
        </div>
      </div>
      <div class="deck__timeline-transport-group">
        <div class="deck__transport" role="group" aria-label="Dock controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__cue" aria-label="Cue"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronStart"/></svg></button>
          <button type="button" class="button button--strong button--accent button--round deck__play" aria-label="Pause"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Pause"/></svg></button>
          <button type="button" class="button button--subtle button--icon button--sm deck__skip" aria-label="Skip"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronEnd"/></svg></button>
        </div>
        <div class="deck__timeline">
          <input type="range" class="range range--sm deck__scrubber" min="0" max="232" value="134" style="--value: 58%;" aria-label="Seek" />
        </div>
      </div>
      <div class="deck__volume-meters-group">
        <div class="deck__volume-controls">
          <button type="button" class="button button--subtle button--icon button--sm deck__mute" aria-label="Mute"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#VolumeOn"/></svg></button>
          <input type="range" class="range range--sm deck__fader" value="85" style="--value: 85%;" aria-label="Volume" />
        </div>
      </div>
    </div>
  </div>
</section>
```

