# 4. Accordion Primitive (Native `<details>` / `<summary>`)
```html
<!-- Standalone Disclosure (Indicator generated automatically via ::before and ::after pseudo-elements) -->
<details class="accordion">
  <summary>Accordion Header</summary>
  <p>Accordion body content.</p>
</details>

<!-- Plain, Flush & Transparent Disclosures -->
<details class="accordion accordion--plain">
  <summary>Plain Accordion (No Border)</summary>
  <p>Borderless disclosure content.</p>
</details>

<details class="accordion accordion--flush">
  <summary>Flush Accordion (Edge to Edge)</summary>
  <p>Flush disclosure content.</p>
</details>

<details class="accordion accordion--transparent">
  <summary>Transparent Accordion</summary>
  <p>Transparent disclosure content.</p>
</details>

<!-- Opt-Out: Accordion Without Indicator Icon -->
<details class="accordion accordion--no-icon">
  <summary>Accordion Without Indicator Icon</summary>
  <p>Content without plus/minus icon.</p>
</details>

<!-- Native Exclusive Group (only one open at a time without JavaScript) -->
<div class="accordion-group">
  <details class="accordion" name="faq-group" open>
    <summary>First Question</summary>
    <p>Answer to the first question.</p>
  </details>

  <details class="accordion" name="faq-group">
    <summary>Second Question</summary>
    <p>Answer to the second question.</p>
  </details>
</div>

<!-- Group Opt-Out: No Indicator Icons on any child disclosures -->
<div class="accordion-group accordion-group--no-icons">
  <details class="accordion" name="faq-clean">
    <summary>Item Without Icon</summary>
    <p>Clean disclosure content.</p>
  </details>
</div>
```

