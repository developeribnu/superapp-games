#!/usr/bin/env python3
"""
Travian Bot Dashboard - Web Interface
=====================================
Flask-based web dashboard untuk monitoring dan kontrol bot
"""

from flask import Flask, render_template_string, jsonify, request
import json
import os
from datetime import datetime
import subprocess
import psutil

app = Flask(__name__)

# HTML Template
DASHBOARD_HTML = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🤖 Travian Bot Dashboard</title>
    <style>
        :root {
            --bg-primary: #1a1a2e;
            --bg-secondary: #16213e;
            --bg-card: #0f3460;
            --text-primary: #ffffff;
            --text-secondary: #b8c5d6;
            --accent-gold: #ffd700;
            --accent-green: #4ade80;
            --accent-red: #f87171;
            --accent-blue: #4a9eff;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
            color: var(--text-primary);
            min-height: 100vh;
            padding: 20px;
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
        }
        
        header {
            text-align: center;
            padding: 30px 0;
            border-bottom: 2px solid rgba(255,215,0,0.3);
            margin-bottom: 30px;
        }
        
        header h1 {
            color: var(--accent-gold);
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        header p {
            color: var(--text-secondary);
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .card {
            background: var(--bg-card);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.1);
        }
        
        .card h3 {
            color: var(--accent-gold);
            margin-bottom: 15px;
            font-size: 1.2rem;
        }
        
        .status-indicator {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 16px;
            border-radius: 20px;
            font-weight: 600;
        }
        
        .status-running {
            background: rgba(74, 222, 128, 0.2);
            color: var(--accent-green);
        }
        
        .status-stopped {
            background: rgba(248, 113, 113, 0.2);
            color: var(--accent-red);
        }
        
        .status-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }
        
        .status-running .status-dot {
            background: var(--accent-green);
        }
        
        .status-stopped .status-dot {
            background: var(--accent-red);
            animation: none;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }
        
        .resource-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
        }
        
        .resource-item {
            background: rgba(0,0,0,0.2);
            padding: 15px;
            border-radius: 8px;
            text-align: center;
        }
        
        .resource-item .icon {
            font-size: 1.5rem;
            margin-bottom: 5px;
        }
        
        .resource-item .value {
            font-size: 1.2rem;
            font-weight: bold;
        }
        
        .resource-item .label {
            font-size: 0.8rem;
            color: var(--text-secondary);
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 0.9rem;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--accent-blue) 0%, #0066cc 100%);
            color: white;
        }
        
        .btn-success {
            background: linear-gradient(135deg, var(--accent-green) 0%, #22c55e 100%);
            color: #1a1a2e;
        }
        
        .btn-danger {
            background: linear-gradient(135deg, var(--accent-red) 0%, #dc2626 100%);
            color: white;
        }
        
        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        
        .btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .log-container {
            background: rgba(0,0,0,0.3);
            border-radius: 8px;
            padding: 15px;
            max-height: 300px;
            overflow-y: auto;
            font-family: 'Monaco', 'Consolas', monospace;
            font-size: 0.85rem;
            line-height: 1.5;
        }
        
        .log-entry {
            padding: 4px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        
        .log-time {
            color: var(--text-secondary);
        }
        
        .log-info { color: var(--accent-blue); }
        .log-success { color: var(--accent-green); }
        .log-error { color: var(--accent-red); }
        .log-warning { color: #fbbf24; }
        
        .config-section {
            margin-top: 15px;
        }
        
        .config-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .config-item:last-child {
            border-bottom: none;
        }
        
        .toggle-switch {
            position: relative;
            width: 50px;
            height: 26px;
        }
        
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        
        .toggle-slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(255,255,255,0.2);
            transition: .4s;
            border-radius: 34px;
        }
        
        .toggle-slider:before {
            position: absolute;
            content: "";
            height: 20px;
            width: 20px;
            left: 3px;
            bottom: 3px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        
        input:checked + .toggle-slider {
            background-color: var(--accent-green);
        }
        
        input:checked + .toggle-slider:before {
            transform: translateX(24px);
        }
        
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 15px;
            text-align: center;
        }
        
        .stat-item .number {
            font-size: 2rem;
            font-weight: bold;
            color: var(--accent-gold);
        }
        
        .stat-item .label {
            font-size: 0.85rem;
            color: var(--text-secondary);
        }
        
        footer {
            text-align: center;
            padding: 30px 0;
            color: var(--text-secondary);
            font-size: 0.85rem;
        }
        
        @media (max-width: 768px) {
            .grid {
                grid-template-columns: 1fr;
            }
            
            header h1 {
                font-size: 1.8rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🤖 Travian Bot Dashboard</h1>
            <p>Local Server Automation & Control Panel</p>
        </header>
        
        <div class="grid">
            <!-- Status Card -->
            <div class="card">
                <h3>🎛️ Bot Status</h3>
                <div id="bot-status">
                    <span class="status-indicator {{ 'status-running' if bot_running else 'status-stopped' }}">
                        <span class="status-dot"></span>
                        {{ 'Running' if bot_running else 'Stopped' }}
                    </span>
                </div>
                <p style="margin-top: 15px; color: var(--text-secondary);">
                    Last Update: <span id="last-update">{{ last_update }}</span>
                </p>
            </div>
            
            <!-- Resources Card -->
            <div class="card">
                <h3>💰 Resources</h3>
                <div class="resource-grid">
                    <div class="resource-item">
                        <div class="icon">🪵</div>
                        <div class="value" id="wood">{{ resources.wood }}</div>
                        <div class="label">Wood</div>
                    </div>
                    <div class="resource-item">
                        <div class="icon">🧱</div>
                        <div class="value" id="clay">{{ resources.clay }}</div>
                        <div class="label">Clay</div>
                    </div>
                    <div class="resource-item">
                        <div class="icon">⛓️</div>
                        <div class="value" id="iron">{{ resources.iron }}</div>
                        <div class="label">Iron</div>
                    </div>
                    <div class="resource-item">
                        <div class="icon">🌾</div>
                        <div class="value" id="crop">{{ resources.crop }}</div>
                        <div class="label">Crop</div>
                    </div>
                </div>
            </div>
            
            <!-- Stats Card -->
            <div class="card">
                <h3>📊 Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="number" id="buildings-upgraded">{{ stats.buildings }}</div>
                        <div class="label">Buildings</div>
                    </div>
                    <div class="stat-item">
                        <div class="number" id="farms-sent">{{ stats.farms }}</div>
                        <div class="label">Farms</div>
                    </div>
                    <div class="stat-item">
                        <div class="number" id="trades">{{ stats.trades }}</div>
                        <div class="label">Trades</div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="grid">
            <!-- Actions Card -->
            <div class="card">
                <h3>🎮 Actions</h3>
                <div class="actions">
                    <button class="btn btn-success" onclick="runOnce()" id="btn-run">
                        ▶️ Run Once
                    </button>
                    <button class="btn btn-primary" onclick="startBot()" id="btn-start">
                        🚀 Start
                    </button>
                    <button class="btn btn-danger" onclick="stopBot()" id="btn-stop">
                        ⏹️ Stop
                    </button>
                </div>
            </div>
            
            <!-- Config Card -->
            <div class="card">
                <h3>⚙️ Configuration</h3>
                <div class="config-section">
                    <div class="config-item">
                        <span>Auto Upgrade</span>
                        <label class="toggle-switch">
                            <input type="checkbox" {{ 'checked' if config.auto_upgrade.enabled }} 
                                   onchange="toggleConfig('auto_upgrade')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="config-item">
                        <span>Auto Farm</span>
                        <label class="toggle-switch">
                            <input type="checkbox" {{ 'checked' if config.auto_farm.enabled }}
                                   onchange="toggleConfig('auto_farm')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                    <div class="config-item">
                        <span>Auto Trade</span>
                        <label class="toggle-switch">
                            <input type="checkbox" {{ 'checked' if config.auto_trade.enabled }}
                                   onchange="toggleConfig('auto_trade')">
                            <span class="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Logs Card -->
        <div class="card">
            <h3>📝 Logs</h3>
            <div class="log-container" id="logs">
                {% for log in logs %}
                <div class="log-entry">
                    <span class="log-time">{{ log.time }}</span>
                    <span class="log-{{ log.level }}">[{{ log.level.upper() }}]</span>
                    {{ log.message }}
                </div>
                {% endfor %}
            </div>
        </div>
        
        <footer>
            <p>Travian Local Bot v1.0 | Running on macOS | Made with ❤️</p>
        </footer>
    </div>
    
    <script>
        // Run bot once
        async function runOnce() {
            document.getElementById('btn-run').disabled = true;
            try {
                const response = await fetch('/api/run', { method: 'POST' });
                const data = await response.json();
                alert(data.message || 'Bot run completed!');
                refreshData();
            } catch (error) {
                alert('Error: ' + error.message);
            }
            document.getElementById('btn-run').disabled = false;
        }
        
        // Start bot
        async function startBot() {
            try {
                const response = await fetch('/api/start', { method: 'POST' });
                const data = await response.json();
                alert(data.message);
                refreshData();
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Stop bot
        async function stopBot() {
            try {
                const response = await fetch('/api/stop', { method: 'POST' });
                const data = await response.json();
                alert(data.message);
                refreshData();
            } catch (error) {
                alert('Error: ' + error.message);
            }
        }
        
        // Toggle config
        async function toggleConfig(feature) {
            try {
                const response = await fetch(`/api/config/${feature}`, { method: 'POST' });
                const data = await response.json();
                console.log('Config updated:', data);
            } catch (error) {
                alert('Error updating config: ' + error.message);
            }
        }
        
        // Refresh data
        async function refreshData() {
            try {
                const response = await fetch('/api/status');
                const data = await response.json();
                
                // Update resources
                document.getElementById('wood').textContent = data.resources.wood;
                document.getElementById('clay').textContent = data.resources.clay;
                document.getElementById('iron').textContent = data.resources.iron;
                document.getElementById('crop').textContent = data.resources.crop;
                
                // Update stats
                document.getElementById('buildings-upgraded').textContent = data.stats.buildings;
                document.getElementById('farms-sent').textContent = data.stats.farms;
                document.getElementById('trades').textContent = data.stats.trades;
                
                // Update status
                const statusEl = document.getElementById('bot-status');
                statusEl.innerHTML = `
                    <span class="status-indicator ${data.running ? 'status-running' : 'status-stopped'}">
                        <span class="status-dot"></span>
                        ${data.running ? 'Running' : 'Stopped'}
                    </span>
                `;
                
                document.getElementById('last-update').textContent = data.last_update;
                
            } catch (error) {
                console.error('Error refreshing data:', error);
            }
        }
        
        // Auto refresh every 10 seconds
        setInterval(refreshData, 10000);
    </script>
</body>
</html>
'''

# Global state
bot_process = None
bot_stats = {
    "buildings": 0,
    "farms": 0,
    "trades": 0
}

def is_bot_running():
    """Check if bot is running"""
    global bot_process
    if bot_process is None:
        return False
    return bot_process.poll() is None

def get_config():
    """Load bot config"""
    try:
        with open('config/bot_config.json', 'r') as f:
            return json.load(f)
    except:
        return {}

def get_logs():
    """Get recent logs"""
    try:
        with open('logs/bot.log', 'r') as f:
            lines = f.readlines()[-50:]  # Last 50 lines
        logs = []
        for line in lines:
            # Parse log line: "2025-03-15 10:30:45 - Bot - INFO - Message"
            parts = line.strip().split(' - ', 3)
            if len(parts) >= 4:
                logs.append({
                    'time': parts[0],
                    'name': parts[1],
                    'level': parts[2].lower(),
                    'message': parts[3]
                })
        return logs
    except:
        return []

@app.route('/')
def dashboard():
    """Main dashboard page"""
    return render_template_string(
        DASHBOARD_HTML,
        bot_running=is_bot_running(),
        last_update=datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        resources={"wood": 800, "clay": 750, "iron": 750, "crop": 750},
        stats=bot_stats,
        config=get_config(),
        logs=get_logs()
    )

@app.route('/api/status')
def api_status():
    """Get bot status"""
    return jsonify({
        'running': is_bot_running(),
        'last_update': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'resources': {"wood": 800, "clay": 750, "iron": 750, "crop": 750},
        'stats': bot_stats
    })

@app.route('/api/run', methods=['POST'])
def api_run():
    """Run bot once"""
    try:
        result = subprocess.run(
            ['python3', 'bot.py', '--mode', 'once'],
            capture_output=True,
            text=True,
            timeout=120
        )
        return jsonify({
            'success': True,
            'message': 'Bot run completed',
            'output': result.stdout
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/start', methods=['POST'])
def api_start():
    """Start bot continuously"""
    global bot_process
    try:
        if is_bot_running():
            return jsonify({
                'success': False,
                'message': 'Bot is already running'
            })
        
        bot_process = subprocess.Popen(
            ['python3', 'bot.py', '--mode', 'continuous'],
            stdout=open('logs/bot.log', 'a'),
            stderr=subprocess.STDOUT
        )
        return jsonify({
            'success': True,
            'message': 'Bot started successfully'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/stop', methods=['POST'])
def api_stop():
    """Stop bot"""
    global bot_process
    try:
        if bot_process and bot_process.poll() is None:
            bot_process.terminate()
            bot_process.wait(timeout=5)
            bot_process = None
            return jsonify({
                'success': True,
                'message': 'Bot stopped'
            })
        return jsonify({
            'success': False,
            'message': 'Bot is not running'
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

@app.route('/api/config/<feature>', methods=['POST'])
def api_toggle_config(feature):
    """Toggle feature config"""
    try:
        config = get_config()
        if feature in config:
            config[feature]['enabled'] = not config[feature]['enabled']
            with open('config/bot_config.json', 'w') as f:
                json.dump(config, f, indent=2)
            return jsonify({
                'success': True,
                'feature': feature,
                'enabled': config[feature]['enabled']
            })
        return jsonify({
            'success': False,
            'message': 'Feature not found'
        }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'message': str(e)
        }), 500

if __name__ == '__main__':
    os.makedirs('logs', exist_ok=True)
    os.makedirs('config', exist_ok=True)
    print("🤖 Travian Bot Dashboard")
    print("=" * 40)
    print("Open: http://localhost:5000")
    print("Press Ctrl+C to stop")
    print("=" * 40)
    app.run(host='0.0.0.0', port=5000, debug=False)
