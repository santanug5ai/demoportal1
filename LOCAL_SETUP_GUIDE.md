# Local Setup Guide - TCS Conversational Portal

## Prerequisites

Before running the application locally, ensure you have:

- **Node.js**: Version 16 or higher
- **npm**: Version 7 or higher
- **Git**: For cloning the repository

### Check Your Versions

```bash
node --version    # Should show v16.x or higher
npm --version     # Should show 7.x or higher
git --version     # Should show git version
```

---

## Quick Start (3 Steps)

### Step 1: Clone the Repository

```bash
git clone https://github.com/santanug5ai/demoportal1.git
cd demoportal1
```

**Or if you already have the code:**
```bash
cd /home/user/demoportal1
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install:
- React 18.2.0
- Vite 5.4.21
- Express 4.18.2
- Axios 1.7.2
- All other dependencies

**Expected output:**
```
added 250 packages, and audited 251 packages in 30s
```

### Step 3: Start the Application

```bash
npm run dev
```

This single command starts **both** frontend and backend servers:
- **Frontend**: http://localhost:3008/demoportal1/
- **Backend API**: http://localhost:5000

**Expected output:**
```
> tcs-conversational-portal@1.1.0 dev
> concurrently "npm run dev:backend" "npm run dev:frontend"

[0] 🚀 TCS Digital Portal API running on http://localhost:5000
[0] 📊 API endpoints available at http://localhost:5000/api/*
[1]
[1]   VITE v5.4.21  ready in 297 ms
[1]
[1]   ➜  Local:   http://localhost:3008/demoportal1/
[1]   ➜  Network: use --host to expose
```

### Step 4: Open in Browser

Open your browser and navigate to:
```
http://localhost:3008/demoportal1/
```

**You should see:**
- TCS Digital Portal interface
- Chat Assistant ready to use
- Sidebar with navigation menu

---

## Detailed Commands

### Run Both Servers (Recommended)

```bash
npm run dev
```
- Starts backend API (port 5000)
- Starts frontend dev server (port 3008)
- Runs both concurrently

### Run Frontend Only

```bash
npm run dev:frontend
```
- Starts only Vite dev server
- Port: 3008
- Hot Module Replacement enabled
- Good for frontend-only development

### Run Backend Only

```bash
npm run dev:backend
```
- Starts only Express API server
- Port: 5000
- Good for testing API endpoints

### Build for Production

```bash
npm run build
```
- Creates optimized production build
- Output directory: `dist/`
- Minified and compressed files

### Preview Production Build

```bash
npm run preview
```
- Serves the production build locally
- Good for testing before deployment

---

## Development URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3008/demoportal1/ | Main application UI |
| Backend API | http://localhost:5000 | REST API endpoints |
| API Health | http://localhost:5000/api/health | Health check endpoint |
| Network Access | http://<your-ip>:3008/demoportal1/ | Access from other devices |

### Network Access

To access from other devices on your network:

```bash
# Find your IP address
ip addr show | grep "inet "    # Linux
ifconfig | grep "inet "        # Mac
ipconfig                       # Windows

# Then use:
http://<your-ip-address>:3008/demoportal1/
```

Example: `http://192.168.1.100:3008/demoportal1/`

---

## Testing the Chat Assistant

Once the application is running, test these queries:

### Portfolio Queries
```
✓ "Show me AI portfolios"
✓ "TCS CMI solutions"
✓ "cloud portfolios"
✓ "security solutions"
✓ "blockchain case studies"
```

### Skills Queries
```
✓ "cloud skills"
✓ "AI/ML expertise"
✓ "DevOps skills"
✓ "programming skills"
```

### Certifications Queries
```
✓ "AWS certifications"
✓ "Azure certifications"
✓ "security certifications"
✓ "TCS certifications"
```

### Engagement Requests
```
✓ "I need a cloud consultant"
✓ "Request AI expert"
✓ "Need pre-sales support"
```

### Project & Status
```
✓ "Show project status"
✓ "What projects are in progress?"
✓ "Show completed projects"
```

### Other Commands
```
✓ "help"
✓ "overview"
✓ "dashboard"
```

---

## File Structure

```
demoportal1/
├── backend/
│   └── server.js              # Express API server (Port 5000)
├── data/
│   ├── portfolio.json         # 28 portfolio items
│   ├── skills.json            # 25 skills
│   ├── certifications.json    # 20 certifications
│   ├── engagements.json       # 20 engagement requests
│   ├── incubation.json        # 20 incubation projects
│   └── projects.json          # 20 projects
├── src/
│   ├── components/            # React components
│   ├── services/
│   │   └── staticDataService.js  # Client-side data service
│   ├── App.jsx                # Root component
│   └── main.jsx               # Entry point
├── public/
│   ├── .nojekyll              # GitHub Pages config
│   └── 404.html               # SPA routing
├── dist/                      # Build output (generated)
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
└── README.md                  # Documentation
```

---

## Troubleshooting

### Issue: Port Already in Use

**Error:**
```
Error: listen EADDRINUSE: address already in use :::3008
```

**Solution:**

**Option 1: Kill the process using the port**
```bash
# Find process on port 3008
lsof -ti:3008

# Kill the process
kill -9 $(lsof -ti:3008)

# Or for port 5000
kill -9 $(lsof -ti:5000)
```

**Option 2: Change the port in vite.config.js**
```javascript
export default defineConfig({
  server: {
    port: 3009,  // Change to different port
  }
});
```

### Issue: Module Not Found

**Error:**
```
Error: Cannot find module 'express'
```

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Issue: Permission Denied

**Error:**
```
EACCES: permission denied
```

**Solution:**
```bash
# Fix npm permissions (Linux/Mac)
sudo chown -R $USER:$GROUP ~/.npm
sudo chown -R $USER:$GROUP ~/.config

# Or use sudo (not recommended)
sudo npm install
```

### Issue: Cannot Access from Network

**Solution:**
```bash
# Add --host flag to expose to network
# Edit package.json:
"dev:frontend": "vite --host"

# Then restart
npm run dev
```

### Issue: Blank Page

**Solution:**
1. Check console for errors (F12 → Console tab)
2. Ensure you're accessing the correct URL: `http://localhost:3008/demoportal1/` (note the `/demoportal1/` path)
3. Clear browser cache: Ctrl+Shift+R
4. Try incognito mode

### Issue: API Not Responding

**Check backend is running:**
```bash
curl http://localhost:5000/api/health
```

**Expected response:**
```json
{
  "status": "OK",
  "message": "TCS Digital Portal API is running"
}
```

If no response, backend is not running. Check terminal for errors.

---

## Development Workflow

### Making Changes to Frontend

1. Edit files in `src/` directory
2. Changes auto-reload (Hot Module Replacement)
3. Check browser for updates
4. No restart needed

### Making Changes to Backend

1. Edit `backend/server.js`
2. **Restart required** - Stop (Ctrl+C) and run `npm run dev` again
3. Or use `nodemon` for auto-restart (see below)

### Adding Auto-Restart for Backend

```bash
# Install nodemon
npm install --save-dev nodemon

# Edit package.json scripts:
"dev:backend": "nodemon backend/server.js"

# Now backend auto-restarts on changes
```

### Making Changes to Data

1. Edit JSON files in `data/` directory
2. Backend will read updated data automatically
3. No restart needed (data is read on each request)

---

## Stopping the Application

Press **Ctrl + C** in the terminal where `npm run dev` is running.

This will stop both frontend and backend servers.

---

## Building for Production

### Build the Application

```bash
npm run build
```

**Output:**
```
dist/
├── index.html
├── 404.html
├── .nojekyll
└── assets/
    ├── index-[hash].js     # ~260KB
    └── index-[hash].css    # ~27KB
```

### Preview Production Build Locally

```bash
npm run preview
```

Opens at: `http://localhost:4173`

### Deploy to GitHub Pages

The application is configured for automatic deployment via GitHub Actions.

**Manual trigger:**
1. Make a commit and push
2. GitHub Actions will automatically build and deploy
3. Live at: https://santanug5ai.github.io/demoportal1/

---

## Environment Variables (Future)

Currently, the app uses hardcoded values. For production:

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
VITE_APP_TITLE=TCS Digital Portal
NODE_ENV=development
```

Access in code:
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

---

## Performance Tips

### Faster npm install

```bash
# Use npm ci (clean install) for faster installs
npm ci
```

### Clear npm cache if slow

```bash
npm cache clean --force
```

### Use production build for faster app

```bash
npm run build
npm run preview
```

Production build is ~10x faster than dev mode.

---

## IDE Setup (VS Code)

### Recommended Extensions

1. **ES7+ React/Redux/React-Native snippets**
2. **ESLint** - Code linting
3. **Prettier** - Code formatting
4. **Vite** - Vite support
5. **Auto Rename Tag** - HTML/JSX tag renaming

### Launch Configuration (.vscode/launch.json)

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/backend/server.js"
    }
  ]
}
```

---

## Testing API Endpoints

### Using curl

```bash
# Health check
curl http://localhost:5000/api/health

# Get all portfolios
curl http://localhost:5000/api/portfolio

# Test chat
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Show me AI portfolios"}'

# Get specific portfolio
curl http://localhost:5000/api/portfolio/PORT-001
```

### Using Browser

```
http://localhost:5000/api/health
http://localhost:5000/api/portfolio
http://localhost:5000/api/skills
http://localhost:5000/api/certifications
```

---

## Git Workflow

### Check current branch
```bash
git branch
```

### Pull latest changes
```bash
git pull origin claude/tcs-conversational-portal-01VMgXXFoFMufxR1nGANd7S9
```

### Create new branch
```bash
git checkout -b feature/my-new-feature
```

### Commit changes
```bash
git add .
git commit -m "Description of changes"
git push origin your-branch-name
```

---

## Quick Reference Commands

```bash
# Setup
npm install                    # Install dependencies

# Development
npm run dev                    # Run both servers
npm run dev:frontend           # Run only frontend
npm run dev:backend            # Run only backend

# Production
npm run build                  # Build for production
npm run preview                # Preview production build

# Utilities
npm audit                      # Check for vulnerabilities
npm update                     # Update dependencies
npm list                       # List installed packages

# Cleanup
rm -rf node_modules dist       # Clean build artifacts
npm cache clean --force        # Clear npm cache
```

---

## Support

**Issues?** Check:
1. Node.js version >= 16
2. npm version >= 7
3. All dependencies installed
4. Correct URLs with `/demoportal1/` path
5. Both servers running (frontend + backend)

**Still stuck?**
- Check GITHUB_PAGES_TROUBLESHOOTING.md
- Check TECHNICAL_ARCHITECTURE.md
- Review error messages in terminal
- Check browser console (F12)

---

## Next Steps

After getting the app running:

1. ✅ Test the chat assistant with various queries
2. ✅ Explore the sidebar navigation pages
3. ✅ Check the technical documentation (TECHNICAL_ARCHITECTURE.md)
4. ✅ Review the code structure
5. ✅ Make your first modification
6. ✅ Deploy to GitHub Pages (automatic)

---

**Happy Coding!** 🚀

Built with ❤️ for TCS RFP Demo
