# Dhruv Harani — Portfolio Website

Full-stack engineer portfolio site built with **Next.js 16 (App Router)**, **TypeScript**, and **Tailwind CSS v4**.

- **Live Site**: [https://dhruvharani.dev](https://dhruvharani.dev)
- **Data Source**: Automatic build-time SSG & ISR revalidation via GitHub REST API.

## Features
- **Apple Dark Design System**: Sleek custom dark theme, glassmorphism header, smooth scroll animations.
- **GitHub-Live Projects**: Self-updating repository grid and case study pages (`/projects/[slug]`).
- **Health Check Endpoint**: `/health` and `/api/health` for uptime monitoring services (e.g. UptimeRobot, BetterStack).

## Development

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
npm run start
```
