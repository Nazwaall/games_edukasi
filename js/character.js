// Character Render Engine (Uses custom mascot image: maskot_ce.png)
// Renders maskot_ce.png with rank aura, emotion overlay badges, and speech dialogues

class CharacterEngine {
  constructor(containerId, bubbleId) {
    this.container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    this.bubble = typeof bubbleId === 'string' ? document.getElementById(bubbleId) : bubbleId;
    this.currentRank = 'Bronze';
    this.currentEmotion = 'idle';
  }

  // Set & render mascot state
  render(rank = 'Bronze', emotion = 'idle', customDialogue = null) {
    this.currentRank = rank;
    this.currentEmotion = emotion;

    if (!this.container) return;

    const mascotHTML = this.generateMascotHTML(rank, emotion);
    this.container.innerHTML = mascotHTML;

    if (customDialogue && this.bubble) {
      this.setDialogue(customDialogue);
    }
  }

  // Update speech bubble text with bounce animation
  setDialogue(text) {
    if (!this.bubble) return;
    this.bubble.innerText = text;
    this.bubble.classList.remove('bounce-in');
    void this.bubble.offsetWidth; // trigger reflow
    this.bubble.classList.add('bounce-in');
  }

  // Generate Mascot HTML with maskot_ce.png & dynamic Rank Aura + Emotion Overlays
  generateMascotHTML(rank, emotion) {
    const detail = (typeof RANK_DETAILS !== 'undefined' && RANK_DETAILS[rank]) ? RANK_DETAILS[rank] : {
      name: rank,
      badge: "🥉",
      color: "#cd7f32"
    };

    // Emotion Effects & Animations
    let emotionOverlay = '';
    let animClass = 'idle-float';

    switch (emotion) {
      case 'happy':
        animClass = 'mascot-bounce';
        emotionOverlay = `
          <div class="mascot-emotion-badge happy-badge">
            <span>✨</span>
          </div>
        `;
        break;

      case 'excited':
        animClass = 'mascot-hype';
        emotionOverlay = `
          <div class="mascot-emotion-badge excited-badge">
            <span>🔥</span>
          </div>
        `;
        break;

      case 'sad':
        animClass = 'mascot-droop';
        emotionOverlay = `
          <div class="mascot-emotion-badge sad-badge">
            <span>💧</span>
          </div>
        `;
        break;

      case 'victory':
        animClass = 'mascot-triumph';
        emotionOverlay = `
          <div class="mascot-emotion-badge victory-badge">
            <span>👑</span>
          </div>
        `;
        break;

      case 'idle':
      default:
        animClass = 'idle-float';
        break;
    }

    return `
      <div class="mascot-avatar-frame ${animClass}">
        <!-- Aura Glow per Rank -->
        <div class="mascot-rank-aura" style="box-shadow: 0 0 35px ${detail.color}; background: radial-gradient(circle, ${detail.color}44 0%, transparent 70%);"></div>

        <!-- Maskot Image (maskot_ce.png) -->
        <img src="maskot_ce.png" alt="Maskot Game" class="mascot-img" />

        <!-- Rank Badge Floating Tag -->
        <div class="mascot-rank-tag" style="border-color: ${detail.color}">
          <span>${detail.badge} ${detail.name}</span>
        </div>

        <!-- Emotion Effect Badge -->
        ${emotionOverlay}
      </div>
    `;
  }

  // Generate contextual dialogue string based on game state & emotion
  getDialogue(action, extraData = {}) {
    const dialogues = {
      welcome: [
        "Ready? Ayo uji pengetahuanmu sampai Mythic! 🚀",
        "Selamat datang! Siap naik rank hari ini bersama maskotmu? 🔥",
        "Mulai dari Bronze dan buktikan kamu bisa mencapai Mythic! 👑"
      ],
      correct: [
        "Mantap! Jawabannya tepat sekali! 🔥",
        "Nice! Pengetahuanmu luar biasa! ✨",
        "Pintar! Lanjutkan tren positif ini! 💪",
        "You got it right! XP bertambah! ⭐"
      ],
      streak: [
        "UNSTOPPABLE! Streak x" + (extraData.streak || 3) + "! 🔥🔥🔥",
        "Luar Biasa! " + (extraData.streak || 3) + " Jawaban Benar Beruntun! ⚡",
        "Fokusmu tajam sekali! Keep the streak going! 🚀"
      ],
      wrong: [
        "Oops! Waktu atau jawaban belum pas, pelajari penjelasannya ya! 💡",
        "Belum tepat! Pelajari jawaban yang benar di bawah. 📚",
        "Sayang sekali! Tetap fokus untuk soal berikutnya! 💪"
      ],
      warningStar: [
        "Hati-hati! Bintangmu berkurang 1! Tetap teliti & perhatikan waktu! ⚠️",
        "Awas! Jangan sampai salah lagi agar tidak gagal di level ini! ⭐️"
      ],
      levelComplete: [
        "SELAMAT! Level berhasil diselesaikan dengan sukses! 🎉",
        "Hebat! Kamu berhasil mengumpulkan XP dan Bintang penuh! 🏆"
      ],
      rankUp: [
        "LET'S GO! RANK UP TO " + (extraData.newRank || 'SILVER') + "! 👑✨",
        "INCRÉDIBLE! Rank Barumu Telah Terbuka! 🌌"
      ],
      gameOver: [
        "Bintang habis atau waktu kehabisan! Coba lagi ya! 🔄",
        "Kegagalan adalah tangga menuju Mythic! Klik Retry! 💪"
      ],
      previewCorrect: [
        "Hebat! Kamu punya bekal mantap untuk rank ini! ✨",
        "Correct! Siap untuk kuis utama rank ini? 🚀"
      ],
      previewWrong: [
        "Belum tepat! Coba pelajari penjelasannya di bawah ya. 💡",
        "Ups! Nanti di kuis utama pasti kamu bisa menjawabnya! 💪"
      ]
    };

    const list = dialogues[action] || dialogues.welcome;
    return list[Math.floor(Math.random() * list.length)];
  }
}
