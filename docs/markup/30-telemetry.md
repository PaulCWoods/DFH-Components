# 30. Telemetry & Stat Pill Primitives (Metrics, Badges & Strips)
```html
<!-- 1. Standard Telemetry Metric Pill -->
<div class="telemetry">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Listeners</span>
    <strong class="telemetry__value">14,820</strong>
  </div>
</div>

<!-- 2. Metric with Unit Suffix and Semantic Trend -->
<div class="telemetry">
  <div class="telemetry__content">
    <span class="telemetry__label">Buffer Latency</span>
    <strong class="telemetry__value">42<span class="telemetry__unit">ms</span></strong>
  </div>
  <span class="telemetry__trend" data-trend="positive" aria-label="Decreased by 4ms">
    -4ms
  </span>
</div>

<!-- 3. Semantic Definition List Telemetry Strip (.telemetry-strip--ruled) -->
<dl class="telemetry-group telemetry-strip--ruled" aria-label="Station live telemetry">
  <div class="telemetry">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
      Listeners
    </dt>
    <dd class="telemetry__value">14,820</dd>
  </div>
  <div class="telemetry">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
      Peak Today
    </dt>
    <dd class="telemetry__value">28,450</dd>
  </div>
  <div class="telemetry" data-status="online">
    <dt class="telemetry__label">
      <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Circle"/></svg>
      Uptime
    </dt>
    <dd class="telemetry__value">99.98%</dd>
  </div>
</dl>

<!-- 4. Dashboard KPI Stat Card (.telemetry--card .telemetry--stacked) -->
<div class="telemetry telemetry--card telemetry--stacked">
  <svg class="telemetry__icon icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Progress"/></svg>
  <div class="telemetry__content">
    <span class="telemetry__label">Total Listen Hours</span>
    <strong class="telemetry__value" style="font-size: var(--typography-font-size-2);">128,450<span class="telemetry__unit">hrs</span></strong>
    <span class="telemetry__trend telemetry__trend--positive">
      +18.2% vs previous period
    </span>
  </div>
</div>

<!-- 5. Compact Telemetry Pill (.telemetry--compact) -->
<div class="telemetry telemetry--compact">
  <span class="telemetry__label">FPS</span>
  <strong class="telemetry__value">60</strong>
</div>
```

