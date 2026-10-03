// Physical Checkpoint Triggers & Gate Dependency State Engine for Single-Frame Maps (6 Ranks)

class CheckpointEngine {
  constructor() {
    this.bobbingAngle = 0;
    this.currentRank = 'Bronze';

    // Physical Checkpoints Array (Q1 to Q5) placed in Single-Frame Map (1000x650)
    this.checkpoints = [
      {
        id: 1,
        x: 280,
        y: 550,
        radius: 30,
        title: "Q1",
        label: "QUESTION 01",
        status: "available", // 'available' | 'locked' | 'completed'
        requiredGateId: 1,
        questionData: BRONZE_CHECKPOINT_QUESTIONS[0]
      },
      {
        id: 2,
        x: 580,
        y: 520,
        radius: 30,
        title: "Q2",
        label: "QUESTION 02",
        status: "locked",
        requiredGateId: 2,
        questionData: BRONZE_CHECKPOINT_QUESTIONS[1]
      },
      {
        id: 3,
        x: 850,
        y: 280,
        radius: 30,
        title: "Q3",
        label: "QUESTION 03",
        status: "locked",
        requiredGateId: 3,
        questionData: BRONZE_CHECKPOINT_QUESTIONS[2]
      },
      {
        id: 4,
        x: 450,
        y: 180,
        radius: 30,
        title: "Q4",
        label: "QUESTION 04",
        status: "locked",
        requiredGateId: 4,
        questionData: BRONZE_CHECKPOINT_QUESTIONS[3]
      },
      {
        id: 5,
        x: 120,
        y: 180,
        radius: 30,
        title: "Q5",
        label: "FINAL Q5",
        status: "locked",
        requiredGateId: null,
        questionData: BRONZE_CHECKPOINT_QUESTIONS[4]
      }
    ];

    // Shrine Final Victory Area (Triggered after Q5 complete at 120, 90)
    this.shrineTrigger = {
      x: 120,
      y: 90,
      radius: 40
    };
  }

  // Load question dataset based on rank ('Bronze'..'Mythic') with randomized option order
  loadRank(rank = 'Bronze') {
    this.currentRank = rank;
    const qList = (typeof getRandomizedQuestions === 'function') 
      ? getRandomizedQuestions(rank) 
      : BRONZE_CHECKPOINT_QUESTIONS;

    this.checkpoints.forEach((cp, idx) => {
      cp.questionData = qList[idx] || qList[0];
    });
  }

  // Restore saved checkpoint & gate statuses from LocalStorage
  syncState(completedCheckpointIds = [], unlockedGateIds = [], rank = 'Bronze') {
    this.loadRank(rank);

    this.checkpoints.forEach((cp, idx) => {
      if (completedCheckpointIds.includes(cp.id)) {
        cp.status = 'completed';
      } else if (idx === 0 || completedCheckpointIds.includes(this.checkpoints[idx - 1].id)) {
        cp.status = 'available';
      } else {
        cp.status = 'locked';
      }
    });
  }

  // Get current active target objective text for HUD
  getCurrentObjective() {
    for (let cp of this.checkpoints) {
      if (cp.status === 'available') {
        switch (cp.id) {
          case 1: return `Walk to Question 01`;
          case 2: return `Pass Gate 01 to Question 02`;
          case 3: return `Cross Bridge to Question 03`;
          case 4: return `Pass Mountain Pass to Question 04`;
          case 5: return `Enter Shrine Gate to Final Q5`;
        }
      }
    }

    const allCompleted = this.checkpoints.every(cp => cp.status === 'completed');
    if (allCompleted) {
      return "🏆 Approach Shrine Altar!";
    }

    return "Explore Map";
  }

  // Check if player is near any active checkpoint or final shrine altar
  checkPlayerProximity(player) {
    this.bobbingAngle += 0.08;

    let nearest = null;
    let minDist = Infinity;

    for (let cp of this.checkpoints) {
      const dist = Math.hypot(player.x - cp.x, player.y - cp.y);
      if (dist < cp.radius + 15) {
        if (dist < minDist) {
          minDist = dist;
          nearest = cp;
        }
      }
    }

    // Check Shrine Finish Proximity
    const shrineDist = Math.hypot(player.x - this.shrineTrigger.x, player.y - this.shrineTrigger.y);
    const allCompleted = this.checkpoints.every(cp => cp.status === 'completed');

    return {
      nearestCheckpoint: nearest,
      distance: minDist,
      isShrineTriggerReady: allCompleted && (shrineDist < this.shrineTrigger.radius)
    };
  }

  // Render Checkpoints on Single-Frame Canvas Map with Large High-Visibility Text Badges
  render(ctx) {
    const bobbingY = Math.sin(this.bobbingAngle) * 5;
    const r = this.currentRank || 'Bronze';
    const detail = (typeof RANK_DETAILS !== 'undefined' && RANK_DETAILS[r]) ? RANK_DETAILS[r] : { checkpointIcon: '❓' };
    const cpIcon = detail.checkpointIcon || '❓';

    this.checkpoints.forEach(cp => {
      const qLabelText = cp.id === 5 ? `FINAL QUESTION 05` : `QUESTION 0${cp.id}`;

      if (cp.status === 'completed') {
        // COMPLETED CHECKPOINT (Green ✅ Marker & Large Green Badge Box)
        ctx.fillStyle = 'rgba(16, 185, 129, 0.3)';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 22, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 15px Outfit, sans-serif';
        ctx.fillText('✓', cp.x - 5, cp.y + 5);

        // Large High-Visibility Text Badge Box
        const badgeText = `✅ Q${cp.id} SELESAI`;
        ctx.font = '900 12px Outfit, sans-serif';
        const textWidth = ctx.measureText(badgeText).width;
        const boxW = textWidth + 18;
        const boxH = 22;
        const boxX = cp.x - boxW / 2;
        const boxY = cp.y + 22;

        ctx.fillStyle = '#065f46';
        ctx.fillRect(boxX - 2, boxY - 2, boxW + 4, boxH + 4);
        ctx.fillStyle = '#047857';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(badgeText, boxX + 9, boxY + 15);

      } else if (cp.status === 'available') {
        // AVAILABLE ACTIVE CHECKPOINT (Glowing Gold/Yellow Pulsating Marker & Large Badge)
        const py = cp.y + bobbingY;

        ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
        ctx.beginPath();
        ctx.arc(cp.x, py, 28, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.arc(cp.x, py, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 18px Outfit, sans-serif';
        ctx.fillText(cpIcon, cp.x - 10, py + 6);

        // Large High-Visibility Text Badge Box Above Checkpoint
        const badgeText = `❓ ${qLabelText}`;
        ctx.font = '900 13px Outfit, sans-serif';
        const textWidth = ctx.measureText(badgeText).width;
        const boxW = textWidth + 20;
        const boxH = 24;
        const boxX = cp.x - boxW / 2;
        const boxY = py - 36;

        // Outer Glow Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(boxX - 2, boxY - 2, boxW + 4, boxH + 4);

        // Main Yellow Badge Fill
        ctx.fillStyle = '#d97706';
        ctx.fillRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#b45309';
        ctx.fillRect(boxX + 2, boxY + 2, boxW - 4, boxH - 4);

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(badgeText, boxX + 10, boxY + 17);

      } else {
        // LOCKED CHECKPOINT (Dimmed Slate Box & 🔒 Icon)
        ctx.fillStyle = 'rgba(30, 41, 59, 0.6)';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#475569';
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 14, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 12px Outfit, sans-serif';
        ctx.fillText('🔒', cp.x - 6, cp.y + 4);

        // Large High-Visibility Locked Text Badge Box
        const badgeText = `🔒 ${qLabelText}`;
        ctx.font = '900 11px Outfit, sans-serif';
        const textWidth = ctx.measureText(badgeText).width;
        const boxW = textWidth + 16;
        const boxH = 20;
        const boxX = cp.x - boxW / 2;
        const boxY = cp.y + 20;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#475569';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#94a3b8';
        ctx.fillText(badgeText, boxX + 8, boxY + 14);
      }
    });

    // Render Shrine Altar Finish Marker with Large Banner
    const allCompleted = this.checkpoints.every(cp => cp.status === 'completed');
    if (allCompleted) {
      const py = this.shrineTrigger.y + bobbingY;

      ctx.fillStyle = 'rgba(255, 215, 0, 0.45)';
      ctx.beginPath();
      ctx.arc(this.shrineTrigger.x, py, 32, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffd700';
      ctx.beginPath();
      ctx.arc(this.shrineTrigger.x, py, 22, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 22px Outfit, sans-serif';
      ctx.fillText('🏆', this.shrineTrigger.x - 11, py + 8);

      // Large Finish Banner
      const finishText = '🏆 KNOWLEDGE SHRINE (FINISH ALTAR)';
      ctx.font = '900 12px Outfit, sans-serif';
      const textWidth = ctx.measureText(finishText).width;
      const boxW = textWidth + 20;
      const boxH = 24;
      const boxX = this.shrineTrigger.x - boxW / 2;
      const boxY = py - 40;

      ctx.fillStyle = '#78350f';
      ctx.fillRect(boxX, boxY, boxW, boxH);
      ctx.strokeStyle = '#ffd700';
      ctx.lineWidth = 2;
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      ctx.fillStyle = '#fef08a';
      ctx.fillText(finishText, boxX + 10, boxY + 16);
    }
  }
}
