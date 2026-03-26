# Travian Server Makefile
# Usage: make [command]

.PHONY: help start stop restart status logs backup restore shell clean update monitor

# Default target
help:
	@echo "╔═══════════════════════════════════════════════════════════╗"
	@echo "║              TRAVIAN SERVER MAKEFILE                       ║"
	@echo "╚═══════════════════════════════════════════════════════════╝"
	@echo ""
	@echo "Available commands:"
	@echo "  make start      - Start the Travian server"
	@echo "  make stop       - Stop the Travian server"
	@echo "  make restart    - Restart the Travian server"
	@echo "  make status     - Show server status"
	@echo "  make logs       - View logs"
	@echo "  make backup     - Create backup"
	@echo "  make restore    - Restore from backup"
	@echo "  make shell      - Open shell in web container"
	@echo "  make clean      - Clean up logs and temporary files"
	@echo "  make update     - Update server"
	@echo "  make monitor    - Open monitoring dashboard"
	@echo "  make install    - First time installation"
	@echo ""
	@echo "URLs:"
	@echo "  Game:      http://localhost:8090"
	@echo "  Admin:     http://localhost:8090/Admin"
	@echo "  Database:  http://localhost:8081"
	@echo "  Mail:      http://localhost:8091"
	@echo "  Monitor:   http://localhost:8092"

# Start server
start:
	@echo "🚀 Starting Travian Server..."
	@./travian.sh start

# Stop server
stop:
	@echo "🛑 Stopping Travian Server..."
	@docker-compose down

# Restart server
restart:
	@echo "🔄 Restarting Travian Server..."
	@docker-compose restart
	@./travian.sh status

# Show status
status:
	@./travian.sh status

# View logs
logs:
	@docker-compose logs -f

# View specific service logs
logs-web:
	@docker-compose logs -f travian-web

logs-db:
	@docker-compose logs -f travian-db

logs-cron:
	@docker-compose logs -f travian-cron

# Create backup
backup:
	@./travian.sh backup

# Restore backup
restore:
	@./travian.sh restore

# Open shell
shell:
	@docker-compose exec travian-web bash

shell-db:
	@docker-compose exec travian-db bash

# Clean up
clean:
	@echo "🧹 Cleaning up..."
	@find logs -name "*.log" -type f -delete 2>/dev/null || true
	@docker system prune -f

# Update
update:
	@./travian.sh update

# Open monitor
monitor:
	@echo "📊 Opening monitoring dashboard..."
	@open http://localhost:8092 || xdg-open http://localhost:8092 || echo "Visit http://localhost:8092"

# First time installation
install:
	@echo "🏛️  Installing Travian Server..."
	@mkdir -p logs backups monitor
	@docker-compose up -d --build
	@echo ""
	@echo "✅ Installation complete!"
	@echo ""
	@echo "Access your server:"
	@echo "  🎮 Game:      http://localhost:8090"
	@echo "  ⚙️  Admin:     http://localhost:8090/Admin"
	@echo "  🗄️  Database:  http://localhost:8081"
	@echo ""
	@echo "Default Admin Login:"
	@echo "  Username: admin"
	@echo "  Password: admin123"

# Reset everything (DANGER)
reset:
	@echo "⚠️  WARNING: This will DELETE all data!"
	@read -p "Type 'DELETE' to confirm: " confirm && [ "$$confirm" = "DELETE" ] && ./travian.sh reset || echo "Cancelled"

# Development mode (with file watching)
dev:
	@docker-compose up -d
	@docker-compose logs -f travian-web

# Database management
db-export:
	@mkdir -p backups
	@docker-compose exec travian-db mysqldump -uroot -ptravianroot123 travian > backups/manual_backup_$(shell date +%Y%m%d_%H%M%S).sql
	@echo "✅ Database exported to backups/"

db-import:
	@ls -1 backups/*.sql | tail -5
	@read -p "Enter SQL file to import: " file && docker-compose exec -T travian-db mysql -uroot -ptravianroot123 travian < $$file

# Performance tuning
tune:
	@echo "🔧 Optimizing database..."
	@docker-compose exec travian-db mysql -uroot -ptravianroot123 -e "OPTIMIZE TABLE s1_vdata, s1_users, s1_movements, s1_bdata, s1_training;"
	@echo "✅ Optimization complete"

# Security scan
security:
	@echo "🔒 Running security checks..."
	@echo "Checking for default passwords..."
	@docker-compose exec travian-db mysql -utravian -ptravian123 -e "SELECT 1" 2>/dev/null && echo "⚠️  Default database password in use!" || echo "✅ Database password changed"
	@echo ""
	@echo "Checking file permissions..."
	@ls -la GameEngine/config.php | grep -q "rw-r--r--" && echo "✅ Config file permissions OK" || echo "⚠️  Check config file permissions"

# Generate report
report:
	@echo "📊 Generating server report..."
	@echo "Server Status:" > report.txt
	@docker-compose ps >> report.txt
	@echo "" >> report.txt
	@echo "Disk Usage:" >> report.txt
	@du -sh . >> report.txt
	@echo "" >> report.txt
	@echo "Container Stats:" >> report.txt
	@docker stats --no-stream travian-web travian-db travian-cron >> report.txt 2>/dev/null || echo "Containers not running" >> report.txt
	@echo "✅ Report saved to report.txt"
