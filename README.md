# Personal Profile - Mingqin Yu

A modern, responsive personal profile page built with React featuring a clean design with dark mode support.

## Features

- Responsive design that works on all devices
- Dark/Light theme toggle
- Smooth scroll animations
- Project showcase with hover effects
- Social media links integration

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run locally:
```bash
npm start
```

The site will open at [http://localhost:3000](http://localhost:3000)

## Deploying to GitHub Pages

### First-time Setup

1. Update the `homepage` field in `package.json` with your GitHub username and repository name:
```json
"homepage": "https://YOUR_USERNAME.github.io/yuyu_profile"
```

2. Make sure you have a GitHub repository created

3. Initialize git (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/yuyu_profile.git
git push -u origin main
```

### Deploy to GitHub Pages

Run this command to build and deploy:
```bash
npm run deploy
```

This will:
- Build your React app
- Create a `gh-pages` branch
- Push the build folder to that branch
- Your site will be live at `https://YOUR_USERNAME.github.io/yuyu_profile`

### Enable GitHub Pages

1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select the `gh-pages` branch
5. Click "Save"

Your site should be live within a few minutes!

## Customization

Edit the following in [src/Profile.jsx](src/Profile.jsx):

- **Personal Info**: Update name, email, tagline in the Hero section
- **About**: Modify the about text
- **Projects**: Update the `projects` array with your own projects
- **Social Links**: Replace URLs with your social media profiles
- **Colors**: Modify CSS variables in the style section (search for `--accent-primary`, etc.)

## Project Structure

```
yuyu_profile/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── App.js              # Main app component
│   ├── Profile.jsx         # Portfolio component
│   └── index.js            # React entry point
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Technologies Used

- React 18
- CSS-in-JS (styled with inline styles)
- IntersectionObserver API for scroll animations
- GitHub Pages for hosting

## License

© 2025 Mingqin Yu. All rights reserved.
