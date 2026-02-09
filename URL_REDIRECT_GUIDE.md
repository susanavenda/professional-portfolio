# URL Redirect Guide

## Current Situation

The repository was renamed from `resume` to `professional-portfolio`, which changed the GitHub Pages URL:

- **Old URL**: `https://susanavenda.github.io/resume/` ❌ (no longer works)
- **New URL**: `https://susanavenda.github.io/professional-portfolio/` ✅ (current)

## Solution Options

### Option 1: Create a Redirect Repository (Recommended)

If you want to maintain the old URL, create a new repository named `resume` with a simple HTML redirect:

1. Create a new repository named `resume` on GitHub
2. Enable GitHub Pages for it
3. Add an `index.html` file with this content:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=https://susanavenda.github.io/professional-portfolio/">
    <link rel="canonical" href="https://susanavenda.github.io/professional-portfolio/">
    <script>
        window.location.replace("https://susanavenda.github.io/professional-portfolio/");
    </script>
</head>
<body>
    <p>Redirecting to <a href="https://susanavenda.github.io/professional-portfolio/">professional portfolio</a>...</p>
</body>
</html>
```

### Option 2: Update All External Links

Update any external links, bookmarks, or references to use the new URL:
- `https://susanavenda.github.io/professional-portfolio/`

### Option 3: Use a Custom Domain

If you have a custom domain, you can:
1. Set up a custom domain for the `professional-portfolio` repository
2. Use a shorter, memorable URL like `susanavenda.dev` or `susana.dev`

## What Was Updated

All internal references have been updated:
- ✅ CV download link now points to `professional-portfolio` repository
- ✅ Portfolio JSON references updated to `professional-portfolio`
- ✅ Repository names in portfolio categories updated
- ✅ Outdated repository names fixed (observability-swift → observability-platform, DO288-apps → containerized-apps, angular → angular-hybrid-app)

---

*Last updated: February 2026*
