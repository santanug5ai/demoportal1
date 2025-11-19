# GitHub Pages Troubleshooting Guide

## Current Issue: Chat Assistant Not Working on GitHub Pages

### Problem
When using the chat assistant at https://santanug5ai.github.io/demoportal1/, you're seeing the default "unknown intent" error message instead of intelligent, contextual responses.

### Root Cause
The GitHub Pages deployment needs to rebuild with the latest intelligent chat logic from `src/services/staticDataService.js`.

---

## ✅ Solution Steps (In Order)

### Step 1: Verify GitHub Actions Workflow is Running

1. Go to: https://github.com/santanug5ai/demoportal1/actions
2. Look for the latest "Deploy to GitHub Pages" workflow
3. It should show as "In Progress" (yellow circle) or "Completed" (green checkmark)
4. **Expected Time**: 2-3 minutes to complete

**What to look for:**
- **Build Job**: Should complete successfully (installs deps, builds app)
- **Deploy Job**: Should deploy to GitHub Pages

### Step 2: Wait for GitHub Pages CDN to Update

Even after the workflow completes:
- GitHub's CDN can take **1-5 minutes** to propagate changes globally
- Your browser might have cached the old version

### Step 3: Clear Browser Cache

**Option A: Hard Refresh**
- **Windows/Linux**: Press `Ctrl + Shift + R` or `Ctrl + F5`
- **Mac**: Press `Cmd + Shift + R`

**Option B: Clear Cache Manually**
1. Open browser DevTools: `F12` or `Ctrl + Shift + I`
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

**Option C: Incognito/Private Mode**
- Open https://santanug5ai.github.io/demoportal1/ in a new incognito window
- This bypasses all cache

### Step 4: Test the Chat Assistant

Once the deployment is complete and cache is cleared, test these queries:

✅ **Test Queries that Should Work:**

1. **"Show me AI portfolios"**
   - Expected: Returns 8 AI/ML specific portfolio items
   - Old behavior: Shows all items or unknown error

2. **"TCS CMI solutions"**
   - Expected: Returns 8 TCS CMI specific items
   - Old behavior: Unknown intent error

3. **"cloud skills"**
   - Expected: Returns only cloud-related skills (AWS, Azure, GCP)
   - Old behavior: Shows all skills or error

4. **"portfolio"** (generic query)
   - Expected: Returns only 6 featured items
   - Old behavior: Shows 10+ items

5. **"Show me security certifications"**
   - Expected: Returns only security certifications
   - Old behavior: Shows all or error

---

## 🔍 Diagnostic Steps

### Check 1: Verify Workflow Succeeded

Visit: https://github.com/santanug5ai/demoportal1/actions

**Green Checkmark** = Deployment succeeded ✅
**Red X** = Deployment failed ❌
**Yellow Circle** = Still running ⏳

### Check 2: Check Browser Console for Errors

1. Open DevTools: `F12`
2. Click **Console** tab
3. Look for JavaScript errors (red text)

**Common errors and fixes:**

```
❌ "Failed to fetch" or "Network Error"
   → Check internet connection
   → Try incognito mode

❌ "TypeError: Cannot read property 'filter'"
   → Old JavaScript version cached
   → Clear cache and hard reload

✅ No errors in console
   → Chat should work correctly
```

### Check 3: Verify GitHub Pages Settings

1. Go to: https://github.com/santanug5ai/demoportal1/settings/pages
2. Verify:
   - **Source**: GitHub Actions ✅
   - **Custom domain**: (empty) ✅
   - **Enforce HTTPS**: Enabled ✅

### Check 4: Check Repository Visibility

1. Go to: https://github.com/santanug5ai/demoportal1/settings
2. Scroll to **Danger Zone**
3. Verify repository is **PUBLIC** ✅
   - GitHub Pages requires public repos for free accounts

---

## 🚀 Manual Workflow Trigger (If Needed)

If the workflow didn't automatically trigger:

1. Go to: https://github.com/santanug5ai/demoportal1/actions/workflows/deploy.yml
2. Click **"Run workflow"** button (right side)
3. Select branch: `claude/tcs-conversational-portal-01VMgXXFoFMufxR1nGANd7S9`
4. Click **"Run workflow"** (green button)
5. Wait 2-3 minutes for completion

---

## 📊 Expected Behavior After Fix

### Before Fix (Old Behavior):
```
User: "Show me AI portfolios"
Bot: "I'm not sure I understood that. I can help you with:
     • Portfolio information and case studies
     • Skills and expertise details..."
```

### After Fix (New Behavior):
```
User: "Show me AI portfolios"
Bot: "I found 8 AI/ML portfolio items with detailed use cases and case studies."
     [Shows 8 AI/ML specific portfolio cards]

     Suggestions:
     - Show more details
     - View related skills
     - Request engagement
```

---

## 🔧 Advanced Troubleshooting

### Issue: Workflow Fails During Build

**Error in Build Job:**
```bash
npm ERR! code ELIFECYCLE
npm ERR! errno 1
```

**Fix:**
1. Check `package.json` is valid JSON
2. Ensure all dependencies are listed
3. Check for syntax errors in source files

### Issue: Workflow Succeeds but Page is Blank

**Possible Causes:**
1. Missing `.nojekyll` file in `public/` folder
2. Missing `404.html` in `public/` folder
3. Wrong `base` path in `vite.config.js`

**Verify:**
```bash
# Check .nojekyll exists
ls -la public/.nojekyll

# Check 404.html exists
ls -la public/404.html

# Check vite.config.js has correct base
grep "base:" vite.config.js
# Should show: base: '/demoportal1/',
```

### Issue: Chat Works Locally but Not on GitHub Pages

**Cause:** Backend API not available on GitHub Pages (static hosting)

**Fix:** Already implemented! The frontend uses `staticDataService.js` for GitHub Pages, which runs all chat logic client-side.

**Verify:**
```javascript
// In ChatInterface.jsx, should use:
import staticDataService from '../services/staticDataService';

// Not axios API calls:
// axios.post('/api/chat', ...) ❌
```

---

## 📝 Workflow Deployment Timeline

| Step | Duration | Status Check |
|------|----------|-------------|
| Code Push | Instant | Git push succeeds |
| Workflow Trigger | 5-10 seconds | Workflow appears in Actions tab |
| Checkout Code | 10-15 seconds | Build job starts |
| Install Dependencies | 30-60 seconds | npm ci completes |
| Build Application | 15-30 seconds | npm run build completes |
| Upload Artifact | 10-15 seconds | Artifact uploaded |
| Deploy to Pages | 20-40 seconds | Deploy job completes |
| CDN Propagation | 1-5 minutes | Site updates globally |
| **Total Time** | **~3-5 minutes** | Green checkmark in Actions |

---

## ✅ Success Checklist

- [ ] GitHub Actions workflow shows green checkmark
- [ ] Waited 1-5 minutes after workflow completion
- [ ] Cleared browser cache (Ctrl+Shift+R)
- [ ] Opened site in incognito mode
- [ ] Tested query: "Show me AI portfolios"
- [ ] Got contextual response (not generic error)
- [ ] Chat shows 8 AI/ML items (not all items)
- [ ] Suggestions appear below response

---

## 🆘 Still Not Working?

If after following all steps the chat still doesn't work:

### 1. Check Latest Deployment Time
Visit: https://github.com/santanug5ai/demoportal1/deployments

Look for the latest deployment timestamp. It should be recent (within the last 10 minutes).

### 2. Verify File Contents
Check if the deployed JavaScript includes the intelligent filtering:

1. Open: https://santanug5ai.github.io/demoportal1/
2. Open DevTools: `F12`
3. Go to **Sources** tab
4. Open `assets/index-[hash].js`
5. Search for "TCS CMI specific" in the file
6. If found ✅ = Correct version deployed
7. If not found ❌ = Old version still cached

### 3. Force GitHub Pages Rebuild
1. Make a small change (e.g., add a comment to README.md)
2. Commit and push
3. Wait for workflow to complete
4. Clear cache and test again

### 4. Check GitHub Pages Status
Visit: https://www.githubstatus.com/
- Ensure GitHub Pages service is operational
- Check for any ongoing incidents

---

## 📞 Contact Support

If none of the above works:
- **Email**: digital.portal@tcs.com
- **GitHub Issues**: https://github.com/santanug5ai/demoportal1/issues

---

## 🎯 Quick Reference

**Live Site**: https://santanug5ai.github.io/demoportal1/
**GitHub Actions**: https://github.com/santanug5ai/demoportal1/actions
**Repository Settings**: https://github.com/santanug5ai/demoportal1/settings
**Pages Settings**: https://github.com/santanug5ai/demoportal1/settings/pages

**Latest Commit**: `082fde5 - Bump version to 1.1.0`
**Expected Version**: `1.1.0 - Enhanced AI conversational assistant`

---

**Last Updated**: November 19, 2024
**Status**: Deployment in progress - ETA 3-5 minutes ⏳
