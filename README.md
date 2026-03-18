# Cap_Mojay{dev} — Portfolio Site

> Personal portfolio of **George Mochama Edwin** — Developer · Data Scientist · Educator  
> Built with Next.js 15 · Tailwind CSS · Framer Motion · MDX

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

---

## 📁 Project Structure

```
cap-mojay-portfolio/
├── app/
│   ├── layout.tsx          ← Root layout, metadata, navbar, footer
│   ├── page.tsx            ← Home page (all sections)
│   ├── globals.css         ← Global styles + CSS variables
│   ├── not-found.tsx       ← Custom 404 page
│   └── blog/
│       ├── page.tsx        ← Blog listing
│       └── [slug]/
│           └── page.tsx    ← Individual MDX post renderer
├── components/
│   ├── ThemeProvider.tsx   ← Dark/light mode context
│   ├── Cursor.tsx          ← Custom animated cursor
│   ├── Navbar.tsx          ← Navigation + theme toggle + CV download
│   ├── Hero.tsx            ← Hero section with typewriter
│   ├── About.tsx           ← About, experience timeline, education
│   ├── Skills.tsx          ← Animated skill bars + tech badges
│   ├── Projects.tsx        ← Project cards grid
│   ├── BlogPreview.tsx     ← Blog preview + GitHub activity graph
│   ├── Contact.tsx         ← EmailJS form + interactive terminal
│   └── PageTransition.tsx  ← Framer Motion page transitions
├── posts/
│   └── ml-pipeline-fastapi-redis.mdx   ← Sample blog post
├── public/
│   └── cv.pdf              ← ⚠️  ADD YOUR CV HERE
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## ⚙️ Configuration Checklist

### 1. Add your CV
Copy your PDF into `/public/` and name it `cv.pdf`:
```
public/cv.pdf
```

### 2. Set up EmailJS (contact form)
1. Create a free account at [emailjs.com](https://emailjs.com)
2. Create a **Service** (Gmail works great)
3. Create an **Email Template** with variables: `from_name`, `reply_to`, `subject`, `message`
4. Open `components/Contact.tsx` and replace:
```ts
const EMAILJS_SERVICE  = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC   = 'YOUR_PUBLIC_KEY';
```

### 3. Set your GitHub username
Open `components/BlogPreview.tsx` and update:
```tsx
<GitHubCalendar username="YOUR_GITHUB_USERNAME" ... />
```

### 4. Update social links
In `components/Contact.tsx`, update the href values for GitHub, LinkedIn, Twitter.

### 5. Add real projects
Open `components/Projects.tsx` — each project has:
- `github` — link to your real repo
- `demo`   — link to live demo (or '#' if none)
- Update descriptions to match your actual GitHub projects

---

## 📝 Writing Blog Posts

Create a new `.mdx` file in `/posts/`:

```mdx
---
title: "Your Post Title"
date: "2026-04-01"
tag: "ML"
mins: 5
excerpt: "A short description for the listing page."
---

# Your Post Title

Your content here...
```

Then add it to the posts array in both:
- `app/blog/page.tsx`
- `components/BlogPreview.tsx`

---

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "initial commit"
git remote add origin https://github.com/YOUR_USERNAME/cap-mojay-portfolio.git
git push -u origin main

# 2. Go to vercel.com → New Project → Import from GitHub
# 3. Click Deploy — that's it!
```

Your site will be live at `https://cap-mojay-portfolio.vercel.app` (or your custom domain).

---

## 🎨 Customisation

All colours live in `app/globals.css` as CSS variables:

```css
:root {
  --green:  #00ff88;   /* primary accent */
  --amber:  #f59e0b;   /* {dev} bracket colour */
  --blue:   #60a5fa;   /* secondary accent */
  --purple: #a855f7;   /* tertiary accent */
}
```

---

## 📦 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 | Framework (App Router) |
| Tailwind CSS | Styling |
| Framer Motion | Page transitions + animations |
| MDX | Blog posts |
| EmailJS | Contact form (no backend) |
| react-github-calendar | GitHub activity graph |
| Vercel | Hosting |

---

Built with 💚 by **George Mochama Edwin** · Nairobi, Kenya 🇰🇪
