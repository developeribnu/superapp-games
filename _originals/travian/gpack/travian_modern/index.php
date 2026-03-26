<?php
/**
 * Travian Modern Theme
 * Version: 2025 Modern UI
 */

// Theme configuration
$theme_config = [
    'name' => 'Travian Modern',
    'version' => '2025.1',
    'author' => 'Travian Modern Team',
    'description' => 'Modern UI for Travian: Legends style',
    'supports_dark_mode' => true,
    'responsive' => true,
];

// Return theme info if requested
if (isset($_GET['info'])) {
    header('Content-Type: application/json');
    echo json_encode($theme_config);
    exit;
}

// Theme is active
return true;
