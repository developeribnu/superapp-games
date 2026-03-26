<?php
/**
 * Modern Header Template for Travian
 * Version: 2025 Modern UI
 */
?>

<!-- Modern Resource Bar -->
<div id="resBar">
    <div class="resource-item">
        <div class="resource-icon wood">🌲</div>
        <div class="resource-info">
            <div class="resource-value" id="res_wood"><?php echo $village->awood; ?></div>
            <div class="resource-rate" id="prod_wood">+<?php echo $village->getProd("wood"); ?>/h</div>
        </div>
    </div>
    
    <div class="resource-item">
        <div class="resource-icon clay">🏺</div>
        <div class="resource-info">
            <div class="resource-value" id="res_clay"><?php echo $village->aclay; ?></div>
            <div class="resource-rate" id="prod_clay">+<?php echo $village->getProd("clay"); ?>/h</div>
        </div>
    </div>
    
    <div class="resource-item">
        <div class="resource-icon iron">⛏️</div>
        <div class="resource-info">
            <div class="resource-value" id="res_iron"><?php echo $village->airon; ?></div>
            <div class="resource-rate" id="prod_iron">+<?php echo $village->getProd("iron"); ?>/h</div>
        </div>
    </div>
    
    <div class="resource-item">
        <div class="resource-icon crop">🌾</div>
        <div class="resource-info">
            <div class="resource-value" id="res_crop"><?php echo $village->acrop; ?></div>
            <div class="resource-rate <?php echo ($village->getProd("crop") < 0) ? 'negative' : ''; ?>" id="prod_crop">
                <?php echo ($village->getProd("crop") >= 0) ? '+' : ''; ?><?php echo $village->getProd("crop"); ?>/h
            </div>
        </div>
    </div>
    
    <div style="margin-left: auto; display: flex; gap: 10px;">
        <a href="plus.php" class="btn btn-primary">
            <span>⭐ Plus</span>
        </a>
        <a href="spieler.php" class="btn btn-secondary">
            <span>👤 <?php echo $session->username; ?></span>
        </a>
    </div>
</div>

<!-- Modern Sidebar Navigation -->
<nav id="sidebar">
    <div class="nav-section">
        <div class="nav-title">Village</div>
        <a href="dorf1.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'dorf1.php') ? 'active' : ''; ?>">
            <i>🏘️</i>
            <span>Overview</span>
        </a>
        <a href="dorf2.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'dorf2.php') ? 'active' : ''; ?>">
            <i>🏛️</i>
            <span>Centre</span>
        </a>
        <a href="build.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'build.php') ? 'active' : ''; ?>">
            <i>🔨</i>
            <span>Build</span>
        </a>
    </div>
    
    <div class="nav-section">
        <div class="nav-title">World</div>
        <a href="karte.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'karte.php') ? 'active' : ''; ?>">
            <i>🗺️</i>
            <span>Map</span>
        </a>
        <a href="statistiken.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'statistiken.php') ? 'active' : ''; ?>">
            <i>📊</i>
            <span>Statistics</span>
        </a>
    </div>
    
    <div class="nav-section">
        <div class="nav-title">Communication</div>
        <a href="nachrichten.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'nachrichten.php') ? 'active' : ''; ?>">
            <i>✉️</i>
            <span>Messages <?php echo ($message->unread > 0) ? '<span class="badge badge-danger">'.$message->unread.'</span>' : ''; ?></span>
        </a>
        <a href="berichte.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'berichte.php') ? 'active' : ''; ?>">
            <i>📜</i>
            <span>Reports <?php echo ($message->nunread > 0) ? '<span class="badge badge-warning">'.$message->nunread.'</span>' : ''; ?></span>
        </a>
        <a href="allianz.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'allianz.php') ? 'active' : ''; ?>">
            <i>🛡️</i>
            <span>Alliance</span>
        </a>
    </div>
    
    <div class="nav-section">
        <div class="nav-title">Hero</div>
        <a href="hero.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'hero.php') ? 'active' : ''; ?>">
            <i>🦸</i>
            <span>Hero</span>
        </a>
        <a href="adventure.php" class="nav-item <?php echo (basename($_SERVER['PHP_SELF']) == 'adventure.php') ? 'active' : ''; ?>">
            <i>🗡️</i>
            <span>Adventures</span>
        </a>
    </div>
</nav>

<!-- Main Content Area -->
<main id="main-content">
