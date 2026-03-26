<?php
/**
 * Travian Modern Auction House
 * Buy and sell hero items with Gold
 */

include("GameEngine/Village.php");
include("GameEngine/Database.php");
include("GameEngine/Gold.php");

$goldSystem = new GoldSystem($database, $session);

// Get user's items
$userItems = $database->query_return("SELECT * FROM s1_hero_items WHERE uid = {$session->uid} AND num > 0");

// Get active auctions
$auctions = $database->query_return("SELECT a.*, u.username as seller_name 
                                     FROM s1_auction a 
                                     JOIN s1_users u ON a.seller = u.id 
                                     WHERE a.status = 'active' 
                                     ORDER BY a.time DESC 
                                     LIMIT 20");

// Get my bids
$myBids = $database->query_return("SELECT a.*, u.username as seller_name 
                                   FROM s1_auction a 
                                   JOIN s1_users u ON a.seller = u.id 
                                   WHERE a.bidder = {$session->uid} AND a.status = 'active'");

?>
<!DOCTYPE html>
<html>
<head>
    <title>Auction House - Travian</title>
    <link rel="stylesheet" href="gpack/travian_modern/lang/en/lang.css">
    <link rel="stylesheet" href="gpack/travian_modern/travian.css">
    <style>
        .auction-header {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(139, 92, 246, 0.1));
            padding: 25px;
            border-radius: 16px;
            margin-bottom: 30px;
        }
        
        .auction-tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 30px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 15px;
        }
        
        .auction-tab {
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s ease;
            color: var(--text-muted);
        }
        
        .auction-tab:hover {
            background: rgba(255,255,255,0.05);
            color: var(--text-primary);
        }
        
        .auction-tab.active {
            background: var(--primary);
            color: white;
        }
        
        .auction-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
        }
        
        .auction-item {
            background: var(--bg-card);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 16px;
            padding: 20px;
            transition: all 0.3s ease;
        }
        
        .auction-item:hover {
            border-color: var(--primary);
            transform: translateY(-3px);
        }
        
        .item-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--bg-tertiary), var(--bg-secondary));
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            margin-bottom: 15px;
        }
        
        .item-name {
            font-weight: 700;
            font-size: 1.1rem;
            margin-bottom: 5px;
        }
        
        .item-stats {
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-bottom: 15px;
        }
        
        .auction-price {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 1.3rem;
            font-weight: 700;
            color: #fbbf24;
            margin-bottom: 10px;
        }
        
        .auction-seller {
            color: var(--text-muted);
            font-size: 0.85rem;
            margin-bottom: 15px;
        }
        
        .auction-timer {
            background: rgba(239, 68, 68, 0.1);
            color: #fca5a5;
            padding: 5px 10px;
            border-radius: 6px;
            font-size: 0.85rem;
            margin-bottom: 15px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
        }
        
        .bid-form {
            display: flex;
            gap: 10px;
        }
        
        .bid-form input {
            flex: 1;
            background: var(--bg-tertiary);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 10px;
            color: white;
        }
        
        .bid-form button {
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .my-items {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
            margin-top: 20px;
        }
        
        .my-item {
            background: var(--bg-card);
            border: 1px solid rgba(255,255,255,0.05);
            border-radius: 12px;
            padding: 15px;
            text-align: center;
        }
        
        .my-item .item-icon {
            margin: 0 auto 10px;
            width: 50px;
            height: 50px;
        }
        
        .sell-form {
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .sell-form input {
            background: var(--bg-tertiary);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 8px;
            padding: 8px;
            color: white;
            text-align: center;
        }
        
        .sell-form button {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: black;
            border: none;
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }
        
        .bid-history {
            margin-top: 30px;
        }
        
        .bid-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 15px;
            background: var(--bg-card);
            border-radius: 10px;
            margin-bottom: 10px;
        }
        
        .bid-status {
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
        }
        
        .bid-status.winning {
            background: rgba(34, 197, 94, 0.2);
            color: #86efac;
        }
        
        .bid-status.outbid {
            background: rgba(239, 68, 68, 0.2);
            color: #fca5a5;
        }
    </style>
</head>
<body class="presto">
    <?php include("Templates/header_modern.tpl"); ?>
    
    <div id="content">
        <div class="auction-header">
            <h1 style="font-size: 1.8rem; margin-bottom: 10px;">🏛️ Auction House</h1>
            <p style="color: var(--text-muted);">Buy and sell hero items with Gold</p>
            
            <div style="display: flex; gap: 20px; margin-top: 20px;">
                <div style="background: rgba(0,0,0,0.2); padding: 10px 20px; border-radius: 10px;">
                    <div style="font-size: 1.5rem; font-weight: 700;"><?php echo number_format($goldSystem->getGold()); ?></div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">🥇 Your Gold</div>
                </div>
                <div style="background: rgba(0,0,0,0.2); padding: 10px 20px; border-radius: 10px;">
                    <div style="font-size: 1.5rem; font-weight: 700;"><?php echo count($auctions); ?></div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">📦 Active Auctions</div>
                </div>
            </div>
        </div>
        
        <div class="auction-tabs">
            <div class="auction-tab active" onclick="showTab('browse')">🔍 Browse Auctions</div>
            <div class="auction-tab" onclick="showTab('sell')">📤 Sell Items</div>
            <div class="auction-tab" onclick="showTab('bids')">📋 My Bids</div>
        </div>
        
        <!-- Browse Tab -->
        <div id="browse-tab" class="tab-content">
            <h2 style="margin-bottom: 20px;">Active Auctions</h2>
            
            <?php if (empty($auctions)): ?>
            <div style="text-align: center; padding: 50px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 15px;">📭</div>
                <p>No active auctions at the moment.</p>
                <p>Check back later or sell your own items!</p>
            </div>
            <?php else: ?>
            <div class="auction-grid">
                <?php foreach ($auctions as $auction): 
                    $itemIcons = [
                        1 => '⚔️', 2 => '🛡️', 3 => '👢', 4 => '🪖',
                        5 => '🐴', 6 => '📿', 7 => '💍', 8 => '🎭'
                    ];
                    $itemNames = [
                        1 => 'Sword of Power', 2 => 'Shield of Defense', 
                        3 => 'Boots of Speed', 4 => 'Helmet of Wisdom',
                        5 => 'War Horse', 6 => 'Amulet of Luck',
                        7 => 'Ring of Strength', 8 => 'Mask of Shadows'
                    ];
                ?>
                <div class="auction-item">
                    <div class="item-icon"><?php echo $itemIcons[$auction['item']] ?? '📦'; ?></div>
                    <div class="item-name"><?php echo $itemNames[$auction['item']] ?? 'Unknown Item'; ?></div>
                    <div class="item-stats">Level <?php echo rand(1, 20); ?> • <?php echo rand(5, 50); ?> Power</div>
                    
                    <div class="auction-price">
                        🥇 <?php echo number_format($auction['price']); ?>
                    </div>
                    
                    <div class="auction-seller">
                        Seller: <?php echo htmlspecialchars($auction['seller_name']); ?>
                    </div>
                    
                    <div class="auction-timer">
                        ⏰ <?php echo rand(1, 23); ?>h remaining
                    </div>
                    
                    <form class="bid-form" method="post" action="">
                        <input type="hidden" name="auction_id" value="<?php echo $auction['id']; ?>">
                        <input type="number" name="bid" placeholder="Bid amount" min="<?php echo $auction['price'] + 1; ?>">
                        <button type="submit">Bid</button>
                    </form>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
        
        <!-- Sell Tab -->
        <div id="sell-tab" class="tab-content" style="display: none;">
            <h2 style="margin-bottom: 20px;">Your Items</h2>
            
            <?php if (empty($userItems)): ?>
            <div style="text-align: center; padding: 50px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 15px;">🎒</div>
                <p>Your inventory is empty.</p>
                <p>Complete adventures to find items!</p>
            </div>
            <?php else: ?>
            <div class="my-items">
                <?php foreach ($userItems as $item): 
                    $itemIcons = [1 => '⚔️', 2 => '🛡️', 3 => '👢', 4 => '🪖', 5 => '🐴', 6 => '📿', 7 => '💍', 8 => '🎭'];
                    $itemNames = [1 => 'Sword', 2 => 'Shield', 3 => 'Boots', 4 => 'Helmet', 5 => 'Horse', 6 => 'Amulet', 7 => 'Ring', 8 => 'Mask'];
                ?>
                <div class="my-item">
                    <div class="item-icon"><?php echo $itemIcons[$item['item']] ?? '📦'; ?></div>
                    <div style="font-weight: 600;"><?php echo $itemNames[$item['item']] ?? 'Item'; ?></div>
                    <div style="color: var(--text-muted); font-size: 0.85rem; margin-bottom: 10px;">
                        Qty: <?php echo $item['num']; ?>
                    </div>
                    
                    <form class="sell-form" method="post">
                        <input type="hidden" name="item_id" value="<?php echo $item['item']; ?>">
                        <input type="number" name="price" placeholder="Price in Gold" min="1">
                        <button type="submit" name="sell_item">Sell Item</button>
                    </form>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
        
        <!-- My Bids Tab -->
        <div id="bids-tab" class="tab-content" style="display: none;">
            <h2 style="margin-bottom: 20px;">My Active Bids</h2>
            
            <?php if (empty($myBids)): ?>
            <div style="text-align: center; padding: 50px; color: var(--text-muted);">
                <div style="font-size: 3rem; margin-bottom: 15px;">🎯</div>
                <p>You haven't placed any bids yet.</p>
            </div>
            <?php else: ?>
            <div class="bid-history">
                <?php foreach ($myBids as $bid): 
                    $isWinning = $bid['bid'] >= $bid['price'];
                ?>
                <div class="bid-item">
                    <div>
                        <div style="font-weight: 600;">Item #<?php echo $bid['item']; ?></div>
                        <div style="color: var(--text-muted); font-size: 0.85rem;">
                            Seller: <?php echo htmlspecialchars($bid['seller_name']); ?>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-weight: 700; color: #fbbf24;">
                            🥇 <?php echo number_format($bid['bid']); ?>
                        </div>
                        <div class="bid-status <?php echo $isWinning ? 'winning' : 'outbid'; ?>">
                            <?php echo $isWinning ? '✓ Winning' : '⚠ Outbid'; ?>
                        </div>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
            <?php endif; ?>
        </div>
        
    </div>
    
    <?php include("Templates/footer_modern.tpl"); ?>
    
    <script>
        function showTab(tab) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(el => {
                el.style.display = 'none';
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.auction-tab').forEach(el => {
                el.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tab + '-tab').style.display = 'block';
            
            // Add active class to clicked tab
            event.target.classList.add('active');
        }
    </script>
</body>
</html>
