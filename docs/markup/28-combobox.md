# 28. Combobox Primitive (Search & Select)
```html
<!-- 1. Single-Select Searchable Combobox with Anchored Listbox -->
<div class="field">
  <label for="framework-combo" class="field__label">Framework</label>
  <div class="combobox">
    <div class="combobox__control" style="anchor-name: --combo-framework;">
      <svg class="icon combobox__icon-start" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Search"/></svg>
      <input 
        id="framework-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        aria-autocomplete="list"
        aria-controls="framework-listbox"
        placeholder="Search or select..."
      />
      <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>

    <ul 
      id="framework-listbox" 
      role="listbox" 
      class="combobox__listbox combobox__listbox--anchored"
      style="position-anchor: --combo-framework;"
      aria-label="Framework options"
    >
      <li role="option" class="combobox__option" aria-selected="true">
        <span>Web Components</span>
        <svg class="icon combobox__check" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Check"/></svg>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>Svelte</span>
      </li>
      <li role="option" class="combobox__option" aria-selected="false">
        <span>React</span>
      </li>
    </ul>
  </div>
</div>

<!-- 2. Multi-Select Combobox with Removable Tags (.chip) -->
<div class="field">
  <label for="skills-combo" class="field__label">Technologies</label>
  <div class="combobox">
    <div class="combobox__control">
      <div class="combobox__tags">
        <span class="chip chip--subtle">
          <span class="chip__text">TypeScript</span>
          <button type="button" class="chip__remove" aria-label="Remove TypeScript">×</button>
        </span>
        <span class="chip chip--subtle">
          <span class="chip__text">Design Tokens</span>
          <button type="button" class="chip__remove" aria-label="Remove Design Tokens">×</button>
        </span>
      </div>
      <input 
        id="skills-combo"
        type="text" 
        class="combobox__input"
        role="combobox"
        aria-expanded="false"
        placeholder="Add tag..."
      />
      <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
      </button>
    </div>
  </div>
</div>

<!-- 3. Compact Combobox (.combobox--sm) -->
<div class="combobox combobox--sm">
  <div class="combobox__control">
    <input type="text" class="combobox__input" placeholder="Quick filter..." />
    <button type="button" class="combobox__toggle" aria-label="Toggle options" tabindex="-1">
      <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#ChevronDown"/></svg>
    </button>
  </div>
</div>
```

