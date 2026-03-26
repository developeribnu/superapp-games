#!/bin/bash
# Travian Server Management Script
# Usage: ./travian.sh [start|stop|restart|status|backup|restore|logs|shell|update]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

COMPOSE="docker-compose"
GAME_URL="http://localhost:8090"
ADMIN_URL="http://localhost:8090/Admin"
PHPMYADMIN_URL="http://localhost:8081"
MAIL_URL="http://localhost:8091"
MONITOR_URL="http://localhost:8092"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_banner() {
    echo -e "${BLUE}"
    echo "╔══════════════════════════════════════════════════════════════╗"
    echo "║                    TRAVIAN SERVER MANAGER                    ║"
    echo "║                        Version 8.3.5                         ║"
    echo "╚══════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
}

print_status() {
    echo -e "${GREEN}[✓]${NC} $1"
}

print_error() {
    echo -e "${RED}[✗]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[!]${NC} $1"
}

start_server() {
    print_banner
    echo "Starting Travian Server..."
    echo ""
    
    # Check if already running
    if $COMPOSE ps | grep -q "travian-web"; then
        print_warning "Server is already running!"
        show_status
        return
    fi
    
    # Create necessary directories
    mkdir -p logs/{apache,cron,game} backups monitor
    
    # Start containers
    $COMPOSE up -d --build
    
    echo ""
    print_status "Server started successfully!"
    echo ""
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${GREEN}🎮 Game:${NC}       $GAME_URL"
    echo -e "${GREEN}⚙️  Admin:${NC}      $ADMIN_URL"
    echo -e "${GREEN}🗄️  Database:${NC}  $PHPMYADMIN_URL"
    echo -e "${GREEN}📧 Mail:${NC}       $MAIL_URL"
    echo -e "${GREEN}📊 Monitor:${NC}    $MONITOR_URL"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo ""
    echo "Default Admin Login:"
    echo "  Username: admin"
    echo "  Password: admin123"
    echo ""
}

stop_server() {
    echo "Stopping Travian Server..."
    $COMPOSE down
    print_status "Server stopped"
}

restart_server() {
    echo "Restarting Travian Server..."
    $COMPOSE restart
    print_status "Server restarted"
    show_status
}

show_status() {
    print_banner
    echo "Server Status:"
    echo ""
    
    if $COMPOSE ps | grep -q "travian-web"; then
        $COMPOSE ps --format "table {{.Name}}\t{{.Status}}\t{{.Ports}}"
        echo ""
        print_status "All services are running"
    else
        print_error "Server is not running"
        echo ""
        echo "Start the server with: ./travian.sh start"
    fi
}

show_logs() {
    local service="${1:-}"
    if [ -z "$service" ]; then
        echo "Showing all logs (Ctrl+C to exit)..."
        $COMPOSE logs -f
    else
        echo "Showing logs for $service (Ctrl+C to exit)..."
        $COMPOSE logs -f "$service"
    fi
}

backup_data() {
    print_banner
    echo "Creating backup..."
    echo ""
    
    mkdir -p backups
    BACKUP_DATE=$(date +%Y%m%d_%H%M%S)
    
    # Database backup
    $COMPOSE exec -T travian-db mysqldump -uroot -ptravianroot123 travian | gzip > "backups/travian_backup_$BACKUP_DATE.sql.gz"
    print_status "Database backup created: backups/travian_backup_$BACKUP_DATE.sql.gz"
    
    # Files backup
    tar -czf "backups/travian_files_$BACKUP_DATE.tar.gz" --exclude='backups' --exclude='logs' --exclude='.git' .
    print_status "Files backup created: backups/travian_files_$BACKUP_DATE.tar.gz"
    
    echo ""
    print_status "Backup completed successfully!"
}

restore_backup() {
    print_banner
    echo "Available backups:"
    ls -lh backups/*.sql.gz 2>/dev/null | awk '{print "  " $9 " (" $5 ")"}' || echo "  No backups found"
    echo ""
    
    read -p "Enter backup filename to restore (e.g., travian_backup_20260101_120000.sql.gz): " backup_file
    
    if [ -f "backups/$backup_file" ]; then
        print_warning "This will overwrite current data. Are you sure? (y/N)"
        read -r confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            echo "Restoring backup..."
            gunzip < "backups/$backup_file" | $COMPOSE exec -T travian-db mysql -uroot -ptravianroot123 travian
            print_status "Backup restored successfully!"
        else
            echo "Restore cancelled"
        fi
    else
        print_error "Backup file not found!"
    fi
}

shell_access() {
    local service="${1:-travian-web}"
    echo "Opening shell in $service container..."
    $COMPOSE exec "$service" /bin/bash
}

update_game() {
    print_banner
    echo "Updating Travian Server..."
    echo ""
    
    print_warning "This will pull latest updates. Continue? (y/N)"
    read -r confirm
    if [[ $confirm =~ ^[Yy]$ ]]; then
        git pull
        $COMPOSE build --no-cache
        $COMPOSE up -d
        print_status "Update completed!"
    else
        echo "Update cancelled"
    fi
}

reset_server() {
    print_banner
    print_warning "⚠️  WARNING: This will DELETE all game data!"
    echo ""
    read -p "Type 'DELETE' to confirm: " confirm
    
    if [ "$confirm" == "DELETE" ]; then
        echo "Stopping server..."
        $COMPOSE down -v
        echo "Removing data..."
        rm -rf var/* logs/*
        echo "Starting fresh..."
        $COMPOSE up -d
        print_status "Server reset completed. Visit http://localhost:8090/install to reconfigure."
    else
        echo "Reset cancelled"
    fi
}

# Main command handler
case "${1:-}" in
    start)
        start_server
        ;;
    stop)
        stop_server
        ;;
    restart)
        restart_server
        ;;
    status)
        show_status
        ;;
    logs)
        show_logs "$2"
        ;;
    backup)
        backup_data
        ;;
    restore)
        restore_backup
        ;;
    shell)
        shell_access "$2"
        ;;
    update)
        update_game
        ;;
    reset)
        reset_server
        ;;
    help|--help|-h)
        print_banner
        echo "Usage: ./travian.sh [COMMAND] [OPTIONS]"
        echo ""
        echo "Commands:"
        echo "  start              Start the Travian server"
        echo "  stop               Stop the Travian server"
        echo "  restart            Restart the Travian server"
        echo "  status             Show server status"
        echo "  logs [service]     Show logs (optional: service name)"
        echo "  backup             Create database and files backup"
        echo "  restore            Restore from backup"
        echo "  shell [service]    Open shell in container (default: travian-web)"
        echo "  update             Update to latest version"
        echo "  reset              ⚠️  Delete all data and start fresh"
        echo "  help               Show this help message"
        echo ""
        echo "Services:"
        echo "  travian-web        Web server (PHP + Apache)"
        echo "  travian-db         Database (MariaDB)"
        echo "  travian-cron       Cron job runner"
        echo "  travian-redis      Cache server (Redis)"
        echo "  travian-mail       Mail server (MailHog)"
        echo ""
        ;;
    *)
        print_banner
        echo "Welcome to Travian Server Manager!"
        echo ""
        echo "Quick Start:"
        echo "  1. Start server:   ./travian.sh start"
        echo "  2. View status:    ./travian.sh status"
        echo "  3. View logs:      ./travian.sh logs"
        echo "  4. Stop server:    ./travian.sh stop"
        echo ""
        echo "For more options: ./travian.sh help"
        echo ""
        ;;
esac
