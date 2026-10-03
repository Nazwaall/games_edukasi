// KNOWLEDGE QUEST - Complete Question & Rank Database for All 6 Ranks
// Ranks: Bronze (SD) -> Silver (SMP) -> Gold (SMA) -> Diamond (Kuliah) -> Master (Universitas) -> Mythic (Final Cosmic)

const BRONZE_CHECKPOINT_QUESTIONS = [
  {
    id: "b_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — SAINS",
    category: "🔬 Sains Dasar",
    difficulty: "Bronze",
    question: "Planet terbesar dalam tata surya kita adalah...",
    options: ["Bumi", "Mars", "Jupiter", "Venus"],
    correctAnswer: "Jupiter",
    explanation: "Jupiter adalah planet terbesar di tata surya dengan diameter lebih dari 11 kali diameter Bumi.",
    xp: 100
  },
  {
    id: "b_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — MATEMATIKA",
    category: "🧠 Matematika Dasar",
    difficulty: "Bronze",
    question: "Berapakah hasil perkalian dari 8 × 7?",
    options: ["48", "54", "56", "64"],
    correctAnswer: "56",
    explanation: "Perkalian perkalian dasar: 8 × 7 = 56.",
    xp: 100
  },
  {
    id: "b_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — BAHASA INDONESIA",
    category: "📚 Bahasa Indonesia",
    difficulty: "Bronze",
    question: "Lawan kata (antonim) dari kata 'besar' adalah...",
    options: ["Tinggi", "Kecil", "Panjang", "Lebar"],
    correctAnswer: "Kecil",
    explanation: "Lawan kata atau antonim dari 'besar' adalah 'kecil'.",
    xp: 100
  },
  {
    id: "b_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — PENGETAHUAN UMUM",
    category: "🌍 Pengetahuan Umum",
    difficulty: "Bronze",
    question: "Bendera kebangsaan negara Indonesia terdiri dari dua warna, yaitu...",
    options: ["Merah dan biru", "Merah dan putih", "Putih dan hijau", "Biru dan putih"],
    correctAnswer: "Merah dan putih",
    explanation: "Bendera Negara Sang Merah Putih terdiri dari warna merah di atas dan putih di bawah.",
    xp: 100
  },
  {
    id: "b_q5",
    checkpointNum: 5,
    title: "FINAL CHECKPOINT 05 — LOGIKA",
    category: "🧩 Logika Sederhana",
    difficulty: "Bronze Final",
    question: "Jika semua kucing adalah hewan, dan Mimi adalah seekor kucing, maka Mimi adalah...",
    options: ["Tumbuhan", "Hewan", "Benda Mati", "Planet"],
    correctAnswer: "Hewan",
    explanation: "Logika premis silogisme: Semua kucing adalah hewan. Mimi adalah kucing. Maka Mimi adalah hewan.",
    xp: 150
  }
];

const SILVER_CHECKPOINT_QUESTIONS = [
  {
    id: "s_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — BIOLOGI (SMP)",
    category: "🫀 Biologi Manusia",
    difficulty: "Silver",
    question: "Organ tubuh manusia yang berfungsi utama memompa darah ke seluruh tubuh adalah...",
    options: ["Paru-paru", "Jantung", "Hati", "Ginjal"],
    correctAnswer: "Jantung",
    explanation: "Jantung adalah organ berotot yang memompa darah ke seluruh tubuh melalui pembuluh darah.",
    xp: 150
  },
  {
    id: "s_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — ALJABAR (SMP)",
    category: "📐 Matematika Aljabar",
    difficulty: "Silver",
    question: "Jika 2x + 5 = 15, berapakah nilai dari x?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "5",
    explanation: "Penyelesaian persamaan aljabar linier: 2x = 15 - 5 => 2x = 10 => x = 10 / 2 = 5.",
    xp: 150
  },
  {
    id: "s_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — SEJARAH INDONESIA",
    category: "📜 Sejarah Kemerdekaan",
    difficulty: "Silver",
    question: "Teks Proklamasi Kemerdekaan Indonesia dibacakan oleh Ir. Soekarno pada tanggal...",
    options: ["17 Agustus 1945", "28 Oktober 1928", "10 November 1945", "1 Juni 1945"],
    correctAnswer: "17 Agustus 1945",
    explanation: "Proklamasi Kemerdekaan Indonesia dibacakan di Jalan Pegangsaan Timur 56 Jakarta pada tanggal 17 Agustus 1945.",
    xp: 150
  },
  {
    id: "s_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — FISIKA (SMP)",
    category: "⚡ Fisika Dasar",
    difficulty: "Silver",
    question: "Satuan Internasional (SI) untuk mengukur besar gaya adalah...",
    options: ["Joule", "Watt", "Newton", "Pascal"],
    correctAnswer: "Newton",
    explanation: "Gaya diukur dalam satuan Newton (N), dinamai sesuai fisikawan Sir Isaac Newton.",
    xp: 150
  },
  {
    id: "s_q5",
    checkpointNum: 5,
    title: "FINAL CHECKPOINT 05 — GEOMETRI (SMP)",
    category: "🧊 Bangun Ruang",
    difficulty: "Silver Final",
    question: "Sebuah kubus memiliki panjang rusuk 4 cm. Berapakah volume kubus tersebut?",
    options: ["16 cm³", "32 cm³", "64 cm³", "128 cm³"],
    correctAnswer: "64 cm³",
    explanation: "Rumus volume kubus = s³ = 4 × 4 × 4 = 64 cm³.",
    xp: 200
  }
];

const GOLD_CHECKPOINT_QUESTIONS = [
  {
    id: "g_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — FISIKA (SMA)",
    category: "🏎️ Kinematika Vektor",
    difficulty: "Gold",
    question: "Kecepatan didefinisikan sebagai perubahan...",
    options: ["Jarak terhadap massa", "Posisi (perpindahan) terhadap waktu", "Gaya terhadap percepatan", "Massa terhadap energi"],
    correctAnswer: "Posisi (perpindahan) terhadap waktu",
    explanation: "Kecepatan adalah besaran vektor yang menunjukkan perubahan posisi (perpindahan) benda per satuan waktu.",
    xp: 200
  },
  {
    id: "g_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — KIMIA (SMA)",
    category: "🧪 Tabel Periodik",
    difficulty: "Gold",
    question: "Unsur kimia dengan lambang 'Au' dalam tabel periodik adalah...",
    options: ["Perak (Silver)", "Emas (Gold)", "Tembaga (Copper)", "Aluminium"],
    correctAnswer: "Emas (Gold)",
    explanation: "Lambang 'Au' berasal dari bahasa Latin 'Aurum' yang berarti Emas.",
    xp: 200
  },
  {
    id: "g_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — BIOLOGI SEL (SMA)",
    category: "🧬 Genetika & Sel",
    difficulty: "Gold",
    question: "Organel sel yang dikenal sebagai 'powerhouse of the cell' penyuplai energi ATP adalah...",
    options: ["Ribosom", "Lisosom", "Mitokondria", "Badan Golgi"],
    correctAnswer: "Mitokondria",
    explanation: "Mitokondria menghasilkan ATP melalui proses respirasi seluler.",
    xp: 200
  },
  {
    id: "g_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — TRIGONOMETRI (SMA)",
    category: "📐 Matematika Trigonometri",
    difficulty: "Gold",
    question: "Nilai dari sin(30°) adalah...",
    options: ["0", "1/2", "√2/2", "√3/2"],
    correctAnswer: "1/2",
    explanation: "Nilai sudut istimewa trigonometri: sin(30°) = 0,5 atau 1/2.",
    xp: 200
  },
  {
    id: "g_q5",
    checkpointNum: 5,
    title: "FINAL CHECKPOINT 05 — LOGIKA ANALITIS",
    category: "🧠 Penalaran Analitis",
    difficulty: "Gold Final",
    question: "Jika P ➔ Q bernilai Benar, dan Q bernilai Salah, maka nilai kebenaran P adalah...",
    options: ["Benar", "Salah", "Bisa Benar atau Salah", "Tidak Dapat Ditentukan"],
    correctAnswer: "Salah",
    explanation: "Implikasi P ➔ Q hanya bernilai Salah jika P Benar dan Q Salah. Karena implikasi Benar dan Q Salah, P HARUS Salah (Modus Tollens).",
    xp: 250
  }
];

const DIAMOND_CHECKPOINT_QUESTIONS = [
  {
    id: "d_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — ALGORITMA & STRUKTUR DATA",
    category: "💻 Ilmu Komputer",
    difficulty: "Diamond",
    question: "Struktur data LIFO (Last-In, First-Out) di mana elemen terakhir yang masuk adalah yang pertama keluar dinamakan...",
    options: ["Queue", "Stack", "Linked List", "Tree"],
    correctAnswer: "Stack",
    explanation: "Stack menggunakan prinsip LIFO (seperti tumpukan piring), sedangkan Queue menggunakan prinsip FIFO.",
    xp: 250
  },
  {
    id: "d_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — SAINS POPULER & KOSMOLOGI",
    category: "🌌 Astrofisika",
    difficulty: "Diamond",
    question: "Kecepatan cahaya dalam ruang hampa udara adalah sekitar...",
    options: ["300.000 km/detik", "150.000 km/detik", "1.000.000 km/detik", "30.000 km/detik"],
    correctAnswer: "300.000 km/detik",
    explanation: "Kecepatan cahaya c diukur mendekati 299.792.458 m/s atau sekitar 300.000 km/detik.",
    xp: 250
  },
  {
    id: "d_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — LOGIKA DEDUKTIF",
    category: "🧩 Logika Formal",
    difficulty: "Diamond",
    question: "Aturan inferensi: 'Jika P ➔ Q' dan 'P Benar', maka kesimpulannya 'Q Benar'. Aturan ini disebut...",
    options: ["Modus Ponens", "Modus Tollens", "Silogisme Hipotetis", "Dilema Konstruktif"],
    correctAnswer: "Modus Ponens",
    explanation: "Modus Ponens (Metode Mengafirmasi) menyatakan jika premis mayor P ➔ Q benar dan premis minor P benar, maka Q harus benar.",
    xp: 250
  },
  {
    id: "d_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — TEKNOLOGI INFORMASI",
    category: "🌐 Sistem Jaringan",
    difficulty: "Diamond",
    question: "Protokol standar jaringan yang berfungsi menerjemahkan nama domain (seperti google.com) menjadi IP Address adalah...",
    options: ["HTTP", "DNS", "FTP", "SMTP"],
    correctAnswer: "DNS",
    explanation: "DNS (Domain Name System) mengubah nama domain ramah manusia menjadi alamat IP numerik komputer.",
    xp: 250
  },
  {
    id: "d_q5",
    checkpointNum: 5,
    title: "FINAL CHECKPOINT 05 — PROBABILITAS & STATISTIKA",
    category: "📊 Teori Peluang",
    difficulty: "Diamond Final",
    question: "Peluang munculnya angka 6 saat melempar satu buah dadu adil bernilai...",
    options: ["1/2", "1/4", "1/6", "1/36"],
    correctAnswer: "1/6",
    explanation: "Dadu memiliki 6 sisi seimbang. Peluang setiap satu sisi muncul adalah 1 dari 6 = 1/6.",
    xp: 300
  }
];

const MASTER_CHECKPOINT_QUESTIONS = [
  {
    id: "m_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — KALKULUS TURUNAN",
    category: "📐 Kalkulus Diferensial",
    difficulty: "Master",
    question: "Turunan pertama dari fungsi f(x) = 3x² + 5x - 7 terhadap x adalah...",
    options: ["6x + 5", "3x + 5", "6x² + 5", "6x - 7"],
    correctAnswer: "6x + 5",
    explanation: "Menggunakan aturan pangkat turunan d/dx(ax^n) = n·a·x^(n-1): f'(x) = 2·3x + 5 = 6x + 5.",
    xp: 300
  },
  {
    id: "m_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — FILSAFAT ILMU",
    category: "🏛️ Metodologi Ilmiah",
    difficulty: "Master",
    question: "Prinsip pemikiran Karl Popper yang menyatakan bahwa sebuah teori ilmiah harus dapat dibuktikan salah (diuji kelemahannya) disebut...",
    options: ["Falsifikasi", "Verifikasi", "Induksi", "Empirisme Radikal"],
    correctAnswer: "Falsifikasi",
    explanation: "Karl Popper mengemukakan Falsifikasi: kriteria keilmiahan suatu teori adalah kemampuannya untuk dapat difalsifikasi (diuji salah).",
    xp: 300
  },
  {
    id: "m_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — METODE ILMIAH & METRIKS",
    category: "📊 Statistika Inferensial",
    difficulty: "Master",
    question: "Nilai p-value < 0,05 dalam uji hipotesis ilmiah mengindikasikan bahwa...",
    options: ["Hasil penelitian 95% salah", "Hasil signifikan secara statistik untuk menolak Hipotesis Nol (H0)", "Hipotesis Nol (H0) pasti benar", "Sampel kurang banyak"],
    correctAnswer: "Hasil signifikan secara statistik untuk menolak Hipotesis Nol (H0)",
    explanation: "P-value kurang dari alpha (0,05) memberikan bukti cukup untuk menolak Hipotesis Nol (H0) pada tingkat kepercayaan 95%.",
    xp: 300
  },
  {
    id: "m_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — TEORI GAME & EKONOMI",
    category: "♟️ Game Theory",
    difficulty: "Master",
    question: "Kondisi di mana tidak ada pemain yang dapat memperoleh keuntungan lebih dengan mengubah strateginya sendiri secara unilateral disebut...",
    options: ["Nash Equilibrium", "Pareto Efficiency", "Zero-Sum Game", "Dominant Strategy Trap"],
    correctAnswer: "Nash Equilibrium",
    explanation: "Keseimbangan Nash (Nash Equilibrium) dirumuskan oleh John Nash untuk menggambarkan stabilitas keputusan antar agen rasional.",
    xp: 300
  },
  {
    id: "m_q5",
    checkpointNum: 5,
    title: "FINAL CHECKPOINT 05 — BERPIKIR KRITIS & LOGIKA",
    category: "🧠 Critical Problem Solving",
    difficulty: "Master Final",
    question: "Kesesatan berpikir (fallacy) di mana seseorang menyerang karakter/pribadi lawan bicara daripada argumennya dinamakan...",
    options: ["Argumentum ad Hominem", "Strawman Fallacy", "Slippery Slope", "False Dilemma"],
    correctAnswer: "Argumentum ad Hominem",
    explanation: "Ad Hominem menyerang latar belakang atau kepribadian lawan bicara bukannya membahas validitas argumen yang disampaikan.",
    xp: 400
  }
];

const MYTHIC_CHECKPOINT_QUESTIONS = [
  {
    id: "my_q1",
    checkpointNum: 1,
    title: "CHECKPOINT 01 — MEKANIKA KUANTUM",
    category: "🌌 Fisika Kuantum",
    difficulty: "Mythic",
    question: "Prinsip Ketidakpastian Heisenberg menyatakan bahwa kita tidak dapat menentukan secara bersamaan presisi tinggi dari...",
    options: ["Posisi dan Momentum", "Massa dan Energi", "Waktu dan Suhu", "Muatan dan Spin"],
    correctAnswer: "Posisi dan Momentum",
    explanation: "Prinsip Heisenberg (Δx·Δp ≥ ℏ/2) membatasi ketelitian pengamatan simultan atas posisi dan momentum partikel subatomik.",
    xp: 500
  },
  {
    id: "my_q2",
    checkpointNum: 2,
    title: "CHECKPOINT 02 — TEORI INFORMASI",
    category: "⚡ Komputasi Kuantum",
    difficulty: "Mythic",
    question: "Unit dasar informasi dalam komputer kuantum yang dapat berada dalam keadaan superposisi 0 dan 1 sekaligus adalah...",
    options: ["Bit", "Qubit", "Byte", "Trit"],
    correctAnswer: "Qubit",
    explanation: "Qubit (Quantum Bit) memanipulasi fenomena superposisi dan keterkaitan kuantum (entanglement).",
    xp: 500
  },
  {
    id: "my_q3",
    checkpointNum: 3,
    title: "CHECKPOINT 03 — KOSMOLOGI KONTEMPORER",
    category: "🔭 Kosmologi",
    difficulty: "Mythic",
    question: "Komponen terbesar penyusun massa-energi alam semesta (sekitar 68%) yang memicu laju pemuaian alam semesta dipercepat adalah...",
    options: ["Materi Biasa (Baryonic)", "Materi Gelap (Dark Matter)", "Energi Gelap (Dark Energy)", "Radiasi Kosmik"],
    correctAnswer: "Energi Gelap (Dark Energy)",
    explanation: "Energi Gelap (Dark Energy) mencakup sekitar 68% energi alam semesta dan menghasilkan gaya tolak pemuaian kosmologis.",
    xp: 500
  },
  {
    id: "my_q4",
    checkpointNum: 4,
    title: "CHECKPOINT 04 — MATEMATIKA REKURSIP & LOGIKA",
    category: "♾️ Teori Kompleksitas",
    difficulty: "Mythic",
    question: "Teori Ketidaklengkapan Gödel (Gödel's Incompleteness Theorems) membuktikan bahwa...",
    options: ["Semua sistem matematika pasti sempurna", "Dalam sistem aksiomatik konsisten, selalu ada pernyataan yang benar namun tidak dapat dibuktikan di dalam sistem tersebut", "Komputer dapat menyelesaikan semua masalah", "Matematika tidak memiliki aturan"],
    correctAnswer: "Dalam sistem aksiomatik konsisten, selalu ada pernyataan yang benar namun tidak dapat dibuktikan di dalam sistem tersebut",
    explanation: "Kurt Gödel membuktikan batas fundamental matematika formal: tidak ada sistem aksiomatik yang cukup kompleks yang bisa konsisten sekaligus lengkap.",
    xp: 500
  },
  {
    id: "my_q5",
    checkpointNum: 5,
    title: "FINAL MYTHIC CHECKPOINT 05 — KNOWLEDGE REALM MASTER",
    category: "🌌 Grand Finale",
    difficulty: "Mythic Legend",
    question: "Prinsip Ekuivalensi Massa-Energi Albert Einstein direpresentasikan melalui persamaan abadi...",
    options: ["E = mc²", "F = ma", "PV = nRT", "E = hν"],
    correctAnswer: "E = mc²",
    explanation: "E = mc² menghubungkan massa (m) dan energi (E) dengan konstanta kecepatan cahaya (c), mendasari fisika nuklir modern.",
    xp: 1000
  }
];

const PREVIEW_QUESTION_DATABASE = {
  Bronze: {
    id: "prev_b1",
    question: "Planet tempat tinggal manusia yang merupakan planet ketiga dari Matahari adalah...",
    category: "🔬 Sains Dasar",
    difficulty: "Bronze",
    options: ["Mars", "Bumi", "Venus", "Jupiter"],
    correctAnswer: "Bumi",
    explanation: "Bumi adalah planet ketiga dari Matahari tempat tinggal manusia.",
    difficultyBadge: "🟢 EASY"
  },
  Silver: {
    id: "prev_s1",
    question: "Gas utama yang dihirup oleh manusia saat bernapas untuk kebutuhan metabolisme tubuh adalah...",
    category: "🫁 IPA SMP",
    difficulty: "Silver",
    options: ["Karbondioksida", "Oksigen", "Nitrogen", "Hidrogen"],
    correctAnswer: "Oksigen",
    explanation: "Oksigen dihirup saat respirasi untuk mengoksidasi zat makanan dan menghasilkan energi.",
    difficultyBadge: "🟡 MEDIUM"
  },
  Gold: {
    id: "prev_g1",
    question: "Proses pembuatan makanan pada tumbuhan hijau menggunakan sinar matahari dinamakan...",
    category: "🌿 Biologi SMA",
    difficulty: "Gold",
    options: ["Respirasi", "Fotosintesis", "Transpirasi", "Gutasi"],
    correctAnswer: "Fotosintesis",
    explanation: "Fotosintesis mengubah karbondioksida dan air menjadi glukosa dan oksigen dengan bantuan cahaya matahari.",
    difficultyBadge: "🥇 HARD"
  },
  Diamond: {
    id: "prev_d1",
    question: "Struktur data FIFO (First-In, First-Out) dinamakan...",
    category: "💻 Computer Science",
    difficulty: "Diamond",
    options: ["Stack", "Queue", "Tree", "Graph"],
    correctAnswer: "Queue",
    explanation: "Queue adalah antrean FIFO (yang pertama masuk adalah yang pertama keluar).",
    difficultyBadge: "💎 ADVANCED"
  },
  Master: {
    id: "prev_m1",
    question: "Keseimbangan dalam Teori Game di mana tidak ada pemain yang dapat menambah keuntungan secara unilateral disebut...",
    category: "♟️ Teori Game",
    difficulty: "Master",
    question: "Kondisi keseimbangan tersebut dinamakan...",
    options: ["Nash Equilibrium", "Pareto Optimal", "Zero Sum", "Minimax"],
    correctAnswer: "Nash Equilibrium",
    explanation: "Nash Equilibrium menggambarkan stabilitas strategi rasional.",
    difficultyBadge: "👑 EXPERT"
  },
  Mythic: {
    id: "prev_my1",
    question: "Unit dasar informasi dalam komputasi kuantum yang memanfaatkan prinsip superposisi adalah...",
    category: "🌌 Kuantum",
    difficulty: "Mythic",
    options: ["Bit", "Qubit", "Byte", "Pixel"],
    correctAnswer: "Qubit",
    explanation: "Qubit adalah unit informasi kuantum.",
    difficultyBadge: "🌌 MYTHIC LEGEND"
  }
};

const RANK_DETAILS = {
  Bronze: {
    name: "BRONZE",
    mapTitle: "Bronze Forest Map",
    levelTitle: "Level SD — Beginner Forest",
    badge: "🥉",
    color: "#cd7f32",
    bgGradient: "linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.05))",
    topics: [
      "Matematika Dasar",
      "Sains Dasar",
      "Bahasa Indonesia",
      "Pengetahuan Umum",
      "Logika Sederhana"
    ],
    checkpointIcon: "📖",
    checkpointType: "Magical Book",
    sampleAbility: "Menjelajah Bronze Forest, menjawab 5 checkpoint soal, dan membuka gerbang fisik menuju Knowledge Shrine.",
    tip: "Jelajahi map dari Q1 hingga Q5. Gerbang fisik hanya akan terbuka setelah checkpoint sebelumnya selesai!",
    difficultyBadge: "🟢 PLAYABLE MAP"
  },
  Silver: {
    name: "SILVER",
    mapTitle: "Silver Valley Map",
    levelTitle: "Level SMP — Knowledge Valley",
    badge: "🥈",
    color: "#cbd5e1",
    bgGradient: "linear-gradient(135deg, rgba(203, 213, 225, 0.2), rgba(203, 213, 225, 0.05))",
    topics: [
      "Biologi Manusia",
      "Aljabar SMP",
      "Sejarah Indonesia",
      "Fisika Dasar",
      "Geometri Ruang"
    ],
    checkpointIcon: "💎",
    checkpointType: "Knowledge Crystal",
    sampleAbility: "Menjelajah Silver Valley Map dengan tebing perak kristal & air terjun sapphire.",
    tip: "Tingkat kesulitan kuis naik ke level SMP. Pelajari pembahasan di setiap checkpoint!",
    difficultyBadge: "🥈 UNLOCKED MAP"
  },
  Gold: {
    name: "GOLD",
    mapTitle: "Gold City Map",
    levelTitle: "Level SMA — Academic City",
    badge: "🥇",
    color: "#ffd700",
    bgGradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05))",
    topics: ["Fisika Vektor", "Kimia Unsur", "Biologi Sel", "Trigonometri", "Logika Analitis"],
    checkpointIcon: "📚",
    checkpointType: "Library Desk",
    sampleAbility: "Menjelajah Gold City Map dengan jalan batu emas, perpustakaan, laboratorium, & museum.",
    tip: "Soal mencakup materi SMA & logika analitis. Selesaikan Silver Valley terlebih dahulu!",
    difficultyBadge: "🥇 UNLOCKED MAP"
  },
  Diamond: {
    name: "DIAMOND",
    mapTitle: "Diamond Campus Map",
    levelTitle: "Level Kuliah — Knowledge Campus",
    badge: "💎",
    color: "#00f0ff",
    bgGradient: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.05))",
    topics: ["Struktur Data", "Astrofisika", "Logika Deduktif", "Sistem Informasi", "Probabilitas"],
    checkpointIcon: "🔬",
    checkpointType: "Science Terminal",
    sampleAbility: "Menjelajah Diamond Campus Map dengan gedung universitas, observatorium, & taman sains.",
    tip: "Menguji logika formal & ilmu komputer tingkat tinggi.",
    difficultyBadge: "💎 UNLOCKED MAP"
  },
  Master: {
    name: "MASTER",
    mapTitle: "Master Realm Map",
    levelTitle: "Level Universitas — Academic Realm",
    badge: "👑",
    color: "#ff007f",
    bgGradient: "linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.05))",
    topics: ["Kalkulus Diferensial", "Filsafat Ilmu", "Statistika Inferensial", "Teori Game", "Critical Thinking"],
    checkpointIcon: "🏛️",
    checkpointType: "Ancient Statue",
    sampleAbility: "Menjelajah Master Realm dengan menara ilmu pengetahuan & patung-patung mahakarya kuno.",
    tip: "Tingkat akademik tinggi untuk menguji pemikiran kritis.",
    difficultyBadge: "👑 UNLOCKED MAP"
  },
  Mythic: {
    name: "MYTHIC",
    mapTitle: "Mythic Realm Map",
    levelTitle: "Final Rank — The Knowledge Realm",
    badge: "🌌",
    color: "#a855f7",
    bgGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(168, 85, 247, 0.05))",
    topics: ["Mekanika Kuantum", "Komputasi Kuantum", "Kosmologi", "Teori Kompleksitas", "Massa-Energi Einstein"],
    checkpointIcon: "🌌",
    checkpointType: "Cosmic Portal",
    sampleAbility: "Tantangan Puncak Mythic Legend dengan pulau-pulau melayang di alam semesta kosmik.",
    tip: "Puncak pembuktian pengetahuan akademis tertinggi di Knowledge Quest!",
    difficultyBadge: "🌌 FINAL LEGEND MAP"
  }
};

// Shuffling Utility & Question Replacement Bank for Knowledge Quest
function shuffleArray(arr) {
  const newArr = [...arr];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

const QUESTION_BANK = {
  Bronze: {
    1: [
      { id: "b_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — SAINS", category: "🔬 Sains Dasar", difficulty: "Bronze", question: "Planet terbesar dalam tata surya kita adalah...", options: ["Bumi", "Mars", "Jupiter", "Venus"], correctAnswer: "Jupiter", explanation: "Jupiter adalah planet terbesar di tata surya dengan diameter 11x Bumi.", xp: 100 },
      { id: "b_q1_2", checkpointNum: 1, title: "CHECKPOINT 01 — SAINS", category: "🔬 Sains Dasar", difficulty: "Bronze", question: "Gas yang dibutuhkan tumbuhan hijau untuk fotosintesis adalah...", options: ["Oksigen", "Karbondioksida", "Nitrogen", "Helium"], correctAnswer: "Karbondioksida", explanation: "Tumbuhan menyerap Karbondioksida (CO2) untuk fotosintesis.", xp: 100 },
      { id: "b_q1_3", checkpointNum: 1, title: "CHECKPOINT 01 — SAINS", category: "🔬 Sains Dasar", difficulty: "Bronze", question: "Benda langit pencetus cahaya sendiri yang menjadi pusat tata surya adalah...", options: ["Bulan", "Matahari", "Komet", "Saturnus"], correctAnswer: "Matahari", explanation: "Matahari adalah bintang pusat tata surya.", xp: 100 }
    ],
    2: [
      { id: "b_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — MATEMATIKA", category: "🧠 Matematika Dasar", difficulty: "Bronze", question: "Berapakah hasil perkalian dari 8 × 7?", options: ["48", "54", "56", "64"], correctAnswer: "56", explanation: "Perkalian dasar: 8 × 7 = 56.", xp: 100 },
      { id: "b_q2_2", checkpointNum: 2, title: "CHECKPOINT 02 — MATEMATIKA", category: "🧠 Matematika Dasar", difficulty: "Bronze", question: "Berapakah hasil dari 9 × 6?", options: ["45", "54", "63", "52"], correctAnswer: "54", explanation: "Perkalian dasar: 9 × 6 = 54.", xp: 100 },
      { id: "b_q2_3", checkpointNum: 2, title: "CHECKPOINT 02 — MATEMATIKA", category: "🧠 Matematika Dasar", difficulty: "Bronze", question: "Jika 15 apel dibagi rata kepada 3 anak, masing-masing mendapat...", options: ["3 apel", "4 apel", "5 apel", "6 apel"], correctAnswer: "5 apel", explanation: "Pembagian dasar: 15 ÷ 3 = 5.", xp: 100 }
    ],
    3: [
      { id: "b_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — BAHASA INDONESIA", category: "📚 Bahasa Indonesia", difficulty: "Bronze", question: "Lawan kata (antonim) dari kata 'besar' adalah...", options: ["Tinggi", "Kecil", "Panjang", "Lebar"], correctAnswer: "Kecil", explanation: "Lawan kata besar adalah kecil.", xp: 100 },
      { id: "b_q3_2", checkpointNum: 3, title: "CHECKPOINT 03 — BAHASA INDONESIA", category: "📚 Bahasa Indonesia", difficulty: "Bronze", question: "Persamaan kata (sinonim) dari kata 'pandai' adalah...", options: ["Cerdas", "Rajin", "Jujur", "Hemat"], correctAnswer: "Cerdas", explanation: "Sinonim pandai adalah cerdas.", xp: 100 },
      { id: "b_q3_3", checkpointNum: 3, title: "CHECKPOINT 03 — BAHASA INDONESIA", category: "📚 Bahasa Indonesia", difficulty: "Bronze", question: "Kata tanya yang digunakan untuk menanyakan tempat adalah...", options: ["Siapa", "Kapan", "Di mana", "Mengapa"], correctAnswer: "Di mana", explanation: "Kata tanya 'di mana' untuk menanyakan lokasi tempat.", xp: 100 }
    ],
    4: [
      { id: "b_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — PENGETAHUAN UMUM", category: "🌍 Pengetahuan Umum", difficulty: "Bronze", question: "Bendera kebangsaan negara Indonesia terdiri dari warna...", options: ["Merah dan biru", "Merah dan putih", "Putih dan hijau", "Biru dan putih"], correctAnswer: "Merah dan putih", explanation: "Bendera Indonesia adalah Merah Putih.", xp: 100 },
      { id: "b_q4_2", checkpointNum: 4, title: "CHECKPOINT 04 — PENGETAHUAN UMUM", category: "🌍 Pengetahuan Umum", difficulty: "Bronze", question: "Ibu kota Negara Kesatuan Republik Indonesia saat ini adalah...", options: ["Surabaya", "Bandung", "Jakarta", "Medan"], correctAnswer: "Jakarta", explanation: "Ibu kota Indonesia adalah DKI Jakarta.", xp: 100 },
      { id: "b_q4_3", checkpointNum: 4, title: "CHECKPOINT 04 — PENGETAHUAN UMUM", category: "🌍 Pengetahuan Umum", difficulty: "Bronze", question: "Lagu kebangsaan resmi negara Indonesia berjudul...", options: ["Garuda Pancasila", "Indonesia Raya", "Halo-Halo Bandung", "Bagimu Negeri"], correctAnswer: "Indonesia Raya", explanation: "Lagu kebangsaan adalah Indonesia Raya.", xp: 100 }
    ],
    5: [
      { id: "b_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — LOGIKA", category: "🧩 Logika Sederhana", difficulty: "Bronze Final", question: "Jika semua kucing adalah hewan, dan Mimi adalah seekor kucing, maka Mimi adalah...", options: ["Tumbuhan", "Hewan", "Benda Mati", "Planet"], correctAnswer: "Hewan", explanation: "Logika silogisme: Mimi adalah kucing, maka Mimi hewan.", xp: 150 },
      { id: "b_q5_2", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — LOGIKA", category: "🧩 Logika Sederhana", difficulty: "Bronze Final", question: "Perhatikan pola angka: 2, 4, 6, 8, ... Angka selanjutnya adalah...", options: ["9", "10", "12", "14"], correctAnswer: "10", explanation: "Deret bertambah +2: 8 + 2 = 10.", xp: 150 },
      { id: "b_q5_3", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — LOGIKA", category: "🧩 Logika Sederhana", difficulty: "Bronze Final", question: "Jika hari ini hari Senin, maka 3 hari lagi adalah hari...", options: ["Rabu", "Kamis", "Jumat", "Sabtu"], correctAnswer: "Kamis", explanation: "Senin + 3 hari = Kamis.", xp: 150 }
    ]
  },
  Silver: {
    1: [
      { id: "s_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — BIOLOGI (SMP)", category: "🫀 Biologi Manusia", difficulty: "Silver", question: "Organ tubuh manusia yang berfungsi utama memompa darah adalah...", options: ["Paru-paru", "Jantung", "Hati", "Ginjal"], correctAnswer: "Jantung", explanation: "Jantung memompa darah ke pembuluh darah.", xp: 150 },
      { id: "s_q1_2", checkpointNum: 1, title: "CHECKPOINT 01 — BIOLOGI (SMP)", category: "🫀 Biologi Manusia", difficulty: "Silver", question: "Tempat pertukaran O2 dan CO2 pada paru-paru terjadi di...", options: ["Lambung", "Alveolus", "Jantung", "Usus"], correctAnswer: "Alveolus", explanation: "Alveolus adalah tempat pertukaran gas respirasi.", xp: 150 }
    ],
    2: [
      { id: "s_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — ALJABAR (SMP)", category: "📐 Matematika Aljabar", difficulty: "Silver", question: "Jika 2x + 5 = 15, berapakah nilai dari x?", options: ["3", "4", "5", "6"], correctAnswer: "5", explanation: "2x = 10 => x = 5.", xp: 150 },
      { id: "s_q2_2", checkpointNum: 2, title: "CHECKPOINT 02 — ALJABAR (SMP)", category: "📐 Matematika Aljabar", difficulty: "Silver", question: "Jika 3y - 4 = 11, berapakah nilai dari y?", options: ["4", "5", "6", "7"], correctAnswer: "5", explanation: "3y = 15 => y = 5.", xp: 150 }
    ],
    3: [
      { id: "s_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — SEJARAH INDONESIA", category: "📜 Sejarah Kemerdekaan", difficulty: "Silver", question: "Teks Proklamasi Kemerdekaan Indonesia dibacakan pada tanggal...", options: ["17 Agustus 1945", "28 Oktober 1928", "10 November 1945", "1 Juni 1945"], correctAnswer: "17 Agustus 1945", explanation: "Dibacakan Ir. Soekarno 17 Agustus 1945.", xp: 150 },
      { id: "s_q3_2", checkpointNum: 3, title: "CHECKPOINT 03 — SEJARAH INDONESIA", category: "📜 Sejarah Kemerdekaan", difficulty: "Silver", question: "Peristiwa Sumpah Pemuda diikrarkan pada tanggal...", options: ["20 Mei 1908", "28 Oktober 1928", "17 Agustus 1945", "10 November 1945"], correctAnswer: "28 Oktober 1928", explanation: "Sumpah Pemuda 28 Oktober 1928.", xp: 150 }
    ],
    4: [
      { id: "s_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — FISIKA (SMP)", category: "⚡ Fisika Dasar", difficulty: "Silver", question: "Satuan Internasional (SI) untuk mengukur besar gaya adalah...", options: ["Joule", "Watt", "Newton", "Pascal"], correctAnswer: "Newton", explanation: "Gaya diukur dalam Newton.", xp: 150 },
      { id: "s_q4_2", checkpointNum: 4, title: "CHECKPOINT 04 — FISIKA (SMP)", category: "⚡ Fisika Dasar", difficulty: "Silver", question: "Rumus energi kinetik benda bermassa m dan kecepatan v adalah...", options: ["Ek = m·g·h", "Ek = 1/2 m·v²", "Ek = F·s", "Ek = P·t"], correctAnswer: "Ek = 1/2 m·v²", explanation: "Ek = 1/2 m v².", xp: 150 }
    ],
    5: [
      { id: "s_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — GEOMETRI (SMP)", category: "🧊 Bangun Ruang", difficulty: "Silver Final", question: "Sebuah kubus memiliki panjang rusuk 4 cm. Volume kubus adalah...", options: ["16 cm³", "32 cm³", "64 cm³", "128 cm³"], correctAnswer: "64 cm³", explanation: "Volume kubus = 4³ = 64 cm³.", xp: 200 },
      { id: "s_q5_2", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — GEOMETRI (SMP)", category: "🧊 Bangun Ruang", difficulty: "Silver Final", question: "Luas lingkaran dengan jari-jari r = 7 cm (π = 22/7) adalah...", options: ["44 cm²", "154 cm²", "308 cm²", "616 cm²"], correctAnswer: "154 cm²", explanation: "Luas = 22/7 × 49 = 154 cm².", xp: 200 }
    ]
  },
  Gold: {
    1: [
      { id: "g_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — FISIKA (SMA)", category: "🏎️ Kinematika Vektor", difficulty: "Gold", question: "Kecepatan didefinisikan sebagai perubahan...", options: ["Jarak terhadap massa", "Posisi (perpindahan) terhadap waktu", "Gaya terhadap percepatan", "Massa terhadap energi"], correctAnswer: "Posisi (perpindahan) terhadap waktu", explanation: "v = dx/dt.", xp: 200 },
      { id: "g_q1_2", checkpointNum: 1, title: "CHECKPOINT 01 — FISIKA (SMA)", category: "🏎️ Kinematika Vektor", difficulty: "Gold", question: "Hukum II Newton menyatakan hubungan gaya F, massa m, percepatan a...", options: ["F = m / a", "F = m · a", "F = m + a", "F = m · v²"], correctAnswer: "F = m · a", explanation: "F = m·a.", xp: 200 }
    ],
    2: [
      { id: "g_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — KIMIA (SMA)", category: "🧪 Tabel Periodik", difficulty: "Gold", question: "Unsur kimia dengan lambang 'Au' dalam tabel periodik adalah...", options: ["Perak", "Emas", "Tembaga", "Aluminium"], correctAnswer: "Emas", explanation: "Au = Aurum (Emas).", xp: 200 },
      { id: "g_q2_2", checkpointNum: 2, title: "CHECKPOINT 02 — KIMIA (SMA)", category: "🧪 Tabel Periodik", difficulty: "Gold", question: "Nilai pH larutan netral pada suhu 25°C adalah...", options: ["0", "7", "14", "1"], correctAnswer: "7", explanation: "pH air netral = 7.", xp: 200 }
    ],
    3: [
      { id: "g_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — BIOLOGI SEL (SMA)", category: "🧬 Genetika & Sel", difficulty: "Gold", question: "Organel sel penyuplai energi ATP ('powerhouse of cell') adalah...", options: ["Ribosom", "Lisosom", "Mitokondria", "Badan Golgi"], correctAnswer: "Mitokondria", explanation: "Mitokondria tempat pembentukan ATP.", xp: 200 },
      { id: "g_q3_2", checkpointNum: 3, title: "CHECKPOINT 03 — BIOLOGI SEL (SMA)", category: "🧬 Genetika & Sel", difficulty: "Gold", question: "Basa nitrogen yang HANYA terdapat pada RNA tetapi TIDAK ada pada DNA adalah...", options: ["Adenin", "Timin", "Urasil", "Guanin"], correctAnswer: "Urasil", explanation: "RNA mengganti Timin dengan Urasil.", xp: 200 }
    ],
    4: [
      { id: "g_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — TRIGONOMETRI (SMA)", category: "📐 Matematika Trigonometri", difficulty: "Gold", question: "Nilai dari sin(30°) adalah...", options: ["0", "1/2", "√2/2", "√3/2"], correctAnswer: "1/2", explanation: "sin(30°) = 0,5.", xp: 200 },
      { id: "g_q4_2", checkpointNum: 4, title: "CHECKPOINT 04 — TRIGONOMETRI (SMA)", category: "📐 Matematika Trigonometri", difficulty: "Gold", question: "Nilai dari cos(60°) adalah...", options: ["1/2", "√3/2", "0", "1"], correctAnswer: "1/2", explanation: "cos(60°) = 0,5.", xp: 200 }
    ],
    5: [
      { id: "g_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — LOGIKA ANALITIS", category: "🧠 Penalaran Analitis", difficulty: "Gold Final", question: "Jika P ➔ Q Benar dan Q Salah, maka nilai kebenaran P adalah...", options: ["Benar", "Salah", "Bisa Benar/Salah", "Tak Ditentukan"], correctAnswer: "Salah", explanation: "Modus Tollens: P harus Salah.", xp: 250 },
      { id: "g_q5_2", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — LOGIKA ANALITIS", category: "🧠 Penalaran Analitis", difficulty: "Gold Final", question: "Jika semua mahasiswa rajin belajar, dan Andi adalah mahasiswa, kesimpulannya...", options: ["Andi malas", "Andi rajin belajar", "Andi lulus", "Andi pandai"], correctAnswer: "Andi rajin belajar", explanation: "Silogisme kategoris.", xp: 250 }
    ]
  },
  Diamond: {
    1: [
      { id: "d_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — ALGORITMA", category: "💻 Ilmu Komputer", difficulty: "Diamond", question: "Struktur data LIFO (Last-In, First-Out) dinamakan...", options: ["Queue", "Stack", "Linked List", "Tree"], correctAnswer: "Stack", explanation: "Stack memakai LIFO.", xp: 250 },
      { id: "d_q1_2", checkpointNum: 1, title: "CHECKPOINT 01 — ALGORITMA", category: "💻 Ilmu Komputer", difficulty: "Diamond", question: "Kompleksitas waktu rata-rata Binary Search pada array terurut adalah...", options: ["O(1)", "O(n)", "O(log n)", "O(n²)"], correctAnswer: "O(log n)", explanation: "Binary search O(log n).", xp: 250 }
    ],
    2: [
      { id: "d_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — KOSMOLOGI", category: "🌌 Astrofisika", difficulty: "Diamond", question: "Kecepatan cahaya dalam ruang hampa udara c adalah...", options: ["300.000 km/s", "150.000 km/s", "1.000.000 km/s", "30.000 km/s"], correctAnswer: "300.000 km/s", explanation: "c ≈ 300.000 km/s.", xp: 250 }
    ],
    3: [
      { id: "d_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — LOGIKA DEDUKTIF", category: "🧩 Logika Formal", difficulty: "Diamond", question: "Aturan inferensi 'Jika P ➔ Q' dan 'P Benar' maka 'Q Benar' disebut...", options: ["Modus Ponens", "Modus Tollens", "Silogisme", "Dilema"], correctAnswer: "Modus Ponens", explanation: "Modus Ponens.", xp: 250 }
    ],
    4: [
      { id: "d_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — JARINGAN", category: "🌐 Sistem Jaringan", difficulty: "Diamond", question: "Protokol penerjemah nama domain menjadi IP Address dinamakan...", options: ["HTTP", "DNS", "FTP", "SMTP"], correctAnswer: "DNS", explanation: "DNS menerjemahkan domain ke IP.", xp: 250 }
    ],
    5: [
      { id: "d_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — PROBABILITAS", category: "📊 Teori Peluang", difficulty: "Diamond Final", question: "Peluang muncul angka 6 saat melempar satu dadu adil adalah...", options: ["1/2", "1/4", "1/6", "1/36"], correctAnswer: "1/6", explanation: "Peluang = 1/6.", xp: 300 }
    ]
  },
  Master: {
    1: [
      { id: "m_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — KALKULUS", category: "📐 Kalkulus Diferensial", difficulty: "Master", question: "Turunan pertama f(x) = 3x² + 5x - 7 adalah...", options: ["6x + 5", "3x + 5", "6x² + 5", "6x - 7"], correctAnswer: "6x + 5", explanation: "f'(x) = 6x + 5.", xp: 300 }
    ],
    2: [
      { id: "m_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — FILSAFAT ILMU", category: "🏛️ Metodologi Ilmiah", difficulty: "Master", question: "Prinsip Karl Popper bahwa teori ilmiah harus dapat dibuktikan salah disebut...", options: ["Falsifikasi", "Verifikasi", "Induksi", "Empirisme"], correctAnswer: "Falsifikasi", explanation: "Falsifikasi Popper.", xp: 300 }
    ],
    3: [
      { id: "m_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — STATISTIKA", category: "📊 Statistika Inferensial", difficulty: "Master", question: "P-value < 0,05 mengindikasikan...", options: ["Hasil signifikan menolak H0", "Hasil 95% salah", "H0 pasti benar", "Kurang sampel"], correctAnswer: "Hasil signifikan menolak H0", explanation: "P-value < 0,05 menolak H0.", xp: 300 }
    ],
    4: [
      { id: "m_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — TEORI GAME", category: "♟️ Game Theory", difficulty: "Master", question: "Kondisi tak ada pemain bisa menguntungkan diri secara unilateral adalah...", options: ["Nash Equilibrium", "Pareto Optimal", "Zero Sum", "Minimax"], correctAnswer: "Nash Equilibrium", explanation: "Nash Equilibrium.", xp: 300 }
    ],
    5: [
      { id: "m_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — CRITICAL THINKING", category: "🧠 Problem Solving", difficulty: "Master Final", question: "Kesesatan berpikir menyerang pribadi lawan dinamakan...", options: ["Argumentum ad Hominem", "Strawman", "Slippery Slope", "False Dilemma"], correctAnswer: "Argumentum ad Hominem", explanation: "Ad Hominem.", xp: 400 }
    ]
  },
  Mythic: {
    1: [
      { id: "my_q1_1", checkpointNum: 1, title: "CHECKPOINT 01 — MEKANIKA KUANTUM", category: "🌌 Fisika Kuantum", difficulty: "Mythic", question: "Prinsip Ketidakpastian Heisenberg membatasi ketelitian...", options: ["Posisi dan Momentum", "Massa dan Energi", "Waktu dan Suhu", "Muatan dan Spin"], correctAnswer: "Posisi dan Momentum", explanation: "Heisenberg: posisi & momentum.", xp: 500 }
    ],
    2: [
      { id: "my_q2_1", checkpointNum: 2, title: "CHECKPOINT 02 — KOMPUTASI KUANTUM", category: "⚡ Komputasi Kuantum", difficulty: "Mythic", question: "Unit dasar komputer kuantum berprinsip superposisi adalah...", options: ["Bit", "Qubit", "Byte", "Trit"], correctAnswer: "Qubit", explanation: "Qubit (Quantum Bit).", xp: 500 }
    ],
    3: [
      { id: "my_q3_1", checkpointNum: 3, title: "CHECKPOINT 03 — KOSMOLOGI", category: "🔭 Kosmologi", difficulty: "Mythic", question: "Komponen 68% energi pemuaian dipercepat alam semesta adalah...", options: ["Dark Matter", "Dark Energy", "Baryon", "Radiasi"], correctAnswer: "Dark Energy", explanation: "Dark Energy.", xp: 500 }
    ],
    4: [
      { id: "my_q4_1", checkpointNum: 4, title: "CHECKPOINT 04 — TEORI KOMPLEKSITAS", category: "♾️ Teori Kompleksitas", difficulty: "Mythic", question: "Teori Ketidaklengkapan Gödel membuktikan...", options: ["Dalam sistem aksiomatik konsisten selalu ada pernyataan benar yang tak dapat dibuktikan di dalam sistem", "Semua sistem sempurna", "Komputer serba bisa", "Tidak ada aturan"], correctAnswer: "Dalam sistem aksiomatik konsisten selalu ada pernyataan benar yang tak dapat dibuktikan di dalam sistem", explanation: "Teorema Gödel.", xp: 500 }
    ],
    5: [
      { id: "my_q5_1", checkpointNum: 5, title: "FINAL CHECKPOINT 05 — GRAND FINALE", category: "🌌 Grand Finale", difficulty: "Mythic Legend", question: "Persamaan Ekuivalensi Massa-Energi Einstein adalah...", options: ["E = mc²", "F = ma", "PV = nRT", "E = hν"], correctAnswer: "E = mc²", explanation: "E = mc².", xp: 1000 }
    ]
  }
};

function getRandomizedQuestions(rank = 'Bronze') {
  const bank = QUESTION_BANK[rank] || QUESTION_BANK.Bronze;
  const result = [];

  for (let cpId = 1; cpId <= 5; cpId++) {
    const list = bank[cpId] || bank[1];
    const picked = list[Math.floor(Math.random() * list.length)];
    result.push({
      ...picked,
      options: shuffleArray(picked.options)
    });
  }

  return result;
}

function getReplacementQuestion(rank = 'Bronze', checkpointNum = 1, currentQuestionId = null) {
  const bank = QUESTION_BANK[rank] || QUESTION_BANK.Bronze;
  const cpList = bank[checkpointNum] || bank[1];

  const candidates = cpList.filter(q => q.id !== currentQuestionId);
  const selected = (candidates.length > 0)
    ? candidates[Math.floor(Math.random() * candidates.length)]
    : cpList[Math.floor(Math.random() * cpList.length)];

  return {
    ...selected,
    options: shuffleArray(selected.options)
  };
}


