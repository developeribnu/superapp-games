#!/bin/bash
# Auto-install script for TravianZ

set -e

BASE_URL="http://localhost:8090"
INSTALL_URL="${BASE_URL}/install"

echo "========================================"
echo "  TravianZ Automatic Installer"
echo "========================================"
echo ""

# Step 1: Configuration Form
echo "[Step 1/5] Creating configuration..."
curl -s -X POST "${INSTALL_URL}/process.php" \
    -d "subconst=1" \
    -d "servername=Travian Local" \
    -d "start_date=$(date +%Y-%m-%d)" \
    -d "start_time=$(date +%H:%M:%S)" \
    -d "tzone=7,Asia/Jakarta" \
    -d "lang=en" \
    -d "speed=1" \
    -d "incspeed=1" \
    -d "evasionspeed=1" \
    -d "tradercap=1" \
    -d "crannycap=1" \
    -d "trappercap=1" \
    -d "storage_multiplier=1" \
    -d "wmax=200" \
    -d "sserver=travian-db" \
    -d "sport=3306" \
    -d "suser=travian" \
    -d "spass=travian123" \
    -d "sdb=travian" \
    -d "prefix=s1_" \
    -d "connectt=0" \
    -d "log_build=false" \
    -d "log_tech=false" \
    -d "log_login=false" \
    -d "log_gold_fin=false" \
    -d "log_admin=false" \
    -d "log_war=false" \
    -d "log_market=false" \
    -d "log_illegal=false" \
    -d "activate=false" \
    -d "quest=false" \
    -d "qtype=4" \
    -d "beginner=true" \
    -d "domain=localhost" \
    -d "homepage=${BASE_URL}" \
    -d "server=http://localhost:8090" \
    -d "limit_mailbox=true" \
    -d "max_mails=20" \
    -d "demolish=1" \
    -d "box1=Welcome to Travian!" \
    -d "box2=Have fun playing!" \
    -d "box3=Local Server" \
    -d "village_expand=1" \
    -d "error=0" \
    -d "plus_time=3600" \
    -d "plus_production=7200" \
    -d "paypal-email=" \
    -d "paypal-currency=USD" \
    -d "plus-a-gold=30" \
    -d "plus-a-price=2.49" \
    -d "plus-b-gold=100" \
    -d "plus-b-price=6.99" \
    -d "plus-c-gold=250" \
    -d "plus-c-price=14.99" \
    -d "plus-d-gold=600" \
    -d "plus-d-price=34.99" \
    -d "plus-e-gold=1600" \
    -d "plus-e-price=89.99" \
    -d "medalinterval=86400" \
    -d "great_wks=true" \
    -d "ts_threshold=10000" \
    -d "ww=true" \
    -d "show_natars=true" \
    -d "natars_units=1000000" \
    -d "natars_spawn_time=432000" \
    -d "natars_ww_spawn_time=1296000" \
    -d "natars_ww_building_plan_spawn_time=7776000" \
    -d "nature_regtime=28800" \
    -d "oasis_wood_multiplier=1" \
    -d "oasis_clay_multiplier=1" \
    -d "oasis_iron_multiplier=1" \
    -d "oasis_crop_multiplier=1" \
    -d "t4_coming=false" \
    -d "reg_open=true" \
    -d "peace=0" \
    -d "new_functions_oasis=true" \
    -d "new_functions_alliance_invitation=true" \
    -d "new_functions_embassy_mechanics=true" \
    -d "new_functions_forum_post_message=true" \
    -d "new_functions_tribe_images=true" \
    -d "new_functions_mhs_images=true" \
    -d "new_functions_display_artifact=true" \
    -d "new_functions_display_wonder=true" \
    -d "new_functions_vacation=true" \
    -d "new_functions_display_catapult_target=true" \
    -d "new_functions_manual_naturenatars=true" \
    -d "new_functions_display_links=true" \
    -d "new_functions_medal_3year=true" \
    -d "new_functions_medal_5year=true" \
    -d "new_functions_medal_10year=true" > /dev/null

echo "[Step 2/5] Creating database structure..."
curl -s -X POST "${INSTALL_URL}/process.php" \
    -d "substruc=1" > /dev/null

echo "[Step 3/5] Generating world data (this may take a while)..."
curl -s -X POST "${INSTALL_URL}/process.php" \
    -d "subwdata=1" > /dev/null

echo "[Step 4/5] Creating admin account..."
curl -s -X POST "${INSTALL_URL}/process.php" \
    -d "subacc=1" \
    -d "name=admin" \
    -d "pass=admin123" \
    -d "email=admin@localhost.com" \
    -d "tribe=1" \
    -d "location=7" > /dev/null

echo "[Step 5/5] Finalizing..."
curl -s "${INSTALL_URL}/index.php?s=5" > /dev/null

echo ""
echo "========================================"
echo "  Installation Complete!"
echo "========================================"
echo ""
echo "🎮 Game URL:     ${BASE_URL}"
echo "🔧 phpMyAdmin:   http://localhost:8081"
echo ""
echo "👤 Admin Login:"
echo "   Username: admin"
echo "   Password: admin123"
echo ""
echo "🗄️  Database:"
echo "   Host:     travian-db"
echo "   Name:     travian"
echo "   User:     travian"
echo "   Password: travian123"
echo ""
echo "📁 To start/stop server:"
echo "   cd travian && docker-compose up -d"
echo "   cd travian && docker-compose down"
echo ""
