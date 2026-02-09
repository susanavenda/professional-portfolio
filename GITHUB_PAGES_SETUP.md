# GitHub Pages Setup Instructions

## Current Configuration

Your site should be available at: **https://susanavenda.github.io/professional-portfolio/**

## Verify GitHub Pages Settings

1. Go to your repository on GitHub: https://github.com/susanavenda/professional-portfolio
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, verify:
   - **Source**: "Deploy from a branch"
   - **Branch**: `main`
   - **Folder**: `/docs`
5. Click **Save** if you made any changes

## Check Workflow Status

1. Go to the **Actions** tab in your repository
2. Check if the "Deploy to GitHub Pages" workflow has run
3. If it failed, click on it to see error details
4. If it hasn't run, you can manually trigger it:
   - Go to **Actions** → **Deploy to GitHub Pages**
   - Click **Run workflow** → **Run workflow**

## Troubleshooting

### If the site still doesn't load:

1. **Check workflow logs**: Go to Actions tab and check for errors
2. **Verify docs folder**: Ensure `docs/index.html` exists in the repository
3. **Check base path**: The vite.config.js has `base: '/professional-portfolio/'` which is correct
4. **Wait a few minutes**: GitHub Pages can take 1-5 minutes to update after deployment

### Common Issues:

- **404 Error**: GitHub Pages might not be enabled or configured incorrectly
- **Blank Page**: Check browser console for JavaScript errors (might be base path issue)
- **Old Content**: Clear browser cache or wait a few minutes for CDN to update

## Manual Deployment (if workflow fails)

If the GitHub Actions workflow isn't working, you can manually deploy:

```bash
npm install
npm run build
rm -rf docs
cp -r dist docs
git add docs
git commit -m "Deploy: manual deployment"
git push origin main
```

---

*Last updated: February 2026*
