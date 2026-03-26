<?php
/**
 * Modern Footer Template for Travian
 * Version: 2025 Modern UI
 */
?>

</main><!-- /#main-content -->

<!-- Modern Footer -->
<footer id="footer" style="margin-left: 260px; padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.05); margin-top: 40px;">
    <div style="display: flex; justify-content: center; gap: 20px; margin-bottom: 10px;">
        <a href="support.php" style="color: var(--text-muted); text-decoration: none;">Support</a>
        <a href="spielregeln.php" style="color: var(--text-muted); text-decoration: none;">Rules</a>
        <a href="anleitung.php" style="color: var(--text-muted); text-decoration: none;">Manual</a>
        <a href="tutorial.php" style="color: var(--text-muted); text-decoration: none;">Tutorial</a>
    </div>
    <div>
        &copy; <?php echo date('Y'); ?> Travian Modern | Server Time: <span id="servertime"><?php echo date('H:i:s'); ?></span>
    </div>
</footer>

<!-- Modern JavaScript -->
<script>
// Resource update animation
function updateResource(resource, value, rate) {
    const element = document.getElementById('res_' + resource);
    const rateElement = document.getElementById('prod_' + resource);
    
    if (element) {
        // Animate number change
        element.style.transform = 'scale(1.1)';
        element.style.color = 'var(--success)';
        element.textContent = value;
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '';
        }, 300);
    }
}

// Auto-update server time
function updateServerTime() {
    const timeElement = document.getElementById('servertime');
    if (timeElement) {
        const now = new Date();
        timeElement.textContent = now.toLocaleTimeString();
    }
}
setInterval(updateServerTime, 1000);

// Sidebar toggle for mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('open');
}

// Card hover effects
document.querySelectorAll('.card, .village-card, .building-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
</script>

</body>
</html>
