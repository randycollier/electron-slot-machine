# 🎰 Slot Machine Game - Submission Package

## 📦 Package Contents

This ZIP file contains a fully functional slot machine game built with Electron, React, and TypeScript.

### What's Included:

✅ **Complete Source Code**
- All React components
- Custom hooks for game logic
- TypeScript type definitions
- SQLite database integration

✅ **Sample Database** (`sample-database/`)
- Pre-populated with player data
- Includes game history and spin records
- Ready to demonstrate leaderboard functionality

✅ **Documentation**
- `README.md` - Quick start guide
- Code comments and JSDoc
- Internationalization setup

✅ **Configuration Files**
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `electron.vite.config.ts` - Build configuration
- ESLint and Prettier configs

---

## 🚀 Quick Start

### 1. Extract the ZIP file
```bash
unzip webai-challenge-with-db.zip
cd webai-challenge
```

### 2. Install Dependencies
```bash
npm install
```
*This will download ~600 MB of dependencies (may take 2-5 minutes)*

### 3. Run the Application
```bash
npm run dev
```

The Electron app will launch automatically!

---

## 🎮 How to Play

1. **Enter your name** on the landing screen
2. **Click "Start Playing"** to begin
3. **Press "Spin"** to spin the reels (costs 10 credits)
4. **Match symbols** to win prizes (1-100 credits)
5. **Build your balance** and compete for the leaderboard!

---

## 🏆 Features Implemented

### Core Gameplay
- ✅ 3-reel slot machine with animated spinning
- ✅ 7 unique symbols (🍎, 🍌, 🍇, 🍓, 🍒, 🍊, 🍋)
- ✅ 9 winning combinations with varying payouts
- ✅ Real-time balance tracking
- ✅ Automatic game-over detection

### Player System
- ✅ Player profiles with persistent data
- ✅ Leaderboard showing top 3 players
- ✅ Statistics tracking (highest balance, total spins)
- ✅ Auto-refresh leaderboard every 5 seconds

### Database
- ✅ SQLite database for data persistence
- ✅ Players, games, and spins tracked
- ✅ Auto-save on app close (no data loss)
- ✅ Sample data included for demonstration

### Technical Features
- ✅ Full TypeScript implementation
- ✅ Internationalization ready (react-intl)
- ✅ Testable architecture with dependency injection
- ✅ Modern React patterns (hooks, composition)
- ✅ CSS custom properties for theming

---

## 🗄️ Sample Database

The `sample-database/` folder contains a pre-populated database with:

**Players:**
- Randy (Balance: 180, Spins: 41)
- r (Balance: 115, Spins: 50)
- Tom (Balance: 0, Spins: 1)

**To use the sample data:**

### macOS:
```bash
mkdir -p ~/Library/Application\ Support/webai-challenge/
cp sample-database/slotmachine.db* ~/Library/Application\ Support/webai-challenge/
npm run dev
```

### Windows:
```powershell
mkdir $env:APPDATA\webai-challenge
copy sample-database\slotmachine.db* $env:APPDATA\webai-challenge\
npm run dev
```

### Linux:
```bash
mkdir -p ~/.config/webai-challenge/
cp sample-database/slotmachine.db* ~/.config/webai-challenge/
npm run dev
```

**Or start fresh:** Just run `npm run dev` - the app will create a new database automatically!

---

## 🛠️ Available Scripts

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Format code
npm run format

# Lint code
npm run lint
```

---

## 📋 Project Structure

```
webai-challenge/
├── src/
│   ├── main/              # Electron main process
│   │   ├── index.ts       # App entry point
│   │   └── database.ts    # SQLite setup
│   ├── preload/           # IPC bridge
│   └── renderer/src/      # React app
│       ├── features/
│       │   ├── game/      # Game components & logic
│       │   └── player/    # Player/leaderboard
│       ├── hooks/         # Custom hooks
│       ├── locales/       # Translations
│       └── assets/        # Styles and images
├── sample-database/       # Sample SQLite database
├── package.json
└── README.md
```

---

## 🔧 Technical Stack

- **Electron** - Desktop app framework
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **better-sqlite3** - SQLite database
- **react-intl** - Internationalization

---

## 📊 Code Quality

- ✅ **Zero linter errors**
- ✅ **Full TypeScript coverage**
- ✅ **ESLint + Prettier** configured
- ✅ **Organized code structure**
- ✅ **Comprehensive error handling**

---

## 🎯 Design Highlights

### Architecture
- **Feature-based organization** for scalability
- **Custom hooks** for business logic separation
- **Presentational components** for clean UI
- **Dependency injection** for testability

### Database Design
- **Normalized schema** (players → games → spins)
- **Foreign key constraints** for data integrity
- **Automatic stats calculation**
- **WAL mode** for better performance

### UX
- **Immediate balance feedback** when spinning
- **Auto-save** prevents data loss
- **Clear visual states** (spinning, disabled, game over)
- **Responsive design** with modern animations

---

## ⚠️ Known Limitations

1. **HMR (Hot Module Replacement)** - Sometimes requires manual reload (Cmd+R)
2. **Main process changes** - Require dev server restart
3. **Single language** - Only English implemented (i18n infrastructure ready)
4. **Fixed bet amount** - All spins cost 10 credits

*See README.md for troubleshooting details*

---

## 💡 Future Enhancements

Potential features to add:
- Variable betting amounts
- Win animations and sound effects
- Achievements system
- Game history replay
- Multiple language support
- Dark/light theme toggle

---

## 📞 Support

If you encounter issues:

1. **Check Node.js version:** Must be 16 or higher
2. **Delete and reinstall:** Remove `node_modules/` and run `npm install` again
3. **Check console:** Open DevTools (Cmd+Option+I) for error messages
4. **Restart dev server:** Stop (Ctrl+C) and run `npm run dev` again

---

## ✅ Verification Checklist

After extracting and installing:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts the app
- [ ] Can create a player and see the landing screen
- [ ] Can spin the reels and see balance changes
- [ ] Leaderboard displays (with sample data if copied)
- [ ] Game saves when closing the app

---

## 🎉 Ready to Run!

This package contains everything needed to run the slot machine game locally. No additional setup required beyond `npm install`.

**Enjoy! 🎰**

