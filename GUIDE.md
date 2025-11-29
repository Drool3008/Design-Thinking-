# Installation Guide

This guide will help you set up the College Event Management Portal on your local machine after cloning from GitHub.

---

## Prerequisites

Before you begin, make sure you have the following installed on your computer:

### 1. Node.js (Version 18 or higher)

**Check if already installed:**
```bash
node --version
```

**If not installed:**
- **Windows/Mac:** Download from [https://nodejs.org](https://nodejs.org) (choose LTS version)
- **Mac (using Homebrew):** `brew install node`
- **Ubuntu/Debian:** `sudo apt install nodejs npm`

### 2. Git

**Check if already installed:**
```bash
git --version
```

**If not installed:**
- **Windows:** Download from [https://git-scm.com](https://git-scm.com)
- **Mac:** `xcode-select --install` or `brew install git`
- **Ubuntu/Debian:** `sudo apt install git`

### 3. A Code Editor (Recommended)

- [Visual Studio Code](https://code.visualstudio.com/) - Highly recommended
- Any text editor of your choice

---

## Step-by-Step Installation

### Step 1: Clone the Repository

Open your terminal (Command Prompt on Windows, Terminal on Mac/Linux) and run:

```bash
git clone https://github.com/Drool3008/Design-Thinking-.git
```

### Step 2: Navigate to the Project Folder

```bash
cd Design-Thinking-
```

> **Note:** If the folder name has special characters, you might need to use quotes:
> ```bash
> cd "Design-Thinking-"
> ```

### Step 3: Install Dependencies

This command downloads all the required packages for the project:

```bash
npm install
```

Wait for the installation to complete. You'll see a progress bar and eventually a success message.

### Step 4: Start the Development Server

```bash
npm run dev
```

You should see output like:
```
VITE ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### Step 5: Open in Browser

Open your web browser and go to:
```
http://localhost:5173
```

You should now see the College Event Management Portal running!

---

## Troubleshooting

### "npm: command not found"
- Node.js is not installed or not in your PATH
- Reinstall Node.js from [nodejs.org](https://nodejs.org)

### "EACCES permission denied"
- On Mac/Linux, you might need to fix npm permissions
- Run: `sudo chown -R $(whoami) ~/.npm`

### Port 5173 is already in use
- Another application is using that port
- The dev server will automatically try another port (5174, 5175, etc.)
- Or close the other application using port 5173

### "Module not found" errors
- Delete `node_modules` folder and `package-lock.json`
- Run `npm install` again

### Blank page or errors in browser
- Open browser developer tools (F12) to see error messages
- Make sure you're on the correct URL
- Try clearing browser cache (Ctrl+Shift+R or Cmd+Shift+R)

---

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (for local testing) |
| `npm run build` | Create production-ready files in `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Check code for style issues |

---

## Project Structure Overview

```
Design-Thinking-/
├── public/              # Static files (favicon, images)
├── src/
│   ├── components/      # Reusable UI pieces (buttons, cards, modals)
│   ├── context/         # Shared app state (user roles, events data)
│   ├── data/            # Mock data (events, faculty members)
│   ├── routes/          # Page components (dashboards, landing page)
│   ├── App.tsx          # Main app with routing setup
│   └── main.tsx         # App entry point
├── index.html           # HTML template
├── package.json         # Project dependencies and scripts
├── vite.config.ts       # Build tool configuration
└── README.md            # Project overview
```

---

## Technology Stack

| Technology | Purpose |
|------------|---------|
| **React** | User interface framework |
| **TypeScript** | Type-safe JavaScript |
| **Vite** | Fast build tool and dev server |
| **Tailwind CSS** | Styling and design |
| **React Router** | Page navigation |

---

## Deploying to Production

### Option 1: Vercel (Easiest)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" and select your GitHub repo
4. Vercel auto-detects Vite and deploys automatically

### Option 2: Netlify

1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist/` folder to deploy

### Option 3: GitHub Pages

1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add to package.json scripts: `"deploy": "npm run build && gh-pages -d dist"`
3. Run: `npm run deploy`

---

## Need Help?

- Check the [README.md](./README.md) for workflow documentation
- Open an issue on GitHub if you encounter problems
- Make sure you're using the latest version of the code (`git pull`)

---

## Quick Start Summary

```bash
# 1. Clone
git clone https://github.com/Drool3008/Design-Thinking-.git

# 2. Enter folder
cd Design-Thinking-

# 3. Install packages
npm install

# 4. Run
npm run dev

# 5. Open browser to http://localhost:5173
```

That's it! You're ready to explore the College Event Management Portal. 🎉
