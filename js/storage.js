// LocalStorage State Manager
// Handles automatic game progress persistence & reset logic

const STORAGE_KEY = "UJI_PENGETAHUAN_RANK_GAME_V1";

const DEFAULT_STATE = {
  currentRank: "Bronze",
  currentLevel: 1,
  xp: 0,
  stars: 3,
  highScore: 0,
  bestStreak: 0,
  unlockedRanks: ["Bronze"],
  completedLevels: [],
  soundEnabled: true
};

class StorageManager {
  static load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return { ...DEFAULT_STATE };
      }
      const parsed = JSON.parse(data);
      // Merge defaults in case new properties were added
      return { ...DEFAULT_STATE, ...parsed };
    } catch (e) {
      console.warn("Failed to read localStorage:", e);
      return { ...DEFAULT_STATE };
    }
  }

  static save(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn("Failed to write localStorage:", e);
    }
  }

  static reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear localStorage:", e);
    }
    return { ...DEFAULT_STATE };
  }
}
