// KNOWLEDGE QUEST: Full Adventure Map & Rank Progression (Bronze -> Silver -> Gold -> Diamond -> Master -> Mythic)
// Main Canvas Game Loop & State Controller with Countdown Timers & Dynamic Question Swapping

class KnowledgeQuestApp {
  constructor() {
    // Game State from LocalStorage
    this.state = StorageManager.load();

    // Ensure unlockedRanks is array
    if (!this.state.unlockedRanks || !Array.isArray(this.state.unlockedRanks)) {
      this.state.unlockedRanks = ['Bronze'];
    }
    if (!this.state.completedMaps || !Array.isArray(this.state.completedMaps)) {
      this.state.completedMaps = [];
    }

    // Canvas & Context Setup
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;

    // Subsystem Engines
    this.mapEngine = new MapEngine();
    this.playerEngine = new PlayerEngine(this.state.playerPos.x, this.state.playerPos.y);
    this.checkpointEngine = new CheckpointEngine();

    // Mascot Render Engine for Home & Modals
    this.charHome = new CharacterEngine('home-character-container', 'home-speech-bubble');
    this.charMateri = new CharacterEngine('materi-character-container', 'materi-speech-bubble');

    // Loop & Interaction States
    this.isGameLoopRunning = false;
    this.activeCheckpoint = null;
    this.isModalOpen = false;
    this.currentStreak = 0;
    this.activeMateriTab = this.state.currentRank || 'Bronze';

    // Countdown Timer State for Question Checkpoints
    this.questionTimer = null;
    this.questionTimeLeft = 20; // 20 seconds per question
    this.isQuestionAnswered = false;
    this.isAnswerCorrect = false;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupTouchDPad();
    this.syncStateWithEngines();
    this.syncHeaderUI();
    this.renderHomeScreen();
  }

  // Safe sound trigger helper
  playAudio(methodName, ...args) {
    try {
      if (typeof gameAudio !== 'undefined' && typeof gameAudio[methodName] === 'function') {
        gameAudio[methodName](...args);
      }
    } catch (e) {
      console.warn("Audio playback exception handled:", e);
    }
  }

  // Synchronize state with Map & Checkpoint engines
  syncStateWithEngines() {
    const rank = this.state.currentRank || 'Bronze';
    this.mapEngine.setRankTheme(rank);
    this.checkpointEngine.syncState(
      this.state.completedCheckpoints || [],
      this.state.unlockedGates || [],
      rank
    );
  }

  // Save current player progress to localStorage
  saveProgress() {
    this.state.playerPos = { x: Math.round(this.playerEngine.x), y: Math.round(this.playerEngine.y) };
    StorageManager.save(this.state);
    this.syncHeaderUI();
  }

  // Sync Header Rank Pill & Sound Icon
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

    try { gameAudio.setEnabled(this.state.soundEnabled); } catch (e) {}
  }

  // Screen Switcher System
  switchScreen(screenId) {
    this.isGameLoopRunning = (screenId === 'gameplay-screen');
    const screens = document.querySelectorAll('.screen');
    screens.forEach(s => s.classList.remove('active'));

    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add('active');
      window.scrollTo(0, 0);
    }

    if (this.isGameLoopRunning) {
      this.resizeCanvas();
      this.runGameLoop();
    }
  }

  // Handle Canvas Dimensions for Single-Frame Map (Fixed internal 1000x650)
  resizeCanvas() {
    if (!this.canvas) return;
    this.canvas.width = 1000;
    this.canvas.height = 650;
  }

  // DOM Button Event Handlers
  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    // Header Logo -> Home Screen
    const logoBtn = document.getElementById('header-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.hideModal();
        this.renderHomeScreen();
      });
    }

    // Sound Toggle
    const soundBtn = document.getElementById('sound-toggle-btn');
    if (soundBtn) {
      soundBtn.addEventListener('click', () => {
        this.state.soundEnabled = !this.state.soundEnabled;
        this.saveProgress();
        this.playAudio('playClick');
      });
    }

    // Reset Progress Modal
    const resetModalBtn = document.getElementById('reset-modal-btn');
    if (resetModalBtn) {
      resetModalBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.showModal('reset-modal');
      });
    }

    const cancelResetBtn = document.getElementById('btn-cancel-reset');
    if (cancelResetBtn) {
      cancelResetBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.hideModal('reset-modal');
      });
    }

    const confirmResetBtn = document.getElementById('btn-confirm-reset');
    if (confirmResetBtn) {
      confirmResetBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.stopQuestionTimer();
        this.state = StorageManager.reset();
        this.currentStreak = 0;
        this.activeCheckpoint = null;
        this.isQuestionAnswered = false;
        this.isAnswerCorrect = false;
        this.playerEngine.x = 120;
        this.playerEngine.y = 550;
        this.playerEngine.resetInput();
        this.activeMateriTab = 'Bronze';
        this.syncStateWithEngines();
        this.saveProgress();
        this.hideModal('reset-modal');
        this.renderHomeScreen();
      });
    }

    // Home Screen CTA Buttons
    const playNowBtn = document.getElementById('btn-play-now');
    if (playNowBtn) {
      playNowBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.startGameplay();
      });
    }

    const materiBtn = document.getElementById('btn-materi-preview');
    if (materiBtn) {
      materiBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.activeMateriTab = this.state.currentRank || 'Bronze';
        this.renderMateriScreen();
      });
    }

    const rankBtn = document.getElementById('btn-ranks-ladder');
    if (rankBtn) {
      rankBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.renderRankScreen();
      });
    }

    const howToPlayBtn = document.getElementById('btn-how-to-play');
    if (howToPlayBtn) {
      howToPlayBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.showModal('how-to-play-modal');
      });
    }

    const aboutBtn = document.getElementById('btn-about');
    if (aboutBtn) {
      aboutBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.showModal('about-modal');
      });
    }

    // Universal Modal Close Buttons
    document.querySelectorAll('.modal-close-btn, .modal-close-btn-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.playAudio('playClick');
        this.hideModal();
      });
    });

    // Materi Screen Navigation
    const backHomeMateriBtn = document.getElementById('btn-back-home-materi');
    if (backHomeMateriBtn) {
      backHomeMateriBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.renderHomeScreen();
      });
    }

    const readyPlayBtn = document.getElementById('btn-ready-play-now');
    if (readyPlayBtn) {
      readyPlayBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.startGameplay();
      });
    }

    // Question Modal Option Buttons (with target safety)
    const optButtons = document.querySelectorAll('.option-btn');
    optButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.isQuestionAnswered) return;
        const targetBtn = e.currentTarget;
        const idx = parseInt(targetBtn.getAttribute('data-index'), 10);
        this.evaluateQuestionAnswer(idx);
      });
    });

    // Continue Adventure / Swap Question Button
    const continueQBtn = document.getElementById('btn-continue-question');
    if (continueQBtn) {
      continueQBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.stopQuestionTimer();

        if (this.isAnswerCorrect) {
          // Correct answer: Close modal & resume exploration
          this.hideModal('question-modal');
        } else {
          // Wrong answer or timeout: Swap with a new replacement question!
          if (this.state.stars > 0 && this.activeCheckpoint) {
            const currentQ = this.activeCheckpoint.questionData;
            const replacement = (typeof getReplacementQuestion === 'function')
              ? getReplacementQuestion(this.state.currentRank, this.activeCheckpoint.id, currentQ ? currentQ.id : null)
              : currentQ;

            this.activeCheckpoint.questionData = replacement;
            this.openQuestionModal(this.activeCheckpoint);
          } else {
            this.hideModal('question-modal');
          }
        }
      });
    }

    // Retry Checkpoint Button (on Failure Modal) -> Restores stars & swaps to a fresh question
    // Retry Map from Question 01 Button (on Failure Modal) -> Restores stars & resets map progress to Q1
    const retryBtn = document.getElementById('btn-retry-checkpoint');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.state.stars = 3;
        this.state.completedCheckpoints = [];
        this.state.unlockedGates = [];
        this.playerEngine.x = 120;
        this.playerEngine.y = 550;
        this.playerEngine.resetInput();
        this.syncStateWithEngines();
        this.saveProgress();
        this.hideModal('failure-modal');
        this.startGameplay();
      });
    }

    // Rank Screen Navigation
    const backHomeRankBtn = document.getElementById('btn-back-home-rank');
    if (backHomeRankBtn) {
      backHomeRankBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.renderHomeScreen();
      });
    }

    const playCurrentRankBtn = document.getElementById('btn-play-current-rank');
    if (playCurrentRankBtn) {
      playCurrentRankBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.startGameplay();
      });
    }

    // Map Complete Victory Modal -> Return Home
    const victoryHomeBtn = document.getElementById('btn-continue-bronze-complete');
    if (victoryHomeBtn) {
      victoryHomeBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.hideModal('bronze-complete-modal');
        this.renderHomeScreen();
      });
    }

    // Next Rank Map Unlock Button -> Transition into Next Rank Map
    const nextRankBtn = document.getElementById('btn-next-rank-silver');
    if (nextRankBtn) {
      nextRankBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];
        const currentIdx = rankOrder.indexOf(this.state.currentRank || 'Bronze');
        const nextRank = rankOrder[currentIdx + 1];

        if (nextRank) {
          this.state.currentRank = nextRank;
          if (!this.state.unlockedRanks.includes(nextRank)) {
            this.state.unlockedRanks.push(nextRank);
          }
          this.state.completedCheckpoints = [];
          this.state.unlockedGates = [];
          this.playerEngine.x = 120;
          this.playerEngine.y = 550;
          this.saveProgress();
          this.hideModal('bronze-complete-modal');
          this.syncStateWithEngines();
          this.startGameplay();
        } else {
          // Mythic Complete! Show Rank Ladder
          this.hideModal('bronze-complete-modal');
          this.renderRankScreen();
        }
      });
    }
  }

  // Setup Mobile Virtual D-Pad Touch Controller
  setupTouchDPad() {
    const bindBtn = (id, dir) => {
      const el = document.getElementById(id);
      if (!el) return;

      const start = (e) => {
        e.preventDefault();
        if (this.isModalOpen) return;
        this.playerEngine.setDPadState(dir, true);
        el.classList.add('active');
      };

      const end = (e) => {
        e.preventDefault();
        this.playerEngine.setDPadState(dir, false);
        el.classList.remove('active');
      };

      el.addEventListener('touchstart', start, { passive: false });
      el.addEventListener('touchend', end, { passive: false });
      el.addEventListener('mousedown', start);
      el.addEventListener('mouseup', end);
      el.addEventListener('mouseleave', end);
    };

    bindBtn('dpad-up', 'up');
    bindBtn('dpad-down', 'down');
    bindBtn('dpad-left', 'left');
    bindBtn('dpad-right', 'right');
  }

  // Show & Hide Modals with State Synchronization
  showModal(modalId) {
    this.isModalOpen = true;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('hidden');
    }
  }

  hideModal(modalId = null) {
    this.isModalOpen = false;
    this.stopQuestionTimer();

    if (modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('hidden');
    } else {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.add('hidden'));
    }
  }

  // Render Home Screen
  renderHomeScreen() {
    this.switchScreen('home-screen');
    const currentRankKey = this.state.currentRank || 'Bronze';
    const detail = RANK_DETAILS[currentRankKey] || RANK_DETAILS.Bronze;

    // Update Home CTA Text
    const playBtn = document.getElementById('btn-play-now');
    if (playBtn) {
      playBtn.querySelector('.btn-text').innerText = `PLAY ${detail.name} MAP`;
    }

    const dialogue = `Ready? Let's explore ${detail.mapTitle}! 🌲`;
    this.charHome.render(currentRankKey, 'idle', dialogue);
  }

  // Render Materi Screen with Multi-Rank Tabs
  renderMateriScreen() {
    this.switchScreen('materi-screen');
    const activeRankKey = this.activeMateriTab || this.state.currentRank || 'Bronze';
    const detail = RANK_DETAILS[activeRankKey] || RANK_DETAILS.Bronze;

    this.charMateri.render(activeRankKey, 'idle', `Coba contoh soal ${detail.name} di halaman ini sebelum menjelajah map! 🔥`);
    this.renderMateriRankTabs();
    this.renderMateriCards(activeRankKey);
    this.renderInteractivePreviewQuestions(activeRankKey);

    const playBtn = document.getElementById('btn-ready-play-now');
    if (playBtn) {
      playBtn.querySelector('span').innerText = `🎮 PLAY ${detail.name} MAP`;
    }
  }

  // Render Rank Tabs in Materi Screen
  renderMateriRankTabs() {
    const container = document.getElementById('materi-rank-tabs');
    if (!container) return;

    container.innerHTML = '';
    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];

    rankOrder.forEach(rKey => {
      const detail = RANK_DETAILS[rKey];
      const isUnlocked = (this.state.unlockedRanks || ['Bronze']).includes(rKey);
      const isActive = (this.activeMateriTab === rKey);

      const tabBtn = document.createElement('button');
      tabBtn.className = `materi-tab-btn ${isActive ? 'active' : ''}`;
      tabBtn.innerHTML = `${detail.badge} ${detail.name} ${!isUnlocked ? '🔒' : ''}`;

      tabBtn.addEventListener('click', () => {
        this.playAudio('playClick');
        this.activeMateriTab = rKey;
        this.renderMateriScreen();
      });

      container.appendChild(tabBtn);
    });
  }

  renderMateriCards(rankKey = 'Bronze') {
    const grid = document.getElementById('materi-cards-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const detail = RANK_DETAILS[rankKey] || RANK_DETAILS.Bronze;

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
            <div class="rank-title" style="color: ${detail.color}">${detail.name} — ${detail.mapTitle}</div>
            <div class="level-tag">${detail.levelTitle}</div>
          </div>
        </div>
        <span class="diff-badge" style="color: ${detail.color}">${detail.difficultyBadge}</span>
      </div>

      <div class="materi-section-block">
        <h4>📌 Materi Pokok Checkpoint:</h4>
        <div class="materi-topics-list" style="margin-top: 6px;">${topicsHTML}</div>
      </div>

      <div class="materi-section-block" style="margin-top: 10px;">
        <h4>💡 Kemampuan yang Diuji:</h4>
        <p class="ability-text" style="font-size: 12px; margin-top: 4px; color: var(--text-sub);">"${detail.sampleAbility}"</p>
      </div>

      <div class="tip-box" style="margin-top: 12px;">
        <strong>Tips Adventure:</strong> ${detail.tip}
      </div>
    `;

    grid.appendChild(card);
  }

  renderInteractivePreviewQuestions(rankKey = 'Bronze') {
    const container = document.getElementById('preview-questions-list');
    if (!container) return;

    container.innerHTML = '';
    const q = PREVIEW_QUESTION_DATABASE[rankKey] || PREVIEW_QUESTION_DATABASE.Bronze;
    const detail = RANK_DETAILS[rankKey] || RANK_DETAILS.Bronze;

    const itemCard = document.createElement('div');
    itemCard.className = 'preview-item-card';

    const optionsHTML = q.options.map((optText, idx) => `
      <button class="preview-opt-btn" data-opt="${optText}">${String.fromCharCode(65 + idx)}. ${optText}</button>
    `).join('');

    itemCard.innerHTML = `
      <div class="preview-item-meta">
        <span>${detail.badge} <strong>${detail.name}</strong> (${detail.levelTitle})</span>
        <span style="color: ${detail.color}">${q.difficultyBadge}</span>
      </div>

      <div class="preview-q-text">"${q.question}"</div>
      <div class="preview-options-grid">${optionsHTML}</div>

      <div class="preview-explanation-box hidden" id="preview-exp-box" style="margin-top: 10px; padding: 10px; background: rgba(0,0,0,0.3); border-radius: 8px;">
        <div class="exp-status"></div>
        <div class="exp-body" style="font-size: 12px; margin-top: 4px; color: var(--text-sub);"><strong>Penjelasan (Pembahasan):</strong> ${q.explanation}</div>
      </div>
    `;

    container.appendChild(itemCard);

    const optBtns = itemCard.querySelectorAll('.preview-opt-btn');
    const expBox = itemCard.querySelector('#preview-exp-box');
    const expStatus = expBox.querySelector('.exp-status');

    optBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const targetBtn = e.currentTarget;
        const selectedText = targetBtn.getAttribute('data-opt');
        const isCorrect = selectedText === q.correctAnswer;

        optBtns.forEach(b => {
          b.disabled = true;
          if (b.getAttribute('data-opt') === q.correctAnswer) b.classList.add('correct');
        });

        if (!isCorrect) {
          targetBtn.classList.add('wrong');
          this.playAudio('playWrong');
          expStatus.innerHTML = `<span style="color: #f87171; font-weight: 800;">💡 Belum tepat! Jawaban yang benar adalah: ${q.correctAnswer}</span>`;
        } else {
          this.playAudio('playCorrect');
          expStatus.innerHTML = `<span style="color: #34d399; font-weight: 800;">✨ Correct! Kamu punya bekal mantap untuk ${detail.name} map!</span>`;
        }

        expBox.classList.remove('hidden');
      });
    });
  }

  // ==========================================================================
  // GAMEPLAY CANVAS ENGINE LOOP
  // ==========================================================================
  startGameplay() {
    this.hideModal();
    this.switchScreen('gameplay-screen');
    // Always start at START zone (120, 550) whenever entering gameplay fresh
    this.playerEngine.x = 120;
    this.playerEngine.y = 550;
    this.playerEngine.resetInput();
    this.syncStateWithEngines();
  }

  runGameLoop() {
    if (!this.isGameLoopRunning) return;

    // 1. Update Player Movement (unless question modal is open)
    if (!this.isModalOpen) {
      this.playerEngine.update(this.mapEngine, this.state.unlockedGates);
    }

    // 2. Render Full Single-Frame Map & Entities (No Camera Offset!)
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.mapEngine.render(this.ctx, this.state.unlockedGates);
    this.checkpointEngine.render(this.ctx);
    this.playerEngine.render(this.ctx);

    // 3. Update HUD Objective & Stars
    document.getElementById('hud-objective-text').innerText = this.checkpointEngine.getCurrentObjective();
    document.getElementById('hud-stars-display').innerText = '⭐'.repeat(this.state.stars) + '☆'.repeat(3 - this.state.stars);
    document.getElementById('hud-xp-display').innerText = `${this.state.xp} XP`;

    // 4. Check Proximity Triggers
    if (!this.isModalOpen) {
      const proximity = this.checkpointEngine.checkPlayerProximity(this.playerEngine);
      const promptBanner = document.getElementById('nearby-prompt-banner');

      if (proximity.nearestCheckpoint) {
        const cp = proximity.nearestCheckpoint;

        if (cp.status === 'available') {
          promptBanner.classList.remove('hidden');
          promptBanner.innerHTML = `<span>❓ ${cp.label} NEARBY! Walk close to enter...</span>`;

          if (proximity.distance < 30) {
            this.openQuestionModal(cp);
          }
        } else if (cp.status === 'locked') {
          promptBanner.classList.remove('hidden');
          promptBanner.innerHTML = `<span style="color: #f87171;">🔒 ${cp.label} IS LOCKED! Complete previous checkpoint!</span>`;
        } else {
          promptBanner.classList.add('hidden');
        }
      } else {
        promptBanner.classList.add('hidden');
      }

      // Check Victory Shrine Trigger
      if (proximity.isShrineTriggerReady) {
        this.triggerMapComplete();
      }
    }

    requestAnimationFrame(() => this.runGameLoop());
  }

  // ==========================================================================
  // QUESTION MODAL & COUNTDOWN TIMER ENGINE
  // ==========================================================================

  // Start 20-Second Countdown Timer for Questions
  startQuestionTimer() {
    this.stopQuestionTimer();
    this.questionTimeLeft = 20;
    this.updateTimerUI();

    this.questionTimer = setInterval(() => {
      this.questionTimeLeft--;
      this.updateTimerUI();

      if (this.questionTimeLeft <= 0) {
        this.stopQuestionTimer();
        this.evaluateQuestionAnswer(-1); // Time Out Trigger!
      }
    }, 1000);
  }

  // Stop Countdown Timer
  stopQuestionTimer() {
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
      this.questionTimer = null;
    }
  }

  // Update Timer Badge & Animated Bar UI
  updateTimerUI() {
    const timerSecEl = document.getElementById('modal-q-timer-sec');
    const timerBarEl = document.getElementById('modal-q-timer-bar');

    if (timerSecEl) {
      timerSecEl.innerText = `${Math.max(0, this.questionTimeLeft)}s`;
      if (this.questionTimeLeft <= 5) {
        timerSecEl.style.color = '#ef4444';
      } else {
        timerSecEl.style.color = '#f87171';
      }
    }

    if (timerBarEl) {
      const percentage = Math.max(0, (this.questionTimeLeft / 20) * 100);
      timerBarEl.style.width = `${percentage}%`;
    }
  }

  // Open Question Checkpoint Modal with Timer Init
  openQuestionModal(checkpoint) {
    this.isModalOpen = true;
    this.activeCheckpoint = checkpoint;
    this.isQuestionAnswered = false;
    this.isAnswerCorrect = false;
    this.playerEngine.resetInput(); // Halt player movement

    const q = checkpoint.questionData;
    document.getElementById('modal-q-title').innerText = checkpoint.label;
    document.getElementById('modal-q-category').innerText = q.category;
    document.getElementById('modal-q-difficulty').innerText = `Difficulty: ${q.difficulty}`;
    document.getElementById('modal-q-text').innerText = q.question;

    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, idx) => {
      btn.className = 'option-btn';
      btn.disabled = false;
      btn.querySelector('.opt-text').innerText = q.options[idx] || '';
    });

    document.getElementById('modal-feedback-panel').classList.add('hidden');
    this.showModal('question-modal');

    // Start 20s Countdown Timer
    this.startQuestionTimer();
  }

  // Evaluate Question Answer or Time-Out
  evaluateQuestionAnswer(selectedIndex) {
    if (this.isQuestionAnswered || !this.activeCheckpoint) return;

    this.isQuestionAnswered = true;
    this.stopQuestionTimer();

    const q = this.activeCheckpoint.questionData;
    const isTimeout = (selectedIndex === -1);
    const selectedText = (selectedIndex >= 0 && q.options[selectedIndex]) ? q.options[selectedIndex] : null;
    const isCorrect = !isTimeout && (selectedText === q.correctAnswer);
    this.isAnswerCorrect = isCorrect;

    const optBtns = document.querySelectorAll('.option-btn');
    optBtns.forEach((btn, i) => {
      btn.classList.add('disabled');
      if (q.options[i] === q.correctAnswer) {
        btn.classList.add('selected-correct');
      }
    });

    const statusEl = document.getElementById('modal-feedback-status');
    const expEl = document.getElementById('modal-feedback-explanation');
    const feedbackPanel = document.getElementById('modal-feedback-panel');
    const continueBtn = document.getElementById('btn-continue-question');

    if (isCorrect) {
      this.playAudio('playCorrect');
      this.currentStreak++;
      if (this.currentStreak > this.state.bestStreak) {
        this.state.bestStreak = this.currentStreak;
      }

      const streakBonus = (this.currentStreak - 1) * 20;
      const gainedXP = (q.xp || 100) + streakBonus;
      this.state.xp += gainedXP;

      // Mark Checkpoint Completed
      if (!this.state.completedCheckpoints.includes(this.activeCheckpoint.id)) {
        this.state.completedCheckpoints.push(this.activeCheckpoint.id);
      }

      // Unlock Physical Gate
      if (this.activeCheckpoint.requiredGateId) {
        if (!this.state.unlockedGates.includes(this.activeCheckpoint.requiredGateId)) {
          this.state.unlockedGates.push(this.activeCheckpoint.requiredGateId);
          this.playAudio('playGateUnlock');
        }
      }

      this.syncStateWithEngines();
      this.saveProgress();

      statusEl.className = "feedback-status correct-text";
      statusEl.innerText = `🎉 JAWABAN BENAR! (+${gainedXP} XP)`;
      expEl.innerText = `Penjelasan (Pembahasan): ${q.explanation}`;

      if (continueBtn) {
        continueBtn.querySelector('span').innerText = `LANJUTKAN PETUALANGAN ➔`;
      }

      feedbackPanel.classList.remove('hidden');

    } else {
      // WRONG ANSWER OR TIME OUT: Deduct star & SWAP with replacement question!
      if (selectedIndex >= 0 && optBtns[selectedIndex]) {
        optBtns[selectedIndex].classList.add('selected-wrong');
      }
      this.playAudio('playWrong');
      this.currentStreak = 0;
      this.state.stars = Math.max(0, this.state.stars - 1);
      this.saveProgress();

      statusEl.className = "feedback-status wrong-text";
      if (isTimeout) {
        statusEl.innerText = `⏰ WAKTU HABIS! (-1 Bintang ⭐)`;
      } else {
        statusEl.innerText = `❌ JAWABAN BELUM TEPAT! (-1 Bintang ⭐)`;
      }

      expEl.innerText = `Jawaban Benar: ${q.correctAnswer}\nPenjelasan: ${q.explanation}`;

      if (this.state.stars === 0) {
        if (continueBtn) {
          continueBtn.querySelector('span').innerText = `ULANG DARI QUESTION 01 🔄`;
        }
        feedbackPanel.classList.remove('hidden');

        setTimeout(() => {
          this.stopQuestionTimer();
          this.hideModal('question-modal');
          this.showModal('failure-modal');
        }, 1500);

      } else {
        // SWAP QUESTION NOTICE: Change button to "GANTI SOAL BARU ➔"
        if (continueBtn) {
          continueBtn.querySelector('span').innerText = `🔄 COBA SOAL PENGGANTI (Bintang: ${this.state.stars}⭐) ➔`;
        }
        feedbackPanel.classList.remove('hidden');
      }
    }
  }

  // Trigger Map Complete Victory Screen (Generic across all 6 Ranks)
  triggerMapComplete() {
    this.isGameLoopRunning = false;
    this.stopQuestionTimer();

    const currentRank = this.state.currentRank || 'Bronze';
    if (!this.state.completedMaps.includes(currentRank)) {
      this.state.completedMaps.push(currentRank);
    }

    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];
    const currentIdx = rankOrder.indexOf(currentRank);
    const nextRank = rankOrder[currentIdx + 1];

    if (nextRank) {
      if (!this.state.unlockedRanks.includes(nextRank)) {
        this.state.unlockedRanks.push(nextRank);
      }
    }

    this.state.xp += 500; // Map Completion Bonus XP
    this.saveProgress();

    this.playAudio('playLevelComplete');

    // Update Victory Modal Elements
    const sparkleEl = document.getElementById('victory-sparkle-title');
    const titleEl = document.getElementById('victory-title-text');
    const bodyEl = document.getElementById('victory-body-text');
    const nextBannerEl = document.getElementById('victory-next-rank-banner');
    const nextBtnEl = document.getElementById('btn-next-rank-silver');

    const detail = RANK_DETAILS[currentRank] || RANK_DETAILS.Bronze;

    if (sparkleEl) sparkleEl.innerText = `✨ ${detail.mapTitle.toUpperCase()} MASTERED! ✨`;
    if (titleEl) titleEl.innerText = `🎉 ${detail.name} MAP COMPLETE!`;
    if (bodyEl) bodyEl.innerText = `Kamu telah berhasil menyelesaikan rute ${detail.mapTitle} & menguasai Knowledge Shrine!`;

    document.getElementById('res-total-xp').innerText = `${this.state.xp} XP`;
    document.getElementById('res-stars-earned').innerText = '⭐'.repeat(this.state.stars);
    document.getElementById('res-best-streak').innerText = `${this.state.bestStreak} 🔥`;

    if (nextRank) {
      const nextDetail = RANK_DETAILS[nextRank];
      if (nextBannerEl) nextBannerEl.innerHTML = `<span>🔓 MAP ${nextDetail.name} (${nextDetail.mapTitle}) UNLOCKED!</span>`;
      if (nextBtnEl) nextBtnEl.innerHTML = `<span>🗺️ ENTER ${nextDetail.name} MAP ➔</span>`;
    } else {
      // Mythic Complete Legend
      if (nextBannerEl) nextBannerEl.innerHTML = `<span>🌌 MYTHIC LEGEND ACHIEVED! CONGRATULATIONS!</span>`;
      if (nextBtnEl) nextBtnEl.innerHTML = `<span>🏆 LIHAT RANK PROGRESSION ➔</span>`;
    }

    this.showModal('bronze-complete-modal');
  }

  // Get dynamically computed unlocked ranks based on completed maps
  getUnlockedRanks() {
    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];
    const unlocked = ['Bronze'];
    const completed = this.state.completedMaps || [];

    for (let i = 0; i < rankOrder.length - 1; i++) {
      if (completed.includes(rankOrder[i])) {
        if (!unlocked.includes(rankOrder[i + 1])) {
          unlocked.push(rankOrder[i + 1]);
        }
      } else {
        break; // Strict sequential rank progression dependency!
      }
    }
    return unlocked;
  }

  // Render Rank Screen (Rank Ladder Progression matching exact user state)
  renderRankScreen() {
    this.switchScreen('rank-screen');
    const container = document.getElementById('rank-ladder-map');
    if (!container) return;

    container.innerHTML = '';
    const rankOrder = ['Bronze', 'Silver', 'Gold', 'Diamond', 'Master', 'Mythic'];
    const currentRank = this.state.currentRank || 'Bronze';
    const unlockedRanks = this.getUnlockedRanks();
    this.state.unlockedRanks = unlockedRanks;
    const completedMaps = this.state.completedMaps || [];

    rankOrder.forEach((rKey, idx) => {
      const detail = RANK_DETAILS[rKey];
      const isUnlocked = unlockedRanks.includes(rKey);
      const isActive = (currentRank === rKey);
      const isCompleted = completedMaps.includes(rKey);
      const prevRankKey = idx > 0 ? rankOrder[idx - 1] : null;

      const nodeCard = document.createElement('div');
      nodeCard.className = `rank-node-card ${isActive ? 'active-rank' : ''} ${!isUnlocked ? 'locked-rank' : ''}`;

      let badgesHTML = '';
      let actionHTML = '';

      if (isActive) {
        badgesHTML += `<span class="node-status status-active">📍 LEVEL SAAT INI</span>`;
      }

      if (isCompleted) {
        badgesHTML += `<span class="node-status status-unlocked" style="background: rgba(52, 211, 153, 0.2); color: #34d399; margin-left: 4px;">✅ COMPLETED</span>`;
      }

      if (isUnlocked) {
        if (!isActive && !isCompleted) {
          badgesHTML += `<span class="node-status status-unlocked" style="margin-left: 4px;">UNLOCKED</span>`;
        }
        actionHTML = `<button class="btn-select-rank" data-rank="${rKey}">${isActive ? '🎮 MAINKAN MAP INI' : '🗺️ MAIN MAP INI ➔'}</button>`;
      } else {
        badgesHTML += `<span class="node-status status-locked">🔒 TERKUNCI</span>`;
        actionHTML = `<span style="font-size: 11px; color: var(--text-sub); font-style: italic;">🔒 Selesaikan ${prevRankKey} Map dahulu</span>`;
      }

      const diffTag = isUnlocked ? detail.difficultyBadge : '🔒 TERKUNCI';

      nodeCard.innerHTML = `
        <div class="rank-node-left">
          <span class="node-badge" style="${!isUnlocked ? 'filter: grayscale(1); opacity: 0.5;' : ''}">${detail.badge}</span>
          <div class="node-info">
            <h3 style="color: ${isUnlocked ? detail.color : 'var(--text-sub)'}">${detail.name} — ${detail.mapTitle}</h3>
            <p>${detail.levelTitle} • <span style="color: ${isUnlocked ? detail.color : '#ef4444'}">${diffTag}</span></p>
          </div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          ${badgesHTML}
          ${actionHTML}
        </div>
      `;

      container.appendChild(nodeCard);

      if (isUnlocked) {
        const selectBtn = nodeCard.querySelector('.btn-select-rank');
        if (selectBtn) {
          selectBtn.addEventListener('click', () => {
            this.playAudio('playClick');
            this.state.currentRank = rKey;
            this.state.completedCheckpoints = [];
            this.state.unlockedGates = [];
            this.playerEngine.x = 120;
            this.playerEngine.y = 550;
            this.saveProgress();
            this.syncStateWithEngines();
            this.startGameplay();
          });
        }
      }
    });
  }
}

// Instantiate Game Application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new KnowledgeQuestApp();
});
