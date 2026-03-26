// ═══════════════════════════════════════════════════════════════
//  CoC Knowledge Base – Data Store
//  Artikel disimpan di localStorage, data awal di sini.
// ═══════════════════════════════════════════════════════════════

const INITIAL_ARTICLES = [
  // ── TROOPS ──────────────────────────────────────────────────
  {
    id: "troop-barbarian",
    title: "Barbarian – Statistik & Tips Penggunaan",
    category: "troops",
    summary: "Troop dasar CoC. Murah, cepat spawn, cocok untuk wall breaking dan filler.",
    tags: ["barbarian","common troop","th1","wall breaker combo"],
    featured: false,
    date: "2026-01-05",
    views: 241,
    content: `## Barbarian

**Barbarian** adalah salah satu troop paling ikonik di Clash of Clans. Sejak pertama kali dimainkan, pasti kamu sudah kenal si pria bersorban dan kumis tebal ini.

---

## Statistik Dasar (Level 1 → Max)

| Level | DPS | HP  | Training Cost | Biaya Upgrade |
|-------|-----|-----|---------------|---------------|
| 1     | 8   | 45  | 25 Elixir     | –             |
| 5     | 26  | 135 | 25 Elixir     | 1,5 juta      |
| 10    | 64  | 300 | 25 Elixir     | 18 juta       |
| 11    | 72  | 350 | 25 Elixir     | 25 juta       |

---

## Target Prioritas

Barbarian menyerang bangunan terdekat, **tanpa preferensi khusus** terhadap jenis bangunan.

---

## Keunggulan

- **Murah sekali** – hanya 25 Elixir per unit
- **Training time singkat** – satu Barrack bisa training dalam hitungan detik
- Cocok sebagai **filler army** untuk menghabiskan Elixir berlebih
- Ideal untuk **farming loot** dengan Queen Walk + Barbarian spam

---

## Kelemahan

- DPS rendah dibanding troop lain
- Mudah dihancurkan oleh Splash Damage (Mortar, Wizard Tower, Scattershot)
- Tidak cocok untuk 3-star di TH tinggi tanpa support

---

## Tips Penggunaan

1. **Wall Breaker Combo** – Kirim Barbarian duluan untuk menarik api, lalu susul dengan Wall Breaker untuk meledakkan tembok.
2. **Filler Attack** – Gunakan sisa kapasitas army untuk isi penuh dengan Barbarian.
3. **Clan Games/Events** – Beberapa tantangan memerlukan serangan dengan Barbarian; stockpile dulu.
4. **Builder Base** – Raged Barbarian jauh lebih kuat, cocok untuk BH6 ke bawah.

---

## Fun Fact

Barbarian adalah maskot utama Clash of Clans dan muncul di hampir semua materi promosi Supercell! 🪖`
  },
  {
    id: "troop-archer",
    title: "Archer – Analisis & Strategi Penggunaan Optimal",
    category: "troops",
    summary: "Ranged troop yang serbaguna. Bisa menyerang dari luar tembok dan ideal untuk snipe resource.",
    tags: ["archer","ranged","th2","farming","barch"],
    featured: true,
    date: "2026-01-08",
    views: 389,
    content: `## Archer

**Archer** adalah troop jarak jauh ikonik yang menjadi andalan banyak strategi farming. Wanita berpenampilan elegan ini sangat serbaguna.

---

## Statistik (Level 1 → Max)

| Level | DPS | HP  | Range | Training Cost |
|-------|-----|-----|-------|---------------|
| 1     | 7   | 20  | 3.5 tile | 50 Elixir |
| 5     | 22  | 46  | 3.5 tile | 50 Elixir |
| 10    | 55  | 100 | 3.5 tile | 50 Elixir |
| 11    | 62  | 115 | 3.5 tile | 50 Elixir |

---

## Target Prioritas

Menyerang bangunan terdekat. Tidak memiliki target spesifik.

---

## Keunggulan

- **Jarak Jauh (3.5 tile)** – bisa menyerang melewati tembok tanpa perlu masuk
- **Cocok untuk Snipe** – serbu resource di tepi base tanpa melibatkan seluruh pasukan
- **Barch (Barbarian + Archer)** – kombo farming paling populer sepanjang masa
- Ringan dan cepat di-training

---

## Strategi BARCH (Barbarian + Archer)

**Formula umum:**
- 50% Barbarian, 50% Archer
- Cocok untuk farming Collector di base-base terbuka (terutama TH7 ke bawah)

**Cara pakai:**
1. Kirim Barbarian di sisi berlawanan dari Clan Castle
2. Deploy Archer di belakangnya untuk support
3. Jika base terbuka, cukup snipe Collector dari luar tembok

---

## Tips Pro

- Gunakan **Archer Queen** + Archer biasa untuk "Queen Walk" – strategi funneling paling efektif
- Manfaatkan Archer untuk menyelesaikan serangan saat bangunan di sudut base tersisa

---

## Cocok di TH Berapa?

| TH Level | Penggunaan Archer |
|----------|-------------------|
| TH3–TH6  | Main army farming |
| TH7–TH9  | Barch farming     |
| TH10+    | Filler / snipe    |`
  },
  {
    id: "troop-dragon",
    title: "Dragon – Guide Lengkap Mass Dragon Attack",
    category: "troops",
    summary: "Salah satu troop paling populer untuk 3-star di TH8. Kuat, mahal, dan membutuhkan Spell support.",
    tags: ["dragon","th8","mass dragon","air attack","lightning spell"],
    featured: true,
    date: "2026-01-15",
    views: 512,
    content: `## Dragon

**Dragon** adalah troop udara yang kuat dan menjadi favorit di **TH8**. Serangan mass dragon yang tepat bisa dengan mudah menghasilkan 3 bintang.

---

## Statistik

| Level | DPS | HP    | Training Cost | Waktu Training |
|-------|-----|-------|---------------|----------------|
| 1     | 160 | 1,900 | 25,000 Elixir | 30 menit       |
| 4     | 220 | 2,700 | 25,000 Elixir | 30 menit       |
| 7     | 320 | 4,200 | 25,000 Elixir | 30 menit       |

---

## Target Prioritas

Dragon menyerang bangunan terdekat tanpa preferensi, namun mengutamakan pertahanan (karena AI targeting).

---

## Strategi Mass Dragon (TH8)

**Komposisi Army:**
- 10–12 Dragon (isi penuh dengan Dragon, sisakan slot untuk Loons)
- 3–5 Balloon sebagai support
- 2× Lightning Spell + 1× Rage Spell (atau 3× Lightning + 1× Earthquake untuk kuras CC Air Defense)

**Langkah-langkah:**

1. **Netralisir Air Defense** menggunakan Lightning Spell (butuh 2 Lightning untuk 1 AD TH8)
2. **Hancurkan Clan Castle** – tarik dengan Hero, bunuh di sudut base
3. **Tentukan funnel** – deploy 2 Dragon di sisi kiri dan kanan sudut attack
4. **Deploy semua Dragon** dalam satu baris di sisi yang sudah di-funnel
5. **Rage Spell** di tengah Dragon saat masuk ke area pertahanan inti
6. Susul dengan **Balloon** untuk bantuan DPS

---

## Kelemahan

- Sangat rentan terhadap **Air Defense** yang tersebar merata
- **Mahal** – 25.000 Elixir per Dragon
- **Waktu training lama** – butuh planner yang baik

---

## Tips & Trik

> **Golden Rule:** Selalu hancurkan atau lemahkan Air Defense sebelum deploy Dragon!

- Gunakan **Earthquake + Lightning** combo untuk kuras 1 AD Level 6 di TH8
- Hindari split Dragon terlalu jauh – biarkan mereka bergerak bersama
- Rage Spell saat Dragon melalui core base = hasil terbaik`
  },
  {
    id: "troop-witch",
    title: "Witch – Cara Efektif Menggunakan Witch",
    category: "troops",
    summary: "Dark Elixir troop yang memanggil skeleton. Efektif sebagai distraction dan dalam strategi Witchslap.",
    tags: ["witch","dark elixir","skeleton","witchslap","th11"],
    featured: false,
    date: "2026-01-20",
    views: 178,
    content: `## Witch

**Witch** adalah Dark Elixir Troop yang memanggil **Skeleton** (undead) secara berkala untuk membantu menyerang. Sangat efektif sebagai distraction bagi pertahanan.

---

## Statistik

| Level | DPS | HP  | Summoned Skeletons | Dark Elixir Cost |
|-------|-----|-----|--------------------|------------------|
| 1     | 75  | 300 | 4 per spawn        | 150 DE           |
| 2     | 90  | 360 | 6 per spawn        | 150 DE           |
| 5     | 130 | 480 | 10 per spawn       | 150 DE           |

---

## Target Prioritas

Witch menyerang bangunan terdekat. Skeleton yang di-summon juga menyerang bangunan terdekat.

---

## Strategi Witchslap

Komposisi populer untuk TH11–TH13:

- **5–8 Witch**
- **Golem 2–3**
- **Healer untuk Queen Walk**
- **Bowler + Witch** sebagai main push

Cara pakai:
1. Queen Walk di satu sisi untuk clearing
2. Golem di depan sebagai tank
3. Witch di belakang Golem untuk support
4. Smash ke tengah base

---

## Tips

- Witch sangat efektif di **Clan War** karena Skeleton membingungkan Single Target Defenses
- Jangan deploy terlalu menumpuk – Splash Damage (Wizard Tower) bisa habiskan semua Skeleton sekaligus
- Kombinasikan dengan **Bat Spell** untuk ledakan Skeleton massal`
  },
  {
    id: "troop-pekka",
    title: "P.E.K.K.A – Guide Penggunaan & Strategi",
    category: "troops",
    summary: "Troop baja dengan HP dan DPS tertinggi di antara Dark Elixir troops. Raja ground attack.",
    tags: ["pekka","dark elixir","ground","high hp","th10"],
    featured: false,
    date: "2026-02-01",
    views: 295,
    content: `## P.E.K.K.A (Perfect Enraged Knight Killer of Assassins)

**P.E.K.K.A** adalah troop baja raksasa dengan HP dan DPS yang luar biasa tinggi. Sering disebut sebagai "tank ultimate" di ground attack.

---

## Statistik

| Level | DPS  | HP    | Training Cost | Waktu Training |
|-------|------|-------|---------------|----------------|
| 1     | 240  | 2,800 | 28,000 Elixir | 45 menit       |
| 5     | 440  | 4,900 | 28,000 Elixir | 45 menit       |
| 9     | 660  | 6,900 | 28,000 Elixir | 45 menit       |

---

## Target Prioritas

PEKKA tidak memiliki preferensi target – menyerang bangunan **terdekat**.

---

## Strategi PEKKA Smash (TH10–TH12)

**Komposisi:**
- 4–6 PEKKA
- 10–15 Wizard
- 2 Golem
- Heal + Rage Spell

**Cara pakai:**
1. Deploy Golem di depan sebagai tank
2. PEKKA di belakang Golem
3. Wizard di sayap untuk clear bangunan pinggir
4. Funnel dengan benar sebelum push ke tengah
5. Rage + Heal Spell di area padat pertahanan

---

## PEKKA + E-Drag (TH13)

Salah satu kombo terkuat:
- 3 PEKKA + 5 E-Dragon + Ice Golem
- Super Powerful dengan dukungan Warden Ability

---

## Kelemahan

- **Lambat** – kecepatan gerak rendah
- Rentan terhadap **kanalización** yang salah (malah masuk loop)
- Mahal di Elixir biasa

---

## Fun Fact

PEKKA adalah wanita di dalam armor baja itu. Lore-nya cukup misterius di dunia Clash!`
  },

  // ── HEROES ──────────────────────────────────────────────────
  {
    id: "hero-barbarian-king",
    title: "Barbarian King – Level, Ability & Strategi",
    category: "heroes",
    summary: "Hero pertama yang bisa didapatkan di TH7. Ground hero dengan Iron Fist ability yang OP.",
    tags: ["barbarian king","bk","hero","th7","dark elixir","iron fist"],
    featured: true,
    date: "2026-01-10",
    views: 621,
    content: `## Barbarian King

**Barbarian King (BK)** adalah hero pertama yang bisa kamu dapatkan di Clash of Clans, tersedia sejak **Town Hall 7**. Dia adalah hero ground terkuat yang memiliki kemampuan **Iron Fist**.

---

## Cara Mendapatkan

- Bangun **Barbarian King Altar** di Town Hall 7
- Harga awal: **10.000 Dark Elixir**

---

## Statistik per Level

| Level | DPS  | HP    | Upgrade Cost (DE) |
|-------|------|-------|-------------------|
| 1     | 100  | 1,500 | –                 |
| 10    | 220  | 2,800 | 40,000 DE         |
| 30    | 350  | 4,200 | 95,000 DE         |
| 50    | 490  | 5,400 | 150,000 DE        |
| 95    | 780  | 8,200 | 280,000 DE        |

---

## Iron Fist Ability

**Iron Fist** adalah kemampuan spesial BK yang aktif saat health-nya kritis atau dipanggil manual.

### Efek:
- **Memanggil Barbarian** (jumlah bertambah per level)
- **Rage buff** – meningkatkan kecepatan dan DPS BK
- **Self-heal** – memulihkan sejumlah HP

### Level Ability:
- Level 5: Memanggil 6 Barbarian + Rage
- Level 20: Memanggil 14 Barbarian + Rage + Heal
- Level 40: Memanggil 20 Barbarian + Rage + Heal besar

---

## Tips Upgrade

- **Jangan upgrade BK saat war season aktif** – BK tidak bisa digunakan saat upgrade
- Upgrade pada saat kamu tidak aktif bermain (malam hari / libur)
- Prioritaskan setiap 5 level untuk unlock Ability level baru

---

## Strategi Penggunaan

### 1. Ground Push
BK sebagai tank utama dalam strategi ground attack. Deploy di depan Golem.

### 2. Queen Walk Support
BK mendistraksi pertahanan dari arah berbeda saat Archer Queen melakukan Queen Walk.

### 3. King Charge
BK diserang ke inti base secara agresif untuk destroy Town Hall atau bangunan kritis.

---

## Perlu Dijaga

- BK sangat rentan terhadap **Single Target Inferno Tower** (terutama saat ability belum aktif)
- Hati-hati dengan **Giant Bomb** yang bisa langsung habiskan HP BK
- Selalu aktifkan ability sebelum BK benar-benar mati!

---

## Priority Upgrade

| TH Level | Target BK Level |
|----------|-----------------|
| TH7      | 1–10            |
| TH8      | 10–20           |
| TH9      | 20–30           |
| TH10     | 30–40           |
| TH11     | 40–50           |
| TH12     | 50–65           |
| TH13     | 65–80           |
| TH14     | 80–90           |
| TH15     | 90–95           |`
  },
  {
    id: "hero-archer-queen",
    title: "Archer Queen – Queen Walk & Royal Cloak",
    category: "heroes",
    summary: "Hero terkuat di CoC. Royal Cloak ability membuat AQ hampir tak terkalahkan. Unlock di TH9.",
    tags: ["archer queen","aq","queen walk","royal cloak","th9","hero"],
    featured: true,
    date: "2026-01-12",
    views: 834,
    content: `## Archer Queen

**Archer Queen (AQ)** adalah hero terkuat dan paling versatile di Clash of Clans. Unlock di **Town Hall 9** dan menjadi tulang punggung hampir semua strategi kompetitif.

---

## Cara Mendapatkan

- Bangun **Archer Queen Altar** di Town Hall 9
- Harga awal: **40.000 Dark Elixir**

---

## Statistik per Level

| Level | DPS  | HP    | Range | Upgrade Cost (DE) |
|-------|------|-------|-------|-------------------|
| 1     | 120  | 1,200 | 5 tile | –               |
| 20    | 320  | 2,800 | 5 tile | 75,000 DE       |
| 50    | 600  | 5,000 | 5 tile | 180,000 DE      |
| 90    | 920  | 7,200 | 5 tile | 300,000 DE      |

---

## Royal Cloak – Ability

**Royal Cloak** adalah ability paling ikonik di CoC. Saat diaktifkan:

1. **AQ menjadi invisible** (tidak bisa diserang selama beberapa detik)
2. **Summon Archer** – memanggil Archer bantuan
3. **Heal** – memulihkan HP AQ

### Durasi Invisible:
- Level 1: 1 detik
- Level 20: 3 detik
- Level 40: 4.5 detik
- Level 65+: 5 detik

---

## Queen Walk – Strategi Terpenting

**Queen Walk** adalah strategi di mana AQ berjalan sendiri (dibackup Healer) untuk membuka sisi base sebelum army utama masuk.

### Komposisi Queen Walk:
- **Archer Queen** (minimal level 30+ untuk efektif)
- **4–6 Healer** sebagai support
- Healer akan men-heal AQ terus-menerus

### Tahapan:
1. **Deploy Healer** di sisi yang akan di-walk
2. **Deploy AQ** di belakang Healer
3. AQ + Healer berjalan bersama, menghancurkan bangunan di sisi base
4. Saat AQ selesai clearing, lanjutkan dengan army utama dari funnel tersebut

### Tips Queen Walk:
- Hindari area dengan **Air Defense** aktif (akan mengincar Healer)
- Gunakan **Rage Spell** saat AQ memasuki area padat
- Aktifkan **Royal Cloak** saat HP AQ kritis, bukan saat HP masih penuh

---

## Rekomendasi Level AQ per TH

| TH  | Target AQ Level |
|-----|-----------------|
| TH9 | 1–30           |
| TH10| 30–45          |
| TH11| 45–55          |
| TH12| 55–65          |
| TH13| 65–75          |
| TH14| 75–80          |
| TH15| 80–90          |

---

> 💡 **Pro Tip:** AQ adalah hero yang WAJIB diupgrade terus-menerus. Bahkan selisih 5 level bisa berdampak besar pada performa serangan.`
  },
  {
    id: "hero-grand-warden",
    title: "Grand Warden – Eternal Tome & Cara Optimal",
    category: "heroes",
    summary: "Support hero yang meningkatkan durability seluruh army. Unlock di TH11. Bisa air/ground mode.",
    tags: ["grand warden","gw","th11","eternal tome","support hero","aura"],
    featured: false,
    date: "2026-01-18",
    views: 267,
    content: `## Grand Warden

**Grand Warden (GW)** adalah hero ke-3 di Clash of Clans, tersedia sejak **Town Hall 11**. Dia bukan attacker biasa – dia adalah support hero yang meningkatkan kekuatan seluruh army di sekitarnya.

---

## Cara Mendapatkan

- Bangun **Grand Warden Altar** di Town Hall 11
- Harga awal: **gratis** (altar gratis, hanya perlu dibangun)
- Upgrade menggunakan **Elixir** (bukan Dark Elixir!)

---

## Mode

Grand Warden bisa diatur menjadi:
- 🦅 **Air Mode** – mengikuti dan men-support air troops
- 🦶 **Ground Mode** – mengikuti dan men-support ground troops

---

## Aura Pasif – Life Aura

Selama Grand Warden berada di area serangan, semua troop dalam radius **aura** mendapat buff:

| Level | Aura Bonus HP |
|-------|---------------|
| 1     | +20 HP        |
| 20    | +150 HP       |
| 40    | +350 HP       |
| 65    | +600 HP       |

---

## Eternal Tome – Ability

Saat diaktifkan:
- Semua troop dalam radius **menjadi invincible** selama beberapa detik
- Tidak bisa diserang atau mati selama Eternal Tome aktif

### Ini sangat berguna untuk:
- Melewati **Single Inferno Tower** tanpa kehilangan troop
- Survive saat melintasi area dengan **Scatter Shot** atau **Eagle Artillery**

---

## Tips Penggunaan

1. **Aktifkan Eternal Tome di timing tepat** – saat army utama sedang di bawah serangan fire yang paling berat
2. **Air Mode + E-Dragon** – kombinasi sangat OP untuk TH12+
3. Jangan biarkan GW berjalan sendiri – dia perlu dekat dengan army untuk aura berfungsi

---

## Prioritas Upgrade

GW diupgrade dengan Elixir, jadi lebih fleksibel. Target:
- TH11: Level 1–20
- TH12: Level 20–40
- TH13: Level 40–55
- TH14: Level 55–65`
  },

  // ── SPELLS ──────────────────────────────────────────────────
  {
    id: "spell-lightning",
    title: "Lightning Spell – Cara Pakai & Kalkulasi Damage",
    category: "spells",
    summary: "Salah satu spell pertama. Bisa digunakan untuk menghancurkan Air Defense sebelum serangan udara.",
    tags: ["lightning spell","th5","air defense","earthquake combo","spell"],
    featured: false,
    date: "2026-01-22",
    views: 193,
    content: `## Lightning Spell

**Lightning Spell** adalah salah satu spell paling tua di CoC. Meskipun sederhana, penggunaannya yang tepat bisa mengubah hasil serangan.

---

## Cara Mendapatkan

- Unlock di **Town Hall 5** bersama Spell Factory

---

## Statistik

| Level | Damage (single bolt) | Total Damage (6 bolts) | Space | Biaya |
|-------|----------------------|------------------------|-------|-------|
| 1     | 75                   | 450                    | 1     | 15,000 Elixir |
| 5     | 250                  | 1,500                  | 1     | 15,000 Elixir |
| 9     | 450                  | 2,700                  | 1     | 15,000 Elixir |
| 11    | 560                  | 3,360                  | 1     | 15,000 Elixir |

> Lightning Spell menjatuhkan **6 sambaran petir** pada titik yang ditarget.

---

## Kalkulasi: Berapa Lightning untuk Hancurkan Air Defense?

| AD Level | HP    | Lightning Lv 9 (2.700 dmg) | Lightning + Earthquake |
|----------|-------|----------------------------|------------------------|
| AD Lv 8  | 1,500 | 1x Lightning ✅             | –                      |
| AD Lv 10 | 2,000 | 1x Lightning ✅             | –                      |
| AD Lv 11 | 2,400 | 1x Lightning ✅             | –                      |
| AD Lv 12 | 2,700 | 1x Lightning ✅ (pas!)      | –                      |
| AD Lv 13 | 3,000 | 2x Lightning atau 1+EQ      | ✅                     |

---

## Combo Lightning + Earthquake

Untuk AD TH13+, gunakan:
- **1× Lightning Spell (Lv 9)** – deals 2,700 damage
- **1× Earthquake Spell (Lv 5)** – deals 14% total HP

Dengan 2,700 + 14% HP tersisa = cukup untuk hancurkan AD Level 13 (HP 3,000).

---

## Tips Penggunaan

- Gunakan untuk **clear Clan Castle troops** di sudut base (tapi kurang efisien)
- Kombinasikan **2–3 Lightning** untuk direct kill bangunan target
- Lightning sangat efektif di **Super Witch Blimp** strategy untuk TH14+
- Ingat: damage terkuat di **pusat target**, semakin jauh semakin berkurang`
  },
  {
    id: "spell-rage",
    title: "Rage Spell – Boost DPS & Kecepatan Army",
    category: "spells",
    summary: "Spell paling populer. Meningkatkan damage dan kecepatan gerak semua troop dalam radius.",
    tags: ["rage spell","dps boost","th5","golem","pekka","essential"],
    featured: false,
    date: "2026-01-25",
    views: 441,
    content: `## Rage Spell

**Rage Spell** adalah spell yang paling sering digunakan di semua level TH. Memberikan buff **DPS** dan **kecepatan gerak** pada semua troop dalam radius spell.

---

## Statistik

| Level | DPS Increase | Move Speed Increase | Radius | Duration | Space |
|-------|--------------|---------------------|--------|----------|-------|
| 1     | +40%         | +20%                | 5 tile | 18 detik | 2     |
| 4     | +70%         | +36%                | 5 tile | 18 detik | 2     |
| 6     | +90%         | +42%                | 5 tile | 18 detik | 2     |

---

## Kapan Harus Digunakan?

✅ **Ideal saat:**
- Army sedang di area padat pertahanan (Town Hall core)
- Ingin menghancurkan Eagle Artillery atau Inferno Tower cepat
- Mengkombinasikan dengan Barbarian King Iron Fist
- Dragon atau E-Dragon memasuki inti base

❌ **Hindari:**
- Menaruh di area kosong (waste)
- Saat troop sudah akan keluar radius dalam 5 detik
- Saat Inferno Tower sudah lock-on (terlambat)

---

## Teknik Placement Rage Spell

1. **Drag and watch** – taruh di depan arah gerak army, bukan di belakangnya
2. **Predict movement** – hitung ke mana army akan bergerak
3. **Overlap dengan Heal Spell** – untuk ground attack, Rage + Heal = combo terbaik

---

## Rage Spell vs Haste Spell

| Aspek           | Rage Spell | Haste Spell |
|-----------------|------------|-------------|
| DPS Boost       | ✅ Yes     | ❌ No       |
| Speed Boost     | ✅ Yes     | ✅ Yes (more) |
| Space           | 2          | 1           |
| Cocok untuk     | Semua troop | Balloon, Hog |

---

> 💡 **Pro Tip:** Saat menggunakan Electro Dragon atau PEKKA, selalu alokasikan setidaknya **2 Rage Spell** di army kamu!`
  },
  {
    id: "spell-heal",
    title: "Heal Spell – Maksimalkan Survival Army",
    category: "spells",
    summary: "Memulihkan HP troop dalam radius. Vital untuk Hog Rider dan ground attack strategies.",
    tags: ["heal spell","hog rider","ground attack","th6","survival"],
    featured: false,
    date: "2026-01-28",
    views: 215,
    content: `## Heal Spell

**Heal Spell** memulihkan HP semua troop dalam radius secara terus-menerus selama spell aktif. Sangat vital untuk strategi ground attack yang melibatkan troop dengan HP tinggi.

---

## Statistik

| Level | Heal/detik | Total Heal (12 detik) | Space | Biaya |
|-------|------------|----------------------|-------|-------|
| 1     | 400        | 4,800 HP             | 2     | 20,000 Elixir |
| 4     | 700        | 8,400 HP             | 2     | 20,000 Elixir |
| 8     | 1,100      | 13,200 HP            | 2     | 20,000 Elixir |

---

## Cocok dengan Troop Apa?

- **Hog Rider** – Heal Spell adalah jiwa dari Hog Rider attack. Tanpa ini, Hog akan habis oleh Giant Bomb.
- **Golem + PEKKA** – menjaga tank tetap hidup
- **Barbarian King** – backup saat BK hampir mati
- **Giant** – membuat Giant survive lebih lama

---

## Giant Bomb Awareness

Saat memakai Hog Rider, perhatikan:

> Setiap Giant Bomb deals sekitar **600 damage** per Hog. Heal Spell harus di-drop **sebelum** Hog kena Giant Bomb!

Rumus: `Heal/detik × durasi > damage dari Giant Bomb`

---

## Timing Heal Spell yang Tepat

1. **Drop saat Hog memasuki area Double Giant Bomb** (biasanya dekat Town Hall)
2. **Jangan drop terlalu awal** – Hog akan keluar radius sebelum Heal efektif
3. Untuk ground attack besar: drop **2 Heal Spell** secara berturut di jalur pergerakan army`
  },

  // ── BUILDINGS ───────────────────────────────────────────────
  {
    id: "building-town-hall",
    title: "Town Hall – Panduan Upgrade & Yang Dibuka Tiap Level",
    category: "buildings",
    summary: "Jantung dari desa kamu. Panduan lengkap tentang kapan upgrade TH dan apa yang unlocked.",
    tags: ["town hall","th guide","upgrade","unlocks","progression"],
    featured: true,
    date: "2026-02-03",
    views: 1024,
    content: `## Town Hall – Panduan Lengkap

**Town Hall** adalah bangunan paling penting di Clash of Clans. Level Town Hall menentukan bangunan apa yang bisa dibangun, troops apa yang bisa di-unlock, dan seberapa besar base kamu.

---

## Kapan Harus Upgrade Town Hall?

> **Aturan emas:** Upgrade TH **HANYA** setelah semua bangunan, troops, dan heroes di level saat ini sudah di-maxed (atau setidaknya sudah cukup tinggi).

**Resiko rush TH:**
- Tidak bisa bersaing di Clan War
- Dimatched dengan pemain yang jauh lebih kuat
- Resources base kamu menjadi sasaran empuk pemain yang lebih experienced

---

## Yang Terbuka di Setiap Level TH

### TH1 – TH5: Fondasi

| TH Level | Yang Dibuka |
|----------|-------------|
| TH1      | Builder's Hut, Cannon, Army Camp, Barracks dasar |
| TH2      | Archer Tower, Mortar (1), Goblin |
| TH3      | Air Bomb, Wall Breaker, Bomb |
| TH4      | Giant Bomb, Witch awal (nope, terlalu tinggi), minion dasar |
| TH5      | Spell Factory, Lightning Spell, Balloon, Wizard Tower |

### TH6 – TH9: Mid Game

| TH Level | Yang Dibuka |
|----------|-------------|
| TH6      | Heal Spell, Dragon, Dark Elixir Storage, Dark Barracks, Golem |
| TH7      | Barbarian King, Hog Rider, Rage Spell, Air Sweeper |
| TH8      | Lava Hound, Valkyrie, Skeleton Spell, Dark Spell Factory |
| TH9      | Archer Queen, P.E.K.K.A, Earthquake Spell, X-Bow, Freeze Spell |

### TH10 – TH13: Late Game

| TH Level | Yang Dibuka |
|----------|-------------|
| TH10     | Inferno Tower, Miner, Royal Champion, Haste Spell, Bowler |
| TH11     | Grand Warden, Eagle Artillery, Electro Dragon, Bat Spell |
| TH12     | Scattershot, Super Troops (pertama), Workshop (Siege Machines) |
| TH13     | Royal Champion, Scattershot ke-2, Minion Prince |

### TH14 – TH17: End Game

| TH Level | Yang Dibuka |
|----------|-------------|
| TH14     | Pet House, Pets (L.A.S.S.I, Electro Owl, dll), Rootrider |
| TH15     | Spell Tower, Monolith, Angry Jelly |
| TH16     | Multi-Archer Tower, Minion Prince (standalone) |
| TH17     | (TH terbaru – features ongoing) |

---

## Tips Upgrade TH

1. **Maxkan Heroes dulu** sebelum upgrade TH (terutama BK dan AQ)
2. **Selesaikan semua Lab upgrade** untuk troops yang sering kamu pakai
3. **Upgrade resource buildings** (Gold Mine, Elixir Collector, DE Drill) agar income farming meningkat
4. Manfaatkan **Season Pass builder boost** untuk mempercepat proses

---

## Waktu Upgrade Town Hall (Approximate)

| TH Level | Durasi Upgrade |
|----------|----------------|
| TH1–5    | Hitungan menit |
| TH6–8    | Beberapa hari  |
| TH9–10   | 7–14 hari      |
| TH11–12  | 14 hari        |
| TH13–14  | 15 hari        |
| TH15+    | 16+ hari       |`
  },
  {
    id: "building-eagle-artillery",
    title: "Eagle Artillery – Pertahanan Paling Ditakuti di TH11+",
    category: "defenses",
    summary: "Defense terkuat yang menyerang 3 target sekaligus dengan damage AoE besar. Aktif setelah 200 troop masuk.",
    tags: ["eagle artillery","th11","defense","aoe","most powerful"],
    featured: true,
    date: "2026-02-08",
    views: 687,
    content: `## Eagle Artillery

**Eagle Artillery** adalah salah satu pertahanan paling ditakuti di Clash of Clans. Tersedia sejak **Town Hall 11**, Eagle Artillery mampu mengincar **3 target secara bersamaan** dengan serangan area (splash) yang besar.

---

## Cara Mendapatkan

- Unlock di Town Hall 11
- Hanya ada **1 slot** Eagle Artillery per base

---

## Statistik

| Level | DPS (per bolt) | HP     | Biaya Upgrade |
|-------|----------------|--------|---------------|
| 1     | 100 (×3 bolt)  | 6,000  | –             |
| 2     | 130 (×3 bolt)  | 6,200  | 8,500,000 Gold |
| 5     | 200 (×3 bolt)  | 7,200  | 20,000,000 Gold |
| 9     | 280 (×3 bolt)  | 9,000  | 35,000,000 Gold |

---

## Cara Kerja

Eagle Artillery mulai aktif setelah **sejumlah troop masuk** ke base:

| TH Level | Troop yang dibutuhkan untuk aktifkan |
|----------|--------------------------------------|
| TH11–12  | 150 housing space                    |
| TH13–14  | 180 housing space                    |
| TH15+    | 200 housing space                    |

> **Strategi:** Jika ingin menghindari Eagle Artillery, gunakan sedikit troop terlebih dahulu, baru kirim army besar. Tapi ini hampir mustahil di base yang didesain dengan baik.

---

## Cara Menghadapi Eagle Artillery

### 1. Eternal Tome (Grand Warden)
Aktifkan ability Grand Warden saat army sedang di bawah serangan Eagle Artillery. Troop menjadi invincible selama beberapa detik.

### 2. Destroy First
Coba hancurkan Eagle Artillery dengan Giant Arrow (Archer Queen ability) atau strategi blimp/siege.

### 3. Spread Troops
Jangan deploy semua troop dalam satu kelompok – Eagle Artillery menyerang 3 titik, jadi spread akan meminimalkan korban.

---

## Posisi Terbaik Eagle Artillery

- **Tengah base** – memaksimalkan jangkauan ke semua sisi
- Terlindungi oleh Inferno Tower dan X-Bow

---

## Fun Fact

Eagle Artillery terinspirasi dari **artileri kapal perang kuno** – siap menembak dari jarak jauh dengan akurasi tinggi! 🦅`
  },

  // ── STRATEGY ────────────────────────────────────────────────
  {
    id: "strategy-queen-walk-bowitch",
    title: "Queen Walk + BoWitch – Strategi 3 Star TH12",
    category: "strategy",
    summary: "Kombinasi Queen Walk dengan Bowler dan Witch untuk 3-star serangan di TH12. Salah satu strategi paling reliable.",
    tags: ["queen walk","bowitch","th12","3 star","war strategy","bowler","witch"],
    featured: true,
    date: "2026-02-10",
    views: 743,
    content: `## Queen Walk + BoWitch (TH12 War Strategy)

**BoWitch** (Bowler + Witch) dikombinasikan dengan Queen Walk adalah salah satu strategi **paling reliable** untuk 3-star di TH12. Strategi ini membutuhkan eksekusi yang tepat tapi hasilnya sangat konsisten.

---

## Army Komposisi

| Troop/Spell | Jumlah | Keterangan |
|-------------|--------|------------|
| Archer Queen | 1    | Untuk Queen Walk |
| Healer       | 4–6  | Support Queen Walk |
| Bowler       | 10–12| Main push |
| Witch        | 4–5  | Support Bowler |
| Golem/Ice Golem | 2 | Tank depan |
| Wall Wrecker | 1    | Siege Machine |
| Rage Spell   | 2    | Core push |
| Heal Spell   | 2    | Survival |
| Earthquake   | 1    | Buka tembok |
| Bat Spell    | 2    | (opsional, sangat efektif) |
| Freeze Spell | 1    | Counter Inferno Tower |

---

## Langkah-Langkah

### Phase 1: Queen Walk (Sisi yang akan di-funnel)

1. Deploy **4–6 Healer** di sisi yang akan di-walk
2. Deploy **Archer Queen** di belakang Healer
3. Biarkan AQ membersihkan bangunan di sisi tersebut
4. Aktifkan **Royal Cloak** jika HP AQ di bawah 50%

> Target Queen Walk: setidaknya hancurkan Inferno Tower atau Air Defense di sisi tersebut

### Phase 2: Funnel

1. Setelah Queen Walk selesai, kirim 1–2 troop kecil di sisi lain untuk membuat funnel
2. Funnel yang baik = army tidak "nyasar" ke pinggir base

### Phase 3: Main Push

1. Deploy **Wall Wrecker** di tengah funnel
2. Deploy **2 Golem** di depan Wall Wrecker
3. Ikuti dengan **Bowler** di belakang Golem
4. **Witch** di belakang Bowler
5. **Warden** (Grand Warden) dalam mode ground, ikuti army

### Phase 4: Spell Support

1. **Earthquake** untuk buka tembok jika Wall Wrecker terganggu
2. **Rage Spell** saat army memasuki area Inferno Tower + Town Hall
3. **Heal Spell** saat army di area Giant Bomb
4. **Freeze** untuk counter Inferno Tower yang lock-on hero/army inti
5. **Bat Spell** (jika ada) di area dengan banyak splash damage

---

## Base yang Cocok Diserang

✅ Base dengan satu Inferno Tower di satu sisi (bisa di-walk AQ)
✅ Base yang tidak terlalu compact
✅ Base dengan resource di luar

❌ Tidak ideal untuk base yang spread dengan 2+ Inferno Tower di tengah

---

## Tips Pro

- **AQ harus minimal level 50** untuk Queen Walk efektif di TH12
- Jika Inferno Tower ada di jalur Queen Walk, gunakan Freeze Spell
- Selalu **tarik Clan Castle** sebelum mulai serangan
- **Warden Ability (Eternal Tome)** = timing paling krusial dalam serangan ini`
  },
  {
    id: "strategy-farming",
    title: "Panduan Farming Efisien – Dari TH6 hingga TH15",
    category: "strategy",
    summary: "Tips dan strategi farming resources (Gold, Elixir, Dark Elixir) yang paling efisien di setiap level TH.",
    tags: ["farming","resources","gold","elixir","dark elixir","efficiency"],
    featured: false,
    date: "2026-02-15",
    views: 456,
    content: `## Panduan Farming Efisien

Farming adalah aktivitas inti di Clash of Clans. Tanpa resources yang cukup, upgrade akan berjalan sangat lambat. Berikut panduan komprehensif untuk setiap tahap permainan.

---

## Prinsip Dasar Farming

1. **Nexting (Skip) lebih baik daripada attack yang gagal** – tekan Next jika base tidak worth attack
2. **Target Collector, bukan Storage** – Collector yang penuh lebih mudah diambil
3. **League yang tepat** = musuh yang mudah dikalahkan dengan loot yang bagus
4. **Armor shield** – manfaatkan shield untuk farming saat offline

---

## Farming per Tahap TH

### TH6–TH8: Silver/Gold League

**Target:** Farming Elixir dan Gold untuk upgrade

**Army:** BARCH (Barbarian + Archer)
- 100 Barbarian + 100 Archer
- Training cost: ~25,000 Elixir
- Cocok untuk base terbuka dengan Collector di luar

**Tips:**
- Target base dengan Collector di tepi (bisa snipe dari luar)
- Nexting: Skip base yang Collector kosong
- Pindah ke **Silver III** untuk loot bonus yang baik

---

### TH9: Crystal League

**Target:** Dark Elixir untuk upgrade Heroes

**Army:** Giant + Healer + Wizard (GiHeal) atau BARCH

**Strategy:**
- Fokus ke base dengan DE Drill di tepi
- Gunakan Giant untuk distraksi, Archer/Wizard bersihkan

**Tips DE Farming:**
- **Titan League** memiliki loot bonus DE tertinggi per waktu
- Kuras DE Storage musuh menggunakan Goblin jika DE di luar tembok

---

### TH10–TH12: Crystal/Masters League

**Target:** Gold dan Elixir (Heroes sudah hampir max)

**Army:** Hybrid (Hog + Miner) atau Mass Dragon

**Tips:**
- Masuk **Crystal I** untuk loot bonus optimal
- Gunakan **Goblin** untuk snipe resource building

---

### TH13+: Masters/Champion League

**Target:** Semua resource, terutama Builder Gold

**Army:** Super Troops

**Super Troop Terbaik untuk Farming:**
- **Super Barbarian** – massal, cepat clear base
- **Super Archer** – jangkauan jauh, efisien
- **Super Miner** – tunnel menembus tembok, sangat bagus untuk Collector dalam tembok

---

## Loot Bonus per League

| League        | Gold Bonus | Elixir Bonus | DE Bonus |
|---------------|------------|--------------|----------|
| Bronze III    | 150,000    | 150,000      | 200      |
| Silver I      | 500,000    | 500,000      | 600      |
| Gold III      | 1,000,000  | 1,000,000    | 1,200    |
| Crystal III   | 1,500,000  | 1,500,000    | 2,000    |
| Masters III   | 2,000,000  | 2,000,000    | 3,000    |
| Champion III  | 2,500,000  | 2,500,000    | 4,000    |

---

## Jadwal Farming Optimal

| Hari      | Aktivitas |
|-----------|-----------|
| Senin     | Farming utama, stok resources |
| Selasa    | Lanjut farming + Clan War attack |
| Rabu–Kamis| Maintain resources untuk upgrade |
| Jumat–Sabtu| Push untuk League Bonus akhir minggu |
| Minggu    | Santai, kumpulkan Season Pass rewards |`
  },

  // ── GUIDES ──────────────────────────────────────────────────
  {
    id: "guide-town-hall-progression",
    title: "Urutan Upgrade Optimal – TH9 Menuju TH10",
    category: "guides",
    summary: "Panduan step-by-step upgrade yang paling efisien dari TH9 ke TH10. Prioritaskan apa dulu?",
    tags: ["upgrade order","th9","th10","progression","guide","priority"],
    featured: true,
    date: "2026-02-18",
    views: 892,
    content: `## Upgrade Order TH9 → TH10

Transisi dari TH9 ke TH10 adalah salah satu yang **paling signifikan** di Clash of Clans. Berikut urutan upgrade yang optimal.

---

## Sebelum Upgrade TH

Pastikan kamu sudah:
- [ ] Barbarian King minimal Level 25 (idealnya 30)
- [ ] Archer Queen minimal Level 20 (idealnya 25)
- [ ] Dragon di Lab sudah Level 4+
- [ ] Hog Rider sudah Level 4+
- [ ] X-Bow sudah Level 4 (max TH9)
- [ ] Resource building sudah dekat max

---

## Urutan Prioritas Setelah Upgrade TH10

### Minggu 1–2: Pertahanan Kritis

1. **Inferno Tower** – bangun keduanya segera. Ini adalah pertahanan terkuat TH10
2. **X-Bow upgrade** ke Level 5–6
3. **Air Defense upgrade** jika sering diserang lewat udara

### Minggu 3–4: Resources & Storage

4. **Gold Storage & Elixir Storage** – upgrade ke max agar bisa menyimpan lebih banyak
5. **Gold Mine & Elixir Collector** – income farming meningkat signifikan
6. **DE Drill** – crucial untuk upgrade Heroes

### Bulan 2: Heroes & Troops

7. **Barbarian King** – lanjut upgrade ke Level 35–40
8. **Archer Queen** – lanjut upgrade ke Level 35–40
9. **Lab: PEKKA upgrade** ke level TH10 max
10. **Lab: Hog Rider upgrade** ke level TH10

### Bulan 3–4: Pertahanan Lainnya

11. **Cannon & Archer Tower** – upgrade semua
12. **Mortar** – upgrade ke Level 8
13. **Giant Bomb & Spring Trap** – upgrade semua trap
14. **Hidden Tesla** – sangat penting di TH10

---

## Tips Penting

> **Hero > Lab > Defense > Resource**

- Selalu pastikan satu Builder **khusus untuk Heroes**
- Gunakan **Book of Heroes** dari Season Pass untuk skip waktu upgrade Hero
- Jangan biarkan Builder nganggur – jika Hero sudah upgrade, allocate ke defense atau resource

---

## Troops di Lab yang Harus Diupgrade

| Troop          | Target Level | Prioritas |
|----------------|-------------|-----------|
| PEKKA          | Level 6     | Tinggi    |
| Hog Rider      | Level 7–8   | Tinggi    |
| Valkyrie       | Level 4–5   | Tinggi    |
| Bowler         | Level 2+    | Medium    |
| Balloon        | Level 7+    | Medium    |
| Dragon         | Level 5+    | Medium    |
| Wizard         | Level 7+    | Low       |

---

## Common Mistakes

❌ Langsung upgrade semua defense tanpa pikir urutan
❌ Lupa upgrade Heroes selama proses
❌ Rush ke TH11 sebelum AQ minimal Level 30
❌ Tidak menyimpan Book of Heroes untuk waktu kritis`
  },
  {
    id: "guide-clan-war-attack",
    title: "Panduan Menyerang di Clan War – Strategi & Tips",
    category: "guides",
    summary: "Bagaimana cara memilih target, menyusun army, dan mengeksekusi serangan war dengan benar.",
    tags: ["clan war","war attack","strategy","cwl","war planning"],
    featured: false,
    date: "2026-02-20",
    views: 334,
    content: `## Panduan Clan War Attack

Clan War adalah mode paling kompetitif di CoC. Satu serangan yang gagal bisa merugikan seluruh klan. Berikut panduan lengkapnya.

---

## Memilih Target

### Aturan Umum
- **Serang base dengan nomor sama atau lebih tinggi** dari posisimu (contoh: kamu di posisi #10, serang #10 atau #9, #8)
- **Hindari menyerang ke atas terlalu jauh** kecuali kamu yakin bisa 3-star

### Scouting Base

Sebelum menyerang, pelajari:
1. **Letak Clan Castle** – tarik dulu atau siapkan spell counter
2. **Jumlah dan posisi Inferno Tower** – menentukan strategi
3. **Posisi Eagle Artillery** – planning Warden Eternal Tome
4. **Letak Giant Bomb** – krusial untuk Hog Rider attack
5. **Base type**: Ring, Compartment, Spread, atau Funnel base

---

## Scouting dengan Replay

Gunakan replay war base pemain lain untuk:
- Melihat letak jebakan (trap) tersembunyi
- Memahami reaksi Clan Castle troops
- Menentukan entry point terbaik

---

## Standar Serangan per TH Level

| TH Level | Target 3-Star | Army Rekomendasi |
|----------|---------------|------------------|
| TH8      | TH7–TH8      | Mass Dragon + Lightning |
| TH9      | TH9          | Hog Rider + Heal Spell  |
| TH10     | TH10         | PEKKA Smash / GiWi      |
| TH11     | TH11         | Queen Walk + Electro Dragon |
| TH12     | TH12         | BoWitch / ZapQuake      |
| TH13     | TH13         | Root Rider / Super Witch |

---

## Langkah Sebelum Serangan

1. **Tarik Clan Castle** – Gunakan Archer/Barbarian untuk lure CC ke sudut, lalu bunuh dengan Spells + Wizards
2. **Counter CC troops** sebelum serangan utama dimulai
3. **Hancurkan Queen** jika base memiliki Queen di posisi terbuka
4. Deploy sesuai rencana yang sudah disusun

---

## Saat Serangan Berlangsung

- Perhatikan arah pergerakan army – jangan sampai nyasar
- **Aktifkan Hero Ability** pada waktu yang tepat (jangan terlambat)
- **Rage/Heal Spell** harus dipikirkan placement-nya matang-matang
- Jika ada yang salah, adapt dengan cepat

---

## Kesalahan Umum di Clan War

| Kesalahan | Solusi |
|-----------|--------|
| Tidak tarik Clan Castle | Selalu lure CC dulu |
| Serangan tanpa scouting | Pelajari base 10–15 menit |
| Semua troop di satu titik | Buat funnel yang baik |
| Spell dipakai terlalu dini | Sabar dan timing |
| Attack terlalu dekat deadline | Serang di jam-jam awal |

---

## Komunikasi dengan Klan

- Selalu **koordinasi dengan leader/elder** soal target
- Tanyakan apakah ada yang sudah "booking" target
- Share army komposisi untuk masukan dari member berpengalaman`
  },
  {
    id: "guide-base-building-th12",
    title: "Dasar-Dasar Base Building – Prinsip & Layout TH12",
    category: "base-building",
    summary: "Pelajari prinsip membuat base yang solid di TH12. Dari letak Town Hall hingga trap placement.",
    tags: ["base building","th12","layout","defense","anti-3star"],
    featured: false,
    date: "2026-02-25",
    views: 289,
    content: `## Dasar-Dasar Base Building TH12

Membuat base yang baik adalah seni tersendiri di Clash of Clans. Base yang solid bisa membuat musuh hanya mendapat 1 atau 2 bintang meski menggunakan strategi terbaik.

---

## Prinsip Fundamental Base Building

### 1. Protect the Town Hall
Town Hall adalah target utama. Letakkan di:
- Tengah base (untuk Trophy pushing / War base)
- Tepi base dengan perlindungan minimal (untuk Farming base – biarkan menyerah agar dapat shield)

### 2. Compartmentalize
Bagi base menjadi beberapa "ruangan" atau compartment dengan tembok. Tujuannya:
- Ground troops harus menembus banyak lapis tembok
- Memperlambat kemajuan musuh

### 3. Centralize Key Defenses
Letakkan di tengah atau terlindungi:
- **Inferno Tower** – paling takut di-funnel
- **Eagle Artillery** – semakin tengah semakin baik
- **Scattershot** – butuh radius attack maksimal

### 4. Spread Air Defenses
**Air Defense harus tersebar merata** – jangan tumpuk di satu sisi. Jika semua AD di kiri, serangan air dari kanan bisa menerobos tanpa hambatan.

---

## Layer Defense

Base yang baik memiliki beberapa lapisan:
1. **Outer layer** – Mortar, Cannon, Archer Tower
2. **Middle layer** – X-Bow, Wizard Tower
3. **Inner layer** – Inferno Tower, Eagle Artillery, Scattershot

---

## Trap Placement untuk TH12

### Giant Bomb
- Letakkan **1 tile di luar tembok** pada jalur yang diprediksi Hog Rider akan lewat
- Double Giant Bomb near Town Hall untuk Hog Rider trap

### Spring Trap
- Di jalur masuk yang sempit – akan melempar troop ringan keluar

### Air Bomb & Seeking Air Mine
- Diletakkan dekat Air Defense – counter Healer atau Balloon yang masuk

---

## Anti-3Star Strategy

Untuk base war yang sulit di-3-star:
- Letakkan **Town Hall di compartment paling dalam**
- Pastikan **builder tidak bisa dihancurkan secara bersama** (spread out)
- Inferno Tower dalam mode **single target** untuk counter high-HP heroes

---

## Tools untuk Base Building

- **Copy Link** dari base orang lain bisa digunakan sebagai inspirasi
- Coba serang base kamu sendiri (friendly challenge) untuk mencari kelemahan
- Minta anggota klan untuk melakukan "friendly challenge" dan beri masukan`
  },

  // ── CLAN CAPITAL ────────────────────────────────────────────
  {
    id: "clan-capital-intro",
    title: "Clan Capital – Panduan Lengkap untuk Pemula",
    category: "clan-capital",
    summary: "Semua yang perlu kamu tahu tentang Clan Capital: cara attack, district, dan reward.",
    tags: ["clan capital","raid weekend","capital gold","capital peak","district"],
    featured: false,
    date: "2026-03-01",
    views: 198,
    content: `## Clan Capital

**Clan Capital** adalah fitur multiplayer asynchronous di CoC di mana anggota klan bekerja sama untuk membangun dan mempertahankan ibukota klan mereka, sambil menyerang ibukota klan lain.

---

## Struktur Clan Capital

### 1. Capital Peak
- Bangunan utama – equivalent dengan Town Hall di Clan Capital
- Upgrade Capital Peak untuk membuka District baru

### 2. Districts
Setiap District memiliki tema dan troop unik:
- **Builder Workshop** – Builder Troops (Battle Machine, etc.)
- **Dragon Cliffs** – Dragon-based troops
- **Goblin Mines** – Goblin troops
- **Barbarian Camp** – Barbarian-themed
- **Wizard Valley** – Wizard troops
- **Balloon Lagoon** – Balloon-themed

---

## Raid Weekend

**Raid Weekend** berlangsung setiap akhir pekan (Jumat–Senin) dan merupakan event utama Clan Capital.

### Cara Attack:
1. Pilih Clan Capital musuh dari daftar
2. Serang District satu per satu dari luar ke dalam
3. Setiap District memiliki HP total yang harus dikuras habis
4. Klan yang lebih dulu hancurkan Capital Peak menang

### Army di Raid Weekend:
- Troop sudah disediakan (tidak pakai army sendiri)
- Setiap District memiliki set troop berbeda
- Gunakan Spell yang tersedia secara bijak

---

## Capital Gold

**Capital Gold** adalah currency di Clan Capital, didapat dari:
- Menyerang Capital musuh
- Mempertahankan Capital sendiri (musuh datang)
- Completing district attacks

Capital Gold digunakan untuk:
- Upgrade bangunan di District
- Upgrade pertahanan Capital

---

## Raid Medal

**Raid Medal** didapat setelah Raid Weekend berakhir, berdasarkan:
- Jumlah destruction yang dilakukan
- Partisipasi dalam serangan

Raid Medal bisa ditukar dengan berbagai reward di Magic Item Shop.

---

## Tips Clan Capital

1. **Koordinasi serangan** – jangan overlap attack di District yang sama
2. **Upgrade Capital Peak dulu** sebelum District lainnya
3. **Participation rate** klan menentukan berapa banyak serangan bisa dilakukan
4. Fokus **hancurkan Capital Peak** musuh untuk bonus maximal
5. Gunakan **Spell secara efisien** – jumlahnya terbatas per serangan`
  }
];

// ═══════════════════════════════════════════════════════════════
//  Data Management
// ═══════════════════════════════════════════════════════════════

const DB_KEY = 'coc_kb_articles';
const VIEWS_KEY = 'coc_kb_views';

function loadArticles() {
  try {
    const stored = localStorage.getItem(DB_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch(e) {}
  // First time: seed with initial data
  saveArticles(INITIAL_ARTICLES);
  return INITIAL_ARTICLES;
}

function saveArticles(articles) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(articles));
  } catch(e) {}
}

function loadViews() {
  try {
    const stored = localStorage.getItem(VIEWS_KEY);
    if (stored) return JSON.parse(stored);
  } catch(e) {}
  return {};
}

function saveViews(views) {
  try {
    localStorage.setItem(VIEWS_KEY, JSON.stringify(views));
  } catch(e) {}
}
