<?php
/**
 * Travian Gold System
 * Version: 2025 Modern
 * Features: Gold currency, Plus Account, Gold Club, Shop
 */

class GoldSystem {
    private $database;
    private $session;
    
    // Gold package prices (in local currency)
    public static $GOLD_PACKAGES = [
        'small' => ['gold' => 30, 'price' => 2.99, 'bonus' => 0],
        'medium' => ['gold' => 100, 'price' => 8.99, 'bonus' => 5],
        'large' => ['gold' => 250, 'price' => 19.99, 'bonus' => 25],
        'xlarge' => ['gold' => 600, 'price' => 44.99, 'bonus' => 100],
        'mega' => ['gold' => 1600, 'price' => 99.99, 'bonus' => 400],
    ];
    
    // Plus features costs
    public static $PLUS_COSTS = [
        'plus_account' => 10,      // 10 gold for Plus Account
        'plus_duration' => 240,    // hours (10 days)
        'gold_club' => 100,        // 100 gold for Gold Club
        'resource_bonus' => 5,     // 5 gold for 25% resource bonus
        'resource_duration' => 168, // hours (7 days)
    ];
    
    public function __construct($database, $session) {
        $this->database = $database;
        $this->session = $session;
    }
    
    /**
     * Get user's gold balance
     */
    public function getGold($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT gold FROM s1_users WHERE id = $uid");
        return $user[0]['gold'] ?? 0;
    }
    
    /**
     * Get user's silver balance
     */
    public function getSilver($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT silver FROM s1_users WHERE id = $uid");
        return $user[0]['silver'] ?? 0;
    }
    
    /**
     * Add gold to user
     */
    public function addGold($amount, $uid = null, $reason = 'purchase') {
        $uid = $uid ?: $this->session->uid;
        $this->database->query("UPDATE s1_users SET gold = gold + $amount WHERE id = $uid");
        $this->logTransaction($uid, 'gold', $amount, $reason);
        return true;
    }
    
    /**
     * Deduct gold from user
     */
    public function deductGold($amount, $uid = null, $reason = 'purchase') {
        $uid = $uid ?: $this->session->uid;
        $current = $this->getGold($uid);
        
        if ($current < $amount) {
            return false; // Not enough gold
        }
        
        $this->database->query("UPDATE s1_users SET gold = gold - $amount WHERE id = $uid");
        $this->logTransaction($uid, 'gold', -$amount, $reason);
        return true;
    }
    
    /**
     * Convert silver to gold (200 silver = 1 gold)
     */
    public function silverToGold($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $silver = $this->getSilver($uid);
        $goldAmount = floor($silver / 200);
        
        if ($goldAmount > 0) {
            $silverDeduct = $goldAmount * 200;
            $this->database->query("UPDATE s1_users SET silver = silver - $silverDeduct, gold = gold + $goldAmount WHERE id = $uid");
            return $goldAmount;
        }
        return 0;
    }
    
    /**
     * Check if user has Plus Account
     */
    public function hasPlusAccount($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT plus FROM s1_users WHERE id = $uid");
        if (!$user[0]['plus']) return false;
        
        $plusTime = $this->database->query_return("SELECT plus_time FROM s1_users WHERE id = $uid");
        return strtotime($plusTime[0]['plus_time']) > time();
    }
    
    /**
     * Check if user has Gold Club
     */
    public function hasGoldClub($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT goldclub FROM s1_users WHERE id = $uid");
        return $user[0]['goldclub'] == 1;
    }
    
    /**
     * Activate Plus Account
     */
    public function activatePlus($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $cost = self::$PLUS_COSTS['plus_account'];
        
        if (!$this->deductGold($cost, $uid, 'plus_account')) {
            return ['success' => false, 'message' => 'Not enough gold'];
        }
        
        $hours = self::$PLUS_COSTS['plus_duration'];
        $endTime = date('Y-m-d H:i:s', time() + ($hours * 3600));
        
        $this->database->query("UPDATE s1_users SET plus = 1, plus_time = '$endTime' WHERE id = $uid");
        
        return ['success' => true, 'message' => 'Plus Account activated!', 'expires' => $endTime];
    }
    
    /**
     * Activate Gold Club
     */
    public function activateGoldClub($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $cost = self::$PLUS_COSTS['gold_club'];
        
        if (!$this->deductGold($cost, $uid, 'gold_club')) {
            return ['success' => false, 'message' => 'Not enough gold'];
        }
        
        $this->database->query("UPDATE s1_users SET goldclub = 1 WHERE id = $uid");
        
        return ['success' => true, 'message' => 'Gold Club activated!'];
    }
    
    /**
     * Activate Resource Bonus
     */
    public function activateResourceBonus($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $cost = self::$PLUS_COSTS['resource_bonus'];
        
        if (!$this->deductGold($cost, $uid, 'resource_bonus')) {
            return ['success' => false, 'message' => 'Not enough gold'];
        }
        
        $hours = self::$PLUS_COSTS['resource_duration'];
        $endTime = date('Y-m-d H:i:s', time() + ($hours * 3600));
        
        $this->database->query("UPDATE s1_users SET resource_bonus = 1, resource_bonus_time = '$endTime' WHERE id = $uid");
        
        return ['success' => true, 'message' => 'Resource Bonus activated!', 'expires' => $endTime];
    }
    
    /**
     * Get Plus Account time remaining
     */
    public function getPlusTimeRemaining($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT plus_time FROM s1_users WHERE id = $uid");
        
        if (empty($user[0]['plus_time'])) return 0;
        
        $endTime = strtotime($user[0]['plus_time']);
        $now = time();
        
        if ($endTime <= $now) return 0;
        
        return $endTime - $now;
    }
    
    /**
     * Format time remaining
     */
    public function formatTimeRemaining($seconds) {
        $days = floor($seconds / 86400);
        $hours = floor(($seconds % 86400) / 3600);
        $minutes = floor(($seconds % 3600) / 60);
        
        if ($days > 0) {
            return "$days days, $hours hours";
        } elseif ($hours > 0) {
            return "$hours hours, $minutes minutes";
        } else {
            return "$minutes minutes";
        }
    }
    
    /**
     * Get Plus benefits description
     */
    public static function getPlusBenefits() {
        return [
            '🔨 Master Builder' => 'Building queue (3 constructions at once)',
            '🗺️ Larger Map' => 'View 13x13 instead of 7x7',
            '📊 Enhanced Statistics' => 'Detailed player and alliance stats',
            '📜 Report Archive' => 'Store up to 500 reports',
            '📧 Message Archive' => 'Store up to 500 messages',
            '🎨 Profile Customization' => 'Custom profile picture and signature',
            '🔔 Instant Notifications' => 'Real-time attack notifications',
            '⚡ Priority Support' => 'Faster response from support team',
        ];
    }
    
    /**
     * Get Gold Club benefits
     */
    public static function getGoldClubBenefits() {
        return [
            '🏹 Farmlist' => 'Automatic farming list with 10 slots',
            '📋 Noteblock' => 'Personal notes for each village',
            '🎯 Attack Planner' => 'Plan and coordinate attacks',
            '👥 Village Overview' => 'Manage all villages from one screen',
            '⚔️ Troop Overview' => 'See all troops in all villages',
            '💰 Trade Routes' => 'Automatic merchant routes',
            '📈 Production Overview' => 'Compare resource production',
            '🏆 Alliance Features' => 'Enhanced alliance management',
        ];
    }
    
    /**
     * Log gold transaction
     */
    private function logTransaction($uid, $type, $amount, $reason) {
        $time = time();
        $this->database->query("INSERT INTO s1_gold_log (uid, type, amount, reason, time) 
                               VALUES ($uid, '$type', $amount, '$reason', $time)");
    }
    
    /**
     * Get transaction history
     */
    public function getTransactionHistory($uid = null, $limit = 20) {
        $uid = $uid ?: $this->session->uid;
        return $this->database->query_return("SELECT * FROM s1_gold_log 
                                             WHERE uid = $uid 
                                             ORDER BY time DESC 
                                             LIMIT $limit");
    }
    
    /**
     * Get resource bonus multiplier
     */
    public function getResourceBonus($uid = null) {
        $uid = $uid ?: $this->session->uid;
        $user = $this->database->query_return("SELECT resource_bonus, resource_bonus_time FROM s1_users WHERE id = $uid");
        
        if (!$user[0]['resource_bonus']) return 1.0;
        
        if (strtotime($user[0]['resource_bonus_time']) <= time()) {
            // Bonus expired
            $this->database->query("UPDATE s1_users SET resource_bonus = 0 WHERE id = $uid");
            return 1.0;
        }
        
        return 1.25; // 25% bonus
    }
    
    /**
     * Buy item from auction
     */
    public function buyAuctionItem($itemId, $price, $uid = null) {
        $uid = $uid ?: $this->session->uid;
        
        if (!$this->deductGold($price, $uid, 'auction_purchase')) {
            return ['success' => false, 'message' => 'Not enough gold'];
        }
        
        // Transfer item to buyer
        $this->database->query("UPDATE s1_auction SET buyer = $uid, status = 'sold' WHERE id = $itemId");
        
        return ['success' => true, 'message' => 'Item purchased successfully!'];
    }
    
    /**
     * Sell item on auction
     */
    public function sellItem($itemType, $price, $uid = null) {
        $uid = $uid ?: $this->session->uid;
        
        // Check if user has item
        $item = $this->database->query_return("SELECT * FROM s1_hero_items WHERE uid = $uid AND item = $itemType AND num > 0 LIMIT 1");
        
        if (empty($item)) {
            return ['success' => false, 'message' => 'You do not own this item'];
        }
        
        // Deduct item
        $this->database->query("UPDATE s1_hero_items SET num = num - 1 WHERE uid = $uid AND item = $itemType");
        
        // Create auction
        $time = time();
        $this->database->query("INSERT INTO s1_auction (seller, item, price, time) VALUES ($uid, $itemType, $price, $time)");
        
        return ['success' => true, 'message' => 'Item listed for sale!'];
    }
}
