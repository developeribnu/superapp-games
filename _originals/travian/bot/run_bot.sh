#!/bin/bash
# Travian Bot Runner for macOS

cd "$(dirname "$0")"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🤖 Travian Local Bot${NC}"
echo "====================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.${NC}"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo -e "${YELLOW}📦 Creating virtual environment...${NC}"
    python3 -m venv venv
fi

# Activate virtual environment
echo -e "${YELLOW}🔌 Activating virtual environment...${NC}"
source venv/bin/activate

# Install dependencies
echo -e "${YELLOW}📥 Installing dependencies...${NC}"
pip install -q -r requirements.txt

# Create necessary directories
mkdir -p logs config

# Menu
echo ""
echo "Select mode:"
echo "1) Run Once"
echo "2) Run Continuous (Background)"
echo "3) Dashboard"
echo "4) Setup Cron Job (Auto-run every 5 min)"
echo "5) Stop Bot"
echo ""
read -p "Choice [1-5]: " choice

case $choice in
    1)
        echo -e "${GREEN}▶️ Running bot once...${NC}"
        python3 bot.py --mode once
        ;;
    2)
        echo -e "${GREEN}🚀 Starting bot in continuous mode...${NC}"
        echo -e "${YELLOW}Press Ctrl+C to stop${NC}"
        python3 bot.py --mode continuous
        ;;
    3)
        echo -e "${GREEN}📊 Starting dashboard...${NC}"
        python3 dashboard.py
        ;;
    4)
        echo -e "${YELLOW}⏰ Setting up cron job...${NC}"
        (crontab -l 2>/dev/null; echo "*/5 * * * * cd $(pwd) && venv/bin/python bot.py --mode once >> logs/cron.log 2>&1") | crontab -
        echo -e "${GREEN}✅ Cron job added! Bot will run every 5 minutes.${NC}"
        ;;
    5)
        echo -e "${YELLOW}⏹️ Stopping bot...${NC}"
        pkill -f "bot.py --mode continuous"
        echo -e "${GREEN}✅ Bot stopped${NC}"
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac
