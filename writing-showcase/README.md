# Sneha - Minimalist Writing Portfolio

A beautifully crafted, modern minimalist writing portfolio built with React, Vite, and Tailwind CSS. The app provides a canvas-like reading experience with atmospheric background images and embedded music for full immersion.

## Deployment Instructions

This project is a standard Vite React application and can be seamlessly deployed to platforms like Vercel and GitHub Pages.

### Deploying to GitHub and Vercel (Recommended)

1. **Commit and Push to GitHub**:
   - Initialize a git repository if you haven't already:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     ```
   - Create a new repository on your GitHub account.
   - Push your code to the new repository:
     ```bash
     git remote add origin https://github.com/your-username/your-repo-name.git
     git branch -M main
     git push -u origin main
     ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com/) and create an account or log in with GitHub.
   - Click "**Add New...**" and select "**Project**".
   - Under "Import Git Repository", find the repository you just pushed and click "**Import**".
   - Vercel automatically detects the framework as **Vite**.
   - Review the build settings (they should be perfectly configured by default):
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Click "**Deploy**".
   - Your site will be live on a `*.vercel.app` domain in seconds!

### Manual Build

If you want to build the project manually locally:

```bash
npm install
npm run build
```
This will create a `dist` folder containing the compiled static assets. You can serve this folder using any static file server.

## Features

- **Immersive View**: Full-screen overlay of atmospheric background images paired with auto-playing YouTube embeds for mood setting.
- **Admin Panel**: An integrated dashboard (`/` with key combo or secret button) that allows updating articles and customizing default music without writing code.
- **Accessibility**: Built-in typography adjustments (increase/decrease text size) for comfortable reading.
- **Micro-Interactions**: Elegant, smooth animations using Framer Motion (`motion/react`) for every state change and overlay transition.
