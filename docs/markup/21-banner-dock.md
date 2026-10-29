# 21. Banner Dock (Site Announcements Pinned to the Page Edge)

`.banner-dock` pins a banner (§11) to the page edge. It is placement only: it squares the banner's corners and drops its edge borders through the `--banner-dock` flag, and never styles the banner directly. It replaces `.alert`; an alert is a role, not a class. The audit is in `docs/audit/announcements.md`.

| Placement | Behaviour |
| :--- | :--- |
| (none) | In flow at the top of the page |
| `--sticky` | Sticks to the top on scroll |
| `--fixed-top`, `--fixed-bottom` | Pinned to the viewport edge |
| `--floating` | Inset from the edge; the banner keeps its frame. Combine with a placement. |

- A dock is an `<aside>` with an `aria-label`. The banner inside takes no role.
- A `.wrapper` inside the dock lines the message up with the page content.
- Dismiss by setting `hidden` on the dock; it slides off its edge (at once with reduced motion).

## A. Sticky Notice
```html
<aside class="banner-dock banner-dock--sticky" aria-label="Site notice">
  <div class="wrapper">
    <div class="banner banner--warning">
      <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
      <div class="banner__body">
        <p class="text">Services will be offline on Sunday from 02:00 to 04:00 UTC.</p>
      </div>
      <button type="button" class="button button--icon banner__action">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
        <span class="visually-hidden">Dismiss notice</span>
      </button>
    </div>
  </div>
</aside>
```

## B. Consent Bar
```html
<aside class="banner-dock banner-dock--fixed-bottom" aria-label="Cookie preferences">
  <div class="wrapper">
    <div class="banner">
      <div class="banner__body"><p class="text">We use cookies to keep the site working.</p></div>
      <div class="cluster banner__action">
        <button type="button" class="button"><span>Manage</span></button>
        <button type="button" class="button button--strong button--accent"><span>Accept</span></button>
      </div>
    </div>
  </div>
</aside>
```

## C. Floating
```html
<aside class="banner-dock banner-dock--fixed-bottom banner-dock--floating" aria-label="Update available">
  <div class="banner banner--accent banner--round">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
    <div class="banner__body"><p class="text">A new version is available.</p></div>
    <button type="button" class="button button--strong button--accent banner__action"><span>Reload</span></button>
  </div>
</aside>
```
