#!/bin/bash

# Script untuk menginstall TravianZ secara otomatis
# Database configuration
DB_HOST="travian-db"
DB_NAME="travian"
DB_USER="travian"
DB_PASS="travian123"
ROOT_PASS="travianroot123"

BASE_URL="http://localhost:8090"

echo "==================================="
echo "TravianZ Auto-Installer"
echo "==================================="
echo ""

# Step 1: Submit configuration
echo "[1/5] Submitting configuration..."
curl -s -X POST "${BASE_URL}/install/process.php" \
  -d "substruc=1" \
  -d "Submit=Create..." > /dev/null

echo "[2/5] Setting up database connection..."
# Step 2: Database configuration
curl -s -X POST "${BASE_URL}/install/process.php" \
  -d "hostname=${DB_HOST}" \
  -d "user=${DB_USER}" \
  -d "pass=${DB_PASS}" \
  -d "dbname=${DB_NAME}" \
  -d "prefix=s1_" \
  -d "Submit=Submit" > /dev/null

echo "[3/5] Creating database structure..."
# Step 3: Create database
curl -s -X POST "${BASE_URL}/install/process.php" \
  -d "install=1" > /dev/null

echo "[4/5] Creating admin account..."
# Step 4: Create admin account
curl -s -X POST "${BASE_URL}/install/process.php" \
  -d "name=admin" \
  -d "pass=admin123" \
  -d "email=admin@localhost.com" \
  -d "tribe=1" \
  -d "location=+7" \
  -d "create=Create+Account" > /dev/null

echo "[5/5] Finalizing installation..."
# Step 5: Complete installation
curl -s "${BASE_URL}/install/process.php?gameisset=1" > /dev/null

echo ""
echo "==================================="
echo "Installation Complete!"
echo "==================================="
echo ""
echo "Access your game at: ${BASE_URL}"
echo "phpMyAdmin: ${BASE_URL}:8081"
echo ""
echo "Admin Login:"
echo "  Username: admin"
echo "  Password: admin123"
echo ""
echo "Database Info:"
echo "  Host: ${DB_HOST}"
echo "  Name: ${DB_NAME}"
echo "  User: ${DB_USER}"
echo "  Pass: ${DB_PASS}"
echo ""
