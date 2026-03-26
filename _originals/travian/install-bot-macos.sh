#!/bin/bash
# Travian Bot Installation Script for macOS
# Tested on: macOS Ventura/Sonoma with Apple Silicon (M1/M2/M3)

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "╔═══════════════════════════════════════════════════════════════╗"
echo "║                   🤖 TRAVIAN BOT INSTALLER                   ║"
echo "║                       macOS Edition                          ║"
echo "╚═══════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Check if running on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ This script is for macOS only${NC}"
    exit 1
fi

# Check architecture
echo -e "${BLUE}📱 Detecting system...${NC}"
ARCH=$(uname -m)
if [ "$ARCH" = "arm64" ]; then
    echo -e "${GREEN}✅ Apple Silicon (M1/M2/M3) detected${NC}"
else
    echo -e "${GREEN}✅ Intel Mac detected${NC}"
fi

# Check macOS version
MACOS_VERSION=$(sw_vers -productVersion)
echo -e "${BLUE}🖥️  macOS Version: $MACOS_VERSION${NC}"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check and install Homebrew
if ! command_exists brew; then
    echo -e "${YELLOW}📦 Installing Homebrew...${NC}"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    
    # Add to PATH for Apple Silicon
    if [ "$ARCH" = "arm64" ]; then
        echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
        eval "$(/opt/homebrew/bin/brew shellenv)"
    fi
else
    echo -e "${GREEN}✅ Homebrew is installed${NC}"
fi

# Check and install Python 3
if ! command_exists python3; then
    echo -e "${YELLOW}🐍 Installing Python 3...${NC}"
    brew install python
else
    PYTHON_VERSION=$(python3 --version)
    echo -e "${GREEN}✅ $PYTHON_VERSION is installed${NC}"
fi

# Check Python version (need 3.8+)
PYTHON_MINOR=$(python3 -c 'import sys; print(sys.version_info.minor)')
if [ "$PYTHON_MINOR" -lt 8 ]; then
    echo -e "${YELLOW}⚠️  Python 3.8+ required. Upgrading...${NC}"
    brew upgrade python
fi

# Install pip if not present
if ! command_exists pip3; then
    echo -e "${YELLOW}📥 Installing pip...${NC}"
    curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py
    python3 get-pip.py
    rm get-pip.py
fi

# Navigate to bot directory
BOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/bot"
if [ ! -d "$BOT_DIR" ]; then
    echo -e "${RED}❌ Bot directory not found at $BOT_DIR${NC}"
    exit 1
fi

cd "$BOT_DIR"

# Create virtual environment
echo -e "${BLUE}🌐 Creating Python virtual environment...${NC}"
if [ -d "venv" ]; then
    echo -e "${YELLOW}⚠️  Virtual environment exists. Recreating...${NC}"
    rm -rf venv
fi

python3 -m venv venv
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to create virtual environment${NC}"
    exit 1
fi

# Activate virtual environment
echo -e "${BLUE}🔌 Activating virtual environment...${NC}"
source venv/bin/activate

# Upgrade pip
echo -e "${BLUE}⬆️  Upgrading pip...${NC}"
pip install --upgrade pip

# Install requirements
echo -e "${BLUE}📥 Installing Python packages...${NC}"
pip install -r requirements.txt

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install requirements${NC}"
    exit 1
fi

# Create necessary directories
echo -e "${BLUE}📁 Creating directories...${NC}"
mkdir -p logs config

# Make scripts executable
chmod +x run_bot.sh

# Create LaunchAgent for auto-start (optional)
echo ""
echo -e "${YELLOW}❓ Do you want to create LaunchAgent for auto-start? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    PLIST_PATH="$HOME/Library/LaunchAgents/com.travian.bot.plist"
    
    cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.travian.bot</string>
    <key>ProgramArguments</key>
    <array>
        <string>$BOT_DIR/venv/bin/python</string>
        <string>$BOT_DIR/bot.py</string>
        <string>--mode</string>
        <string>continuous</string>
    </array>
    <key>WorkingDirectory</key>
    <string>$BOT_DIR</string>
    <key>StandardOutPath</key>
    <string>$BOT_DIR/logs/launchd.log</string>
    <key>StandardErrorPath</key>
    <string>$BOT_DIR/logs/launchd.error.log</string>
    <key>KeepAlive</key>
    <false/>
    <key>RunAtLoad</key>
    <false/>
</dict>
</plist>
EOF

    launchctl load "$PLIST_PATH"
    echo -e "${GREEN}✅ LaunchAgent created at $PLIST_PATH${NC}"
    echo -e "${BLUE}ℹ️  Use 'launchctl start com.travian.bot' to start bot${NC}"
fi

# Create desktop shortcut (optional)
echo ""
echo -e "${YELLOW}❓ Create desktop shortcut for Dashboard? (y/n)${NC}"
read -r response
if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    DESKTOP_PATH="$HOME/Desktop/Travian Bot Dashboard.webloc"
    cat > "$DESKTOP_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>URL</key>
    <string>http://localhost:5000</string>
</dict>
</plist>
EOF
    echo -e "${GREEN}✅ Desktop shortcut created${NC}"
fi

# Installation summary
echo ""
echo -e "${GREEN}╔═══════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║              ✅ INSTALLATION COMPLETE!                        ║${NC}"
echo -e "${GREEN}╚═══════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Installation Directory:${NC} $BOT_DIR"
echo -e "${BLUE}🐍 Python Version:${NC} $(python3 --version)"
echo -e "${BLUE}🌐 Virtual Environment:${NC} $BOT_DIR/venv"
echo ""
echo -e "${YELLOW}🚀 Quick Start Commands:${NC}"
echo ""
echo -e "  ${GREEN}cd $BOT_DIR${NC}"
echo -e "  ${GREEN}source venv/bin/activate${NC}"
echo ""
echo -e "  ${YELLOW}Run Dashboard:${NC}"
echo -e "  ${GREEN}python3 dashboard.py${NC}"
echo -e "  ${BLUE}→ Open: http://localhost:5000${NC}"
echo ""
echo -e "  ${YELLOW}Run Bot Once:${NC}"
echo -e "  ${GREEN}python3 bot.py --mode once${NC}"
echo ""
echo -e "  ${YELLOW}Run Bot Continuous:${NC}"
echo -e "  ${GREEN}python3 bot.py --mode continuous${NC}"
echo ""
echo -e "  ${YELLOW}Or use interactive script:${NC}"
echo -e "  ${GREEN}./run_bot.sh${NC}"
echo ""
echo -e "${YELLOW}⚙️  Configuration:${NC}"
echo -e "  Edit: ${GREEN}$BOT_DIR/config/bot_config.json${NC}"
echo ""
echo -e "${YELLOW}📊 Logs:${NC}"
echo -e "  Location: ${GREEN}$BOT_DIR/logs/${NC}"
echo ""
echo -e "${GREEN}Happy Botting! 🤖${NC}"
echo ""

# Test installation
echo -e "${BLUE}🧪 Testing installation...${NC}"
python3 -c "import requests, flask, schedule; print('✅ All packages installed correctly')"

echo ""
echo -e "${GREEN}✅ Ready to use!${NC}"
