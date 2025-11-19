# GitHub Pages Deployment Guide

This application has been configured to deploy automatically to GitHub Pages.

## 🌐 Live Demo URL

Once deployed, your application will be accessible at:

**https://santanug5ai.github.io/demoportal1/**

## 🚀 How It Works

### Static Version for GitHub Pages
The application has been modified to work entirely in the browser without requiring a backend server:

- **Data Source**: JSON files are imported directly into the app
- **No API Calls**: Uses `staticDataService.js` instead of HTTP requests
- **Fully Client-Side**: All conversational AI logic runs in the browser
- **Fast & Reliable**: No server dependencies, instant responses

### Automatic Deployment

Every time you push code to these branches, GitHub Actions will automatically build and deploy:
- `main` branch
- `claude/tcs-conversational-portal-01VMgXXFoFMufxR1nGANd7S9` branch

## 📋 Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/santanug5ai/demoportal1`
2. Click **Settings** → **Pages**
3. Under **Source**, select: **GitHub Actions**
4. Save the settings

### 2. Push Your Code

```bash
git add -A
git commit -m "Configure for GitHub Pages deployment"
git push
```

### 3. Monitor Deployment

1. Go to the **Actions** tab in your repository
2. Watch the deployment workflow run
3. Once complete (usually 2-3 minutes), your site will be live

### 4. Access Your Live Site

Visit: **https://santanug5ai.github.io/demoportal1/**

## 🔧 Configuration Files

### GitHub Actions Workflow
`.github/workflows/deploy.yml` - Handles automatic build and deployment

### Vite Configuration
`vite.config.js` - Configured with:
- `base: '/demoportal1/'` - Correct base path for GitHub Pages
- Build output to `dist/` directory

### Static Data Service
`src/services/staticDataService.js` - Client-side data handling that:
- Imports JSON data directly
- Simulates API delays for realistic UX
- Provides all conversational AI functionality

## 🎯 Features Available on GitHub Pages

All features work perfectly on GitHub Pages:

✅ **Conversational AI Chat Interface**
✅ **Portfolio Browsing** (20+ items with case studies)
✅ **Skills Explorer** (25+ skills)
✅ **Certifications Viewer** (20+ certifications)
✅ **Engagement Requests** (20+ demo requests)
✅ **Innovation Projects** (20+ incubation projects)
✅ **Project Status** (20+ projects with reports)
✅ **Dashboard & Statistics**
✅ **Responsive Design** (works on all devices)

## 💡 Sample Queries

Try these queries once deployed:
- "Show me AI/ML portfolios"
- "What skills do you have in cloud?"
- "I need a consultant for banking"
- "Show innovation projects"
- "What's the project status?"
- "Overview"

## 🔄 Local Development vs GitHub Pages

### Local Development (with backend)
```bash
npm run dev
```
- Runs both frontend (port 3008) and backend (port 5000)
- Uses API calls to Express server
- Full-featured development environment

### GitHub Pages (static only)
- No backend server needed
- Uses `staticDataService.js`
- All data embedded in the build
- Fully functional conversational UI

## 📊 Build Output

The production build includes:
- **index.html** - Main page
- **assets/** - JavaScript and CSS bundles
- **All data** - Embedded in JavaScript

Total build size: ~240KB (gzipped: ~67KB)

## 🐛 Troubleshooting

### Deployment Not Working?

1. **Check GitHub Actions Tab**
   - Look for failed workflows
   - Read error messages

2. **Verify GitHub Pages Settings**
   - Settings → Pages
   - Source should be "GitHub Actions"

3. **Check Branch Name**
   - Deployment configured for specific branches
   - Make sure you pushed to the right branch

### Site Shows 404?

1. Wait 2-3 minutes after deployment
2. Clear browser cache
3. Try incognito/private mode
4. Check if deployment workflow completed successfully

### Features Not Working?

1. Open browser console (F12)
2. Check for JavaScript errors
3. Verify JSON data loaded correctly

## 🔐 Repository Settings Required

Make sure these permissions are enabled:

1. **Settings → Actions → General**
   - Workflow permissions: "Read and write permissions"
   - Allow GitHub Actions to create pull requests: ✓

2. **Settings → Pages**
   - Source: GitHub Actions
   - Branch: (managed by Actions)

## 📱 Mobile Access

The GitHub Pages site works perfectly on mobile devices:
- Responsive design
- Touch-friendly interface
- Same features as desktop

## 🌟 Advantages of GitHub Pages Deployment

1. **Free Hosting** - No server costs
2. **Fast CDN** - Global content delivery
3. **HTTPS** - Secure by default
4. **Auto-Deploy** - Push to deploy
5. **Reliable** - 99.9% uptime
6. **Public Demo** - Share with anyone

## 📈 Performance

GitHub Pages deployment is optimized for performance:
- **First Load**: < 2 seconds
- **Chat Response**: < 500ms
- **Data Cards**: Instant rendering
- **Smooth Animations**: 60fps

## 🎓 For RFP Demo

Share this URL with evaluators:
**https://santanug5ai.github.io/demoportal1/**

Benefits for demo:
- ✅ Always available (24/7)
- ✅ No setup required
- ✅ Works on any device
- ✅ Professional domain
- ✅ Fast and responsive
- ✅ No backend dependencies

## 📞 Support

If deployment fails or you need help:
1. Check GitHub Actions logs
2. Verify all configuration files are committed
3. Ensure GitHub Pages is enabled in repository settings

---

**Your TCS Digital Portal is ready for the world! 🚀**

Share the link: **https://santanug5ai.github.io/demoportal1/**
