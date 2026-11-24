# Memory Game

A two-player memory game built with **TypeScript**, **SCSS**, and **Vite**. Choose a visual theme, select a starting player and board size, then find matching pairs and collect points.

## Features

- **Two players:** Blue and Orange.
- **Four visual themes:** Code Vibes, Games, DA Projects, and Food. Each theme has its own colors and memory-card artwork.
- **Three board sizes:** 4 × 4 (16 cards), 4 × 6 (24 cards), and 6 × 6 (36 cards).
- **Randomized cards:** Card pairs are shuffled before each round.
- **Turn-based gameplay:** A successful match awards a point. If the cards do not match, they are turned face down and the turn switches to the other player.
- **Live settings preview:** Theme artwork can be previewed while choosing the game settings.
- **Score and result screens:** The final score is shown before the winner or draw screen appears.
- **Exit confirmation:** Leaving an active game requires confirmation.
- **Desktop-focused layout:** The game layout also includes adjustments for smaller notebook screens.

## Technologies

- HTML5
- TypeScript
- SCSS / Sass
- Vite

## Getting Started

### Requirements

- Node.js
- npm

### Installation

1. Clone or download this repository.
2. Open a terminal in the project directory.
3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in the terminal.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Runs the TypeScript check and creates the production build in `dist/`. |
| `npm run preview` | Serves the production build locally for testing. |

## How to Play

1. Open the Settings screen from the home screen.
2. Select a theme, a starting player, and a board size.
3. Start the game.
4. Select two cards to reveal them.
5. Matching cards award one point to the current player. If the cards do not match, they are turned face down and the turn passes to the other player.
6. The game ends when all pairs have been found. The player with the higher score wins; equal scores result in a draw.

## Project Structure

```text
src/
├── assets/          # Fonts, logos, theme previews, and memory-card images
├── data/            # Card collections, themes, and game settings
├── game-logic/      # Card generation, shuffling, and score/player logic
├── screens/         # Home, settings, game, and game-over screens
├── scss/
│   ├── abstract/    # Shared variables and mixins
│   ├── base/        # Reset and typography
│   ├── components/  # Shared component styles
│   ├── pages/       # Screen-specific layouts
│   └── themes/      # Theme-specific styles
├── types/           # TypeScript types and interfaces
└── main.ts          # Application entry point
```

## Production Build

Create the production version with:

```bash
npm run build
```

Vite writes the optimized website to the `dist/` directory. To test that build locally, run:

```bash
npm run preview
```

When deploying the game to a web server, upload the **contents** of `dist/` (including `index.html` and the `assets/` directory) to the web directory provided by the host.
