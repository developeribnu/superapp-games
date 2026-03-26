<?php
/**
 * Travian: Legends Theme
 * Version: 2025
 * Style: Matching official travian.com
 */

$theme_info = [
    'name' => 'Travian Legends',
    'version' => '2025.1',
    'author' => 'Travian Legends Team',
    'description' => 'Modern UI matching official Travian: Legends',
];

if (isset($_GET['info'])) {
    header('Content-Type: application/json');
    echo json_encode($theme_info);
    exit;
}

return true;
