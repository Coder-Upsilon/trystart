# Deployment Guide

This guide explains how to deploy trystart to GitHub Pages.

## Prerequisites

1. GitHub account
2. Git installed locally
3. Repository created on GitHub

## Method 1: Automatic Deployment (Recommended)

This method uses GitHub Actions to automatically build and deploy on every push to `main`.

### Step 1: Enable GitHub Pages

1. Go to your GitHub repository
2. Click "Settings" → "Pages" (in left sidebar)
3. Under "Source", select "GitHub Actions"
4. Save

### Step 2: Update Base Path (if needed)

If your repository is not named `trystart`, update the base path in `vite.config.js`:

```javascript
export default defineConfig({
  // ... other config
  base: '/YOUR-REPO-NAME/',
})
```

### Step 3: Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - MVP implementation"

# Add remote (replace with your GitHub username)
git remote add origin https://github.com/YOUR-USERNAME/trystart.git

# Push to main branch
git push -u origin main
```

### Step 4: Verify Deployment

1. Go to your repository on GitHub
2. Click "Actions" tab
3. Watch the deployment workflow run
4. When complete, visit: `https://YOUR-USERNAME.github.io/trystart/`

## Method 2: Manual Deployment

If you prefer to deploy manually:

```bash
# Build the app
npm run build

# Deploy to GitHub Pages
npm run deploy
```

Note: This requires the `gh-pages` package (already in `package.json`).

## Method 3: Firebase Hosting

See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for instructions on deploying to Firebase Hosting.

## Verifying Your Deployment

After deployment, test the following:

1. **Entry screen loads** - "Try starting something?" appears
2. **Task selection works** - "Give me two choices" shows two tasks
3. **Task input works** - "I already have something to do" allows text entry
4. **Presence mode works** - Timer appears, presence count shows
5. **Exit works** - "I'm putting it down now" shows exit message
6. **PWA installation** - "Add to Home Screen" option appears on mobile

## Troubleshooting

### Issue: 404 when navigating to the app

**Solution:** Check that the `base` path in `vite.config.js` matches your repository name.

```javascript
base: '/trystart/',  // Should match your repo name
```

### Issue: Assets not loading (404 errors)

**Solution:** Verify the base path is correct and rebuild:

```bash
npm run build
```

### Issue: PWA not installing on mobile

**Solution:**
1. Ensure the site is served over HTTPS (GitHub Pages does this automatically)
2. Check that `manifest.json` paths are correct
3. Verify service worker is registered (check browser dev tools)

### Issue: Real-time presence not working

**Solution:**
- The MVP uses simulated presence (mock data)
- To enable real Firebase presence, see [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Add a `CNAME` file to the `public/` directory:
```bash
echo "trystart.yourdomain.com" > public/CNAME
```

2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to: `YOUR-USERNAME.github.io`

3. In GitHub Settings → Pages, enter your custom domain

4. Wait for DNS propagation (can take 24-48 hours)

## Environment Variables

Currently, the app doesn't require environment variables for MVP. When you set up Firebase, you'll add the config to `src/firebase.js` directly.

For more secure deployment (production), consider:
1. Using Vite environment variables
2. Storing Firebase config in GitHub Secrets
3. Injecting config at build time via GitHub Actions

## Monitoring

**GitHub Pages:**
- Bandwidth: Monitor in GitHub Settings → Pages
- Free tier: 100GB/month, 100 builds/hour

**Firebase (if using):**
- Monitor usage in Firebase Console
- Set up budget alerts
- Free tier: 10GB hosting, 360MB/day transfer

## Next Steps

1. Deploy MVP to GitHub Pages
2. Test on multiple devices (desktop, mobile, tablet)
3. Share with beta users
4. Set up Firebase for real-time presence (see FIREBASE_SETUP.md)
5. Monitor usage and gather feedback

---

**Deployed URL:** `https://YOUR-USERNAME.github.io/trystart/`
**Build command:** `npm run build`
**Deploy command:** `npm run deploy` (manual) or push to `main` (automatic)
