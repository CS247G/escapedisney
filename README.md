🏰 Disney Escape Room

An immersive digital escape room experience that takes players through four magical Disney lands. Complete challenges, solve puzzles, and collect numbers to escape the most magical place on earth!

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (version 14 or higher) - [Download here](https://nodejs.org/)
- **npm** package manager (comes with Node.js)

### Running the Game Locally

1. **Download the project**
   ```bash
   git clone https://github.com/c2boo/escapedisney.git
   ```

2. **Navigate to the game directory**
   ```bash
   cd escapedisney/web
   ```

3. **Install required packages**
   ```bash
   npm install
   ```

4. **Start the game**
   ```bash
   npm start
   ```

5. **Open your browser**
   - The game will automatically open at `http://localhost:3000`
   - If it doesn't open automatically, manually go to that address

### Stopping the Game
- Press `Ctrl + C` in your terminal to stop the local server

---

## 🎮 How to Play

### Game Objective
**Collect four special numbers from each Disney land to form your final escape code!**

### Getting Started
1. **Launch the Game**: Open `http://localhost:3000` in your browser
2. **Click "Begin Your Adventure"** on the main page
3. **Read the Instructions** to understand the game mechanics
4. **Choose Your Land**: Select any available Disney land to start
5. **Complete Challenges**: Solve puzzles in each land to earn numbers
6. **Test Your Escape Code**: Use the tester at the bottom of the land selection page
7. **Escape**: Enter all four numbers in the correct order to win!

---

## 🗺️ Land Challenges Guide

### 🏠 Toontown - Hidden Mickey Hunt
**Goal**: Find 5 hidden Mickey logos

**Instructions**:
- Look carefully around the Toontown scene
- **Click directly on each Mickey logo** when you spot it
- Some logos are well-hidden - check behind objects and in corners
- Complete all 5 to earn your number

**Tips**: Take your time and scan every part of the scene systematically

---

### 🏰 Fantasyland - Enchanted Crossword
**Goal**: Solve a magical crossword puzzle

**Instructions**:
1. **Listen to the audio riddle** (make sure your sound is on)
2. **Solve the crossword puzzle** that appears
3. **Find the blue highlighted word** in your completed crossword
4. **Enter that word** in the game
5. **Wait 5 minutes** if you need a hint

**Tips**: The audio contains crucial clues for solving the crossword

---

### 🚀 Tomorrowland - Space Shooting Gallery
**Goal**: Complete 4 levels of space target practice

**Instructions**:
- **Aim and click** to shoot at space-themed targets
- **Earn points** by hitting good targets
- **Avoid villain targets** (they subtract points)
- **Reach the score goals** for each level:
  - Level 1: 500 points
  - Level 2: 800 points  
  - Level 3: 1500 points
  - Level 4: 2500 points

**Tips**: Focus on accuracy over speed - each shot counts!

---

### 🗺️ Adventureland - Treasure Hunt
To be played in-person!

---

## 🛠️ Troubleshooting

### Game Won't Start
- Make sure Node.js is installed: `node --version`
- Check you're in the right directory: `cd escapedisney/web`
- Try deleting `node_modules` and running `npm install` again

### Audio Not Playing
- Check your browser's audio settings
- Make sure your computer volume is up
- Try refreshing the page

### Game Appears Broken
- Try clearing your browser cache
- Make sure you're using a modern browser (Chrome, Firefox, Safari, Edge)
- Check the browser console for error messages (press F12)

### Port Already in Use
- If you see "port 3000 is already in use":
  ```bash
  # Kill any existing processes
  npx kill-port 3000
  # Then restart
  npm start
  ```

---

## 🎯 Gameplay Tips

- **Take your time** - the experience is designed to be enjoyed, not rushed
- **Work as a team** - some challenges benefit from multiple perspectives  
- **Listen carefully** to audio clues - they contain important information
- **Explore thoroughly** - hidden elements reward careful observation
- **Don't hesitate** to replay audio or revisit areas
- **Use the escape code tester** to check your progress anytime

---

## 🎨 Technical Details

### Built With
- **React.js** - Frontend framework
- **Styled Components** - Dynamic styling
- **HTML5 Audio API** - Immersive sound
- **CSS Animations** - Smooth interactions

### Features
- Responsive design for different screen sizes
- Local progress tracking across different lands


---

## 🎪 About

Created as part of a game design course focusing on interactive experiences and player engagement. This escape room combines digital exploration with puzzle-solving to create an engaging hybrid experience that encourages collaboration and problem-solving across different challenge types.
