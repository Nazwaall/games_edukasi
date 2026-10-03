// Single-Frame Miniature World Map Engine for Knowledge Quest (Supports 6 Distinct Rank Maps)
// Maps: Bronze Forest | Silver Valley | Gold City | Diamond Campus | Master Realm | Mythic Realm
// Map Dimensions: Fixed 1000px x 650px (Entire Map Visible in One Single Viewport Frame)

class MapEngine {
  constructor() {
    this.width = 1000;
    this.height = 650;
    this.waterAnimFrame = 0;
    this.currentRank = 'Bronze';

    // AABB Collision Rectangles (Outer Walls, River, Mountain Rocks, Dense Groves)
    this.obstacles = [
      // Outer World Boundaries (Clamped to 1000x650 frame)
      { x: 0, y: 0, w: 1000, h: 40 },       // North Wall
      { x: 0, y: 610, w: 1000, h: 40 },     // South Wall
      { x: 0, y: 0, w: 40, h: 650 },        // West Wall
      { x: 960, y: 0, w: 40, h: 650 },       // East Wall

      // River Water Obstacle (Flows vertically between Area 2 & Area 3)
      { x: 720, y: 0, w: 50, h: 410 },
      { x: 720, y: 490, w: 50, h: 160 },

      // Area 1 (Bottom Left - Start Zone) Fences & Tree Clusters
      { x: 180, y: 430, w: 200, h: 50 },    // North fence of Area 1

      // Area 2 (Bottom Right) Mountain Rocks & Dense Forest
      { x: 480, y: 610, w: 480, h: 40 },
      { x: 480, y: 420, w: 140, h: 60 },

      // Area 3 (Mid-Right Zone) River Cliff Rocks
      { x: 860, y: 120, w: 100, h: 300 },
      { x: 770, y: 40, w: 190, h: 100 },

      // Area 4 (Top Center Zone) Mountain Pass Wall
      { x: 320, y: 40, w: 320, h: 100 },
      { x: 480, y: 260, w: 200, h: 140 },
      { x: 260, y: 260, w: 60, h: 140 },

      // Area 5 (Top Left - Knowledge Shrine Enclosure)
      { x: 40, y: 40, w: 240, h: 30 },      // North Shrine Wall
      { x: 40, y: 40, w: 30, h: 260 },      // West Shrine Wall
      { x: 40, y: 270, w: 240, h: 30 }      // South Shrine Wall
    ];

    // Physical Gates (Gate 1 to Gate 4)
    this.gates = {
      1: { id: 1, x: 420, y: 500, w: 24, h: 110, name: "Gate 1", requiredQ: 1 },
      2: { id: 2, x: 720, y: 410, w: 50, h: 80, name: "Gate 2", requiredQ: 2 },
      3: { id: 3, x: 640, y: 140, w: 30, h: 120, name: "Gate 3", requiredQ: 3 },
      4: { id: 4, x: 250, y: 140, w: 30, h: 130, name: "Gate 4", requiredQ: 4 }
    };

    // Pre-generate decorative elements
    this.decorations = [];
    for (let i = 0; i < 70; i++) {
      this.decorations.push({
        x: Math.floor(Math.random() * 920) + 40,
        y: Math.floor(Math.random() * 570) + 40,
        type: i % 3 === 0 ? 'flower_yellow' : (i % 3 === 1 ? 'flower_pink' : 'grass_tuft')
      });
    }
  }

  setRankTheme(rank = 'Bronze') {
    this.currentRank = rank;
  }

  // AABB Collision Detection against solid obstacles & locked physical gates
  checkCollision(rect, unlockedGateIds = []) {
    // Check solid obstacles
    for (let obs of this.obstacles) {
      if (
        rect.x < obs.x + obs.w &&
        rect.x + rect.w > obs.x &&
        rect.y < obs.y + obs.h &&
        rect.y + rect.h > obs.y
      ) {
        return true;
      }
    }

    // Check locked physical gates
    for (let gId in this.gates) {
      const g = this.gates[gId];
      const isUnlocked = unlockedGateIds.includes(g.id);

      if (!isUnlocked) { // If locked, acts as solid wall
        if (
          rect.x < g.x + g.w &&
          rect.x + rect.w > g.x &&
          rect.y < g.y + g.h &&
          rect.y + rect.h > g.y
        ) {
          return true;
        }
      }
    }

    return false;
  }

  // Render Rich 2.5D Single-Frame Map with Theme Support for 6 Ranks
  render(ctx, unlockedGateIds = []) {
    this.waterAnimFrame += 0.05;
    const r = this.currentRank || 'Bronze';

    // 1. Terrain Base Gradient per Rank
    const bgGrad = ctx.createLinearGradient(0, 0, this.width, this.height);
    if (r === 'Mythic') {
      bgGrad.addColorStop(0, '#0b0818');
      bgGrad.addColorStop(0.5, '#170c38');
      bgGrad.addColorStop(1, '#080314');
    } else if (r === 'Master') {
      bgGrad.addColorStop(0, '#31102b');
      bgGrad.addColorStop(0.5, '#240a1f');
      bgGrad.addColorStop(1, '#150412');
    } else if (r === 'Diamond') {
      bgGrad.addColorStop(0, '#0a192f');
      bgGrad.addColorStop(0.5, '#0f2744');
      bgGrad.addColorStop(1, '#060d1a');
    } else if (r === 'Gold') {
      bgGrad.addColorStop(0, '#3b2308');
      bgGrad.addColorStop(0.5, '#2e1b05');
      bgGrad.addColorStop(1, '#1c1002');
    } else if (r === 'Silver') {
      bgGrad.addColorStop(0, '#1e293b');
      bgGrad.addColorStop(0.5, '#1e293b');
      bgGrad.addColorStop(1, '#0f172a');
    } else { // Bronze
      bgGrad.addColorStop(0, '#1d481f');
      bgGrad.addColorStop(0.5, '#183c19');
      bgGrad.addColorStop(1, '#133014');
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, this.width, this.height);

    // Subtle Grid Pattern
    ctx.fillStyle = (r === 'Mythic' ? '#1c1145' : (r === 'Master' ? '#44163c' : (r === 'Diamond' ? '#173b64' : (r === 'Gold' ? '#52320b' : (r === 'Silver' ? '#0f172a' : '#153516')))));
    for (let x = 0; x < this.width; x += 80) {
      for (let y = 0; y < this.height; y += 80) {
        if ((x + y) % 160 === 0) {
          ctx.fillRect(x, y, 40, 40);
        }
      }
    }

    // Render Environmental Flowers / Starlight Orbs
    this.decorations.forEach(d => {
      if (r === 'Mythic') {
        ctx.fillStyle = '#a855f7';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (r === 'Master') {
        ctx.fillStyle = '#ff007f';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (r === 'Diamond') {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (r === 'Gold') {
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      } else if (r === 'Silver') {
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        if (d.type === 'flower_yellow') {
          ctx.fillStyle = '#f6e05e';
          ctx.beginPath();
          ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (d.type === 'flower_pink') {
          ctx.fillStyle = '#f472b6';
          ctx.beginPath();
          ctx.arc(d.x, d.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.strokeStyle = '#38a169';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x - 3, d.y - 5);
          ctx.moveTo(d.x, d.y);
          ctx.lineTo(d.x + 3, d.y - 6);
          ctx.stroke();
        }
      }
    });

    // 2. DISTINCT GREY STONE COBBLESTONE ROAD SEGMENTS (JALAN BATU ABU-ABU UTAMA)
    const drawClearPathSegment = (x, y, w, h, label = '') => {
      // Dark Slate Border (Tepi Jalan Abu-Abu Tua)
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(x - 6, y - 6, w + 12, h + 12);

      ctx.fillStyle = '#334155';
      ctx.fillRect(x - 4, y - 4, w + 8, h + 8);

      // Main Grey Stone Road Surface (Permukaan Jalan Abu-Abu Slate)
      ctx.fillStyle = '#475569';
      ctx.fillRect(x, y, w, h);

      ctx.fillStyle = '#64748b';
      ctx.fillRect(x + 3, y + 3, w - 6, h - 6);

      // Cobblestone Paving Grid Pattern (Tekstur Ubin Batu Abu-Abu)
      ctx.strokeStyle = 'rgba(15, 23, 42, 0.25)';
      ctx.lineWidth = 1.5;
      for (let sx = x + 16; sx < x + w; sx += 20) {
        ctx.beginPath();
        ctx.moveTo(sx, y);
        ctx.lineTo(sx, y + h);
        ctx.stroke();
      }
      for (let sy = y + 16; sy < y + h; sy += 20) {
        ctx.beginPath();
        ctx.moveTo(x, sy);
        ctx.lineTo(x + w, sy);
        ctx.stroke();
      }

      // High-Contrast Road Sign Badge Header
      if (label) {
        ctx.font = '900 11px Outfit, sans-serif';
        const textWidth = ctx.measureText(label).width;
        const boxW = textWidth + 14;
        const boxH = 20;

        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(x + 8, y + 6, boxW, boxH);
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 8, y + 6, boxW, boxH);

        ctx.fillStyle = '#f8fafc';
        ctx.fillText(label, x + 15, y + 20);
      }
    };

    // Map Path Segments (Jalan Batu Abu-Abu Utama)
    drawClearPathSegment(60, 510, 370, 80, `🚩 JALAN UTAMA ABU-ABU ➔ Q1`);
    drawClearPathSegment(420, 480, 320, 80, `🚩 JALAN UTAMA ➔ Q2`);
    drawClearPathSegment(650, 420, 90, 100);
    drawClearPathSegment(720, 240, 180, 220, `🚩 JALAN UTAMA ➔ Q3`);
    drawClearPathSegment(620, 150, 280, 80);
    drawClearPathSegment(240, 150, 420, 80, `🚩 JALAN UTAMA ➔ Q4 & Q5`);
    drawClearPathSegment(60, 60, 220, 200, `🏆 JALAN SHRINE ALTAR`);

    // Directional Waypoints (🟡)
    const drawWaypoints = (pts) => {
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = (r === 'Mythic' ? '#a855f7' : (r === 'Master' ? '#ff007f' : (r === 'Diamond' ? '#00f0ff' : (r === 'Gold' ? '#ffd700' : (r === 'Silver' ? '#0284c7' : '#d97706')))));
      ctx.lineWidth = 2;
      pts.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      });
    };

    drawWaypoints([
      { x: 120, y: 550 }, { x: 180, y: 550 }, { x: 230, y: 550 }, { x: 340, y: 550 }, { x: 390, y: 550 },
      { x: 470, y: 520 }, { x: 520, y: 520 }, { x: 630, y: 520 }, { x: 690, y: 470 }, { x: 745, y: 440 },
      { x: 810, y: 380 }, { x: 850, y: 340 }, { x: 850, y: 220 }, { x: 750, y: 190 }, { x: 700, y: 190 },
      { x: 580, y: 190 }, { x: 500, y: 190 }, { x: 380, y: 190 }, { x: 300, y: 190 }, { x: 200, y: 190 },
      { x: 120, y: 140 }
    ]);

    // 3. River Water & Bridge
    const riverGrad = ctx.createLinearGradient(720, 0, 770, 0);
    if (r === 'Mythic') {
      riverGrad.addColorStop(0, '#3b0764'); riverGrad.addColorStop(0.5, '#c084fc'); riverGrad.addColorStop(1, '#581c87');
    } else if (r === 'Master') {
      riverGrad.addColorStop(0, '#831843'); riverGrad.addColorStop(0.5, '#f472b6'); riverGrad.addColorStop(1, '#9d174d');
    } else if (r === 'Diamond') {
      riverGrad.addColorStop(0, '#0369a1'); riverGrad.addColorStop(0.5, '#38bdf8'); riverGrad.addColorStop(1, '#0284c7');
    } else if (r === 'Gold') {
      riverGrad.addColorStop(0, '#78350f'); riverGrad.addColorStop(0.5, '#ffd700'); riverGrad.addColorStop(1, '#b45309');
    } else if (r === 'Silver') {
      riverGrad.addColorStop(0, '#0369a1'); riverGrad.addColorStop(0.5, '#38bdf8'); riverGrad.addColorStop(1, '#0284c7');
    } else {
      riverGrad.addColorStop(0, '#1e4e8c'); riverGrad.addColorStop(0.5, '#2b7fff'); riverGrad.addColorStop(1, '#1b3f73');
    }
    ctx.fillStyle = riverGrad;

    ctx.fillRect(720, 0, 50, 410);
    ctx.fillRect(720, 490, 50, 160);

    // Water Ripples
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    for (let wy = 15; wy < 650; wy += 35) {
      if (wy >= 410 && wy <= 490) continue;
      const waveShift = Math.sin(this.waterAnimFrame + wy * 0.05) * 6;
      ctx.beginPath();
      ctx.moveTo(725 + waveShift, wy);
      ctx.lineTo(745 + waveShift, wy + 2);
      ctx.stroke();
    }

    // Bridge at Gate 2
    ctx.fillStyle = (r === 'Mythic' ? '#581c87' : (r === 'Master' ? '#831843' : (r === 'Diamond' ? '#0f172a' : (r === 'Gold' ? '#78350f' : (r === 'Silver' ? '#1e293b' : '#3e240c')))));
    ctx.fillRect(710, 410, 70, 80);

    ctx.fillStyle = (r === 'Mythic' ? '#c084fc' : (r === 'Master' ? '#f472b6' : (r === 'Diamond' ? '#38bdf8' : (r === 'Gold' ? '#ffd700' : (r === 'Silver' ? '#94a3b8' : '#8b5a2b')))));
    for (let by = 415; by <= 480; by += 12) {
      ctx.fillRect(712, by, 66, 9);
    }

    // 4. Solid Obstacles (Trees / Buildings / Cosmic Crystals)
    for (let obs of this.obstacles) {
      if (obs.w >= 100 || obs.h >= 100) {
        ctx.fillStyle = (r === 'Mythic' ? '#170c38' : (r === 'Master' ? '#240a1f' : (r === 'Diamond' ? '#060d1a' : (r === 'Gold' ? '#1c1002' : (r === 'Silver' ? '#0f172a' : '#0d240e')))));
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

        for (let tx = obs.x + 12; tx <= obs.x + obs.w - 24; tx += 34) {
          for (let ty = obs.y + 12; ty <= obs.y + obs.h - 24; ty += 34) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
            ctx.beginPath();
            ctx.ellipse(tx + 12, ty + 20, 16, 8, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = (r === 'Mythic' ? '#7e22ce' : (r === 'Master' ? '#be185d' : (r === 'Diamond' ? '#0284c7' : (r === 'Gold' ? '#b45309' : (r === 'Silver' ? '#475569' : '#5c3d1e')))));
            ctx.fillRect(tx + 9, ty + 10, 6, 12);

            ctx.fillStyle = (r === 'Mythic' ? '#a855f7' : (r === 'Master' ? '#ff007f' : (r === 'Diamond' ? '#38bdf8' : (r === 'Gold' ? '#ffd700' : (r === 'Silver' ? '#64748b' : '#2d7a32')))));
            ctx.beginPath();
            ctx.arc(tx + 12, ty + 8, 16, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        ctx.fillStyle = '#334155';
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
      }
    }

    // 5. Render Physical Gates
    for (let gId in this.gates) {
      const g = this.gates[gId];
      const isUnlocked = unlockedGateIds.includes(g.id);

      if (isUnlocked) {
        ctx.fillStyle = 'rgba(56, 161, 105, 0.25)';
        ctx.fillRect(g.x - 4, g.y - 4, g.w + 8, g.h + 8);

        ctx.fillStyle = '#38a169';
        ctx.fillRect(g.x, g.y, 6, g.h);
        ctx.fillRect(g.x + g.w - 6, g.y, 6, g.h);

        ctx.fillStyle = '#68d391';
        ctx.font = '900 11px Outfit, sans-serif';
        ctx.fillText('🔓 OPEN', g.x - 12, g.y + g.h / 2);

      } else {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(g.x + 3, g.y + 3, g.w, g.h);

        ctx.fillStyle = (r === 'Mythic' ? '#581c87' : (r === 'Master' ? '#831843' : (r === 'Diamond' ? '#0c4a6e' : (r === 'Gold' ? '#78350f' : (r === 'Silver' ? '#1e293b' : '#4a2810')))));
        ctx.fillRect(g.x, g.y, g.w, g.h);

        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.strokeRect(g.x, g.y, g.w, g.h);

        ctx.fillStyle = '#dc2626';
        ctx.fillRect(g.x - 14, g.y + g.h / 2 - 12, g.w + 28, 24);
        ctx.strokeStyle = '#ffd700';
        ctx.strokeRect(g.x - 14, g.y + g.h / 2 - 12, g.w + 28, 24);

        ctx.fillStyle = '#ffffff';
        ctx.font = '900 10px Outfit, sans-serif';
        ctx.fillText(`🔒 GATE ${g.id}`, g.x - 12, g.y + g.h / 2 + 4);
      }
    }

    // 6. Knowledge Shrine / Altar (Area 5 Top Left)
    const shrineDetail = RANK_DETAILS[r] || RANK_DETAILS.Bronze;
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(60, 40, 160, 100);

    ctx.fillStyle = shrineDetail.color;
    ctx.fillRect(68, 48, 144, 84);

    ctx.fillStyle = shrineDetail.color;
    ctx.font = '900 13px Outfit, sans-serif';
    ctx.fillText(`${shrineDetail.checkpointIcon} ${shrineDetail.mapTitle.toUpperCase()}`, 65, 30);

    // 7. START ZONE Welcome Banner (Bottom Left)
    ctx.fillStyle = shrineDetail.color;
    ctx.fillRect(45, 515, 85, 70);
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(45, 515, 85, 70);

    ctx.fillStyle = '#0f172a';
    ctx.font = '900 12px Outfit, sans-serif';
    ctx.fillText('🚩 START', 52, 545);
    ctx.font = '700 9px Outfit, sans-serif';
    ctx.fillText('ZONE (MULAI)', 48, 565);
  }
}
