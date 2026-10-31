---
title: Banner Dock
tier: molecule
summary: Pins a Banner to the edge of the page, for site announcements, maintenance notices and consent bars.
tokens: banner-dock
storybook: molecules-banner-dock
related: [banner, toast, wrapper]
---

# 21. Banner Dock (Site Announcements Pinned to the Page Edge)
```html live
<aside class="banner-dock" aria-label="Library notice">
  <div class="banner banner--info">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
    <div class="banner__body">
      <p class="text">The library closes early on Friday.</p>
    </div>
  </div>
</aside>
```

## Why it exists
Some messages are about the whole site: a maintenance window, a consent question, a closure. They need a place that isn't tied to one part of the page, and that place is the page's edge.

The Dock only decides where a [Banner](11-banner.md) sits. The Banner stays the one component for a message, and it knows nothing about the Dock, so there's no second message style to keep in step.

It is a labelled `<aside>`, which makes it a landmark people can find. It isn't an alert. A notice that's there when the page loads is content, and urgency is a role on a live region, wherever a message is pinned.

## When to use
- **For a message about the whole site:** an announcement, a maintenance notice, a consent bar.
- **Not for a message inside a part of the page:** that is a [Banner](11-banner.md) on its own.
- **Not for a short message about something that just happened:** that is a [Toast](18-toast.md).
- **Not for urgency alone:** an alert is a role. Use `role="alert"` or `role="status"` on a region that is in the page before its message arrives.

## Rules
- A dock is an `<aside>` with an `aria-label`. The Banner inside takes no role.
- Dismiss by setting `hidden` on the dock; it slides off its edge (at once with reduced motion).
- **A fixed dock sits over the page,** so leave room for it, or a focused element can end up behind it (WCAG 2.4.11). `scroll-padding-block` on the scroller keeps focus clear.

## Sticky Notice
```html live
<aside class="banner-dock banner-dock--sticky" aria-label="Site notice">
  <div class="wrapper">
    <div class="banner banner--warning">
      <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Warning"/></svg></span>
      <div class="banner__body">
        <p class="text">Services will be offline on Sunday from 02:00 to 04:00 UTC.</p>
      </div>
      <button type="button" class="button button--icon banner__action">
        <svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Close"/></svg>
        <span class="sr-only">Dismiss notice</span>
      </button>
    </div>
  </div>
</aside>
```

## Consent Bar
```html
<aside class="banner-dock banner-dock--fixed-bottom" aria-label="Cookie preferences">
  <div class="wrapper">
    <div class="banner">
      <div class="banner__body">
        <p class="text">We use cookies to keep the site working.</p>
        <div class="cluster">
          <button type="button" class="button"><span>Manage</span></button>
          <button type="button" class="button button--strong button--accent"><span>Accept</span></button>
        </div>
      </div>
    </div>
  </div>
</aside>
```

## Do and Don't
| Do | Don't |
| :--- | :--- |
| Use an `<aside>` with an `aria-label`. | Put a role on the Banner inside. |
| Put a `.wrapper` inside to line up with the page content. | Add padding to the dock to line it up. |
| Set `hidden` on the dock to dismiss it. | Hide only the Banner, which leaves the dock behind. |
| Let the dock square the Banner through its flag. | Style the Banner from the dock. |
| Pair an intent with an icon or words. | Leave the colour to say it alone. |

## Reference
`.banner-dock` pins a [Banner](11-banner.md) to the page edge. It is placement only: it squares the Banner's corners and drops its edge borders through the `--banner-dock` flag, and never styles the Banner directly. It replaces `.alert`; an alert is a role, not a class.

## Options
| Placement | Behaviour |
| :--- | :--- |
| (none) | In flow at the top of the page |
| `--sticky` | Sticks to the top on scroll |
| `--fixed-top`, `--fixed-bottom` | Pinned to the viewport edge |
| `--floating` | Inset from the edge; the Banner keeps its frame. Combine with a placement. |

### Further rules
- A `.wrapper` inside the dock lines the message up with the page content.

## Floating
```html
<aside class="banner-dock banner-dock--fixed-bottom banner-dock--floating" aria-label="Update available">
  <div class="banner banner--accent banner--round">
    <span class="icon-box" aria-hidden="true"><svg class="icon" width="1em" height="1em" aria-hidden="true" focusable="false"><use href="#Info"/></svg></span>
    <div class="banner__body"><p class="text">A new version is available.</p></div>
    <button type="button" class="button button--strong button--accent banner__action"><span>Reload</span></button>
  </div>
</aside>
```
