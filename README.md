# 🎲 Farkle
Web implementation of the dice game Farkle.

This is the dice game used in Kingdom Come: Deliverance.

Based on the [rules in the Wikipedia entry](https://en.wikipedia.org/wiki/Farkle).

## Tech Stack
- React
- Next.js

## To do
- Add audio (rolling of the dice, etc.)
- Add dice animation when rolling
- Add auto-skip if no possible moves exist
- Fix layout for mobile and small screens
- Add multiplayer (see below section)

### Multiplayer
Basic multiplayer functionality. Needs a backend to handle game sessions. For example Firebase could be used with randomized GUIDs as user IDs to allow anonymous multiplayer. Needs more analysis.

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
You can see the application in action [here](https://joacimandersson.com/farkle/).