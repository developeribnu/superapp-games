/**
 * Travian Modern UI - JavaScript
 * Version: 2025 Modern Theme
 */

(function() {
    'use strict';

    // ============================================
    // RESOURCE UPDATER
    // ============================================
    const ResourceUpdater = {
        resources: {
            wood: { current: 0, target: 0, rate: 0 },
            clay: { current: 0, target: 0, rate: 0 },
            iron: { current: 0, target: 0, rate: 0 },
            crop: { current: 0, target: 0, rate: 0 }
        },
        
        init() {
            this.loadResources();
            this.startUpdating();
        },
        
        loadResources() {
            ['wood', 'clay', 'iron', 'crop'].forEach(res => {
                const element = document.getElementById(`res_${res}`);
                if (element) {
                    this.resources[res].current = parseInt(element.textContent) || 0;
                }
            });
        },
        
        startUpdating() {
            setInterval(() => {
                this.updateResources();
            }, 1000);
        },
        
        updateResources() {
            ['wood', 'clay', 'iron', 'crop'].forEach(res => {
                const rateElement = document.getElementById(`prod_${res}`);
                if (rateElement) {
                    const rateText = rateElement.textContent;
                    const rate = parseInt(rateText.replace(/[^0-9-]/g, '')) || 0;
                    this.resources[res].rate = rate;
                    
                    if (rate !== 0) {
                        this.resources[res].current += rate / 3600;
                        this.updateDisplay(res);
                    }
                }
            });
        },
        
        updateDisplay(resource) {
            const element = document.getElementById(`res_${resource}`);
            if (element) {
                const value = Math.floor(this.resources[resource].current);
                element.textContent = value.toLocaleString();
                
                // Flash effect on update
                element.style.textShadow = '0 0 10px currentColor';
                setTimeout(() => {
                    element.style.textShadow = '';
                }, 200);
            }
        }
    };

    // ============================================
    // BUILDING QUEUE
    // ============================================
    const BuildingQueue = {
        init() {
            this.updateQueue();
            setInterval(() => this.updateQueue(), 1000);
        },
        
        updateQueue() {
            const timers = document.querySelectorAll('.build_timer');
            timers.forEach(timer => {
                let seconds = parseInt(timer.dataset.seconds) || 0;
                if (seconds > 0) {
                    seconds--;
                    timer.dataset.seconds = seconds;
                    timer.textContent = this.formatTime(seconds);
                    
                    // Update progress bar
                    const progress = timer.closest('.building-queue-item')?.querySelector('.progress-fill');
                    if (progress) {
                        const total = parseInt(progress.dataset.total) || 1;
                        const percent = ((total - seconds) / total) * 100;
                        progress.style.width = percent + '%';
                    }
                }
            });
        },
        
        formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const mins = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            
            if (hours > 0) {
                return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            }
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }
    };

    // ============================================
    // NOTIFICATIONS
    // ============================================
    const Notifications = {
        container: null,
        
        init() {
            this.container = document.createElement('div');
            this.container.className = 'notification-container';
            this.container.style.cssText = `
                position: fixed;
                top: 80px;
                right: 20px;
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            document.body.appendChild(this.container);
        },
        
        show(message, type = 'success', duration = 3000) {
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            `;
            
            notification.style.cssText = `
                background: rgba(30, 41, 59, 0.95);
                border-left: 4px solid ${this.getColor(type)};
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
                gap: 15px;
                min-width: 300px;
                animation: slideIn 0.3s ease;
                backdrop-filter: blur(10px);
            `;
            
            this.container.appendChild(notification);
            
            // Auto remove
            setTimeout(() => {
                this.remove(notification);
            }, duration);
            
            // Close button
            notification.querySelector('.notification-close').addEventListener('click', () => {
                this.remove(notification);
            });
        },
        
        remove(notification) {
            notification.style.animation = 'slideOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        },
        
        getColor(type) {
            const colors = {
                success: '#22c55e',
                warning: '#f59e0b',
                error: '#ef4444',
                info: '#3b82f6'
            };
            return colors[type] || colors.info;
        }
    };

    // ============================================
    // SIDEBAR
    // ============================================
    const Sidebar = {
        init() {
            this.createMobileToggle();
            this.setupTooltips();
        },
        
        createMobileToggle() {
            const toggle = document.createElement('button');
            toggle.className = 'sidebar-toggle';
            toggle.innerHTML = '☰';
            toggle.style.cssText = `
                position: fixed;
                top: 80px;
                left: 20px;
                z-index: 1001;
                background: var(--primary);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 8px;
                font-size: 1.2rem;
                cursor: pointer;
                display: none;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            
            toggle.addEventListener('click', () => {
                const sidebar = document.getElementById('sidebar');
                sidebar.classList.toggle('open');
            });
            
            document.body.appendChild(toggle);
            
            // Show toggle on mobile
            if (window.innerWidth <= 768) {
                toggle.style.display = 'flex';
                toggle.style.alignItems = 'center';
                toggle.style.justifyContent = 'center';
            }
            
            window.addEventListener('resize', () => {
                toggle.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
                toggle.style.alignItems = 'center';
                toggle.style.justifyContent = 'center';
            });
        },
        
        setupTooltips() {
            document.querySelectorAll('.nav-item').forEach(item => {
                const title = item.querySelector('span')?.textContent;
                if (title) {
                    item.title = title;
                }
            });
        }
    };

    // ============================================
    // ANIMATIONS
    // ============================================
    const Animations = {
        init() {
            this.setupScrollAnimations();
            this.setupHoverEffects();
        },
        
        setupScrollAnimations() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-slide-in');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            document.querySelectorAll('.card, .village-card, .building-card').forEach(el => {
                observer.observe(el);
            });
        },
        
        setupHoverEffects() {
            document.querySelectorAll('.resource-item').forEach(item => {
                item.addEventListener('mouseenter', () => {
                    item.style.transform = 'translateY(-2px) scale(1.02)';
                });
                item.addEventListener('mouseleave', () => {
                    item.style.transform = '';
                });
            });
        }
    };

    // ============================================
    // KEYBOARD SHORTCUTS
    // ============================================
    const KeyboardShortcuts = {
        init() {
            document.addEventListener('keydown', (e) => {
                // Don't trigger if typing in input
                if (e.target.matches('input, textarea, select')) return;
                
                switch(e.key) {
                    case '1':
                        if (e.altKey) window.location.href = 'dorf1.php';
                        break;
                    case '2':
                        if (e.altKey) window.location.href = 'dorf2.php';
                        break;
                    case '3':
                        if (e.altKey) window.location.href = 'karte.php';
                        break;
                    case '4':
                        if (e.altKey) window.location.href = 'statistiken.php';
                        break;
                    case 'm':
                        if (e.altKey) window.location.href = 'nachrichten.php';
                        break;
                    case 'r':
                        if (e.altKey) window.location.href = 'berichte.php';
                        break;
                    case 'Escape':
                        document.getElementById('sidebar')?.classList.remove('open');
                        break;
                }
            });
        }
    };

    // ============================================
    // DARK MODE
    // ============================================
    const DarkMode = {
        init() {
            // Check system preference
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
                // User prefers light mode, could add toggle here
            }
        }
    };

    // ============================================
    // INITIALIZE
    // ============================================
    document.addEventListener('DOMContentLoaded', () => {
        ResourceUpdater.init();
        BuildingQueue.init();
        Notifications.init();
        Sidebar.init();
        Animations.init();
        KeyboardShortcuts.init();
        DarkMode.init();
        
        console.log('🎮 Travian Modern UI loaded successfully!');
    });

    // Expose global functions
    window.TravianModern = {
        notify: (msg, type) => Notifications.show(msg, type),
        updateResource: (res, val) => ResourceUpdater.updateDisplay(res, val)
    };

})();
