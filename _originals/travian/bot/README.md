# 🤖 Travian Local Bot

Bot otomatis untuk Travian Local Server (LEGAL - hanya untuk server sendiri!)

## ✨ Fitur

- ✅ **Auto Upgrade**: Otomatis upgrade resource fields & buildings
- ✅ **Auto Farm**: Kirim pasukan ke oasis secara otomatis
- ✅ **Auto Trade**: Trading di marketplace
- ✅ **Web Dashboard**: Interface web untuk monitoring
- ✅ **Cron Job**: Schedule bot berjalan otomatis

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd bot
./run_bot.sh
```

Atau manual:

```bash
cd bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 2. Run Bot

```bash
# Run sekali
python3 bot.py --mode once

# Run continuous
python3 bot.py --mode continuous

# Start dashboard
python3 dashboard.py
```

### 3. Dashboard

Buka browser: http://localhost:5000

## ⚙️ Konfigurasi

Edit `config/bot_config.json`:

```json
{
  "auto_upgrade": {
    "enabled": true,
    "priority": ["woodcutter", "clay_pit", "iron_mine", "cropland"],
    "min_resources_keep": 100,
    "max_queue": 2
  },
  "auto_farm": {
    "enabled": true,
    "oases_distance": 3,
    "min_troops": 5
  },
  "auto_trade": {
    "enabled": true,
    "threshold": 0.8,
    "min_trade_amount": 100
  }
}
```

## 📊 Dashboard Features

- Real-time resource monitoring
- Bot status indicator
- One-click run/start/stop
- Toggle features on/off
- Log viewer
- Statistics tracking

## 🎯 Usage Examples

### Schedule dengan Cron (macOS/Linux)

```bash
# Edit crontab
crontab -e

# Tambahkan (run setiap 5 menit)
*/5 * * * * cd /path/to/travian/bot && venv/bin/python bot.py --mode once >> logs/cron.log 2>&1
```

### atau gunakan script:

```bash
./run_bot.sh
# Pilih option 4 untuk setup cron
```

## 🛡️ Legal Notice

Bot ini **HANYA** untuk:
- ✅ Server lokal (localhost)
- ✅ Private server
- ✅ Development/testing

**JANGAN** digunakan di:
- ❌ Travian official server
- ❌ Public servers
- ❌ Servers dengan ToS melarang bot

## 📝 Log Files

- `logs/bot.log` - Bot activity log
- `logs/cron.log` - Cron job log

## 🐛 Troubleshooting

### Bot tidak bisa login
- Cek username/password di `bot.py`
- Pastikan server berjalan di `localhost:8090`

### Module not found
```bash
pip install -r requirements.txt
```

### Port 5000 sudah digunakan
```bash
# Ganti port di dashboard.py
app.run(host='0.0.0.0', port=5001)
```

## 🎮 Integrasi dengan Game

Bot otomatis membaca:
- Resource amounts
- Building levels
- Troop counts
- Queue status

Dan otomatis melakukan:
- Upgrade building
- Send troops
- Create trades
- Train troops

## 📈 Tips

1. **Start dengan Resources**: Pastikan cukup resource sebelum enable auto-upgrade
2. **Protection**: Jangan disable beginner's protection terlalu cepat
3. **Balance**: Atur `min_resources_keep` agar tidak habis resource
4. **Monitor**: Cek dashboard secara berkala

## 🔧 Advanced

### Custom Actions

Edit `bot.py` dan tambahkan method baru:

```python
def custom_action(self):
    # Your custom logic
    pass
```

### Webhook Notifications

Tambahkan di `bot.py`:

```python
import requests

def notify_discord(self, message):
    webhook_url = "YOUR_WEBHOOK_URL"
    requests.post(webhook_url, json={"content": message})
```

## 📞 Support

Untuk Travian Local Server issues:
- Check `logs/bot.log`
- Pastikan Docker container running
- Cek koneksi ke `localhost:8090`

---

**Selamat bermain dan botting (di server sendiri)!** 🎉
