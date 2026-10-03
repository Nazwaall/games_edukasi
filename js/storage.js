// LocalStorage State Manager for Knowledge Quest Adventure Game

const STORAGE_KEY = "KNOWLEDGE_QUEST_ADVENTURE_V1";

const DEFAULT_STATE = {
  currentRank: "Bronze",
  unlockedRanks: ["Bronze"],   // ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic']
  completedMaps: [],           // ['Bronze', 'Silver', ...]
  xp: 0,
  stars: 3,
  completedCheckpoints: [],    // e.g. [1, 2]
  unlockedGates: [],           // e.g. [1, 2]
  playerPos: { x: 120, y: 550 },
  bestStreak: 0,
  soundEnabled: true
};

class StorageManager {
  static load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return { ...DEFAULT_STATE };
      const parsed = JSON.parse(data);
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
