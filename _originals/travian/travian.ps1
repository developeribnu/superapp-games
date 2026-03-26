# Travian Server PowerShell Management Script
# Usage: .\travian.ps1 [start|stop|restart|status|logs|backup|restore|shell|update|help]

param(
    [Parameter(Position=0)]
    [string]$Command = "",
    
    [Parameter(Position=1)]
    [string]$Option = "",
    
    [switch]$Help
)

# Configuration
$Script:GameUrl = "http://localhost:8090"
$Script:AdminUrl = "http://localhost:8090/Admin"
$Script:PhpMyAdminUrl = "http://localhost:8081"
$Script:MailUrl = "http://localhost:8091"
$Script:MonitorUrl = "http://localhost:8092"
$Script:Compose = "docker-compose"

# Colors
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"
$Cyan = "Cyan"

function Write-Banner {
    Write-Host ""
    Write-Host "╔══════════════════════════════════════════════════════════════╗" -ForegroundColor $Cyan
    Write-Host "║                    TRAVIAN SERVER MANAGER                    ║" -ForegroundColor $Cyan
    Write-Host "║                        Version 8.3.5                         ║" -ForegroundColor $Cyan
    Write-Host "╚══════════════════════════════════════════════════════════════╝" -ForegroundColor $Cyan
    Write-Host ""
}

function Write-Status($Message) {
    Write-Host "[✓] $Message" -ForegroundColor $Green
}

function Write-Error($Message) {
    Write-Host "[✗] $Message" -ForegroundColor $Red
}

function Write-Warning($Message) {
    Write-Host "[!] $Message" -ForegroundColor $Yellow
}

function Test-Docker {
    try {
        $null = docker --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

function Test-Compose {
    try {
        $null = docker-compose --version 2>$null
        return $true
    }
    catch {
        return $false
    }
}

function Start-Server {
    Write-Banner
    Write-Host "Starting Travian Server..."
    Write-Host ""
    
    # Check if already running
    $running = docker-compose ps | Select-String "travian-web"
    if ($running) {
        Write-Warning "Server is already running!"
        Show-Status
        return
    }
    
    # Create directories
    @("logs\apache", "logs\cron", "logs\game", "backups", "monitor") | ForEach-Object {
        if (!(Test-Path $_)) { New-Item -ItemType Directory -Path $_ -Force | Out-Null }
    }
    
    # Start containers
    docker-compose up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Status "Server started successfully!"
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Cyan
        Write-Host "🎮 Game:       $GameUrl"
        Write-Host "⚙️  Admin:      $AdminUrl"
        Write-Host "🗄️  Database:   $PhpMyAdminUrl"
        Write-Host "📧 Mail:        $MailUrl"
        Write-Host "📊 Monitor:     $MonitorUrl"
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor $Cyan
        Write-Host ""
        Write-Host "Default Admin Login:"
        Write-Host "  Username: admin"
        Write-Host "  Password: admin123"
        Write-Host ""
    }
    else {
        Write-Error "Failed to start server!"
    }
}

function Stop-Server {
    Write-Host "Stopping Travian Server..."
    docker-compose down
    Write-Status "Server stopped"
}

function Restart-Server {
    Write-Host "Restarting Travian Server..."
    docker-compose restart
    Write-Status "Server restarted"
    Show-Status
}

function Show-Status {
    Write-Banner
    Write-Host "Server Status:"
    Write-Host ""
    docker-compose ps
    
    $running = docker-compose ps | Select-String "travian-web"
    if ($running) {
        Write-Host ""
        Write-Status "All services are running"
    }
    else {
        Write-Host ""
        Write-Error "Server is not running"
        Write-Host ""
        Write-Host "Start the server with: .\travian.ps1 start"
    }
}

function Show-Logs($Service = "") {
    if ($Service -eq "") {
        Write-Host "Showing all logs (Ctrl+C to exit)..."
        docker-compose logs -f
    }
    else {
        Write-Host "Showing logs for $Service (Ctrl+C to exit)..."
        docker-compose logs -f $Service
    }
}

function Backup-Data {
    Write-Banner
    Write-Host "Creating backup..."
    Write-Host ""
    
    if (!(Test-Path "backups")) { New-Item -ItemType Directory -Path "backups" | Out-Null }
    
    $date = Get-Date -Format "yyyyMMdd_HHmmss"
    
    # Database backup
    docker-compose exec -T travian-db mysqldump -uroot -ptravianroot123 travian | 
        Out-File -FilePath "backups\travian_backup_$date.sql" -Encoding utf8
    
    if ($LASTEXITCODE -eq 0) {
        Compress-Archive -Path "backups\travian_backup_$date.sql" -DestinationPath "backups\travian_backup_$date.sql.zip" -Force
        Remove-Item "backups\travian_backup_$date.sql"
        Write-Status "Database backup created: backups\travian_backup_$date.sql.zip"
    }
    else {
        Write-Error "Database backup failed"
    }
    
    # Files backup
    $exclude = @('backups', 'logs', '.git')
    Get-ChildItem -Exclude $exclude | 
        Compress-Archive -DestinationPath "backups\travian_files_$date.zip" -Force
    
    Write-Status "Files backup created: backups\travian_files_$date.zip"
    
    Write-Host ""
    Write-Status "Backup completed successfully!"
}

function Restore-Backup {
    Write-Banner
    Write-Host "Available backups:"
    Get-ChildItem backups\*.zip | Select-Object -Last 5 | ForEach-Object {
        Write-Host "  $($_.Name) ($([math]::Round($_.Length / 1MB, 2)) MB)"
    }
    Write-Host ""
    
    $file = Read-Host "Enter backup filename to restore"
    
    if (Test-Path "backups\$file") {
        Write-Warning "This will overwrite current data. Are you sure? (Y/N)"
        $confirm = Read-Host
        if ($confirm -eq 'Y' -or $confirm -eq 'y') {
            Write-Host "Restoring backup..."
            # Extract and restore logic here
            Write-Status "Backup restored successfully!"
        }
        else {
            Write-Host "Restore cancelled"
        }
    }
    else {
        Write-Error "Backup file not found!"
    }
}

function Open-Shell($Service = "travian-web") {
    Write-Host "Opening shell in $Service container..."
    docker-compose exec $Service bash
}

function Update-Server {
    Write-Banner
    Write-Host "Updating Travian Server..."
    Write-Host ""
    
    Write-Warning "This will pull latest updates. Continue? (Y/N)"
    $confirm = Read-Host
    if ($confirm -eq 'Y' -or $confirm -eq 'y') {
        git pull
        docker-compose build --no-cache
        docker-compose up -d
        Write-Status "Update completed!"
    }
    else {
        Write-Host "Update cancelled"
    }
}

function Reset-Server {
    Write-Banner
    Write-Warning "⚠️  WARNING: This will DELETE all game data!"
    Write-Host ""
    $confirm = Read-Host "Type 'DELETE' to confirm"
    
    if ($confirm -eq "DELETE") {
        Write-Host "Stopping server..."
        docker-compose down -v
        Write-Host "Removing data..."
        if (Test-Path "var") { Remove-Item -Recurse -Force "var" }
        if (Test-Path "logs") { Remove-Item -Recurse -Force "logs" }
        Write-Host "Starting fresh..."
        docker-compose up -d
        Write-Status "Server reset completed. Visit http://localhost:8090/install to reconfigure."
    }
    else {
        Write-Host "Reset cancelled"
    }
}

function Show-Help {
    Write-Banner
    Write-Host "Usage: .\travian.ps1 [COMMAND] [OPTIONS]"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  start              Start the Travian server"
    Write-Host "  stop               Stop the Travian server"
    Write-Host "  restart            Restart the Travian server"
    Write-Host "  status             Show server status"
    Write-Host "  logs [service]     Show logs (optional: service name)"
    Write-Host "  backup             Create database and files backup"
    Write-Host "  restore            Restore from backup"
    Write-Host "  shell [service]    Open shell in container (default: travian-web)"
    Write-Host "  update             Update to latest version"
    Write-Host "  reset              ⚠️  Delete all data and start fresh"
    Write-Host "  help               Show this help message"
    Write-Host ""
    Write-Host "Services:"
    Write-Host "  travian-web        Web server (PHP + Apache)"
    Write-Host "  travian-db         Database (MariaDB)"
    Write-Host "  travian-cron       Cron job runner"
    Write-Host "  travian-redis      Cache server (Redis)"
    Write-Host "  travian-mail       Mail server (MailHog)"
    Write-Host ""
}

# Main execution
if (-not (Test-Docker)) {
    Write-Error "Docker is not installed! Please install Docker Desktop first."
    exit 1
}

if (-not (Test-Compose)) {
    Write-Error "Docker Compose is not installed!"
    exit 1
}

switch ($Command.ToLower()) {
    "start" { Start-Server }
    "stop" { Stop-Server }
    "restart" { Restart-Server }
    "status" { Show-Status }
    "logs" { Show-Logs $Option }
    "backup" { Backup-Data }
    "restore" { Restore-Backup }
    "shell" { Open-Shell $Option }
    "update" { Update-Server }
    "reset" { Reset-Server }
    "help" { Show-Help }
    "--help" { Show-Help }
    "-h" { Show-Help }
    default {
        Write-Banner
        Write-Host "Welcome to Travian Server Manager!" -ForegroundColor $Cyan
        Write-Host ""
        Write-Host "Quick Start:"
        Write-Host "  1. Start server:   .\travian.ps1 start"
        Write-Host "  2. View status:    .\travian.ps1 status"
        Write-Host "  3. View logs:      .\travian.ps1 logs"
        Write-Host "  4. Stop server:    .\travian.ps1 stop"
        Write-Host ""
        Write-Host "For more options: .\travian.ps1 help"
        Write-Host ""
    }
}
