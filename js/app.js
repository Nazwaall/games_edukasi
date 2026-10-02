// Main Application Logic & Game Loop
// Integrates state management, mascot character rendering, questions database, audio synth, countdown timer, and screen transitions

class EducationalGameApp {
  constructor() {
    // Game State initialized from LocalStorage
    this.state = StorageManager.load();

    // Active Gameplay Session State
    this.session = {
      activeRank: "Bronze",
      currentQuestionIndex: 0,
      questionsList: [],
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      stars: 3,
      consecutiveErrors: 0,
      currentStreak: 0,
      bestStreak: 0,
      xpEarned: 0,
      isAnswered: false
    };

    // Countdown Timer Settings
    this.timerSettings = {
      durationPerQuestion: 20, // 20 Seconds per question
      remaining: 20,
      intervalId: null
    };

    // Character Mascot Instances
    this.charHome = new CharacterEngine('home-character-container', 'home-speech-bubble');
    this.charMateri = new CharacterEngine('materi-character-container', 'materi-speech-bubble');
    this.charGameplay = new CharacterEngine('gameplay-character-container', 'gameplay-speech-bubble');
    this.charResult = new CharacterEngine('result-character-container', null);
    this.charRankUp = new CharacterEngine('rank-up-character-container', 'rank-up-speech');

    // Canvas Background & Confetti
    this.particleCtx = null;
    this.confettiCtx = null;
    this.confettiParticles = [];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.initParticleCanvas();
    this.syncHeaderUI();
    this.renderHomeScreen();
  }

  // Sync header rank pill & sound toggle state
  syncHeaderUI() {
    const rankPill = document.getElementById('header-rank-pill');
    const soundIcon = document.getElementById('sound-icon');
    
    if (rankPill) {
      const detail = RANK_DETAILS[this.state.currentRank] || RANK_DETAILS.Bronze;
      rankPill.querySelector('.pill-badge').innerText = detail.badge;
      rankPill.querySelector('.pill-name').innerText = detail.name;
      rankPill.style.borderColor = detail.color;
    }

    if (soundIcon) {
      soundIcon.innerText = this.state.soundEnabled ? '🔊' : '🔇';
    }

    gameAudio.setEnabled(this.state.soundEnabled);
  }

  // Save current player progress to localStorage
  saveProgress() {
    StorageManager.save(this.state);
    this.syncHeaderUI();
  }

  // Screen Switcher
  switchScreen(screenId) {
    this.stopQuestionTimer(); // Always stop timer when switching screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }
  }

  // Setup DOM Click Handlers
  setupEventListeners() {
    // Header Logo -> Home Screen
    document.getElementById('header-logo-btn').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderHomeScreen();
    });

    // Sound Toggle
    document.getElementById('sound-toggle-btn').addEventListener('click', () => {
      this.state.soundEnabled = !this.state.soundEnabled;
      this.saveProgress();
      gameAudio.playClick();
    });

    // Reset Progress Modal Trigger
    document.getElementById('reset-modal-btn').addEventListener('click', () => {
      gameAudio.playClick();
      this.showModal('reset-modal');
    });

    document.getElementById('btn-cancel-reset').addEventListener('click', () => {
      gameAudio.playClick();
      this.hideModal('reset-modal');
    });

    document.getElementById('btn-confirm-reset').addEventListener('click', () => {
      gameAudio.playClick();
      this.state = StorageManager.reset();
      this.saveProgress();
      this.hideModal('reset-modal');
      this.renderHomeScreen();
    });

    // Home Screen Actions
    document.getElementById('btn-play-now').addEventListener('click', () => {
      gameAudio.playClick();
      this.startGameplay(this.state.currentRank);
    });

    document.getElementById('btn-materi-preview').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderMateriScreen();
    });

    document.getElementById('btn-ranks-ladder').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderRankScreen();
    });

    document.getElementById('btn-how-to-play').addEventListener('click', () => {
      gameAudio.playClick();
      this.showModal('how-to-play-modal');
    });

    document.getElementById('btn-about').addEventListener('click', () => {
      gameAudio.playClick();
      this.showModal('about-modal');
    });

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn, .modal-close-btn-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        gameAudio.playClick();
        const modal = e.target.closest('.modal-overlay');
        if (modal) modal.classList.add('hidden');
      });
    });

    // Materi Screen Navigation
    document.getElementById('btn-back-home-materi').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderHomeScreen();
    });

    document.getElementById('btn-ready-play-now').addEventListener('click', () => {
      gameAudio.playClick();
      this.startGameplay(this.state.currentRank);
    });

    // Gameplay Screen Answer Options
    const optButtons = document.querySelectorAll('.option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(btn.getAttribute('data-index'), 10);
        this.handleAnswerSelection(idx);
      });
    });

    document.getElementById('btn-next-question').addEventListener('click', () => {
      gameAudio.playClick();
      this.advanceQuestion();
    });

    // Result Screen Actions
    document.getElementById('btn-result-main').addEventListener('click', () => {
      gameAudio.playClick();
      if (this.session.stars > 0) {
        // Next Level or Rank
        this.checkLevelProgression();
      } else {
        // Retry Level
        this.startGameplay(this.session.activeRank);
      }
    });

    document.getElementById('btn-result-home').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderHomeScreen();
    });

    // Rank Screen Navigation
    document.getElementById('btn-back-home-rank').addEventListener('click', () => {
      gameAudio.playClick();
      this.renderHomeScreen();
    });

    document.getElementById('btn-play-current-rank').addEventListener('click', () => {
      gameAudio.playClick();
      this.startGameplay(this.state.currentRank);
    });

    // Rank Up Overlay Claim Button
    document.getElementById('btn-continue-rankup').addEventListener('click', () => {
      gameAudio.playClick();
      this.hideModal('rank-up-overlay');
      this.startGameplay(this.state.currentRank);
    });
  }

  // Modal Display Utilities
  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.remove('hidden');
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.classList.add('hidden');
  }

  // ==========================================================================
  // 1. HOME SCREEN RENDER
  // ==========================================================================
  renderHomeScreen() {
    this.switchScreen('home-screen');
    const dialogue = this.charHome.getDialogue('welcome');
    this.charHome.render(this.state.currentRank, 'idle', dialogue);
  }

  // ==========================================================================
  // 2. MATERI & PREVIEW SCREEN RENDER
  // ==========================================================================
  renderMateriScreen() {
    this.switchScreen('materi-screen');
    this.charMateri.render(this.state.currentRank, 'idle', "Coba lihat contoh soalnya dulu! Soal di preview ini berbeda dengan kuis utama lho! 🔥");

    // Render Filter Rank Tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
      tab.onclick = () => {
        gameAudio.playClick();
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const selectedRank = tab.getAttribute('data-rank');
        this.renderMateriCards(selectedRank);
      };
    });

    this.renderMateriCards('ALL');
    this.renderInteractivePreviewQuestions();
  }

  // Render Syllabus / Overview Cards per Rank
  renderMateriCards(filterRank = 'ALL') {
    const grid = document.getElementById('materi-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';

    const ranksToDisplay = filterRank === 'ALL' 
      ? ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic']
      : [filterRank];

    ranksToDisplay.forEach(rankKey => {
      const detail = RANK_DETAILS[rankKey];
      if (!detail) return;

      const card = document.createElement('div');
      card.className = 'materi-card';
      card.style.background = detail.bgGradient;
      card.style.borderColor = detail.color;

      const topicsHTML = detail.topics.map(t => `<span class="topic-chip">${t}</span>`).join('');

      card.innerHTML = `
        <div class="materi-card-header">
          <div class="materi-rank-badge">
            <span class="badge-icon">${detail.badge}</span>
            <div>
              <div class="rank-title" style="color: ${detail.color}">${detail.name}</div>
              <div class="level-tag">${detail.levelTitle}</div>
            </div>
          </div>
          <span class="diff-badge" style="color: ${detail.color}">${detail.difficultyBadge}</span>
        </div>

        <div class="materi-section-block">
          <h4>📌 Materi Pokok:</h4>
          <div class="materi-topics-list">${topicsHTML}</div>
        </div>

        <div class="materi-section-block">
          <h4>💡 Kemampuan yang Diuji:</h4>
          <p class="ability-text">"${detail.sampleAbility}"</p>
        </div>

        <div class="tip-box">
          <strong>Tips:</strong> ${detail.tip}
        </div>
      `;

      grid.appendChild(card);
    });
  }

  // Render Interactive Sample Questions for "Spill Soalnya!" (Uses PREVIEW_QUESTION_DATABASE)
  renderInteractivePreviewQuestions() {
    const container = document.getElementById('preview-questions-list');
    if (!container) return;

    container.innerHTML = '';

    const sampleRanks = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];

    sampleRanks.forEach((rankKey) => {
      // Pull dedicated preview question (completely separate from main quiz database!)
      const q = PREVIEW_QUESTION_DATABASE[rankKey];
      if (!q) return;

      const detail = RANK_DETAILS[rankKey];

      const itemCard = document.createElement('div');
      itemCard.className = 'preview-item-card';

      const optionsHTML = q.options.map((optText, idx) => `
        <button class="preview-opt-btn" data-rank="${rankKey}" data-opt="${optText}">${String.fromCharCode(65 + idx)}. ${optText}</button>
      `).join('');

      itemCard.innerHTML = `
        <div class="preview-item-meta">
          <span>${detail.badge} <strong>${detail.name}</strong> (${detail.levelTitle})</span>
          <span style="color: ${detail.color}">${q.difficultyBadge || detail.difficultyBadge}</span>
        </div>

        <div class="preview-q-text">"${q.question}"</div>

        <div class="preview-options-grid">${optionsHTML}</div>

        <div class="preview-explanation-box hidden" id="preview-exp-${rankKey}">
          <div class="exp-status"></div>
          <div class="exp-body"><strong>Penjelasan:</strong> ${q.explanation}</div>
        </div>
      `;

      container.appendChild(itemCard);

      // Attach option click handlers for preview interactive mode
      const optBtns = itemCard.querySelectorAll('.preview-opt-btn');
      const expBox = itemCard.querySelector(`#preview-exp-${rankKey}`);
      const expStatus = expBox.querySelector('.exp-status');

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const selectedText = btn.getAttribute('data-opt');
          const isCorrect = selectedText === q.correctAnswer;

          optBtns.forEach(b => {
            b.disabled = true;
            if (b.getAttribute('data-opt') === q.correctAnswer) {
              b.classList.add('correct');
            }
          });

          if (!isCorrect) {
            btn.classList.add('wrong');
            gameAudio.playWrong();
            expStatus.innerHTML = `<span style="color: #f87171; font-weight: 800;">💡 Belum tepat! Jawaban yang benar adalah B. ${q.correctAnswer}</span>`;
            this.charMateri.render(this.state.currentRank, 'sad', this.charMateri.getDialogue('previewWrong'));
          } else {
            gameAudio.playCorrect();
            expStatus.innerHTML = `<span style="color: #34d399; font-weight: 800;">✨ Correct! Kamu punya bekal mantap untuk rank ini!</span>`;
            this.charMateri.render(this.state.currentRank, 'happy', this.charMateri.getDialogue('previewCorrect'));
          }

          expBox.classList.remove('hidden');
        });
      });
    });
  }

  // ==========================================================================
  // 3. GAMEPLAY LOGIC & COUNTDOWN TIMER
  // ==========================================================================
  startGameplay(targetRank) {
    const rawQuestions = QUESTION_DATABASE[targetRank] || QUESTION_DATABASE.Bronze;
    
    // Clone & shuffle questions
    this.session = {
      activeRank: targetRank,
      currentQuestionIndex: 0,
      questionsList: [...rawQuestions].sort(() => Math.random() - 0.5).slice(0, 10),
      score: 0,
      correctCount: 0,
      wrongCount: 0,
      stars: 3,
      consecutiveErrors: 0,
      currentStreak: 0,
      bestStreak: 0,
      xpEarned: 0,
      isAnswered: false
    };

    this.switchScreen('gameplay-screen');
    this.renderQuestionCard();
  }

  renderQuestionCard() {
    const q = this.session.questionsList[this.session.currentQuestionIndex];
    if (!q) {
      this.endLevelSession();
      return;
    }

    this.session.isAnswered = false;

    // Update Top HUD
    const rankDetail = RANK_DETAILS[this.session.activeRank];
    document.getElementById('hud-rank-icon').innerText = rankDetail.badge;
    document.getElementById('hud-rank-text').innerText = rankDetail.name;
    document.getElementById('hud-level-num').innerText = this.state.currentLevel;
    document.getElementById('hud-q-count').innerText = `${this.session.currentQuestionIndex + 1}/10`;

    // Render Stars
    const starStr = '⭐'.repeat(this.session.stars) + '☆'.repeat(3 - this.session.stars);
    document.getElementById('hud-stars-display').innerText = starStr;

    // Render Streak
    document.getElementById('hud-streak-text').innerText = `🔥 STREAK x${this.session.currentStreak}`;

    // Render XP Bar
    const xpPercent = Math.min(100, Math.floor((this.state.xp / 1000) * 100));
    document.getElementById('xp-bar-fill').style.width = `${xpPercent}%`;
    document.getElementById('xp-bar-text').innerText = `${this.state.xp} / 1000 XP`;

    // Render Question Meta
    document.getElementById('q-category').innerText = q.category;
    document.getElementById('q-difficulty').innerText = `Difficulty: ${q.difficulty}`;
    document.getElementById('q-text').innerText = q.question;

    // Render 4 Options
    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, idx) => {
      btn.className = 'option-btn';
      btn.disabled = false;
      const textSpan = btn.querySelector('.opt-text');
      if (textSpan) textSpan.innerText = q.options[idx] || '';
    });

    // Hide Feedback Panel
    document.getElementById('feedback-panel').classList.add('hidden');

    // Render Character Expression
    this.charGameplay.render(this.session.activeRank, 'idle', "Ayo konsentrasi dan pilih jawaban terbaikmu sebelum waktu habis! ⏳");

    // Start Question Countdown Timer
    this.startQuestionTimer();
  }

  // Timer Engine for Question Countdown
  startQuestionTimer() {
    this.stopQuestionTimer();

    this.timerSettings.remaining = this.timerSettings.durationPerQuestion;
    const timerText = document.getElementById('hud-timer-sec');
    const timerBar = document.getElementById('timer-bar-fill');
    const timerBox = document.getElementById('hud-timer-box');

    if (timerText) timerText.innerText = `${this.timerSettings.remaining}s`;
    if (timerBar) {
      timerBar.style.width = '100%';
      timerBar.classList.remove('warning');
    }
    if (timerBox) timerBox.classList.remove('warning');

    this.timerSettings.intervalId = setInterval(() => {
      this.timerSettings.remaining--;

      const percent = Math.max(0, (this.timerSettings.remaining / this.timerSettings.durationPerQuestion) * 100);
      if (timerBar) timerBar.style.width = `${percent}%`;
      if (timerText) timerText.innerText = `${this.timerSettings.remaining}s`;

      // Warning styling when time <= 5 seconds
      if (this.timerSettings.remaining <= 5) {
        if (timerBox) timerBox.classList.add('warning');
        if (timerBar) timerBar.classList.add('warning');
      }

      // Time's Up Timeout
      if (this.timerSettings.remaining <= 0) {
        this.stopQuestionTimer();
        this.handleTimeOut();
      }
    }, 1000);
  }

  stopQuestionTimer() {
    if (this.timerSettings.intervalId) {
      clearInterval(this.timerSettings.intervalId);
      this.timerSettings.intervalId = null;
    }
  }

  // Handle Question Timeout (Time Ran Out)
  handleTimeOut() {
    if (this.session.isAnswered) return;
    this.session.isAnswered = true;

    const q = this.session.questionsList[this.session.currentQuestionIndex];

    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, i) => {
      btn.classList.add('disabled');
      if (q.options[i] === q.correctAnswer) {
        btn.classList.add('selected-correct');
      }
    });

    gameAudio.playWrong();
    this.session.wrongCount++;
    this.session.currentStreak = 0;
    this.session.consecutiveErrors++;

    // Star deduction logic
    if (this.session.consecutiveErrors >= 2) {
      this.session.stars = Math.max(0, this.session.stars - 1);
      if (this.session.consecutiveErrors >= 3) {
        this.session.stars = Math.max(0, this.session.stars - 1);
      }
    }

    const statusEl = document.getElementById('feedback-status');
    const expEl = document.getElementById('feedback-explanation');
    const feedbackPanel = document.getElementById('feedback-panel');

    statusEl.className = "feedback-status wrong-text";
    statusEl.innerText = `⏳ WAKTU HABIS! Jawaban yang benar: ${q.correctAnswer}`;
    expEl.innerText = q.explanation;

    // Character Reaction
    if (this.session.stars === 1) {
      this.charGameplay.render(this.session.activeRank, 'sad', this.charGameplay.getDialogue('warningStar'));
    } else {
      this.charGameplay.render(this.session.activeRank, 'sad', this.charGameplay.getDialogue('wrong'));
    }

    // Update Stars & Streak HUD
    const starStr = '⭐'.repeat(this.session.stars) + '☆'.repeat(3 - this.session.stars);
    document.getElementById('hud-stars-display').innerText = starStr;
    document.getElementById('hud-streak-text').innerText = `🔥 STREAK x${this.session.currentStreak}`;

    feedbackPanel.classList.remove('hidden');

    if (this.session.stars === 0) {
      setTimeout(() => {
        this.endLevelSession();
      }, 1500);
    }
  }

  handleAnswerSelection(selectedIndex) {
    if (this.session.isAnswered) return;

    this.stopQuestionTimer(); // Stop timer immediately on answer select
    this.session.isAnswered = true;
    const q = this.session.questionsList[this.session.currentQuestionIndex];
    const selectedText = q.options[selectedIndex];
    const isCorrect = selectedText === q.correctAnswer;

    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, i) => {
      btn.classList.add('disabled');
      if (q.options[i] === q.correctAnswer) {
        btn.classList.add('selected-correct');
      }
    });

    const statusEl = document.getElementById('feedback-status');
    const expEl = document.getElementById('feedback-explanation');
    const feedbackPanel = document.getElementById('feedback-panel');

    if (isCorrect) {
      // Correct Answer Flow
      gameAudio.playCorrect();
      this.session.correctCount++;
      this.session.consecutiveErrors = 0;
      this.session.currentStreak++;
      if (this.session.currentStreak > this.session.bestStreak) {
        this.session.bestStreak = this.session.currentStreak;
      }

      // Bonus XP calculation
      const streakBonus = (this.session.currentStreak - 1) * 20;
      const timeBonus = Math.floor(this.timerSettings.remaining * 2); // Time speed bonus XP
      const gainedXP = (q.xp || 100) + streakBonus + timeBonus;
      this.session.score += gainedXP;
      this.session.xpEarned += gainedXP;

      statusEl.className = "feedback-status correct-text";
      statusEl.innerText = `CORRECT! (+${gainedXP} XP)`;
      expEl.innerText = q.explanation;

      // Character Reaction
      if (this.session.currentStreak >= 3) {
        gameAudio.playStreak();
        this.charGameplay.render(this.session.activeRank, 'excited', this.charGameplay.getDialogue('streak', { streak: this.session.currentStreak }));
      } else {
        this.charGameplay.render(this.session.activeRank, 'happy', this.charGameplay.getDialogue('correct'));
      }
    } else {
      // Wrong Answer Flow
      optBtns[selectedIndex].classList.add('selected-wrong');
      gameAudio.playWrong();
      this.session.wrongCount++;
      this.session.currentStreak = 0;
      this.session.consecutiveErrors++;

      // Star deduction logic
      if (this.session.consecutiveErrors >= 2) {
        this.session.stars = Math.max(0, this.session.stars - 1);
        if (this.session.consecutiveErrors >= 3) {
          this.session.stars = Math.max(0, this.session.stars - 1);
        }
      }

      statusEl.className = "feedback-status wrong-text";
      statusEl.innerText = `WRONG! Jawaban yang benar: ${q.correctAnswer}`;
      expEl.innerText = q.explanation;

      // Character Reaction
      if (this.session.stars === 1) {
        this.charGameplay.render(this.session.activeRank, 'sad', this.charGameplay.getDialogue('warningStar'));
      } else {
        this.charGameplay.render(this.session.activeRank, 'sad', this.charGameplay.getDialogue('wrong'));
      }
    }

    // Update Stars & Streak HUD
    const starStr = '⭐'.repeat(this.session.stars) + '☆'.repeat(3 - this.session.stars);
    document.getElementById('hud-stars-display').innerText = starStr;
    document.getElementById('hud-streak-text').innerText = `🔥 STREAK x${this.session.currentStreak}`;

    feedbackPanel.classList.remove('hidden');

    // Early termination if stars reach 0
    if (this.session.stars === 0) {
      setTimeout(() => {
        this.endLevelSession();
      }, 1500);
    }
  }

  advanceQuestion() {
    this.session.currentQuestionIndex++;
    if (this.session.currentQuestionIndex >= this.session.questionsList.length || this.session.stars === 0) {
      this.endLevelSession();
    } else {
      this.renderQuestionCard();
    }
  }

  // ==========================================================================
  // 4. LEVEL RESULT & RANK UP CELEBRATION
  // ==========================================================================
  endLevelSession() {
    this.stopQuestionTimer();
    this.switchScreen('result-screen');
    const isSuccess = this.session.stars > 0;

    const titleEl = document.getElementById('result-banner-title');
    const subEl = document.getElementById('result-banner-sub');
    const btnMainText = document.getElementById('btn-result-main-text');

    if (isSuccess) {
      gameAudio.playLevelComplete();
      titleEl.innerText = "🎉 LEVEL COMPLETE!";
      titleEl.style.color = "#34d399";
      subEl.innerText = "Luar biasa! Kamu berhasil menyelesaikan tantangan level ini!";
      btnMainText.innerText = "NEXT LEVEL ➔";

      this.charResult.render(this.session.activeRank, 'victory');

      // Update persistent XP & Stats
      this.state.xp += this.session.xpEarned;
      if (this.session.bestStreak > this.state.bestStreak) {
        this.state.bestStreak = this.session.bestStreak;
      }
      if (this.session.score > this.state.highScore) {
        this.state.highScore = this.session.score;
      }

      this.saveProgress();
    } else {
      gameAudio.playWrong();
      titleEl.innerText = "💀 TRY AGAIN";
      titleEl.style.color = "#f87171";
      subEl.innerText = "Bintangmu habis atau waktu kehabisan! Coba lagi ya!";
      btnMainText.innerText = "RETRY LEVEL 🔄";

      this.charResult.render(this.session.activeRank, 'sad');
    }

    // Populate Stats Grid
    document.getElementById('res-score').innerText = `${this.session.score} XP`;
    const accuracy = Math.round((this.session.correctCount / (this.session.correctCount + this.session.wrongCount || 1)) * 100);
    document.getElementById('res-accuracy').innerText = `${accuracy}%`;
    document.getElementById('res-correct-wrong').innerText = `${this.session.correctCount} / ${this.session.wrongCount}`;
    document.getElementById('res-best-streak').innerText = `${this.session.bestStreak} 🔥`;
    document.getElementById('res-stars').innerText = '⭐'.repeat(this.session.stars) + '☆'.repeat(3 - this.session.stars);
    document.getElementById('res-xp').innerText = `+${this.session.xpEarned} XP`;
  }

  // Check if player qualifies for Rank Up after level completion
  checkLevelProgression() {
    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];
    const currentIdx = rankOrder.indexOf(this.state.currentRank);

    // Rank Up threshold: Every level completion advances rank
    if (currentIdx < rankOrder.length - 1) {
      const nextRank = rankOrder[currentIdx + 1];
      this.state.currentRank = nextRank;
      this.state.currentLevel++;
      if (!this.state.unlockedRanks.includes(nextRank)) {
        this.state.unlockedRanks.push(nextRank);
      }
      this.saveProgress();
      this.triggerRankUpOverlay(nextRank);
    } else {
      // Reached Mythic Max Rank
      this.state.currentLevel++;
      this.saveProgress();
      this.startGameplay(this.state.currentRank);
    }
  }

  // Trigger Fullscreen Rank Up Celebration Overlay with Confetti
  triggerRankUpOverlay(newRank) {
    gameAudio.playRankUp();

    const detail = RANK_DETAILS[newRank];
    document.getElementById('rank-up-name').innerText = `${detail.name} ACHIEVED!`;
    document.getElementById('rank-up-name').style.color = detail.color;

    const dialogue = this.charRankUp.getDialogue('rankUp', { newRank: detail.name });
    this.charRankUp.render(newRank, 'victory', dialogue);

    this.showModal('rank-up-overlay');
    this.startConfettiBurst();
  }

  // ==========================================================================
  // 5. RANK LADDER SCREEN
  // ==========================================================================
  renderRankScreen() {
    this.switchScreen('rank-screen');

    const container = document.getElementById('rank-ladder-map');
    if (!container) return;

    container.innerHTML = '';

    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];

    rankOrder.forEach(rKey => {
      const detail = RANK_DETAILS[rKey];
      const isUnlocked = this.state.unlockedRanks.includes(rKey);
      const isActive = this.state.currentRank === rKey;

      const nodeCard = document.createElement('div');
      nodeCard.className = `rank-node-card ${isActive ? 'active-rank' : ''} ${!isUnlocked ? 'locked-rank' : ''}`;

      let statusHTML = '';
      if (isActive) {
        statusHTML = `<span class="node-status status-active">ACTIVE RANK</span>`;
      } else if (isUnlocked) {
        statusHTML = `<span class="node-status status-unlocked">UNLOCKED</span>`;
      } else {
        statusHTML = `<span class="node-status status-locked">🔒 LOCKED</span>`;
      }

      nodeCard.innerHTML = `
        <div class="rank-node-left">
          <span class="node-badge">${detail.badge}</span>
          <div class="node-info">
            <h3 style="color: ${detail.color}">${detail.name}</h3>
            <p>${detail.levelTitle} • ${detail.difficultyBadge}</p>
          </div>
        </div>
        ${statusHTML}
      `;

      container.appendChild(nodeCard);
    });
  }

  // ==========================================================================
  // 6. CANVAS ANIMATIONS (Particles & Confetti)
  // ==========================================================================
  initParticleCanvas() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    this.particleCtx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4,
      color: ['rgba(56, 189, 248, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(255, 215, 0, 0.3)'][Math.floor(Math.random() * 3)]
    }));

    const render = () => {
      this.particleCtx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        this.particleCtx.beginPath();
        this.particleCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        this.particleCtx.fillStyle = p.color;
        this.particleCtx.fill();
      });

      requestAnimationFrame(render);
    };

    render();
  }

  startConfettiBurst() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    this.confettiCtx = canvas.getContext('2d');
    const width = canvas.width = canvas.parentElement.clientWidth;
    const height = canvas.height = canvas.parentElement.clientHeight;

    const colors = ['#ffd700', '#00f0ff', '#ff007f', '#a855f7', '#10b981'];

    this.confettiParticles = Array.from({ length: 70 }, () => ({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12 - 4,
      size: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 100
    }));

    const animateConfetti = () => {
      this.confettiCtx.clearRect(0, 0, width, height);

      let active = false;
      this.confettiParticles.forEach(p => {
        if (p.life > 0) {
          active = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // Gravity
          p.life--;

          this.confettiCtx.fillStyle = p.color;
          this.confettiCtx.fillRect(p.x, p.y, p.size, p.size);
        }
      });

      if (active) {
        requestAnimationFrame(animateConfetti);
      }
    };

    animateConfetti();
  }
}

// Instantiate Game Application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new EducationalGameApp();
});
