@echo off
chcp 65001 >nul
title Travian Server Manager

:: Travian Server Management Script for Windows
:: Usage: travian.bat [start|stop|restart|status|logs|backup|restore|shell|update|help]

set "COMPOSE=docker-compose"
set "GAME_URL=http://localhost:8090"
set "ADMIN_URL=http://localhost:8090/Admin"
set "PHPMYADMIN_URL=http://localhost:8081"
set "MAIL_URL=http://localhost:8091"
set "MONITOR_URL=http://localhost:8092"

goto :main

:print_banner
echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                    TRAVIAN SERVER MANAGER                    ║
echo ║                        Version 8.3.5                         ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
goto :eof

:print_status
echo [✓] %~1
goto :eof

:print_error
echo [✗] %~1
goto :eof

:print_warning
echo [!] %~1
goto :eof

:start_server
call :print_banner
echo Starting Travian Server...
echo.

:: Check if running
%COMPOSE% ps | findstr "travian-web" >nul
if %errorlevel% == 0 (
    call :print_warning "Server is already running!"
    call :show_status
    goto :eof
)

:: Create directories
if not exist logs mkdir logs
if not exist logs\apache mkdir logs\apache
if not exist logs\cron mkdir logs\cron
if not exist logs\game mkdir logs\game
if not exist backups mkdir backups
if not exist monitor mkdir monitor

:: Start containers
%COMPOSE% up -d --build

if %errorlevel% neq 0 (
    call :print_error "Failed to start server!"
    goto :eof
)

echo.
call :print_status "Server started successfully!"
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo 🎮 Game:       %GAME_URL%
echo ⚙️  Admin:      %ADMIN_URL%
echo 🗄️  Database:   %PHPMYADMIN_URL%
echo 📧 Mail:        %MAIL_URL%
echo 📊 Monitor:     %MONITOR_URL%
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo Default Admin Login:
echo   Username: admin
echo   Password: admin123
echo.
goto :eof

:stop_server
echo Stopping Travian Server...
%COMPOSE% down
call :print_status "Server stopped"
goto :eof

:restart_server
echo Restarting Travian Server...
%COMPOSE% restart
call :print_status "Server restarted"
call :show_status
goto :eof

:show_status
call :print_banner
echo Server Status:
echo.
%COMPOSE% ps

%COMPOSE% ps | findstr "travian-web" >nul
if %errorlevel% == 0 (
    echo.
    call :print_status "All services are running"
) else (
    echo.
    call :print_error "Server is not running"
    echo.
    echo Start the server with: travian.bat start
)
goto :eof

:show_logs
if "%~1"=="" (
    echo Showing all logs (Ctrl+C to exit)...
    %COMPOSE% logs -f
) else (
    echo Showing logs for %~1 (Ctrl+C to exit)...
    %COMPOSE% logs -f %~1
)
goto :eof

:backup_data
call :print_banner
echo Creating backup...
echo.

if not exist backups mkdir backups

set "BACKUP_DATE=%date:~-4,4%%date:~-10,2%%date:~-7,2%_%time:~0,2%%time:~3,2%%time:~6,2%"
set "BACKUP_DATE=%BACKUP_DATE: =0%"

:: Database backup
%COMPOSE% exec -T travian-db mysqldump -uroot -ptravianroot123 travian > "backups\travian_backup_%BACKUP_DATE%.sql"
if %errorlevel% == 0 (
    call :print_status "Database backup created"
) else (
    call :print_error "Database backup failed"
)

echo.
call :print_status "Backup completed!"
goto :eof

:shell_access
if "%~1"=="" (
    set "service=travian-web"
) else (
    set "service=%~1"
)
echo Opening shell in %service% container...
%COMPOSE% exec %service% bash
goto :eof

:update_game
call :print_banner
echo Updating Travian Server...
echo.

echo This will pull latest updates. Continue? (Y/N)
set /p confirm=
if /i "%confirm%"=="Y" (
    git pull
    %COMPOSE% build --no-cache
    %COMPOSE% up -d
    call :print_status "Update completed!"
) else (
    echo Update cancelled
)
goto :eof

:reset_server
call :print_banner
call :print_warning "WARNING: This will DELETE all game data!"
echo.
set /p confirm="Type 'DELETE' to confirm: "
if "%confirm%"=="DELETE" (
    echo Stopping server...
    %COMPOSE% down -v
    echo Removing data...
    if exist var rmdir /s /q var
    if exist logs rmdir /s /q logs
    echo Starting fresh...
    %COMPOSE% up -d
    call :print_status "Server reset completed. Visit http://localhost:8090/install to reconfigure."
) else (
    echo Reset cancelled
)
goto :eof

:show_help
call :print_banner
echo Usage: travian.bat [COMMAND] [OPTIONS]
echo.
echo Commands:
echo   start              Start the Travian server
echo   stop               Stop the Travian server
echo   restart            Restart the Travian server
echo   status             Show server status
echo   logs [service]     Show logs (optional: service name)
echo   backup             Create database and files backup
echo   restore            Restore from backup
echo   shell [service]    Open shell in container (default: travian-web)
echo   update             Update to latest version
echo   reset              ⚠️  Delete all data and start fresh
echo   help               Show this help message
echo.
echo Services:
echo   travian-web        Web server (PHP + Apache)
echo   travian-db         Database (MariaDB)
echo   travian-cron       Cron job runner
echo   travian-redis      Cache server (Redis)
echo   travian-mail       Mail server (MailHog)
echo.
goto :eof

:main
:: Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Docker is not installed! Please install Docker Desktop first."
    goto :eof
)

:: Check if docker-compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    call :print_error "Docker Compose is not installed!"
    goto :eof
)

:: Route commands
if /i "%~1"=="start" goto :start_server
if /i "%~1"=="stop" goto :stop_server
if /i "%~1"=="restart" goto :restart_server
if /i "%~1"=="status" goto :show_status
if /i "%~1"=="logs" goto :show_logs %~2
if /i "%~1"=="backup" goto :backup_data
if /i "%~1"=="restore" goto :restore_backup
if /i "%~1"=="shell" goto :shell_access %~2
if /i "%~1"=="update" goto :update_game
if /i "%~1"=="reset" goto :reset_server
if /i "%~1"=="help" goto :show_help
if /i "%~1"=="--help" goto :show_help
if /i "%~1"=="-h" goto :show_help

:: Default: Show welcome screen
call :print_banner
echo Welcome to Travian Server Manager!
echo.
echo Quick Start:
echo   1. Start server:   travian.bat start
echo   2. View status:    travian.bat status
echo   3. View logs:      travian.bat logs
echo   4. Stop server:    travian.bat stop
echo.
echo For more options: travian.bat help
echo.
