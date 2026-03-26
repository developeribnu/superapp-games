# 🎮 Cara Bermain Travian - Panduan Lengkap

## 🚀 Langkah 1: Buka Game

1. **Pastikan server berjalan:**
   ```bash
   cd travian
   ./travian.sh start
   ```

2. **Buka browser dan akses:**
   ```
   http://localhost:8090
   ```

## 🔑 Langkah 2: Login

**Admin Account (sudah ada):**
- Username: `admin`
- Password: `admin123`

**Atau daftar akun baru:**
1. Klik "Register" di halaman depan
2. Isi form pendaftaran
3. Pilih tribe (suku): Romans / Teutons / Gauls
4. Verifikasi email (check MailHog: http://localhost:8091)

## 🏰 Langkah 3: Memulai Permainan

### 3.1 Tampilan Utama
Setelah login, kamu akan melihat:
- **📊 Resource Bar** (atas): Wood, Clay, Iron, Crop
- **🏘️ Village View** (tengah): Desa dan bangunan
- **📋 Menu** (kiri): Build, Overview, Map, dll

### 3.2 Resource Fields (Lapangan Resource)

**Klik "Resources" atau ikon palu** untuk melihat lapangan:

```
🔨 Woodcutter    - Produksi Kayu
🏺 Clay Pit      - Produksi Tanah Liat  
⛏️ Iron Mine     - Produksi Besi
🌾 Cropland      - Produksi Gandum
```

**Cara meningkatkan level:**
1. Klik resource field
2. Klik "Upgrade to Level X"
3. Tunggu construction selesai

### 3.3 Membangun Bangunan

**Klik "Village" atau ikon bangunan:**

**Bangunan Penting:**
| Bangunan | Fungsi |
|----------|--------|
| Main Building | Mempercepat construction |
| Warehouse | Menyimpan kayu, tanah liat, besi |
| Granary | Menyimpan gandum |
| Barracks | Melatih infantry |
| Stable | Melatih kavaleri |
| Marketplace | Trading antar pemain |
| Academy | Riset teknologi baru |
| Cranny | Menyembunyikan resource dari serangan |

## ⚔️ Langkah 4: Membuat Troops (Pasukan)

### 4.1 Romans (Suku Romawi)
**Keunggulan:** Bangunan cepat, defense kuat

**Units:**
```
Legionnaire    - Infantry defense kuat (barracks)
Praetorian     - Defense specialist (barracks)
Imperian       - Infantry attack (barracks)
Equites Legati - Scout (stable)
Equites Imperatoris - Kavaleri attack (stable)
Equites Caesaris - Heavy kavaleri (stable)
```

### 4.2 Teutons (Suku German)
**Keunggulan:** Attack kuat, murah, loot banyak

**Units:**
```
Clubswinger    - Infantry murah (barracks)
Spearman       - Defense vs kavaleri (barracks)
Axeman         - Infantry attack (barracks)
Scout          - Pengintai (barracks)
Paladin        - Kavaleri (stable)
Teutonic Knight - Heavy kavaleri attack (stable)
```

### 4.3 Gauls (Suku Gallia)
**Keunggulan:** Defense terbaik, trapper, merchant cepat

**Units:**
```
Phalanx        - Defense specialist (barracks)
Swordsman      - Infantry attack (barracks)
Pathfinder     - Scout cepat (stable)
Theutates Thunder - Kavaleri (stable)
Druidrider     - Kavaleri defense (stable)
Haeduan        - Heavy kavaleri (stable)
```

### Cara Melatih Troops:
1. Bangun **Barracks** (level 1)
2. Klik Barracks
3. Pilih unit yang mau dilatih
4. Masukkan jumlah
5. Klik "Train"

## 🗺️ Langkah 5: Peta & Village Lain

### 5.1 Melihat Peta
**Klik "Map" di menu kiri**

- **Kotak hijau** = Village sendiri
- **Kotak abu** = Village pemain lain
- **Kotak kuning** = Oasis (resource bonus)

### 5.2 Found New Village (Membuat Desa Baru)

**Syarat:**
1. Main Building Level 10
2. Residence atau Palace
3. 3 Settlers (per Settler butuh: 7500 each resource)

**Cara:**
1. Pilih spot kosong di peta
2. Klik "Found village"
3. Kirim 3 Settlers
4. Village baru akan dibuat

## ⚔️ Langkah 6: Sistem Serangan

### 6.1 Jenis Serangan

**1. Attack (Serangan Penuh)**
- Tujuan: Menghancurkan musuh
- Troops bertarung sampai mati
- Bisa menghancurkan bangunan dengan catapult

**2. Raid (Penjarahan)**
- Tujuan: Mengambil resource
- Korban minimal
- Bisa sering-sering

**3. Reinforcement (Bantuan)**
- Kirim troops untuk membantu bertahan
- Troops tetap di desa target

### 6.2 Cara Menyerang

1. Klik "Send troops"
2. Masukkan koordinat target (x|y)
3. Pilih jenis serangan:
   - ⚔️ Attack
   - 🏴 Raid
   - 🛡️ Reinforcement
4. Pilih troops yang dikirim
5. Klik "Send"

### 6.3 Melihat Reports

**Klik "Reports" di menu:**
- 📨 Reports baru akan muncul setelah serangan selesai
- Lihat hasil pertempuran, korban, resource yang didapat

## 🏪 Langkah 5: Marketplace (Trading)

### Cara Trading:
1. Bangun **Marketplace**
2. Klik "Send resources"
3. Masukkan koordinat penerima
4. Pilih resource yang dikirim
5. Pilih jumlah merchant
6. Klik "Send"

### Cara Jual di Marketplace:
1. Klik "Buy"
2. Pilih "I am offering" - resource yang kamu jual
3. Pilih "I am searching" - resource yang kamu mau
4. Masukkan ratio (misal: 1:1, 2:1)
5. Klik "Offer"

## 👥 Langkah 6: Alliance (Aliansi)

### 6.1 Membuat Alliance
1. Bangun **Embassy** (level 1 untuk join, level 3 untuk buat)
2. Klik "Alliance"
3. Klik "Create alliance"
4. Masukkan nama dan tag

### 6.2 Join Alliance
1. Klik "Alliance"
2. Cari alliance di search
3. Klik "Apply"
4. Tunggu approval

### Manfaat Alliance:
- 🤝 Bantuan troops antar member
- 💬 Chat dan forum alliance
- 📜 Alliance bonuses
- 🛡️ Defense bersama

## 🦸 Langkah 7: Hero System

### 7.1 Membuat Hero
1. Bangun **Hero's Mansion**
2. Klik "Hero"
3. Pilih tipe hero (attack/defense/resources)
4. Klik "Create"

### 7.2 Hero Adventures
1. Klik "Adventure"
2. Pilih adventure dari list
3. Klik "Start adventure"
4. Hero akan pergi dan kembali dengan reward:
   - 💰 Resource
   - ⚔️ Equipment
   - 🪙 Silver
   - 📈 Experience

### 7.3 Equipment
- Equip hero dengan item dari adventure
- Items: Helm, Weapon, Armor, Boots, Horse
- Setiap item ada bonus berbeda

## 🏆 Tips & Trik

### Untuk Pemula:
1. **Prioritas awal:**
   - Upgrade resource fields ke level 3-5
   - Bangun Cranny (level 3-5) untuk proteksi resource
   - Bangun Main Building (level 3)
   - Bangun Warehouse & Granary

2. **Proteksi awal:**
   - Jangan serang player lain dulu (beginner protection 3 hari)
   - Fokus build resource
   - Join alliance cepat

3. **Strategi Romans:**
   - Defense kuat, cocok untuk pemula
   - Prioritas: Praetorian untuk defense
   - Building upgrade cepat

4. **Strategi Teutons:**
   - Attack kuat, loot banyak
   - Prioritas: Clubswinger murah meriah
   - Serang oasis/oasis barbarian

5. **Strategi Gauls:**
   - Defense terbaik
   - Trapper = tangkap enemy troops
   - Merchant tercepat

### Jadwal Harian:
```
☀️ Pagi:
  - Check resource (upgrade kalau penuh)
  - Check building queue
  - Check troops training
  
🌅 Siang:
  - Check attacks/reports
  - Kirim merchant ke marketplace
  - Hero adventure
  
🌙 Malam:
  - Setup long build queues
  - Plan attacks besok
  - Check alliance chat
```

## 🎯 Tujuan Game

### Short Term:
- 🏘️ Expand ke 2-3 village dalam seminggu
- 👥 Join alliance aktif
- 💰 Kumpulkan resource untuk settlers

### Mid Term:
- ⚔️ Mulai raiding players/oasis
- 🎖️ Dapatkan medals
- 🏛️ Build Wonder of World plans

### End Game:
- 🏆 Build Wonder of World level 100
- 🥇 Jadi top player/alliance
- 🎖️ Kumpulkan artifacts

## 📞 Bantuan & Support

**Tools Admin:**
- Admin Panel: http://localhost:8090/Admin
- phpMyAdmin: http://localhost:8081
- Monitor: http://localhost:8092

**Command Server:**
```bash
./travian.sh status    # Check status
./travian.sh logs      # Lihat logs
./travian.sh backup    # Backup data
```

---

## 🎮 SELAMAT BERMAIN! ⚔️

**Tips terakhir:**
- Travian adalah game strategi jangka panjang
- Sabar dan konsisten dalam build
- Rajin-rajin check game
- Komunikasi dengan alliance itu penting!

**Semoga sukses membangun imperiummu!** 🏰
