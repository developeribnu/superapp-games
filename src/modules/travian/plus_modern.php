<?php
/**
 * Travian Modern Plus/Gold Shop
 * Version: 2025
 */

include("GameEngine/Village.php");
include("GameEngine/Database.php");
include("GameEngine/Gold.php");

$goldSystem = new GoldSystem($database, $session);

// Handle actions
$message = '';
if (isset($_POST['action'])) {
    switch($_POST['action']) {
        case 'buy_plus':
            $result = $goldSystem->activatePlus();
            $message = $result['message'];
            break;
        case 'buy_goldclub':
            $result = $goldSystem->activateGoldClub();
            $message = $result['message'];
            break;
        case 'buy_resource':
            $result = $goldSystem->activateResourceBonus();
            $message = $result['message'];
            break;
        case 'convert_silver':
            $converted = $goldSystem->silverToGold();
            $message = $converted > 0 ? "Converted $converted gold from silver!" : "Not enough silver (need 200 per gold)";
            break;
    }
}

$gold = $goldSystem->getGold();
$silver = $goldSystem->getSilver();
$hasPlus = $goldSystem->hasPlusAccount();
$hasGoldClub = $goldSystem->hasGoldClub();
$plusTimeRemaining = $goldSystem->getPlusTimeRemaining();
$resourceBonus = $goldSystem->getResourceBonus();

?>
<!DOCTYPE html>
<html>
<head>
    <title>Plus & Gold - Travian</title>
    <link rel="stylesheet" href="gpack/travian_modern/lang/en/lang.css">
    <link rel="stylesheet" href="gpack/travian_modern/travian.css">
    <style>
        .gold-header {
            background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
            padding: 30px;
            border-radius: 16px;
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        
        .gold-header::before {
            content: '✨';
            position: absolute;
            font-size: 100px;
            opacity: 0.2;
            top: -20px;
            left: 20px;
        }
        
        .gold-header::after {
            content: '💰';
            position: absolute;
            font-size: 80px;
            opacity: 0.2;
            bottom: -20px;
            right: 20px;
        }
        
        .gold-balance {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: rgba(0,0,0,0.2);
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
        }
        
        .balance-section {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
        }
        
        .balance-card {
            background: rgba(255,255,255,0.1);
            padding: 15px 25px;
            border-radius: 12px;
            text-align: center;
        }
        
        .balance-card .value {
            font-size: 1.8rem;
            font-weight: 700;
            color: white;
        }
        
        .balance-card .label {
            font-size: 0.85rem;
            color: rgba(255,255,255,0.8);
            text-transform: uppercase;
        }
        
        .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 40px 0 20px;
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .plus-card {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1));
            border: 2px solid rgba(99, 102, 241, 0.3);
            border-radius: 16px;
            padding: 25px;
            margin-bottom: 20px;
            position: relative;
            overflow: hidden;
        }
        
        .plus-card.active {
            border-color: #22c55e;
            background: linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05));
        }
        
        .plus-badge {
            position: absolute;
            top: 15px;
            right: 15px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
        }
        
        .plus-badge.active {
            background: linear-gradient(135deg, #22c55e, #16a34a);
        }
        
        .benefit-list {
            list-style: none;
            padding: 0;
            margin: 20px 0;
        }
        
        .benefit-list li {
            padding: 10px 0;
            border-bottom: 1px solid rgba(255,255,255,0.05);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .benefit-list li:last-child {
            border-bottom: none;
        }
        
        .price-tag {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            background: rgba(251, 191, 36, 0.2);
            color: #fbbf24;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: 700;
        }
        
        .gold-packages {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .package-card {
            background: var(--bg-card);
            border: 2px solid rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .package-card:hover {
            transform: translateY(-5px);
            border-color: #fbbf24;
            box-shadow: 0 10px 30px rgba(251, 191, 36, 0.2);
        }
        
        .package-card.popular {
            border-color: #fbbf24;
            transform: scale(1.05);
        }
        
        .popular-badge {
            position: absolute;
            top: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: black;
            padding: 5px 15px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 700;
        }
        
        .package-gold {
            font-size: 3rem;
            font-weight: 800;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 10px 0;
        }
        
        .package-bonus {
            color: #22c55e;
            font-size: 0.9rem;
            font-weight: 600;
            margin-bottom: 10px;
        }
        
        .package-price {
            font-size: 1.5rem;
            font-weight: 700;
            color: white;
            margin: 15px 0;
        }
        
        .btn-gold {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: black;
            border: none;
            padding: 12px 30px;
            border-radius: 10px;
            font-weight: 700;
            cursor: pointer;
            width: 100%;
            transition: all 0.3s ease;
        }
        
        .btn-gold:hover {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(251, 191, 36, 0.4);
        }
        
        .alert {
            padding: 15px 20px;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .alert-success {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid rgba(34, 197, 94, 0.3);
            color: #86efac;
        }
        
        .alert-error {
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: #fca5a5;
        }
    </style>
</head>
<body class="presto">
    <?php include("Templates/header_modern.tpl"); ?>
    
    <div id="content">
        <?php if ($message): ?>
        <div class="alert alert-<?php echo strpos($message, 'enough') !== false ? 'error' : 'success'; ?>">
            <?php echo $message; ?>
        </div>
        <?php endif; ?>
        
        <!-- Gold Balance Header -->
        <div class="gold-header">
            <h1 style="color: white; font-size: 2rem; margin-bottom: 10px;">💎 Plus & Gold</h1>
            <p style="color: rgba(255,255,255,0.8);">Unlock premium features and enhance your gameplay</p>
            
            <div class="balance-section">
                <div class="balance-card">
                    <div class="value"><?php echo number_format($gold); ?></div>
                    <div class="label">🥇 Gold</div>
                </div>
                <div class="balance-card">
                    <div class="value"><?php echo number_format($silver); ?></div>
                    <div class="label">🥈 Silver</div>
                </div>
            </div>
            
            <?php if ($silver >= 200): ?>
            <form method="post" style="margin-top: 15px;">
                <input type="hidden" name="action" value="convert_silver">
                <button type="submit" class="btn btn-secondary">
                    🔄 Convert 200 Silver → 1 Gold
                </button>
            </form>
            <?php endif; ?>
        </div>
        
        <!-- Plus Account Section -->
        <h2 class="section-title">
            ⭐ Plus Account
            <?php if ($hasPlus): ?>
            <span class="badge badge-success">Active</span>
            <?php endif; ?>
        </h2>
        
        <div class="plus-card <?php echo $hasPlus ? 'active' : ''; ?>">
            <div class="plus-badge <?php echo $hasPlus ? 'active' : ''; ?>">
                <?php echo $hasPlus ? '✓ Active' : 'Plus'; ?>
            </div>
            
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">Plus Account Benefits</h3>
            
            <?php if ($hasPlus): ?>
            <p style="color: #22c55e; margin-bottom: 15px;">
                ⏰ Time remaining: <?php echo $goldSystem->formatTimeRemaining($plusTimeRemaining); ?>
            </p>
            <?php endif; ?>
            
            <ul class="benefit-list">
                <?php foreach (GoldSystem::getPlusBenefits() as $icon => $desc): ?>
                <li>
                    <span><?php echo $icon; ?></span>
                    <span><?php echo $desc; ?></span>
                </li>
                <?php endforeach; ?>
            </ul>
            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
                <span class="price-tag">
                    🥇 <?php echo GoldSystem::$PLUS_COSTS['plus_account']; ?> Gold
                </span>
                <span style="color: var(--text-muted);">for 10 days</span>
            </div>
            
            <?php if (!$hasPlus): ?>
            <form method="post" style="margin-top: 15px;">
                <input type="hidden" name="action" value="buy_plus">
                <button type="submit" class="btn btn-primary" style="width: 100%;" 
                    <?php echo $gold < GoldSystem::$PLUS_COSTS['plus_account'] ? 'disabled' : ''; ?>>
                    Activate Plus Account
                </button>
            </form>
            <?php else: ?>
            <form method="post" style="margin-top: 15px;">
                <input type="hidden" name="action" value="buy_plus">
                <button type="submit" class="btn btn-success" style="width: 100%;">
                    Extend Plus Account
                </button>
            </form>
            <?php endif; ?>
        </div>
        
        <!-- Gold Club Section -->
        <h2 class="section-title">
            👑 Gold Club
            <?php if ($hasGoldClub): ?>
            <span class="badge badge-success">Active</span>
            <?php endif; ?>
        </h2>
        
        <div class="plus-card <?php echo $hasGoldClub ? 'active' : ''; ?>">
            <div class="plus-badge <?php echo $hasGoldClub ? 'active' : ''; ?>">
                <?php echo $hasGoldClub ? '✓ Active' : 'Gold Club'; ?>
            </div>
            
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">Gold Club Benefits (Permanent)</h3>
            
            <ul class="benefit-list">
                <?php foreach (GoldSystem::getGoldClubBenefits() as $icon => $desc): ?>
                <li>
                    <span><?php echo $icon; ?></span>
                    <span><?php echo $desc; ?></span>
                </li>
                <?php endforeach; ?>
            </ul>
            
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
                <span class="price-tag">
                    🥇 <?php echo GoldSystem::$PLUS_COSTS['gold_club']; ?> Gold
                </span>
                <span style="color: var(--text-muted);">one-time purchase</span>
            </div>
            
            <?php if (!$hasGoldClub): ?>
            <form method="post" style="margin-top: 15px;">
                <input type="hidden" name="action" value="buy_goldclub">
                <button type="submit" class="btn btn-primary" style="width: 100%;"
                    <?php echo $gold < GoldSystem::$PLUS_COSTS['gold_club'] ? 'disabled' : ''; ?>>
                    Activate Gold Club
                </button>
            </form>
            <?php else: ?>
            <button class="btn btn-success" style="width: 100%; margin-top: 15px;" disabled>
                ✓ Already Active
            </button>
            <?php endif; ?>
        </div>
        
        <!-- Resource Bonus -->
        <h2 class="section-title">⚡ Resource Bonus</h2>
        
        <div class="plus-card <?php echo $resourceBonus > 1 ? 'active' : ''; ?>">
            <h3 style="font-size: 1.3rem; margin-bottom: 10px;">+25% Resource Production</h3>
            <p style="color: var(--text-muted); margin-bottom: 20px;">
                Boost all your resource fields production by 25% for 7 days
            </p>
            
            <?php if ($resourceBonus > 1): ?>
            <p style="color: #22c55e; margin-bottom: 15px;">✓ Currently Active</p>
            <?php endif; ?>
            
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <span class="price-tag">
                    🥇 <?php echo GoldSystem::$PLUS_COSTS['resource_bonus']; ?> Gold
                </span>
                <span style="color: var(--text-muted);">for 7 days</span>
            </div>
            
            <form method="post" style="margin-top: 15px;">
                <input type="hidden" name="action" value="buy_resource">
                <button type="submit" class="btn btn-primary" style="width: 100%;"
                    <?php echo $gold < GoldSystem::$PLUS_COSTS['resource_bonus'] ? 'disabled' : ''; ?>>
                    Activate Bonus
                </button>
            </form>
        </div>
        
        <!-- Buy Gold Packages -->
        <h2 class="section-title">💰 Buy Gold</h2>
        
        <div class="gold-packages">
            <?php 
            $packages = GoldSystem::$GOLD_PACKAGES;
            $popular = 'large'; // Middle package is popular
            
            foreach ($packages as $id => $package): 
                $isPopular = $id === $popular;
            ?>
            <div class="package-card <?php echo $isPopular ? 'popular' : ''; ?>">
                <?php if ($isPopular): ?>
                <div class="popular-badge">⭐ Popular</div>
                <?php endif; ?>
                
                <div style="font-size: 0.9rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">
                    <?php echo ucfirst($id); ?> Package
                </div>
                
                <div class="package-gold">
                    <?php echo number_format($package['gold'] + $package['bonus']); ?>
                </div>
                
                <div style="color: var(--text-muted); font-size: 0.9rem;">Gold</div>
                
                <?php if ($package['bonus'] > 0): ?>
                <div class="package-bonus">
                    +<?php echo $package['bonus']; ?> Bonus Gold
                </div>
                <?php endif; ?>
                
                <div class="package-price">
                    $<?php echo $package['price']; ?>
                </div>
                
                <button class="btn-gold" onclick="buyGold('<?php echo $id; ?>')">
                    Buy Now
                </button>
            </div>
            <?php endforeach; ?>
        </div>
        
        <!-- Payment Modal (Simulated for local server) -->
        <div id="paymentModal" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); z-index: 9999; align-items: center; justify-content: center;">
            <div style="background: var(--bg-secondary); padding: 30px; border-radius: 16px; max-width: 400px; text-align: center;">
                <h3 style="margin-bottom: 15px;">💳 Payment Simulation</h3>
                <p style="color: var(--text-muted); margin-bottom: 20px;">
                    This is a local development server. Gold will be added for free for testing.
                </p>
                <div id="packageInfo" style="background: rgba(251, 191, 36, 0.1); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    Loading...
                </div>
                <button class="btn btn-primary" onclick="confirmFreeGold()" style="width: 100%; margin-bottom: 10px;">
                    ✓ Get Free Gold (Test Mode)
                </button>
                <button class="btn btn-secondary" onclick="closePaymentModal()" style="width: 100%;">
                    Cancel
                </button>
            </div>
        </div>
        
    </div>
    
    <?php include("Templates/footer_modern.tpl"); ?>
    
    <script>
        let selectedPackage = null;
        const packages = <?php echo json_encode(GoldSystem::$GOLD_PACKAGES); ?>;
        
        function buyGold(packageId) {
            selectedPackage = packageId;
            const pkg = packages[packageId];
            const total = pkg.gold + pkg.bonus;
            
            document.getElementById('packageInfo').innerHTML = `
                <div style="font-size: 1.5rem; font-weight: 700; color: #fbbf24;">${total} Gold</div>
                <div style="color: var(--text-muted);">$${pkg.price} USD</div>
                ${pkg.bonus > 0 ? `<div style="color: #22c55e; font-size: 0.9rem;">+${pkg.bonus} Bonus</div>` : ''}
            `;
            
            document.getElementById('paymentModal').style.display = 'flex';
        }
        
        function closePaymentModal() {
            document.getElementById('paymentModal').style.display = 'none';
        }
        
        function confirmFreeGold() {
            if (!selectedPackage) return;
            
            // Simulate API call
            const pkg = packages[selectedPackage];
            const total = pkg.gold + pkg.bonus;
            
            // In real implementation, this would be an AJAX call
            alert(`✓ ${total} Gold has been added to your account! (Test Mode)`);
            
            // Reload to show updated balance
            location.reload();
        }
    </script>
</body>
</html>
