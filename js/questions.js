// Database Soal Uji Pengetahuan Umum: Rank Bronze to Mythic
// Separated Databases:
// 1. QUESTION_DATABASE (Soal Kuis Utama - 60 Soal)
// 2. PREVIEW_QUESTION_DATABASE (Soal Khusus Halaman Materi & Preview - Berbeda dengan Kuis Utama)

const QUESTION_DATABASE = {
  Bronze: [
    {
      id: "b1",
      question: "Planet terbesar dalam sistem tata surya kita adalah...",
      category: "🔬 Sains",
      difficulty: "Bronze",
      options: ["Bumi", "Mars", "Jupiter", "Venus"],
      correctAnswer: "Jupiter",
      explanation: "Jupiter adalah planet terbesar di tata surya dengan diameter sekitar 142.984 km, lebih dari 11 kali diameter Bumi.",
      xp: 100
    },
    {
      id: "b2",
      question: "Hasil dari 15 + 27 - 12 adalah...",
      category: "🧠 Logika & Matematika",
      difficulty: "Bronze",
      options: ["28", "30", "32", "35"],
      correctAnswer: "30",
      explanation: "15 + 27 = 42. Kemudian 42 - 12 = 30.",
      xp: 100
    },
    {
      id: "b3",
      question: "Ibu kota negara Republik Indonesia yang berada di pulau Jawa adalah...",
      category: "🌎 Geografi",
      difficulty: "Bronze",
      options: ["Surabaya", "Bandung", "Jakarta", "Medan"],
      correctAnswer: "Jakarta",
      explanation: "DKI Jakarta merupakan ibu kota sejarah dan pusat perekonomian Indonesia di pulau Jawa.",
      xp: 100
    },
    {
      id: "b4",
      question: "Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari disebut...",
      category: "🔬 Sains",
      difficulty: "Bronze",
      options: ["Respirasi", "Fotosintesis", "Evaporasi", "Oksidasi"],
      correctAnswer: "Fotosintesis",
      explanation: "Fotosintesis memanfaatkan karbondioksida, air, dan cahaya matahari untuk menghasilkan glukosa dan oksigen.",
      xp: 100
    },
    {
      id: "b5",
      question: "Mata uang resmi yang digunakan oleh negara Indonesia adalah...",
      category: "🧩 Pengetahuan Umum",
      difficulty: "Bronze",
      options: ["Ringgit", "Rupiah", "Dollar", "Yen"],
      correctAnswer: "Rupiah",
      explanation: "Rupiah (IDR) adalah mata uang resmi Republik Indonesia yang diterbitkan oleh Bank Indonesia.",
      xp: 100
    },
    {
      id: "b6",
      question: "Lagu kebangsaan negara Republik Indonesia adalah...",
      category: "🎨 Budaya",
      difficulty: "Bronze",
      options: ["Garuda Pancasila", "Indonesia Raya", "Bagimu Negeri", "Halo-Halo Bandung"],
      correctAnswer: "Indonesia Raya",
      explanation: "Lagu Indonesia Raya diciptakan oleh W.R. Supratman dan pertama kali dimainkan pada Sumpah Pemuda tahun 1928.",
      xp: 100
    },
    {
      id: "b7",
      question: "Kata baku yang benar menurut EBI (Ejaan Bahasa Indonesia) adalah...",
      category: "📚 Bahasa Indonesia",
      difficulty: "Bronze",
      options: ["Apotik", "Apotek", "Apotekh", "Apotick"],
      correctAnswer: "Apotek",
      explanation: "Bentuk baku yang benar adalah 'Apotek' (menggunakan huruf e), seperti dalam kata turunan 'apoteker'.",
      xp: 100
    },
    {
      id: "b8",
      question: "Hewan pemakan daging disebut juga hewan...",
      category: "🔬 Sains",
      difficulty: "Bronze",
      options: ["Herbivora", "Karnivora", "Omnivora", "Insectivora"],
      correctAnswer: "Karnivora",
      explanation: "Karnivora adalah organisme yang utamanya memangsa dan memakan daging hewan lain (contoh: singa, harimau).",
      xp: 100
    },
    {
      id: "b9",
      question: "Simbol Pancasila untuk sila ketiga 'Persatuan Indonesia' adalah...",
      category: "🌍 Sejarah",
      difficulty: "Bronze",
      options: ["Bintang", "Rantai", "Pohon Beringin", "Kepala Banteng"],
      correctAnswer: "Pohon Beringin",
      explanation: "Sila 1 = Bintang, Sila 2 = Rantai, Sila 3 = Pohon Beringin, Sila 4 = Kepala Banteng, Sila 5 = Padi dan Kapas.",
      xp: 100
    },
    {
      id: "b10",
      question: "Komponen komputer yang berfungsi sebagai otak utama pengolah data adalah...",
      category: "💻 Teknologi Dasar",
      difficulty: "Bronze",
      options: ["RAM", "Harddisk", "CPU", "Monitor"],
      correctAnswer: "CPU",
      explanation: "CPU (Central Processing Unit) berfungsi mengolah instruksi dan data pada komputer.",
      xp: 100
    }
  ],

  Silver: [
    {
      id: "s1",
      question: "Jika persamaan 3x + 5 = 20 diselesaikan, berapa nilai x?",
      category: "🧠 Logika & Matematika",
      difficulty: "Silver",
      options: ["3", "4", "5", "6"],
      correctAnswer: "5",
      explanation: "3x = 20 - 5 => 3x = 15 => x = 15 / 3 = 5.",
      xp: 150
    },
    {
      id: "s2",
      question: "Candi Borobudur yang megah berlatar belakang agama Buddha didirikan pada masa kerajaan...",
      category: "🌍 Sejarah",
      difficulty: "Silver",
      options: ["Majapahit", "Mataram Kuno", "Sriwijaya", "Singasari"],
      correctAnswer: "Mataram Kuno",
      explanation: "Candi Borobudur dibangun pada abad ke-8 hingga ke-9 Masehi oleh Wangsa Syailendra dari Kerajaan Mataram Kuno.",
      xp: 150
    },
    {
      id: "s3",
      question: "Gas yang paling banyak mendominasi komposisi atmosfer Bumi adalah...",
      category: "🔬 Sains",
      difficulty: "Silver",
      options: ["Oksigen", "Karbondioksida", "Nitrogen", "Hidrogen"],
      correctAnswer: "Nitrogen",
      explanation: "Nitrogen menyumbang sekitar 78% dari total volume atmosfer Bumi, diikuti Oksigen sekitar 21%.",
      xp: 150
    },
    {
      id: "s4",
      question: "Organ tubuh manusia yang berfungsi memompa darah ke seluruh tubuh adalah...",
      category: "🔬 Sains",
      difficulty: "Silver",
      options: ["Paru-paru", "Hati", "Jantung", "Ginjal"],
      correctAnswer: "Jantung",
      explanation: "Jantung bekerja tanpa henti memompa darah beroksigen dan kaya nutrisi ke seluruh sistem sirkulasi tubuh.",
      xp: 150
    },
    {
      id: "s5",
      question: "Benua terbesar di dunia berdasarkan luas wilayah adalah...",
      category: "🌎 Geografi",
      difficulty: "Silver",
      options: ["Afrika", "Amerika Utara", "Asia", "Eropa"],
      correctAnswer: "Asia",
      explanation: "Benua Asia memiliki luas sekitar 44,58 juta km², menjadikannya benua terbesar di dunia.",
      xp: 150
    },
    {
      id: "s6",
      question: "Teks Proklamasi Kemerdekaan Indonesia diketik oleh...",
      category: "🌍 Sejarah",
      difficulty: "Silver",
      options: ["Sayuti Melik", "Sukarni", "B.M. Diah", "Chaerul Saleh"],
      correctAnswer: "Sayuti Melik",
      explanation: "Sayuti Melik mengetik naskah proklamasi setelah dirumuskan oleh Soekarno, Hatta, dan Ahmad Soebardjo.",
      xp: 150
    },
    {
      id: "s7",
      question: "Dalam jaringan komputer, kepanjangan dari URL adalah...",
      category: "💻 Teknologi Dasar",
      difficulty: "Silver",
      options: ["Universal Record Locator", "Uniform Resource Locator", "United Resource Link", "Universal Reusable Link"],
      correctAnswer: "Uniform Resource Locator",
      explanation: "URL (Uniform Resource Locator) adalah alamat spesifik yang digunakan untuk mengakses sumber daya di internet.",
      xp: 150
    },
    {
      id: "s8",
      question: "Alat pengukur tekanan udara di atmosfer dinamakan...",
      category: "🔬 Sains",
      difficulty: "Silver",
      options: ["Termometer", "Barometer", "Higrometer", "Anemometer"],
      correctAnswer: "Barometer",
      explanation: "Barometer digunakan untuk mengukur tekanan udara. Anemometer untuk kecepatan angin, Higrometer untuk kelembapan.",
      xp: 150
    },
    {
      id: "s9",
      question: "Majelis yang mengesahkan UUD 1945 pada tanggal 18 Agustus 1945 adalah...",
      category: "🌍 Sejarah",
      difficulty: "Silver",
      options: ["BPUPKI", "PPKI", "KNIP", "MPRS"],
      correctAnswer: "PPKI",
      explanation: "PPKI (Panitia Persiapan Kemerdekaan Indonesia) menetapkan UUD 1945 serta memilih Soekarno dan Hatta sebagai Presiden & Wapres.",
      xp: 150
    },
    {
      id: "s10",
      question: "Sudut lancip adalah sudut yang besarnya...",
      category: "🧠 Logika & Matematika",
      difficulty: "Silver",
      options: ["Tepat 90 derajat", "Antara 0 dan 90 derajat", "Antara 90 dan 180 derajat", "Tepat 180 derajat"],
      correctAnswer: "Antara 0 dan 90 derajat",
      explanation: "Sudut lancip berukuran < 90°. Sudut siku-siku = 90°, sedangkan sudut tumpul berada antara 90° dan 180°.",
      xp: 150
    }
  ],

  Gold: [
    {
      id: "g1",
      question: "Mengapa langit siang hari tampak berwarna biru?",
      category: "🔬 Sains",
      difficulty: "Gold",
      options: [
        "Air laut memantulkan warna biru ke atmosfer",
        "Atmosfer menyerap semua spektrum warna kecuali biru",
        "Cahaya biru berpanjang gelombang pendek lebih banyak tersebar oleh molekul udara (Hamburan Rayleigh)",
        "Matahari memancarkan sinar ultraviolet berwarna biru"
      ],
      correctAnswer: "Cahaya biru berpanjang gelombang pendek lebih banyak tersebar oleh molekul udara (Hamburan Rayleigh)",
      explanation: "Hamburan Rayleigh menyatakan cahaya dengan panjang gelombang lebih pendek (biru/nila) disebarkan lebih kuat oleh molekul gas di atmosfer.",
      xp: 200
    },
    {
      id: "g2",
      question: "Peristiwa Rengasdengklok yang terjadi sebelum Proklamasi bertujuan untuk...",
      category: "🌍 Sejarah",
      difficulty: "Gold",
      options: [
        "Menghindari kejaran pasukan Belanda",
        "Mendesak Soekarno-Hatta agar segera memproklamasikan kemerdekaan tanpa pengaruh Jepang",
        "Menyusun naskah UUD 1945",
        "Membentuk struktur kepolisian Republik Indonesia"
      ],
      correctAnswer: "Mendesak Soekarno-Hatta agar segera memproklamasikan kemerdekaan tanpa pengaruh Jepang",
      explanation: "Para pemuda membawa Soekarno-Hatta ke Rengasdengklok untuk mengamankan mereka dari pengaruh janji Jepang dan mempercepat proklamasi.",
      xp: 200
    },
    {
      id: "g3",
      question: "Diberikan deret aritmatika: 4, 9, 14, 19, ... Suku ke-20 dari deret tersebut adalah...",
      category: "🧠 Logika & Matematika",
      difficulty: "Gold",
      options: ["94", "99", "104", "109"],
      correctAnswer: "99",
      explanation: "Suku awal a = 4, beda b = 5. Rumus suku ke-n: Un = a + (n-1)b = 4 + 19(5) = 4 + 95 = 99.",
      xp: 200
    },
    {
      id: "g4",
      question: "Zat kimia pengantar sinyal antar sel saraf (neuron) pada sistem saraf manusia disebut...",
      category: "🔬 Sains",
      difficulty: "Gold",
      options: ["Hormon", "Enzim", "Neurotransmiter", "Antibodi"],
      correctAnswer: "Neurotransmiter",
      explanation: "Neurotransmiter (seperti dopamin dan serotonin) adalah molekul yang mentransmisikan sinyal melintasi celah sinapsis antar sel saraf.",
      xp: 200
    },
    {
      id: "g5",
      question: "Protokol keamanan jaringan yang mengenkripsi komunikasi pada situs web (ditandai ikon gembok) adalah...",
      category: "💻 Teknologi Dasar",
      difficulty: "Gold",
      options: ["HTTP", "HTTPS / SSL-TLS", "FTP", "SMTP"],
      correctAnswer: "HTTPS / SSL-TLS",
      explanation: "HTTPS (Hypertext Transfer Protocol Secure) menggunakan inskripsi TLS/SSL untuk mengamankan pertukaran data pada web.",
      xp: 200
    },
    {
      id: "g6",
      question: "Organel sel yang dijuluki 'Powerhouse of the Cell' karena menghasilkan ATP adalah...",
      category: "🔬 Sains",
      difficulty: "Gold",
      options: ["Ribosom", "Lisosom", "Mitokondria", "Badan Golgi"],
      correctAnswer: "Mitokondria",
      explanation: "Mitokondria tempat berlangsungnya respirasi seluler yang menghasilkan energi kimia berupa ATP.",
      xp: 200
    },
    {
      id: "g7",
      question: "Tokoh sastra Indonesia pengarang novel fenomenal 'Laskar Pelangi' adalah...",
      category: "📚 Bahasa Indonesia",
      difficulty: "Gold",
      options: ["Pramoedya Ananta Toer", "Andrea Hirata", "Tere Liye", "A.A. Navis"],
      correctAnswer: "Andrea Hirata",
      explanation: "Andrea Hirata adalah penulis novel Laskar Pelangi yang menceritakan perjuangan anak-anak di Belitung.",
      xp: 200
    },
    {
      id: "g8",
      question: "Selatan Pulau Jawa berbatasan langsung dengan samudra luas yaitu...",
      category: "🌎 Geografi",
      difficulty: "Gold",
      options: ["Samudra Pasifik", "Samudra Hindia", "Samudra Atlantik", "Samudra Arktik"],
      correctAnswer: "Samudra Hindia",
      explanation: "Bagian selatan wilayah kepulauan Indonesia berbatasan langsung dengan perairan Samudra Hindia.",
      xp: 200
    },
    {
      id: "g9",
      question: "Sistem pemerintahan di mana kekuasaan tertinggi berada di tangan rakyat disebut...",
      category: "🧩 Pengetahuan Umum",
      difficulty: "Gold",
      options: ["Monarki", "Oligarki", "Demokrasi", "Teokrasi"],
      correctAnswer: "Demokrasi",
      explanation: "Demokrasi berasal dari bahasa Yunani (demos = rakyat, kratos = kekuasaan), berarti pemerintahan dari, oleh, dan untuk rakyat.",
      xp: 200
    },
    {
      id: "g10",
      question: "Penghargaan Nobel bidang perdamaian dunia diserahkan di kota...",
      category: "🧩 Pengetahuan Umum",
      difficulty: "Gold",
      options: ["Stockholm, Swedia", "Oslo, Norwegia", "Geneva, Swiss", "London, Inggris"],
      correctAnswer: "Oslo, Norwegia",
      explanation: "Kecuali Nobel Perdamaian yang diberikan di Oslo (Norwegia), penghargaan Nobel lainnya diserahkan di Stockholm (Swedia).",
      xp: 200
    }
  ],

  Diamond: [
    {
      id: "d1",
      question: "Pernyataan mana yang secara logis EKUIVALEN dengan implikasi 'Jika hujan deras, maka jalanan basah' (p → q)?",
      category: "🧠 Logika & Matematika",
      difficulty: "Diamond",
      options: [
        "Jika jalanan basah, maka hujan deras (Konvers)",
        "Jika jalanan tidak basah, maka tidak hujan deras (Kontraposisi)",
        "Jika tidak hujan deras, maka jalanan tidak basah (Invers)",
        "Jalanan basah hanya saat hujan deras"
      ],
      correctAnswer: "Jika jalanan tidak basah, maka tidak hujan deras (Kontraposisi)",
      explanation: "Secara logika formal, pernyataan implikasi (p → q) selalu bernilai kebenaran sama dengan kontraposisinya (~q → ~p).",
      xp: 250
    },
    {
      id: "d2",
      question: "Fenomena fisika di mana gelombang cahaya membengkok saat melewati celah sempit disebut...",
      category: "🔬 Sains",
      difficulty: "Diamond",
      options: ["Refraksi", "Difraksi", "Dispersi", "Interferensi"],
      correctAnswer: "Difraksi",
      explanation: "Difraksi adalah pelengkungan atau penyebaran gelombang saat melewati halangan atau celah sempit.",
      xp: 250
    },
    {
      id: "d3",
      question: "Perbedaan utama antara struktur sel tumbuhan dan sel hewan adalah sel tumbuhan memiliki...",
      category: "🔬 Sains",
      difficulty: "Diamond",
      options: [
        "Dinding sel dan Kloroplas",
        "Membran sel dan Mitokondria",
        "Ribosom dan Retikulum Endoplasma",
        "Lisosom dan Sentriol"
      ],
      correctAnswer: "Dinding sel dan Kloroplas",
      explanation: "Sel tumbuhan memiliki dinding sel kaku (selulosa) dan kloroplas untuk fotosintesis yang tidak dimiliki sel hewan.",
      xp: 250
    },
    {
      id: "d4",
      question: "Dalam arsitektur komputer & jaringan, struktur data Stack bekerja berdasarkan prinsip...",
      category: "💻 Teknologi Dasar",
      difficulty: "Diamond",
      options: ["FIFO (First In First Out)", "LIFO (Last In First Out)", "Random Access", "Priority Queue"],
      correctAnswer: "LIFO (Last In First Out)",
      explanation: "Stack (tumpukan) menerapkan prinsip LIFO: elemen yang terakhir dimasukkan akan menjadi yang pertama dikeluarkan.",
      xp: 250
    },
    {
      id: "d5",
      question: "Konferensi Asia-Afrika (KAA) pertama yang melahirkan Dasasila Bandung diselenggarakan pada tahun...",
      category: "🌍 Sejarah",
      difficulty: "Diamond",
      options: ["1945", "1950", "1955", "1960"],
      correctAnswer: "1955",
      explanation: "KAA berlangsung pada 18-24 April 1955 di Gedung Merdeka, Bandung, dihadiri 29 negara Asia dan Afrika.",
      xp: 250
    },
    {
      id: "d6",
      question: "Unsur kimia berwujud cair pada suhu kamar (25°C) selain Raksa (Hg) adalah...",
      category: "🔬 Sains",
      difficulty: "Diamond",
      options: ["Bromin (Br)", "Galium (Ga)", "Klorin (Cl)", "Yodium (I)"],
      correctAnswer: "Bromin (Br)",
      explanation: "Hanya dua unsur pada tabel periodik berwujud cair pada suhu kamar standar: Raksa (logam) dan Bromin (non-logam).",
      xp: 250
    },
    {
      id: "d7",
      question: "Sebuah bus melaju dengan kecepatan 72 km/jam. Kecepatan bus tersebut jika dikonversi ke m/s adalah...",
      category: "🧠 Logika & Matematika",
      difficulty: "Diamond",
      options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"],
      correctAnswer: "20 m/s",
      explanation: "72 km/jam = (72 x 1000m) / 3600s = 72000 / 3600 = 20 m/s (atau cukup bagi 3.6).",
      xp: 250
    },
    {
      id: "d8",
      question: "Peristiwa krisis ekonomi dunia yang melanda pada tahun 1929 dan dikenal sebagai 'The Great Depression' bermula di negara...",
      category: "🌍 Sejarah",
      difficulty: "Diamond",
      options: ["Inggris", "Jerman", "Amerika Serikat", "Prancis"],
      correctAnswer: "Amerika Serikat",
      explanation: "Great Depression dipicu oleh kejatuhan bursa saham Wall Street pada 'Black Tuesday', 29 Oktober 1929 di New York, AS.",
      xp: 250
    },
    {
      id: "d9",
      question: "Penetapan garis bujur nol derajat (Prime Meridian) disepakati secara internasional melewati kota...",
      category: "🌎 Geografi",
      difficulty: "Diamond",
      options: ["Paris, Prancis", "Greenwich, Inggris", "Washington D.C., AS", "Tokyo, Jepang"],
      correctAnswer: "Greenwich, Inggris",
      explanation: "Observatorium Kerajaan di Greenwich, London dipilih sebagai patokan garis Meridian Nol (0° Bujur) pada tahun 1884.",
      xp: 250
    },
    {
      id: "d10",
      question: "Istilah 'Artificial Intelligence' pertama kali dicetuskan pada Konferensi Dartmouth tahun 1956 oleh...",
      category: "💻 Teknologi Dasar",
      difficulty: "Diamond",
      options: ["Alan Turing", "John McCarthy", "Claude Shannon", "Marvin Minsky"],
      correctAnswer: "John McCarthy",
      explanation: "John McCarthy menciptakan istilah Artificial Intelligence (AI) dan memelopori pengembangannya di MIT.",
      xp: 250
    }
  ],

  Master: [
    {
      id: "m1",
      question: "Teori fisika yang menyatakan bahwa hukum fisika bernilai sama untuk semua pengamat non-akselerasi dan kecepatan cahaya di ruang hampa konstan adalah...",
      category: "🔬 Sains",
      difficulty: "Master",
      options: [
        "Teori Relativitas Khusus (Albert Einstein)",
        "Teori Kuantum Planck",
        "Teori Gravitasi Universal Newton",
        "Hukum Termodinamika Kedua"
      ],
      correctAnswer: "Teori Relativitas Khusus (Albert Einstein)",
      explanation: "Relativitas Khusus (1905) diposisikan atas dua postulat utama Einstein mengenai kelajuan cahaya konstan (c) dan kerangka acuan inersia.",
      xp: 300
    },
    {
      id: "m2",
      question: "Jika fungsi f(x) = 3x² - 4x + 7, maka turunan pertama f'(x) adalah...",
      category: "🧠 Logika & Matematika",
      difficulty: "Master",
      options: ["6x - 4", "3x - 4", "6x + 7", "6x² - 4"],
      correctAnswer: "6x - 4",
      explanation: "Menggunakan aturan pangkat turunan d/dx(x^n) = n*x^(n-1): f'(x) = 3(2x) - 4(1) + 0 = 6x - 4.",
      xp: 300
    },
    {
      id: "m3",
      question: "Dalam biokimia sel, enzim bekerja sebagai biokatalisator dengan cara...",
      category: "🔬 Sains",
      difficulty: "Master",
      options: [
        "Meningkatkan energi aktivasi reaksi",
        "Menurunkan energi aktivasi reaksi",
        "Mengubah konstanta kesetimbangan reaksi",
        "Menambah jumlah produk akhir reaksi"
      ],
      correctAnswer: "Menurunkan energi aktivasi reaksi",
      explanation: "Enzim mempercepat laju reaksi kimia dengan cara menurunkan batas energi aktivasi yang diperlukan agar reaksi dimulai.",
      xp: 300
    },
    {
      id: "m4",
      question: "Filsuf Yunani Kuno yang dikenal sebagai bapak metode dialektika dan tidak meninggalkan karya tulis sendiri adalah...",
      category: "🧩 Pengetahuan Umum",
      difficulty: "Master",
      options: ["Plato", "Sokrates", "Aristoteles", "Pythagoras"],
      correctAnswer: "Sokrates",
      explanation: "Sokrates mengajar melalui diskusi/tanya jawab (metode Sokratik) dan pemikirannya dicatat oleh muridnya, Plato.",
      xp: 300
    },
    {
      id: "m5",
      question: "Algoritma pencarian terpendek dalam graf berbobot positif (seperti pada sistem navigasi GPS) dikembangkan oleh...",
      category: "💻 Teknologi Dasar",
      difficulty: "Master",
      options: ["Edsger W. Dijkstra", "Tim Berners-Lee", "Donald Knuth", "Ada Lovelace"],
      correctAnswer: "Edsger W. Dijkstra",
      explanation: "Algoritma Dijkstra menemukan jalur terpendek antara simpul-simpul dalam graf berbobot non-negatif.",
      xp: 300
    },
    {
      id: "m6",
      question: "Perjanjian Westphalia pada tahun 1648 sangat bersejarah dalam hubungan internasional karena melahirkan konsep...",
      category: "🌍 Sejarah",
      difficulty: "Master",
      options: [
        "Kedaulatan negara bangsa modern (Nation-State Sovereignty)",
        "Hak Asasi Manusia Universal",
        "Sistem Ekonomi Pasar Bebas",
        "Organisasi Perserikatan Bangsa-Bangsa"
      ],
      correctAnswer: "Kedaulatan negara bangsa modern (Nation-State Sovereignty)",
      explanation: "Perjanjian Westphalia mengakhiri Perang 30 Tahun di Eropa dan menjadi fondasi hukum kedaulatan negara-bangsa modern.",
      xp: 300
    },
    {
      id: "m7",
      question: "Nilai pH larutan netral pada suhu 25°C adalah 7. Jika suatu larutan memiliki konsentrasi ion H⁺ sebesar 10⁻⁴ M, maka pH larutan tersebut adalah...",
      category: "🔬 Sains",
      difficulty: "Master",
      options: ["3", "4", "7", "10"],
      correctAnswer: "4",
      explanation: "Rumus pH = -log[H⁺]. Maka pH = -log(10⁻⁴) = 4 (larutan bersifat asam).",
      xp: 300
    },
    {
      id: "m8",
      question: "Dalam teori ekonomi makro, istilah 'Stagflasi' menggambarkan kondisi di mana terjadi...",
      category: "🧩 Pengetahuan Umum",
      difficulty: "Master",
      options: [
        "Pertumbuhan ekonomi cepat disertai inflasi rendah",
        "Stagnasi ekonomi (pertumbuhan lambat/pengangguran tinggi) bersamaan dengan inflasi tinggi",
        "Deflasi parah disertai penurunan suku bunga",
        "Depresiasi nilai mata uang tanpa inflasi"
      ],
      correctAnswer: "Stagnasi ekonomi (pertumbuhan lambat/pengangguran tinggi) bersamaan dengan inflasi tinggi",
      explanation: "Stagflasi adalah kombinasi stagnasi pertumbuhan ekonomi, pengangguran tinggi, dan inflasi (kenaikan harga) secara bersamaan.",
      xp: 300
    },
    {
      id: "m9",
      question: "Siapakah ilmuwan wanita pertama yang memenangkan dua Hadiah Nobel dalam dua bidang sains berbeda (Fisika & Kimia)?",
      category: "🔬 Sains",
      difficulty: "Master",
      options: ["Rosalind Franklin", "Marie Curie", "Ada Lovelace", "Dorothy Hodgkin"],
      correctAnswer: "Marie Curie",
      explanation: "Marie Curie meraih Nobel Fisika (1903) untuk riset radiasi dan Nobel Kimia (1911) atas penemuan polonium & radium.",
      xp: 300
    },
    {
      id: "m10",
      question: "Proses transfer data antar blok dalam teknologi Blockchain dipastikan keabsahannya menggunakan mekanisme konsensus seperti...",
      category: "💻 Teknologi Dasar",
      difficulty: "Master",
      options: [
        "Proof of Work / Proof of Stake",
        "Model OSI 7 Layer",
        "Enkripsi Asimetris RSA 2048",
        "DNS Round Robin"
      ],
      correctAnswer: "Proof of Work / Proof of Stake",
      explanation: "Proof of Work (PoW) dan Proof of Stake (PoS) adalah mekanisme konsensus kriptografis untuk memvalidasi transaksi pada blockchain.",
      xp: 300
    }
  ],

  Mythic: [
    {
      id: "my1",
      question: "Dalam Mekanika Kuantum, 'Prinsip Ketidakpastian' yang menyatakan bahwa posisi dan momentum partikel subatomik tidak dapat diukur secara simultan dengan presisi tak terbatas dirumuskan oleh...",
      category: "🔬 Sains",
      difficulty: "Mythic",
      options: ["Erwin Schrödinger", "Werner Heisenberg", "Niels Bohr", "Niels Dirac"],
      correctAnswer: "Werner Heisenberg",
      explanation: "Prinsip Ketidakpastian Heisenberg (Δx · Δp ≥ ℏ/2) merupakan pilar utama mekanika kuantum kuantitatif.",
      xp: 400
    },
    {
      id: "my2",
      question: "Berapa nilai dari matriks determinan | 2  3 | / | 1  5 | ?",
      category: "🧠 Logika & Matematika",
      difficulty: "Mythic",
      options: ["5", "7", "10", "13"],
      correctAnswer: "7",
      explanation: "Determinan matriks 2x2 [[a,b],[c,d]] adalah (a*d - b*c). Maka (2*5 - 3*1) = 10 - 3 = 7.",
      xp: 400
    },
    {
      id: "my3",
      question: "Masalah Matematika Milenium terbesar dalam ilmu komputer teoretis yang mempertanyakan apakah setiap masalah yang verifikasinya cepat juga dapat diselesaikan dengan cepat adalah...",
      category: "🧠 Logika & Matematika",
      difficulty: "Mythic",
      options: [
        "Hipotesis Riemann",
        "Masalah P vs NP",
        "Dugaan Poincaré",
        "Teorema Terakhir Fermat"
      ],
      correctAnswer: "Masalah P vs NP",
      explanation: "P vs NP menguji apakah masalah yang solusinya dapat diverifikasi dalam waktu polinomial (NP) juga dapat diselesaikan dalam waktu polinomial (P).",
      xp: 400
    },
    {
      id: "my4",
      question: "Organisasi kesehatan dunia (WHO) secara resmi mengumumkan pembasmian total (eradication) penyakit menular mematikan ini pada tahun 1980 berkat vaksinasi global:",
      category: "🔬 Sains",
      difficulty: "Mythic",
      options: ["Polio", "Cacar Ular (Smallpox / Variola)", "TBC", "Malaria"],
      correctAnswer: "Cacar Ular (Smallpox / Variola)",
      explanation: "Smallpox (Variola) adalah satu-satunya penyakit menular pada manusia yang berhasil dimusnahkan secara menyeluruh di muka bumi.",
      xp: 400
    },
    {
      id: "my5",
      question: "Struktur bangunan kuno 'Library of Alexandria' yang menjadi pusat ilmu pengetahuan terbesar peradaban Yunani-Mesir didirikan di bawah pemerintahan dinasti...",
      category: "🌍 Sejarah",
      difficulty: "Mythic",
      options: ["Dinasti Ptolemeus", "Dinasti Seleukia", "Dinasti Firaun Ramses", "Kekaisaran Bizantium"],
      correctAnswer: "Dinasti Ptolemeus",
      explanation: "Perpustakaan Alexandria didirikan pada awal abad ke-3 SM di bawah Ptolemeus I Soter atau Ptolemeus II Philadelphus.",
      xp: 400
    },
    {
      id: "my6",
      question: "Dalam teori pemrosesan bahasa alami (NLP) & AI modern, arsitektur deep learning berteknologi 'Self-Attention' yang menjadi dasar ChatGPT adalah...",
      category: "💻 Teknologi Dasar",
      difficulty: "Mythic",
      options: [
        "Convolutional Neural Network (CNN)",
        "Recurrent Neural Network (RNN)",
        "Transformer (Vaswani et al., 2017)",
        "Generative Adversarial Network (GAN)"
      ],
      correctAnswer: "Transformer (Vaswani et al., 2017)",
      explanation: "Arsitektur Transformer ('Attention Is All You Need') merevolusi AI dengan mekanisme self-attention parallel tanpa pengulangan sekuensial RNN.",
      xp: 400
    },
    {
      id: "my7",
      question: "Titik koordinat paling dalam di samudra bumi yang pernah diketahui manusia adalah 'Challenger Deep' yang terletak di...",
      category: "🌎 Geografi",
      difficulty: "Mythic",
      options: ["Palung Sunda", "Palung Mariana", "Palung Puerto Riko", "Palung Jawa"],
      correctAnswer: "Palung Mariana",
      explanation: "Challenger Deep di Palung Mariana (Samudra Pasifik Barat) memiliki kedalaman maksimum sekitar 10.994 meter di bawah permukaan laut.",
      xp: 400
    },
    {
      id: "my8",
      question: "Sebuah ruangan memiliki 5 pasang lampu. Berapa banyak kombinasi sakelar berbeda jika minimal ada 1 lampu yang harus menyala?",
      category: "🧠 Logika & Matematika",
      difficulty: "Mythic",
      options: ["25", "31", "32", "64"],
      correctAnswer: "31",
      explanation: "Setiap sakelar punya 2 status (ON/OFF). Total kombinasi = 2⁵ = 32. Karena minimal 1 lampu harus menyala, kurangi 1 situasi saat semua OFF = 32 - 1 = 31.",
      xp: 400
    },
    {
      id: "my9",
      question: "Konsep kosmologi fisik di mana alam semesta diperkirakan akan mengalami pendinginan total akibat penurunan entropi maksimum dikenal sebagai...",
      category: "🔬 Sains",
      difficulty: "Mythic",
      options: ["Big Crunch", "Heat Death of the Universe (Big Freeze)", "Big Rip", "Multiverse Collapse"],
      correctAnswer: "Heat Death of the Universe (Big Freeze)",
      explanation: "Heat Death (Big Freeze) terjadi ketika entropi mencapai nilai maksimum dan tidak ada lagi energi bebas untuk melakukan kerja atau kehidupan.",
      xp: 400
    },
    {
      id: "my10",
      question: "Prinsip Hukum Termodinamika Ketiga menyatakan bahwa nilai entropi kristal murni yang sempurna akan mendekati NOL saat suhu mencapai...",
      category: "🔬 Sains",
      difficulty: "Mythic",
      options: ["0 derajat Celsius", "100 Kelvin", "Nol Mutlak (0 Kelvin / -273,15°C)", "-100 derajat Celsius"],
      correctAnswer: "Nol Mutlak (0 Kelvin / -273,15°C)",
      explanation: "Hukum Ketiga Termodinamika menyatakan entropi sistem yang teratur sempurna mendekati nol seiring suhu mendekati 0 K (Nol Mutlak).",
      xp: 400
    }
  ]
};

// SOAL KHUSUS UNTUK HALAMAN MATERI & PREVIEW (BERBEDA DENGAN SOAL KUIS UTAMA)
const PREVIEW_QUESTION_DATABASE = {
  Bronze: {
    id: "prev_b1",
    question: "Planet tempat tinggal kita dan merupakan planet ketiga dari Matahari adalah...",
    category: "🔬 Sains Dasar",
    difficulty: "Bronze",
    options: ["Mars", "Bumi", "Venus", "Jupiter"],
    correctAnswer: "Bumi",
    explanation: "Bumi adalah tempat tinggal kita dan merupakan satu-satunya planet yang diketahui memiliki kehidupan di tata surya.",
    difficultyBadge: "🟢 EASY"
  },
  Silver: {
    id: "prev_s1",
    question: "Jika 3x + 5 = 20, berapa nilai x yang memenuhi persamaan tersebut?",
    category: "🧠 Matematika SMP",
    difficulty: "Silver",
    options: ["3", "5", "7", "10"],
    correctAnswer: "5",
    explanation: "3x = 20 - 5 => 3x = 15 => x = 15 / 3 = 5.",
    difficultyBadge: "🟡 MEDIUM"
  },
  Gold: {
    id: "prev_g1",
    question: "Mengapa langit tampak berwarna biru terang pada siang hari yang cerah?",
    category: "🔬 Fisika SMA",
    difficulty: "Gold",
    options: [
      "Air laut memantulkan warna biru ke atas langit",
      "Atmosfer menyerap semua warna cahaya matahari kecuali biru",
      "Cahaya biru berpanjang gelombang pendek lebih banyak tersebar oleh molekul udara (Hamburan Rayleigh)",
      "Matahari memancarkan sinar utama berwarna biru"
    ],
    correctAnswer: "Cahaya biru berpanjang gelombang pendek lebih banyak tersebar oleh molekul udara (Hamburan Rayleigh)",
    explanation: "Hamburan Rayleigh menyebabkan spektrum cahaya biru dengan gelombang pendek tersebar ke segala arah oleh gas atmosfer.",
    difficultyBadge: "🟠 HARD"
  },
  Diamond: {
    id: "prev_d1",
    question: "Manakah struktur data yang bekerja dengan prinsip LIFO (Last In First Out)?",
    category: "💻 Teknologi & Komputer",
    difficulty: "Diamond",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correctAnswer: "Stack",
    explanation: "Stack (tumpukan) berprinsip LIFO: data yang dimasukkan paling akhir akan dikeluarkan paling pertama.",
    difficultyBadge: "🟠 HARD+"
  },
  Master: {
    id: "prev_m1",
    question: "Jika fungsi f(x) = 3x² - 4x + 7, apakah turunan pertama f'(x)?",
    category: "🧠 Kalkulus & Logika",
    difficulty: "Master",
    options: ["6x - 4", "3x - 4", "6x + 7", "6x² - 4"],
    correctAnswer: "6x - 4",
    explanation: "Turunan dari 3x² adalah 6x, turunan dari -4x adalah -4, dan turunan dari konstanta 7 adalah 0. Maka f'(x) = 6x - 4.",
    difficultyBadge: "🔴 EXTREME"
  },
  Mythic: {
    id: "prev_my1",
    question: "Dalam mekanika kuantum, siapakah perumus Prinsip Ketidakpastian (Uncertainty Principle)?",
    category: "🔬 Fisika Kuantum",
    difficulty: "Mythic",
    options: ["Erwin Schrödinger", "Werner Heisenberg", "Niels Bohr", "Albert Einstein"],
    correctAnswer: "Werner Heisenberg",
    explanation: "Werner Heisenberg merumuskan Prinsip Ketidakpastian pada tahun 1927, menyatakan posisi dan momentum partikel kuantum tak bisa diukur simultan secara persis.",
    difficultyBadge: "🌌 MYTHIC LEGEND"
  }
};

// Detail Silabus & Materi untuk setiap Rank (digunakan pada Halaman Materi & Preview)
const RANK_DETAILS = {
  Bronze: {
    name: "BRONZE",
    levelTitle: "Level SD",
    badge: "🥉",
    color: "#cd7f32",
    bgGradient: "linear-gradient(135deg, rgba(205, 127, 50, 0.2), rgba(205, 127, 50, 0.05))",
    topics: [
      "Matematika Dasar & Aritmatika",
      "Pengetahuan Umum Sehari-hari",
      "Bahasa Indonesia & Ejaan Baku",
      "Sains Dasar & Alam Sekitar",
      "Geografi Dasar Indonesia",
      "Logika Sederhana"
    ],
    sampleAbility: "Menjawab pertanyaan fakta sederhana, mengenal simbol negara, dan melakukan perhitungan aritmatika dasar.",
    tip: "Pastikan kamu menguasai operasi hitung dasar (+ - x :) dan fakta umum lingkungan sekitar!",
    difficultyBadge: "🟢 EASY"
  },
  Silver: {
    name: "SILVER",
    levelTitle: "Level SMP",
    badge: "🥈",
    color: "#c0c0c0",
    bgGradient: "linear-gradient(135deg, rgba(192, 192, 192, 0.2), rgba(192, 192, 192, 0.05))",
    topics: [
      "Persamaan Aljabar Sederhana",
      "Ilmu Pengetahuan Alam (IPA SMP)",
      "Sejarah Kemerdekaan Indonesia",
      "Dasar Jaringan & Teknologi",
      "Geografi Dunia & Benua",
      "Bahasa & Logika Penalaran"
    ],
    sampleAbility: "Mulai membutuhkan pemahaman konsep dan hubungan sebab-akibat, bukan sekadar menghafal.",
    tip: "Jangan hanya menghafal nama, pelajari alasan dan latar belakang suatu peristiwa sains maupun sejarah!",
    difficultyBadge: "🟡 MEDIUM"
  },
  Gold: {
    name: "GOLD",
    levelTitle: "Level SMA",
    badge: "🥇",
    color: "#ffd700",
    bgGradient: "linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05))",
    topics: [
      "Deret & Penalaran Matematika",
      "Fisika & Biologi Konseptual",
      "Sejarah Peristiwa Dunia",
      "Sastra & Tata Bahasa Indonesia",
      "Sistem Kewarganegaraan & Demokrasi",
      "Keamanan Siber & Protokol Web"
    ],
    sampleAbility: "Pertanyaan membutuhkan analisis konsep sains, manipulasi variabel, dan literasi tinggi.",
    tip: "Perhatikan kata kunci dalam soal dan elimiassi opsi yang kurang logis sebelum memilih!",
    difficultyBadge: "🟠 HARD"
  },
  Diamond: {
    name: "DIAMOND",
    levelTitle: "Level Awal Kuliah",
    badge: "💎",
    color: "#00f0ff",
    bgGradient: "linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.05))",
    topics: [
      "Logika Formal & Kontraposisi",
      "Fisika Gelombang & Biologi Sel",
      "Struktur Data & Informatika",
      "Sejarah Ekonomi & Geopolitik",
      "Konversi Satuan & Kalkulasi Cepat",
      "Sejarah Perkembangan AI"
    ],
    sampleAbility: "Membutuhkan pemikiran analitis presisi, pemahaman logika induktif/deduktif, dan pengetahuan sains modern.",
    tip: "Gunakan aturan logika formal dan cermati detail tabel periodik serta pola matematika!",
    difficultyBadge: "🟠 HARD+"
  },
  Master: {
    name: "MASTER",
    levelTitle: "Level Universitas",
    badge: "👑",
    color: "#ff007f",
    bgGradient: "linear-gradient(135deg, rgba(255, 0, 127, 0.2), rgba(255, 0, 127, 0.05))",
    topics: [
      "Kalkulus & Turunan Fungsi",
      "Teori Relativitas & Kuantum",
      "Biokimia & Aktivasi Enzim",
      "Filsafat & Metode Dialektika",
      "Algoritma Graf & Konsensus Blockchain",
      "Makroekonomi & Stagflasi"
    ],
    sampleAbility: "Menganalisis teori multidisiplin lanjutan, hukum matematika murni, serta prinsip sains mendalam.",
    tip: "Fokus pada konsep hukum dasar fisika, kimia, serta struktur matematika murni!",
    difficultyBadge: "🔴 EXTREME"
  },
  Mythic: {
    name: "MYTHIC",
    levelTitle: "Final Rank / Tersulit",
    badge: "🌌",
    color: "#a855f7",
    bgGradient: "linear-gradient(135deg, rgba(168, 85, 247, 0.25), rgba(168, 85, 247, 0.05))",
    topics: [
      "Fisika Kuantum & Entropi Termodinamika",
      "Aljabar Matriks & Problem P vs NP",
      "Sejarah Peradaban Kuno & Epidemi Global",
      "Deep Learning, NLP & AI Transformers",
      "Kombinatorika Kompleks & Oseanografi",
      "Critical Thinking & Problem Solving"
    ],
    sampleAbility: "Mampu memecahkan soal tingkat tertinggi yang menggabungkan berbagai konsep sains murni, logika teoretis, dan wawasan global.",
    tip: "Hitung dengan teliti! Kombinasi konsep teoretis dan penalaran mendalam adalah kunci kemenangan di Mythic!",
    difficultyBadge: "🌌 MYTHIC LEGEND"
  }
};
