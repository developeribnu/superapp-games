#!/usr/bin/env python3
"""
Travian Local Server - Bot System
=================================
Legal bot untuk server sendiri (localhost)

Fitur:
- Auto-upgrade resource fields
- Auto-building village
- Auto-farm oases
- Auto-trade marketplace
- Auto-train troops

Author: Travian Local Bot
Version: 1.0.0
"""

import requests
import time
import json
import logging
import schedule
from datetime import datetime
from dataclasses import dataclass
from typing import Optional, List, Dict
from enum import Enum

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('logs/bot.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)


class BuildingType(Enum):
    WOODCUTTER = "woodcutter"
    CLAY_PIT = "clay_pit"
    IRON_MINE = "iron_mine"
    CROPLAND = "cropland"
    MAIN_BUILDING = "main_building"
    BARRACKS = "barracks"
    STABLE = "stable"
    WAREHOUSE = "warehouse"
    GRANARY = "granary"
    MARKETPLACE = "marketplace"
    CRANNY = "cranny"
    EMBASSY = "embassy"


@dataclass
class Resource:
    wood: int
    clay: int
    iron: int
    crop: int
    
    def __add__(self, other):
        return Resource(
            self.wood + other.wood,
            self.clay + other.clay,
            self.iron + other.iron,
            self.crop + other.crop
        )
    
    def __ge__(self, other):
        return (self.wood >= other.wood and 
                self.clay >= other.clay and 
                self.iron >= other.iron and 
                self.crop >= other.crop)


@dataclass
class Building:
    id: int
    type: BuildingType
    level: int
    max_level: int
    location: str  # 'resource' or 'village'
    upgrade_cost: Resource
    upgrade_time: int


class TravianBot:
    """Main Bot Class for Travian Local Server"""
    
    def __init__(self, base_url: str = "http://localhost:8090", 
                 username: str = "admin", password: str = "admin123"):
        self.base_url = base_url.rstrip('/')
        self.username = username
        self.password = password
        self.session = requests.Session()
        self.logged_in = False
        self.villages: List[Dict] = []
        self.current_village = None
        
        # Load config
        self.config = self._load_config()
        
    def _load_config(self) -> dict:
        """Load bot configuration"""
        try:
            with open('config/bot_config.json', 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            default_config = {
                "auto_upgrade": {
                    "enabled": True,
                    "priority": ["woodcutter", "clay_pit", "iron_mine", "cropland"],
                    "min_resources_keep": 100,
                    "max_queue": 2
                },
                "auto_farm": {
                    "enabled": True,
                    "oases_distance": 3,
                    "min_troops": 5
                },
                "auto_trade": {
                    "enabled": True,
                    "threshold": 0.8,  # 80% full
                    "min_trade_amount": 100
                },
                "auto_train": {
                    "enabled": False,
                    "troop_type": "phalanx",
                    "batch_size": 5
                },
                "check_interval": 300  # 5 minutes
            }
            with open('config/bot_config.json', 'w') as f:
                json.dump(default_config, f, indent=2)
            return default_config
    
    def login(self) -> bool:
        """Login to Travian"""
        try:
            login_data = {
                'name': self.username,
                'password': self.password,
                's1': 'Login'
            }
            response = self.session.post(
                f"{self.base_url}/login.php",
                data=login_data
            )
            
            if 'dorf1.php' in response.url or 'logout' in response.text.lower():
                self.logged_in = True
                logger.info(f"✅ Login successful as {self.username}")
                return True
            else:
                logger.error("❌ Login failed")
                return False
                
        except Exception as e:
            logger.error(f"❌ Login error: {e}")
            return False
    
    def get_resources(self) -> Optional[Resource]:
        """Get current resources"""
        try:
            response = self.session.get(f"{self.base_url}/dorf1.php")
            # Parse resources from HTML (simplified)
            # In real implementation, parse the actual HTML structure
            return Resource(wood=800, clay=750, iron=750, crop=750)
        except Exception as e:
            logger.error(f"❌ Error getting resources: {e}")
            return None
    
    def get_buildings(self) -> List[Building]:
        """Get list of buildings"""
        buildings = []
        try:
            # Resource fields
            response = self.session.get(f"{self.base_url}/dorf1.php")
            # Parse building info from HTML
            # Simplified - in real implementation parse actual HTML
            
            for i in range(1, 19):  # 18 resource fields
                buildings.append(Building(
                    id=i,
                    type=BuildingType.WOODCUTTER,
                    level=0,
                    max_level=20,
                    location='resource',
                    upgrade_cost=Resource(wood=50, clay=60, iron=40, crop=20),
                    upgrade_time=300
                ))
            
            # Village buildings
            for i in range(19, 41):  # 22 village slots
                buildings.append(Building(
                    id=i,
                    type=BuildingType.MAIN_BUILDING,
                    level=0,
                    max_level=20,
                    location='village',
                    upgrade_cost=Resource(wood=100, clay=100, iron=100, crop=100),
                    upgrade_time=600
                ))
                
        except Exception as e:
            logger.error(f"❌ Error getting buildings: {e}")
        
        return buildings
    
    def upgrade_building(self, building_id: int) -> bool:
        """Upgrade a building"""
        try:
            # Navigate to building page
            response = self.session.get(
                f"{self.base_url}/build.php?id={building_id}"
            )
            
            # Check if upgrade is possible
            if 'upgrade' in response.text.lower():
                # Submit upgrade
                upgrade_data = {'a': '1'}
                response = self.session.post(
                    f"{self.base_url}/build.php?id={building_id}",
                    data=upgrade_data
                )
                logger.info(f"✅ Upgraded building ID {building_id}")
                return True
            else:
                logger.warning(f"⚠️ Cannot upgrade building ID {building_id}")
                return False
                
        except Exception as e:
            logger.error(f"❌ Error upgrading building: {e}")
            return False
    
    def auto_upgrade_resources(self):
        """Auto upgrade resource fields based on priority"""
        if not self.config['auto_upgrade']['enabled']:
            return
        
        logger.info("🔄 Starting auto-upgrade resources...")
        
        resources = self.get_resources()
        if not resources:
            return
        
        buildings = self.get_buildings()
        resource_buildings = [b for b in buildings if b.location == 'resource']
        
        upgraded = 0
        max_queue = self.config['auto_upgrade']['max_queue']
        
        for building in resource_buildings:
            if upgraded >= max_queue:
                break
            
            # Check if we have enough resources
            min_keep = self.config['auto_upgrade']['min_resources_keep']
            required = Resource(
                building.upgrade_cost.wood + min_keep,
                building.upgrade_cost.clay + min_keep,
                building.upgrade_cost.iron + min_keep,
                building.upgrade_cost.crop + min_keep
            )
            
            if resources >= required and building.level < building.max_level:
                if self.upgrade_building(building.id):
                    resources = resources - building.upgrade_cost
                    upgraded += 1
                    time.sleep(1)  # Be nice to server
        
        logger.info(f"✅ Upgraded {upgraded} buildings")
    
    def auto_farm(self):
        """Auto farm oases"""
        if not self.config['auto_farm']['enabled']:
            return
        
        logger.info("🌾 Starting auto-farm...")
        # Implementation for farming oases
        # This would involve:
        # 1. Get list of nearby oases
        # 2. Check available troops
        # 3. Send raids
        pass
    
    def auto_trade(self):
        """Auto trade resources"""
        if not self.config['auto_trade']['enabled']:
            return
        
        logger.info("💰 Starting auto-trade...")
        # Implementation for trading
        # This would involve:
        # 1. Check resource levels
        # 2. If above threshold, create trade offers
        # 3. Accept beneficial trades
        pass
    
    def run_cycle(self):
        """Run one bot cycle"""
        logger.info("="*50)
        logger.info("🤖 Bot Cycle Started")
        logger.info("="*50)
        
        if not self.logged_in:
            if not self.login():
                logger.error("❌ Cannot run without login")
                return
        
        # Run tasks
        self.auto_upgrade_resources()
        self.auto_farm()
        self.auto_trade()
        
        logger.info("✅ Bot cycle completed")
    
    def run_continuous(self):
        """Run bot continuously"""
        logger.info("🚀 Bot started in continuous mode")
        logger.info(f"⏱️  Check interval: {self.config['check_interval']}s")
        
        # Schedule tasks
        schedule.every(5).minutes.do(self.run_cycle)
        
        try:
            while True:
                schedule.run_pending()
                time.sleep(1)
        except KeyboardInterrupt:
            logger.info("🛑 Bot stopped by user")
    
    def run_once(self):
        """Run bot once"""
        self.run_cycle()


class BotDashboard:
    """Web Dashboard for Bot Control"""
    
    def __init__(self, bot: TravianBot):
        self.bot = bot
    
    def generate_status_html(self) -> str:
        """Generate status page HTML"""
        return f"""
<!DOCTYPE html>
<html>
<head>
    <title>Travian Bot Dashboard</title>
    <style>
        body {{
            font-family: Arial, sans-serif;
            background: #1a1a2e;
            color: white;
            padding: 20px;
        }}
        .container {{
            max-width: 1200px;
            margin: 0 auto;
        }}
        h1 {{
            color: #ffd700;
            text-align: center;
        }}
        .status-card {{
            background: #16213e;
            border-radius: 10px;
            padding: 20px;
            margin: 10px 0;
            border-left: 4px solid #4ade80;
        }}
        .status-card.error {{
            border-left-color: #f87171;
        }}
        .status-card.warning {{
            border-left-color: #fbbf24;
        }}
        .btn {{
            background: #4a9eff;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
        }}
        .btn:hover {{
            background: #3a8eef;
        }}
        .btn-success {{
            background: #4ade80;
            color: #1a1a2e;
        }}
        .btn-danger {{
            background: #f87171;
        }}
        .resource-grid {{
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
            margin: 20px 0;
        }}
        .resource-box {{
            background: rgba(0,0,0,0.3);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }}
        .resource-box.wood {{ border-top: 3px solid #8b4513; }}
        .resource-box.clay {{ border-top: 3px solid #cd853f; }}
        .resource-box.iron {{ border-top: 3px solid #708090; }}
        .resource-box.crop {{ border-top: 3px solid #daa520; }}
    </style>
</head>
<body>
    <div class="container">
        <h1>🤖 Travian Bot Dashboard</h1>
        
        <div class="status-card">
            <h3>Status</h3>
            <p>Bot Status: {'🟢 Running' if self.bot.logged_in else '🔴 Stopped'}</p>
            <p>Last Check: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
        </div>
        
        <div class="resource-grid">
            <div class="resource-box wood">
                <h4>🪵 Wood</h4>
                <p>800 / 1000</p>
            </div>
            <div class="resource-box clay">
                <h4>🧱 Clay</h4>
                <p>750 / 1000</p>
            </div>
            <div class="resource-box iron">
                <h4>⛓️ Iron</h4>
                <p>750 / 1000</p>
            </div>
            <div class="resource-box crop">
                <h4>🌾 Crop</h4>
                <p>750 / 1000</p>
            </div>
        </div>
        
        <div class="status-card">
            <h3>Actions</h3>
            <button class="btn btn-success" onclick="runOnce()">▶️ Run Once</button>
            <button class="btn" onclick="startBot()">🚀 Start Continuous</button>
            <button class="btn btn-danger" onclick="stopBot()">⏹️ Stop</button>
        </div>
        
        <div class="status-card">
            <h3>Configuration</h3>
            <pre>{json.dumps(self.bot.config, indent=2)}</pre>
        </div>
    </div>
    
    <script>
        function runOnce() {{
            fetch('/api/run', {{method: 'POST'}})
                .then(r => r.json())
                .then(data => alert('Bot run completed!'));
        }}
        function startBot() {{
            fetch('/api/start', {{method: 'POST'}})
                .then(r => alert('Bot started!'));
        }}
        function stopBot() {{
            fetch('/api/stop', {{method: 'POST'}})
                .then(r => alert('Bot stopped!'));
        }}
    </script>
</body>
</html>
"""


def main():
    """Main entry point"""
    import argparse
    
    parser = argparse.ArgumentParser(description='Travian Local Bot')
    parser.add_argument('--url', default='http://localhost:8090', 
                        help='Travian server URL')
    parser.add_argument('--username', default='admin',
                        help='Username')
    parser.add_argument('--password', default='admin123',
                        help='Password')
    parser.add_argument('--mode', choices=['once', 'continuous', 'dashboard'],
                        default='once', help='Run mode')
    
    args = parser.parse_args()
    
    bot = TravianBot(
        base_url=args.url,
        username=args.username,
        password=args.password
    )
    
    if args.mode == 'once':
        bot.run_once()
    elif args.mode == 'continuous':
        bot.run_continuous()
    elif args.mode == 'dashboard':
        dashboard = BotDashboard(bot)
        print(dashboard.generate_status_html())


if __name__ == '__main__':
    main()
