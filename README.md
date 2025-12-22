# 🎲 Farkle
Web implementation of the game Farkle.

## Tech Stack
- React
- Next.js

## Build and Deploy

Install dependencies:
```bash
npm install
```

Run development server:
```bash
npm run dev
```

Build the application for static hosting:
```bash
npm run build
```

Serve the `out` directory with any static file server.

### Environment Configuration
By default, the app builds using the root base path `/`. To host on a subpath, create a `.env` file with:
```
NEXT_PUBLIC_BASE_PATH="/sub-path"
NEXT_PUBLIC_ASSET_PREFIX="/sub-path"
```

You can also have environment-specific files such as `.env.development.local` for local development.

## Live Demo
