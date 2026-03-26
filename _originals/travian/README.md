# 🏛️ Travian Server - Complete Local Setup

A production-ready, fully-featured Travian game server running locally on your machine with Docker. Includes automation, monitoring, backup systems, and all game features.

![Travian Server](https://img.shields.io/badge/Travian-v8.3.5-blue)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)
![PHP](https://img.shields.io/badge/PHP-7.4-777BB4?logo=php)
![MariaDB](https://img.shields.io/badge/MariaDB-10.6-003545?logo=mariadb)

## 🎮 Features

### Core Game Features
- ✅ **5 Tribes**: Romans, Teutons, Gauls, Egyptians, Huns
- ✅ **Resource System**: Wood, Clay, Iron, Crop with realistic production
- ✅ **Building System**: All buildings with upgrade queues
- ✅ **Troop Training**: All units with training queues
- ✅ **Combat System**: Attacks, defenses, reinforcements, raids
- ✅ **Market System**: Resource trading between players
- ✅ **Alliance System**: Create/join alliances with forums
- ✅ **Hero System**: Adventures, equipment, experience gain
- ✅ **Artifacts**: Special powers and bonuses
- ✅ **Wonder of World**: End-game WW race with Natars
- ✅ **Medals**: Weekly rankings and rewards
- ✅ **Quest System**: Tutorial and daily tasks

### Infrastructure Features
- 🐳 **Docker Containerization**: Full isolated container stack
- 🔄 **Game Automation**: Cron jobs for all game mechanics
- 💾 **Automated Backups**: Every 6 hours with 7-day retention
- 📊 **Monitoring Dashboard**: Real-time web-based monitoring
- 💌 **Mail Server**: Built-in MailHog for email testing
- ⚡ **Redis Caching**: Performance optimization
- 🗄️ **Database Admin**: phpMyAdmin included
- 🛡️ **Security**: Hardened configuration
- 📱 **Cross-Platform**: Works on macOS, Linux, Windows

## 🚀 Quick Start

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) 4.0+
- Git (optional, for updates)

### macOS / Linux
```bash
cd travian
./setup.sh
```

### Windows
```powershell
cd travian
.\travian.ps1 start
# or
travian.bat start
```

### Access Your Server
| Service | URL |
|---------|-----|
| 🎮 **Game** | http://localhost:8090 |
| ⚙️ **Admin** | http://localhost:8090/Admin |
| 🗄️ **Database** | http://localhost:8081 |
| 📧 **Mail** | http://localhost:8091 |
| 📊 **Monitor** | http://localhost:8092 |

**Default Login:** `admin` / `admin123`

## 📋 Management Commands

### Universal (Shell/Bash)
```bash
./travian.sh start      # Start server
./travian.sh stop       # Stop server
./travian.sh restart    # Restart server
./travian.sh status     # Check status
./travian.sh logs       # View logs
./travian.sh backup     # Create backup
./travian.sh restore    # Restore backup
./travian.sh shell      # Open container shell
./travian.sh update     # Update to latest
```

### Using Makefile
```bash
make start      # Start server
make stop       # Stop server
make restart    # Restart server
make status     # Check status
make backup     # Create backup
make monitor    # Open monitoring
make help       # Show all commands
```

### Windows PowerShell
```powershell
.\travian.ps1 start
.\travian.ps1 stop
.\travian.ps1 status
```

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

## ⚙️ Automation System

The server runs automated tasks every minute:

| Script | Frequency | Description |
|--------|-----------|-------------|
| `resources.sh` | Every minute | Resource production |
| `buildings.sh` | Every 30s | Building completion |
| `training.sh` | Every 15s | Troop training |
| `movements.sh` | Every 10s | Attack/reinforcement processing |
| `market.sh` | Every minute | Trade delivery |
| `artifacts.sh` | Every 5 min | Artifact management |
| `natars.sh` | Every 10 min | NPC activity |
| `medals.sh` | Daily | Weekly awards |
| `statistics.sh` | Hourly | Rankings update |
| `backup.sh` | Every 6 hours | Auto-backup |
| `cleanup.sh` | Hourly | Database optimization |

## 💾 Backup & Restore

### Automatic Backups
Backups are created every 6 hours:
```
backups/
├── travian_db_20260101_120000.sql.gz
├── travian_files_20260101_120000.tar.gz
└── backup_20260101_120000.manifest
```

### Manual Backup
```bash
./travian.sh backup
# or
make backup
```

### Restore
```bash
./travian.sh restore
# Then select backup file
```

## 🔐 Default Credentials

| Service | Username | Password |
|---------|----------|----------|
| Game Admin | `admin` | `admin123` |
| Database | `travian` | `travian123` |
| Database Root | `root` | `travianroot123` |
| MultiHunter | `Multihunter` | `multihunter123` |
| Support | `Support` | `support123` |

**⚠️ Change these after first login!**

## 📊 Monitoring

Visit http://localhost:8092 for real-time monitoring:
- Server status
- Player statistics
- Resource usage
- Activity logs
- Quick links

## 🔧 Configuration

### Game Settings
Edit `GameEngine/config.php`:
```php
define("SPEED", "1");              // Game speed (1, 3, 5)
define("WORLD_MAX", "200");        // Map size (100-400)
define("TRADERCAP", "1");          // Merchant capacity
```

### Docker Settings
Edit `.env` file to change:
- Port numbers
- Database passwords
- Backup retention

## 🐛 Troubleshooting

### Server won't start
```bash
# Check logs
./travian.sh logs

# Restart with rebuild
./travian.sh stop
docker-compose build --no-cache
./travian.sh start
```

### Database issues
```bash
# Reset database
./travian.sh reset
# or manually
docker-compose down -v
./travian.sh start
```

### Performance issues
1. Check Redis: `docker-compose ps`
2. Monitor resources: http://localhost:8092
3. Clean logs: `make clean`

## 📁 Directory Structure

```
travian/
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Web server image
├── Dockerfile.cron        # Cron job image
├── .env                   # Environment variables
├── travian.sh             # Linux/Mac management script
├── travian.ps1            # Windows PowerShell script
├── travian.bat            # Windows batch script
├── setup.sh               # One-click setup
├── Makefile               # Make commands
├── README.md              # This file
├── README-ADVANCED.md     # Detailed documentation
├── GameEngine/            # Core game files
├── Admin/                 # Admin panel
├── install/               # Installation files
├── scripts/               # Automation scripts
│   ├── resources.sh
│   ├── buildings.sh
│   ├── training.sh
│   ├── movements.sh
│   ├── market.sh
│   ├── backup.sh
│   └── ...
├── docker/                # Docker configs
│   └── cron/
├── monitor/               # Monitoring dashboard
├── backups/               # Backup storage
├── logs/                  # Log files
└── sql/                   # SQL initialization
```

## 🎯 Game Mechanics

### Resource Production
- Fields generate resources every minute
- Production rate based on field level
- Storage limited by warehouse/granary
- Crop consumption by troops

### Building Queue
- 1 building at a time (2 with Plus)
- Construction time based on level
- Master builder for queueing

### Combat System
- **Attack**: Troops fight and return
- **Raid**: Plunder resources
- **Reinforcement**: Troops stay in target village
- **Return**: Surviving troops return home

### Troop Training
- Queue system in barracks/stable/workshop
- Training time varies by unit
- Resources consumed on start

## 🌟 Advanced Features

### Redis Caching
- Session storage
- Game state cache
- Performance boost

### Mail Server
- Test emails at http://localhost:8091
- All game emails captured
- No real emails sent

### Security
- Isolated containers
- Non-root execution
- Secure defaults

## 🤝 Support

For issues:
1. Check logs: `./travian.sh logs`
2. Read [README-ADVANCED.md](README-ADVANCED.md)
3. Check Docker status: `docker-compose ps`
4. Review setup info: `cat setup_info.txt`

## 📜 License

TravianZ - Open Source Travian Clone
Based on original TravianX project

## 🙏 Credits

- **TravianZ Team**: Original developers
- **TravianX Project**: Base code
- **Docker Community**: Containerization
- **You**: For playing! 🎮

---

**Enjoy your Travian server!** ⚔️🏰
