# 🏛️ Travian Server - Advanced Setup Guide

Complete, production-ready Travian server setup with Docker, automation, monitoring, and all game features.

## 📋 Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Management Commands](#management-commands)
- [Game Features](#game-features)
- [Automation System](#automation-system)
- [Backup & Restore](#backup--restore)
- [Monitoring](#monitoring)
- [Security](#security)
- [Troubleshooting](#troubleshooting)

## ✨ Features

### Core Game Features
- ✅ **5 Tribes**: Romans, Teutons, Gauls, Egyptians, Huns
- ✅ **Resource System**: Wood, Clay, Iron, Crop with production calculations
- ✅ **Building System**: All buildings with upgrade queues
- ✅ **Troop Training**: All units with training queues
- ✅ **Combat System**: Attacks, defenses, reinforcements
- ✅ **Market System**: Resource trading between players
- ✅ **Alliance System**: Create/join alliances, forums
- ✅ **Hero System**: Adventures, equipment, experience
- ✅ **Artifacts**: Special powers and bonuses
- ✅ **Wonder of World**: End-game WW race
- ✅ **Natars**: NPC tribe with WW villages
- ✅ **Medals**: Weekly rankings and rewards
- ✅ **Quest System**: Tutorial and tasks

### Infrastructure Features
- 🐳 **Docker Containerization**: Full container stack
- 🔄 **Automation**: Cron jobs for all game mechanics
- 💾 **Automated Backups**: Every 6 hours with 7-day retention
- 📊 **Monitoring Dashboard**: Real-time server status
- 💌 **Mail Server**: Email testing with MailHog
- ⚡ **Redis Caching**: Performance optimization
- 🗄️ **Database Admin**: phpMyAdmin included

## 🚀 Quick Start

### Prerequisites
- Docker Desktop 4.0+
- Docker Compose 2.0+
- Git (optional)

### Installation

```bash
# 1. Navigate to the travian directory
cd travian

# 2. Start the server
./travian.sh start

# 3. Access the game
open http://localhost:8090
```

### Default Login
- **Admin Username**: `admin`
- **Admin Password**: `admin123`
- **Admin Panel**: http://localhost:8090/Admin

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Travian Server Stack                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   travian    │  │   travian    │  │   travian    │       │
│  │     -web     │  │    -cron     │  │    -mail     │       │
│  │  (PHP+Apache)│  │ (Automation) │  │   (MailHog)  │       │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│         │                 │                 │               │
│         └────────┬────────┴────────┬────────┘               │
│                  │                 │                        │
│         ┌────────▼────────┐ ┌──────▼────────┐               │
│         │  travian-redis  │ │  travian-db   │               │
│         │    (Cache)      │ │  (MariaDB)    │               │
│         └─────────────────┘ └───────────────┘               │
│                                                              │
│  Ports: 8090 (Game), 8081 (DB), 8091 (Mail), 8092 (Monitor) │
└─────────────────────────────────────────────────────────────┘
```

## 🎮 Management Commands

```bash
# Start server
./travian.sh start

# Stop server
./travian.sh stop

# Restart server
./travian.sh restart

# Check status
./travian.sh status

# View logs
./travian.sh logs
./travian.sh logs travian-db    # specific service

# Create backup
./travian.sh backup

# Restore backup
./travian.sh restore

# Shell access
./travian.sh shell              # web container
./travian.sh shell travian-db   # database container

# Update server
./travian.sh update
```

## ⚙️ Automation System

The server runs automated tasks every minute to simulate game mechanics:

| Script | Frequency | Description |
|--------|-----------|-------------|
| `resources.sh` | Every minute | Resource production for all villages |
| `buildings.sh` | Every 30s | Building completion queue |
| `training.sh` | Every 15s | Troop training queue |
| `movements.sh` | Every 10s | Attack/reinforcement/return processing |
| `market.sh` | Every minute | Trade delivery |
| `artifacts.sh` | Every 5 min | Artifact spawn and capture |
| `natars.sh` | Every 10 min | Natars NPC activity |
| `medals.sh` | Daily | Weekly medal awards |
| `statistics.sh` | Hourly | Rankings update |
| `backup.sh` | Every 6 hours | Automated backup |
| `cleanup.sh` | Hourly | Database optimization |
| `daily_maintenance.sh` | Daily 00:05 | Daily tasks |

## 💾 Backup & Restore

### Automatic Backups
Backups are created every 6 hours and stored in `backups/`:
- Database dump (`.sql.gz`)
- Game files (`.tar.gz`)
- Backup manifest (`.manifest`)

Retention: 7 days (automatic cleanup)

### Manual Backup
```bash
./travian.sh backup
```

### Restore
```bash
./travian.sh restore
# Then enter backup filename when prompted
```

## 📊 Monitoring

Access monitoring dashboard at: http://localhost:8092

Features:
- Real-time server status
- Player statistics
- Resource usage
- Recent activity log
- Quick access links

## 🔐 Security

### Default Credentials
```
Database:
  Root: travianroot123
  User: travian / travian123

Admin:
  admin / admin123

MultiHunter:
  Multihunter / multihunter123

Support:
  Support / support123
```

### Production Security
1. Change default passwords
2. Disable install folder after setup
3. Use HTTPS (configure reverse proxy)
4. Enable firewall rules
5. Regular backups

## 🔧 Troubleshooting

### Server won't start
```bash
# Check logs
./travian.sh logs

# Restart with rebuild
./travian.sh stop
docker-compose build --no-cache
./travian.sh start
```

### Database connection error
```bash
# Reset database
docker-compose down -v
./travian.sh start
```

### Performance issues
1. Check Redis is running: `./travian.sh status`
2. Monitor resources: http://localhost:8092
3. Clean old logs: `./travian.sh shell travian-cron` → `find /var/log/cron -name "*.log" -delete`

### Reset everything
```bash
./travian.sh reset
```

## 📝 Configuration

### Game Settings
Edit `GameEngine/config.php`:
```php
define("SPEED", "1");              // Game speed (1, 3, 5, etc.)
define("WORLD_MAX", "200");        // Map size (100-400)
define("TRADERCAP", "1");          // Merchant capacity multiplier
```

### Docker Configuration
Edit `docker-compose.yml` to change:
- Port mappings
- Memory limits
- Database settings

## 🌐 Access URLs

| Service | URL | Description |
|---------|-----|-------------|
| Game | http://localhost:8090 | Main game interface |
| Admin | http://localhost:8090/Admin | Admin panel |
| phpMyAdmin | http://localhost:8081 | Database management |
| Mail | http://localhost:8091 | MailHog email testing |
| Monitor | http://localhost:8092 | Server monitoring |

## 📊 Database Schema

Key tables:
- `s1_users` - Player accounts
- `s1_vdata` - Village data
- `s1_fdata` - Field/building levels
- `s1_units` - Troop counts
- `s1_movements` - Troop movements
- `s1_market` - Trade offers
- `s1_alidata` - Alliances
- `s1_hero` - Hero data
- `s1_artefacts` - Artifacts
- `s1_bdata` - Build queue
- `s1_training` - Training queue

## 🎓 Game Mechanics

### Resource Production
- Wood/Clay/Iron/Crop fields generate resources every minute
- Production depends on field level
- Storage limited by warehouse/granary

### Building Queue
- Max 1 building at a time (2 with Plus)
- Construction time based on level and speed
- Master builder allows queueing

### Combat
- Attack: Troops fight and return if survive
- Reinforcement: Troops stay in target village
- Raid: Plunder resources, troops return

### Training
- Training time based on unit type
- Barracks/Stable/Workshop for different units
- Queue allows multiple trainings

## 🤝 Support

For issues and questions:
1. Check logs: `./travian.sh logs`
2. Review documentation
3. Check GitHub issues
4. Join Discord community

---

**Version**: 8.3.5 | **License**: GPL | **Author**: TravianZ Community
