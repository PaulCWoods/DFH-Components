# 6. Avatar Primitive & Avatar Groups
```html
<!-- Initials Avatar with Live Status Indicator Ring -->
<div class="avatar" data-status="online" aria-label="Alex Bennett (online)">
  <span>AB</span>
</div>

<!-- Photo Image Avatar -->
<div class="avatar" data-status="away">
  <img src="https://example.com/avatar.jpg" alt="User profile photo" loading="lazy" />
</div>

<!-- Avatar Button (Interactive) -->
<button type="button" class="button button--avatar button--round" data-status="online" aria-label="Jordan Lee profile">
  <img src="https://example.com/avatar.jpg" alt="" width="40" height="40" style="object-fit: cover; border-radius: inherit;" />
</button>

<!-- Icon Fallback Avatar -->
<div class="avatar" aria-label="User profile">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Placeholder / Add User Avatar -->
<div class="avatar avatar--placeholder" aria-label="Add team member">
  <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#User"/></svg>
</div>

<!-- Custom Colored Avatar via inline tokens -->
<div class="avatar" style="--avatar-bg: #e50914; --avatar-text: #ffffff;" aria-label="Alex Bennett">
  <span>AB</span>
</div>

<!-- Inline Avatar Group with Counter -->
<div class="avatar-group" aria-label="Project team">
  <div class="avatar" aria-label="Alex Bennett"><span>AB</span></div>
  <div class="avatar" aria-label="Taylor Smith"><span>TS</span></div>
  <div class="avatar" aria-label="Jordan Lee"><span>JL</span></div>
  <div class="avatar" aria-label="5 additional team members"><span>+5</span></div>
</div>

<!-- Stacked Crescent Avatar Group (Layered pile with counter on top) -->
<div class="avatar-group avatar-group--stacked avatar-group--crescent" aria-label="5 active members">
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-hidden="true"></div>
  <div class="avatar" aria-label="5 members"><span>5</span></div>
</div>
```

