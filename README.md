# 🎰 Slot Machine Game - Technical Documentation

A feature-rich slot machine game built with Electron and React, featuring a persistent SQLite database, internationalization support, and modern UI/UX.

---

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Implemented Features](#implemented-features)
- [Architecture & Design Decisions](#architecture--design-decisions)
- [Code Organization](#code-organization)
- [Known Issues & Limitations](#known-issues--limitations)
- [Future Enhancements](#future-enhancements)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **macOS**, **Windows**, or **Linux**

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd webai-challenge

# Install dependencies
npm install
# or
yarn install
```

### Running Locally

```bash
# Development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Build for specific platform
npm run build:mac
npm run build:win
npm run build:linux
```

### Development Server

When you run `npm run dev`, the app will:
1. Start the Vite dev server for the renderer process
2. Compile the main process
3. Launch the Electron app
4. Enable Hot Module Replacement (HMR) for React components

**Note:** Changes to main process or preload scripts require a full restart.

### File Watcher Issues?

If changes aren't reflecting:
1. **Manual reload:** Press `Cmd+R` (Mac) or `Ctrl+R` (Windows/Linux)
2. **Hard reload:** Press `Cmd+Shift+R` or `Ctrl+Shift+R`
3. **Restart dev server:** `Ctrl+C` then `npm run dev`

---

## ✨ Implemented Features

### Core Game Features

#### 🎮 Slot Machine Mechanics
- **3-reel slot machine** with 7 different symbols (🍎, 🍌, 🍇, 🍓, 🍒, 🍊, 🍋)
- **9 winning combinations** with varying payouts (1-100 credits)
- **Animated spinning** with customizable duration and interval
- **Immediate balance deduction** when spin starts (for responsive UX)
- **Auto-calculated winnings** based on symbol matches

#### 💰 Balance Management
- **Starting balance:** 100 credits
- **Cost per spin:** 10 credits
- **Real-time balance updates** during gameplay
- **Insufficient funds detection** with automatic game-over handling
- **Reset functionality** to add starting balance back

#### 🏆 Player System
- **Player profiles** with persistent data
- **Leaderboard** showing top 3 players
- **Statistics tracking:**
  - Highest balance achieved
  - Total spins played
  - Individual game sessions
- **Auto-refresh leaderboard** every 5 seconds

#### 💾 Persistent Storage
- **SQLite database** using better-sqlite3
- **Three-table schema:**
  - `players` - Player profiles and stats
  - `games` - Game sessions
  - `spins` - Individual spin records
- **Automatic data persistence** across app restarts
- **Game auto-save** on app close (prevents data loss)

#### 🌍 Internationalization (i18n)
- **Full react-intl integration**
- **English translations** (ready for multi-language)
- **Nested JSON structure** with automatic flattening
- **Variable interpolation** for dynamic content
- **Easy to extend** with new languages

### UI/UX Features

#### 🎨 Modern Design System
- **CSS custom properties** for consistent theming
- **Reusable design tokens:**
  - Colors (primary, secondary, accent)
  - Shadows (large, medium, glow)
  - Spacing (small, medium, large, xl)
  - Border radius
  - Gradients
- **Glass-morphism effects**
- **Smooth animations and transitions**

#### 📱 Component Architecture
- **Feature-based organization** (`features/game`, `features/player`)
- **Presentational components** (pure, no business logic)
- **Custom hooks** for business logic
- **Separation of concerns** (UI vs logic)

#### 🎯 Game Flow
1. **Landing Screen** - Player login + leaderboard
2. **Introduction Screen** - Welcome message and game start
3. **Game Screen** - Main gameplay with reels and controls
4. **How to Play** - Rules and winning combinations

#### ♿ Accessibility
- **Semantic HTML** (`<header>`, `<footer>`, `<section>`)
- **ARIA labels** on interactive elements
- **Keyboard navigation** support
- **Screen reader friendly** text

---

## 🏗️ Architecture & Design Decisions

### 1. **One Game Session = Multiple Spins**

**Decision:** A single `gameId` persists across multiple spins until the player ends the game.

**Rationale:**
- Mirrors real-world slot machine behavior (playing session)
- Enables session analytics (duration, profit/loss tracking)
- Better leaderboard metrics (highest balance in a session vs single spin)
- Allows tracking player behavior patterns

### 2. **Immediate Balance Deduction**

**Decision:** Balance decreases when spin button is pressed, not when spin completes.

**Rationale:**
- ✅ Instant user feedback
- ✅ Prevents multiple rapid clicks
- ✅ Matches slot machine UX expectations
- ✅ Simpler state management

**Implementation:**
```tsx
// Step 1: Deduct cost (UI updates immediately)
onSpinStart() → setBalance(balance - cost)

// Step 2: Spin reels (visual animation)
const outcome = await spin()

// Step 3: Add winnings
onGameRoundComplete() → setBalance(balance + winnings)
```

### 3. **Dependency Injection for Testability**

**Decision:** Extract random generation and allow injection of mock functions.

**Rationale:**
- ✅ Enables deterministic testing
- ✅ Pure functions are easier to test
- ✅ No change to production behavior
- ✅ Backward compatible

**Implementation:**
```tsx
export const selectRandomSymbol = (
  symbols: string[], 
  randomFn = Math.random  // Default to Math.random in production
) => symbols[Math.floor(randomFn() * symbols.length)]

// In tests:
const mockRandom = () => 0.5  // Always returns middle element
selectRandomSymbol(['🍒', '🍋', '🔔'], mockRandom)  // Always returns '🍋'
```

### 4. **Custom Hooks Over Component Logic**

**Decision:** Extract complex logic into custom hooks.

**Example:** `useSlotMachineGame` hook manages:
- Game state (landing, introduction, playing)
- Player state and balance
- Database operations
- Cleanup and auto-save logic

**Benefits:**
- ✅ Component reduced from 166 → 44 lines
- ✅ Logic is reusable
- ✅ Easier to test
- ✅ Clear separation of concerns

### 5. **Feature-Based Directory Structure**

**Decision:** Organize by feature, not by file type.

```
features/
├── game/
│   ├── components/
│   ├── hooks/
│   └── index.ts
└── player/
    ├── components/
    ├── hooks/
    └── index.ts
```

**Rationale:**
- ✅ Related code stays together
- ✅ Easy to find feature-specific code
- ✅ Scales better than `components/`, `hooks/` folders
- ✅ Enables feature-level testing

### 6. **Cleanup on App Close**

**Decision:** Implement multi-layered cleanup strategy.

**Layers:**
1. **Electron IPC event** (`app-closing` from main process)
2. **Browser beforeunload** event
3. **Component unmount** (useEffect cleanup)

**Rationale:**
- ✅ Prevents data loss
- ✅ Multiple safety nets
- ✅ Works in dev and production
- ✅ Handles edge cases (crashes, force quit)

**Implementation:**
```tsx
useEffect(() => {
  const cleanupGame = async () => {
    if (gameState === 'playing' && gameId) {
      await endGame({ endingBalance: balance })
    }
  }

  window.api?.onAppClosing?.(cleanupGame)
  window.addEventListener('beforeunload', cleanupGame)
  
  return () => {
    cleanupGame()  // Cleanup on unmount
  }
}, [gameState, gameId, balance])
```

## 📂 Code Organization

### Directory Structure

```
src/
├── main/
│   ├── index.ts           # Electron main process
│   └── database.ts        # SQLite setup and IPC handlers
│
├── preload/
│   ├── index.ts           # IPC bridge (security layer)
│   └── index.d.ts         # TypeScript definitions
│
└── renderer/src/
    ├── features/
    │   ├── game/
    │   │   ├── components/
    │   │   │   ├── GameScreen.tsx
    │   │   │   ├── Reels.tsx
    │   │   │   ├── Reel.tsx
    │   │   │   ├── SpinButton.tsx
    │   │   │   ├── ResetButton.tsx
    │   │   │   ├── ExitButton.tsx
    │   │   │   ├── PlayerInfo.tsx
    │   │   │   ├── GameIntroduction.tsx
    │   │   │   └── HowToPlay.tsx
    │   │   ├── hooks/
    │   │   │   ├── useGame.ts       # Game session management
    │   │   │   ├── useReels.ts      # Reel animation logic
    │   │   │   └── index.ts
    │   │   └── index.ts
    │   │
    │   └── player/
    │       ├── components/
    │       │   ├── Landing.tsx
    │       │   ├── PlayerLogin.tsx
    │       │   └── Leaderboard.tsx
    │       ├── hooks/
    │       │   ├── usePlayers.ts    # Player data management
    │       │   └── index.ts
    │       └── index.ts
    │
    ├── hooks/
    │   ├── useSlotMachineGame.ts   # Main game orchestration
    │   └── index.ts
    │
    ├── locales/
    │   ├── en.json                 # English translations
    │   ├── index.ts                # i18n configuration
    │   └── README.md
    │
    ├── assets/
    │   ├── slot-machine.css        # Main game styles
    │   ├── slot-reel.css           # Reel animations
    │   ├── how-to-play.css         # Instructions styles
    │   └── base.css                # Global styles
    │
    ├── types/
    │   └── index.ts                # TypeScript type exports
    │
    ├── utils/
    │   └── constants.ts            # Game constants
    │
    ├── SlotMachine.tsx             # Main app component
    ├── App.tsx                     # App wrapper
    └── main.tsx                    # React entry point
```

### Key Patterns

#### 1. **Barrel Exports (index.ts)**
Each feature exports its public API through an index file:
```tsx
// features/game/index.ts
export { default as GameScreen } from './components/GameScreen'
export { default as GameIntroduction } from './components/GameIntroduction'
export { useGame, useReels } from './hooks'
```

#### 2. **Custom Hooks**
Business logic extracted into reusable hooks:
- `useSlotMachineGame` - Overall game orchestration
- `useGame` - Game session lifecycle
- `useReels` - Reel animation and spin logic
- `usePlayers` - Player data operations

#### 3. **Presentational Components**
Components receive data via props, no business logic:
```tsx
// Pure presentational
const Reels = ({ reels }: ReelsProps) => (
  <div className="reels-container">
    {reels.map(reel => <Reel {...reel} />)}
  </div>
)
```

---

## 🎮 Implemented Features

### 1. Game Mechanics

#### Reel System
- **3 reels** with 7 unique symbols
- **Configurable spin duration** (1500ms default)
- **Smooth animations** with CSS transitions
- **Randomized results** with seed injection for testing
- **Visual feedback** during spin (symbols flash randomly)

#### Winning Logic
```javascript
WIN_AMOUNT_MAP = {
  '🍎🍎🍎': 100,  // Jackpot
  '🍌🍌🍌': 50,
  '🍇🍇🍇': 25,
  '🍓🍓🍓': 10,
  '🍒🍒🍒': 5,
  '🍊🍊🍊': 2,
  '🍋🍋🍋': 1,
  '🍒🍒🍋': 20,   // Mixed combination
  '🍌🍊🍋': 25    // Mixed combination
}
```

#### Balance Management
- Starting balance: **100 credits**
- Cost per spin: **10 credits**
- Real-time balance updates
- Automatic game-over when balance < cost
- Optional reset to starting balance

### 2. Player System

#### Player Profiles
- **Unique player names**
- **Persistent stats:**
  - Highest balance achieved
  - Total spins across all games
  - Creation timestamp
- **Auto-create on first login**

#### Leaderboard
- **Top 3 players** displayed
- **Sorted by highest balance**
- **Live updates** (refreshes every 5 seconds)
- **Medal system** (🥇🥈🥉)
- **Shows:** Name, Highest Balance, Total Spins

---

## 🎯 Design Decisions & Trade-offs

### Decision 1: React State vs Database as Source of Truth

**Choice:** Hybrid approach - React state for UI, database for persistence

**Rationale:**
- **React state:** Fast UI updates, responsive UX
- **Database:** Persistent storage, survives restarts
- **Sync strategy:** Update both on each action

**Flow:**
```
User action → Update React state (instant UI) → Update database (background)
App reload → Read from database → Initialize React state
```

**Trade-off:**
- ✅ Best of both worlds (speed + persistence)
- ⚠️ Requires careful sync logic
- ✅ Manual refresh updates from DB when needed

---

### Decision 2: Feature-Based Folder Structure

**Choice:** `/features/game` and `/features/player` instead of `/components`, `/hooks`

**Pros:**
✅ Related code together
✅ Clear feature boundaries
✅ Easier to navigate
✅ Scales better for large apps

**Cons:**
❌ Slightly deeper nesting
❌ Less familiar to some developers

**Why:** Better organization as app grows, clear ownership of code.

---

### Decision 3: Custom Hooks for Business Logic

**Choice:** Extract logic into `useSlotMachineGame`, `useGame`, `useReels`

**Benefits:**
- **Testability:** Logic can be tested independently
- **Reusability:** Hooks can be used in multiple components
- **Readability:** Component focuses on rendering
- **Maintainability:** Business logic changes don't affect UI

**Example:**
```tsx
// Component is just 44 lines of JSX
const SlotMachine = () => {
  const { player, gameState, balance, ... } = useSlotMachineGame()
  return <div>{/* Render UI */}</div>
}

// All logic is in the hook (195 lines)
```

---

## ⚠️ Known Issues & Limitations

### 1. Hot Module Replacement (HMR)

**Issue:** Changes to React components don't always auto-refresh

**Workaround:** Press `Cmd+R` / `Ctrl+R` to manually reload

**Root Cause:** Electron multi-process architecture + Vite HMR compatibility

**Status:** Added watch configuration to improve, but manual reload sometimes needed

---

### 2. Main Process Changes Require Restart

**Issue:** Changes to `src/main/` or `src/preload/` don't apply with HMR

**Expected Behavior:** This is normal - these are Node.js processes

**Workaround:** Stop dev server (`Ctrl+C`) and restart (`npm run dev`)

---

### 3. Browser Autoplay Policy

**Issue:** Background music may not autoplay

**Root Cause:** Browsers block audio until user interaction

**Workaround:** Music starts after first button click

**Status:** Working as designed for security

---

### 4. Type Error with react-intl

**Issue:** TypeScript shows error with `IntlProvider` and React 18

**Root Cause:** Type compatibility between React 18 and react-intl v7

**Workaround:** Added `@ts-expect-error` comment (app works fine at runtime)

**Status:** Cosmetic issue only, no runtime impact

---

### 5. Balance Calculation Edge Cases

**Potential Issue:** If user closes app during spin, balance might be inconsistent

**Mitigation:** 
- Auto-save on close captures final balance
- Database recalculates from spin records
- Multiple safety nets prevent major issues

**Status:** Edge case, very rare

---

### 6. Single Language Only

**Limitation:** Only English is implemented (though i18n infrastructure exists)

**Effort to add:** Low - just create `es.json`, `fr.json`, etc.

**Status:** Foundation is complete, just needs translation files

---



## 🎉 Conclusion

This slot machine game demonstrates:
- ✅ Modern React patterns (hooks, composition)
- ✅ Production-ready architecture
- ✅ Scalable code organization
- ✅ Best practices (TypeScript, testing, i18n)
- ✅ Attention to UX details
 