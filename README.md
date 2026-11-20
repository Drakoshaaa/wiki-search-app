# Wiki Search

A console application for searching Wikipedia (OOP lab project, TypeScript).

## What it does

1. Reads a search query from the console.
2. Sends the query to the Wikipedia API (`fetch`).
3. Parses the JSON response and prints a numbered list of articles.
4. Opens the selected article in the browser.

Errors (no network, empty query, no results, invalid choice) are handled without crashing.
The code is split into classes and interfaces: input, API client, parser, output, browser opener and an error hierarchy.

## Requirements

- Node.js 18 or newer (the built-in `fetch` is required)
- pnpm (or npm)
- No third-party packages are needed at runtime. Dev dependencies: `typescript`, `tsx`, `@types/node`
- Linux: opening the browser requires the `xdg-open` command (package `xdg-utils`)

## Running

If pnpm is not installed, enable it via corepack (bundled with Node.js) or install it with npm:

```bash
npm install -g pnpm
```

Install and run:

```bash
git clone <repository-url>
cd wiki-search-app
pnpm install
pnpm dev
```

The `Ignored build scripts: esbuild` warning during installation can be ignored.

Build and run the compiled version:

```bash
pnpm build      # compile to dist/
pnpm start      # build and run dist/main.js
```

With npm the same commands are: `npm install`, `npm run dev`, `npm start`.

On a machine without a graphical environment the browser will not open. The program prints the article URL instead, so you can open it manually.