#!/bin/bash
# Travian Server Complete Setup Script
# Run this script to set up everything automatically

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}"
cat << "EOF"
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   ████████╗██████╗  █████╗ ██╗   ██╗██╗ █████╗ ███╗   ██╗       ║
║   ╚══██╔══╝██╔══██╗██╔══██╗██║   ██║██║██╔══██╗████╗  ██║       ║
║      ██║   ██████╔╝███████║██║   ██║██║███████║██╔██╗ ██║       ║
║      ██║   ██╔══██╗██╔══██║╚██╗ ██╔╝██║██╔══██║██║╚██╗██║       ║
║      ██║   ██║  ██║██║  ██║ ╚████╔╝ ██║██║  ██║██║ ╚████║       ║
║      ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝       ║
║                                                                  ║
║              COMPLETE SERVER SETUP v8.3.5                        ║
║                                                                  ║
╚══════════════════════════════════════════════════════════════════╝
EOF
echo -e "${NC}"

print_step() {
    echo -e "${BLUE}[Step $1/10]${NC} $2"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

# Step 1: Check Prerequisites
print_step "1" "Checking prerequisites..."

if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed! Please install Docker Desktop first."
    exit 1
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed!"
    exit 1
fi

DOCKER_VERSION=$(docker --version | awk '{print $3}' | sed 's/,//')
COMPOSE_VERSION=$(docker-compose --version | awk '{print $3}' | sed 's/,//')

print_success "Docker: $DOCKER_VERSION"
print_success "Docker Compose: $COMPOSE_VERSION"

# Step 2: Create Directory Structure
print_step "2" "Creating directory structure..."

mkdir -p logs/{apache,cron,game} backups monitor docker/cron sql scripts var
chmod +x scripts/*.sh travian.sh auto_install.sh 2>/dev/null || true

print_success "Directories created"

# Step 3: Check for existing installation
print_step "3" "Checking for existing installation..."

if [ -f "var/installed" ]; then
    print_warning "Existing installation detected!"
    read -p "Do you want to reset all data? (y/N): " reset
    if [[ $reset =~ ^[Yy]$ ]]; then
        echo "Removing old data..."
        docker-compose down -v 2>/dev/null || true
        rm -rf var/* logs/* backups/*
        print_success "Old data removed"
    else
        print_warning "Keeping existing data"
    fi
fi

# Step 4: Build and Start Containers
print_step "4" "Building and starting containers..."

docker-compose up -d --build

if [ $? -eq 0 ]; then
    print_success "Containers started successfully"
else
    print_error "Failed to start containers"
    exit 1
fi

# Step 5: Wait for Database
print_step "5" "Waiting for database to be ready..."

RETRIES=30
while [ $RETRIES -gt 0 ]; do
    if docker-compose exec -T travian-db mysql -uroot -ptravianroot123 -e "SELECT 1" &>/dev/null; then
        print_success "Database is ready"
        break
    fi
    echo -n "."
    sleep 2
    RETRIES=$((RETRIES - 1))
done

if [ $RETRIES -eq 0 ]; then
    print_error "Database failed to start"
    exit 1
fi

# Step 6: Initialize Database
print_step "6" "Initializing database..."

docker-compose exec -T travian-db mysql -uroot -ptravianroot123 travian < sql/01_init.sql 2>/dev/null || true

print_success "Database initialized"

# Step 7: Check Installation
print_step "7" "Checking game installation..."

if [ ! -f "var/installed" ]; then
    print_warning "Game not installed yet. Running auto-installer..."
    sleep 5
    ./auto_install.sh
fi

print_success "Game is installed"

# Step 8: Verify Services
print_step "8" "Verifying services..."

SERVICES=("travian-web" "travian-db" "travian-cron" "travian-redis" "travian-mail")
for service in "${SERVICES[@]}"; do
    if docker-compose ps | grep -q "$service"; then
        print_success "$service is running"
    else
        print_error "$service is not running"
    fi
done

# Step 9: Health Check
print_step "9" "Performing health checks..."

# Check web server
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:8090/ 2>/dev/null || echo "000")
if [ "$HTTP_STATUS" = "200" ] || [ "$HTTP_STATUS" = "302" ]; then
    print_success "Web server is responding (HTTP $HTTP_STATUS)"
else
    print_warning "Web server returned HTTP $HTTP_STATUS"
fi

# Check database
docker-compose exec -T travian-db mysql -utravian -ptravian123 -e "SELECT 1 FROM DUAL" &>/dev/null
if [ $? -eq 0 ]; then
    print_success "Database connection OK"
else
    print_error "Database connection failed"
fi

# Check Redis
docker-compose exec -T travian-redis redis-cli ping &>/dev/null
if [ $? -eq 0 ]; then
    print_success "Redis cache OK"
else
    print_warning "Redis check failed"
fi

# Step 10: Display Summary
print_step "10" "Setup complete! Displaying summary..."

echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}                    🎉 SETUP COMPLETE! 🎉${NC}"
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${YELLOW}🔗 Access URLs:${NC}"
echo -e "   ${GREEN}🎮 Game:${NC}       http://localhost:8090"
echo -e "   ${GREEN}⚙️  Admin:${NC}      http://localhost:8090/Admin"
echo -e "   ${GREEN}🗄️  Database:${NC}  http://localhost:8081"
echo -e "   ${GREEN}📧 Mail:${NC}       http://localhost:8091"
echo -e "   ${GREEN}📊 Monitor:${NC}    http://localhost:8092"
echo ""
echo -e "${YELLOW}👤 Default Login:${NC}"
echo -e "   Username: ${CYAN}admin${NC}"
echo -e "   Password: ${CYAN}admin123${NC}"
echo ""
echo -e "${YELLOW}📁 Management Commands:${NC}"
echo -e "   ${CYAN}./travian.sh${NC}           - Show menu"
echo -e "   ${CYAN}./travian.sh start${NC}     - Start server"
echo -e "   ${CYAN}./travian.sh stop${NC}      - Stop server"
echo -e "   ${CYAN}./travian.sh status${NC}    - Check status"
echo -e "   ${CYAN}./travian.sh backup${NC}    - Create backup"
echo -e "   ${CYAN}make help${NC}              - Show Makefile commands"
echo ""
echo -e "${YELLOW}🛠️  Quick Actions:${NC}"
echo -e "   View logs:   ${CYAN}docker-compose logs -f${NC}"
echo -e "   Shell access: ${CYAN}./travian.sh shell${NC}"
echo -e "   Database:    ${CYAN}./travian.sh shell travian-db${NC}"
echo ""
echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
print_success "Enjoy your Travian server!"
echo ""

# Save setup info
cat > setup_info.txt << EOF
Travian Server Setup Information
================================

Setup Date: $(date)
Version: 8.3.5
Docker Version: $DOCKER_VERSION
Docker Compose Version: $COMPOSE_VERSION

Access URLs:
- Game: http://localhost:8090
- Admin: http://localhost:8090/Admin
- phpMyAdmin: http://localhost:8081
- MailHog: http://localhost:8091
- Monitor: http://localhost:8092

Default Accounts:
- Admin: admin / admin123
- Database: travian / travian123
- Database Root: travianroot123

Services:
- travian-web (PHP 7.4 + Apache)
- travian-db (MariaDB 10.6)
- travian-cron (Automation)
- travian-redis (Cache)
- travian-mail (MailHog)

Management:
- ./travian.sh [command]
- make [command]
- docker-compose [command]

Documentation:
- README-ADVANCED.md (Complete guide)
- This file (setup_info.txt)
EOF

print_success "Setup information saved to setup_info.txt"
echo ""
