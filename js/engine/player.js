// Player Controller Engine for Single-Frame Map (1000px x 650px)
// Supports Desktop Keyboard (WASD & Arrow Keys) + Mobile Touch Virtual D-Pad

class PlayerEngine {
  constructor(startX = 120, startY = 550) {
    this.x = startX;
    this.y = startY;
    this.w = 18;
    this.h = 18;
    this.speed = 4.0;
    this.facing = 'down';
    this.isMoving = false;
    this.pulseAngle = 0;

    // Direction Key Inputs
    this.keys = {
      up: false,
      down: false,
      left: false,
      right: false
    };

    // Mascot Image Asset
    this.mascotImg = new Image();
    this.mascotImg.src = 'maskot_ce.png';

    this.setupKeyboardListeners();
  }

  setupKeyboardListeners() {
    window.addEventListener('keydown', (e) => {
      this.handleKeyChange(e.key, true);
    });

    window.addEventListener('keyup', (e) => {
      this.handleKeyChange(e.key, false);
    });
  }

  handleKeyChange(key, isPressed) {
    switch (key.toLowerCase()) {
      case 'w':
      case 'arrowup':
        this.keys.up = isPressed;
        break;
      case 's':
      case 'arrowdown':
        this.keys.down = isPressed;
        break;
      case 'a':
      case 'arrowleft':
        this.keys.left = isPressed;
        break;
      case 'd':
      case 'arrowright':
        this.keys.right = isPressed;
        break;
    }
  }

  setDPadState(dir, isPressed) {
    if (dir in this.keys) {
      this.keys[dir] = !!isPressed;
    }
  }

  resetInput() {
    this.keys.up = false;
    this.keys.down = false;
    this.keys.left = false;
    this.keys.right = false;
    this.isMoving = false;
  }

  // Update Player Position & Resolve AABB Collision with Fixed Boundaries
  update(mapEngine, unlockedGateIds = []) {
    let dx = 0;
    let dy = 0;

    if (this.keys.up) { dy -= 1; this.facing = 'up'; }
    if (this.keys.down) { dy += 1; this.facing = 'down'; }
    if (this.keys.left) { dx -= 1; this.facing = 'left'; }
    if (this.keys.right) { dx += 1; this.facing = 'right'; }

    if (dx !== 0 && dy !== 0) {
      dx *= 0.7071;
      dy *= 0.7071;
    }

    this.isMoving = (dx !== 0 || dy !== 0);

    if (this.isMoving) {
      gameAudio.playFootstep();

      // Test Move X
      const nextRectX = {
        x: this.x + dx * this.speed - this.w / 2,
        y: this.y - this.h / 2,
        w: this.w,
        h: this.h
      };

      if (!mapEngine.checkCollision(nextRectX, unlockedGateIds)) {
        this.x += dx * this.speed;
      }

      // Test Move Y
      const nextRectY = {
        x: this.x - this.w / 2,
        y: this.y + dy * this.speed - this.h / 2,
        w: this.w,
        h: this.h
      };

      if (!mapEngine.checkCollision(nextRectY, unlockedGateIds)) {
        this.y += dy * this.speed;
      }
    }
  }

  // Render Player Mascot on Single-Frame Map with High Visibility Glow Aura
  render(ctx) {
    this.pulseAngle += 0.08;
    const auraRadius = 18 + Math.sin(this.pulseAngle) * 3;

    // 1. Selection Glowing Ring Aura under Player Feet
    ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.beginPath();
    ctx.arc(this.x, this.y + 4, auraRadius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2. Drop Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y + 12, 14, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3. Render Mascot Image (maskot_ce.png)
    if (this.mascotImg.complete && this.mascotImg.naturalWidth > 0) {
      ctx.drawImage(this.mascotImg, this.x - 20, this.y - 28, 40, 40);
    } else {
      // Fallback 2D Student Adventurer Avatar Sprite
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(this.x, this.y - 4, 14, 0, Math.PI * 2);
      ctx.fill();

      // Student Cap
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(this.x - 12, this.y - 18, 24, 6);
      ctx.fillRect(this.x - 8, this.y - 22, 16, 5);

      // Face Eyes
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.x - 4, this.y - 6, 3, 0, Math.PI * 2);
      ctx.arc(this.x + 4, this.y - 6, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Direction Arrow Indicator Pointer
    ctx.fillStyle = '#ffd700';
    ctx.beginPath();
    let ptrX = this.x;
    let ptrY = this.y + 4;
    if (this.facing === 'up') ptrY -= 20;
    if (this.facing === 'down') ptrY += 18;
    if (this.facing === 'left') ptrX -= 20;
    if (this.facing === 'right') ptrX += 20;

    ctx.arc(ptrX, ptrY, 4, 0, Math.PI * 2);
    ctx.fill();

    // 5. Floating Player Name Tag ("YOU 🧍")
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(this.x - 22, this.y - 36, 44, 15);
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 1;
    ctx.strokeRect(this.x - 22, this.y - 36, 44, 15);

    ctx.fillStyle = '#ffd700';
    ctx.font = '900 9px Outfit, sans-serif';
    ctx.fillText('🧍 YOU', this.x - 16, this.y - 25);
  }
}
