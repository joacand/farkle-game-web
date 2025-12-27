# 🎲 Farkle
A web-based implementation of the dice game **Farkle**, featured in *Kingdom Come: Deliverance*.

The game follows the rules outlined in the [Wikipedia Farkle article](https://en.wikipedia.org/wiki/Farkle) and includes optional multiplayer support.

## Features
* Playable single-player against computer
* Real-time multiplayer using Firebase
* Client only for static page hosting

## Tech Stack
- React
- Next.js
- Firebase (multiplayer)

## Multiplayer Notes
The implementation contains basic multiplayer functionality through Firebase. Please keep the following in mind:

* No anti-cheat protection: Players with technical knowledge can submit fake scores.
* Target setting is not synced: Both players must manually set the same Target value.
* Inactive lobbies expire: Lobbies are automatically removed after 10 minutes of inactivity.

## To do
* Add multiplayer animations to visualize opponent dice actions in real time

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
Try the game here: https://joacimandersson.com/farkle/
