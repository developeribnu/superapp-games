'use client';

import Link from "next/link";
import { useState } from "react";

interface Resource {
  name: string;
  production: number;
  storage: number;
  icon: string;
  color: string;
}

interface Tribe {
  name: string;
  flag: string;
  strength: string;
  specialty: string;
  units: string[];
}

interface Guide {
  title: string;
  description: string;
  category: string;
  tips: string[];
  icon: string;
}

const RESOURCES: Resource[] = [
  { name: 'Lumber', production: 20, storage: 1000, icon: '🌲', color: 'from-green-600' },
  { name: 'Clay', production: 30, storage: 1200, icon: '🏺', color: 'from-yellow-600' },
  { name: 'Iron', production: 25, storage: 1100, icon: '⚙️', color: 'from-gray-600' },
  { name: 'Crop', production: 40, storage: 1500, icon: '🌾', color: 'from-amber-600' },
];

const TRIBES: Tribe[] = [
  {
    name: 'Romans',
    flag: '🇮🇹',
    strength: 'Balanced & Versatile',
    specialty: 'Phalanx & Legionnaire',
    units: ['Legionnaire', 'Praetorian', 'Equites Legati', 'Phalanx', 'Swordsman']
  },
  {
    name: 'Teutons',
    flag: '🇩🇪',
    strength: 'Strong Cavalry & Defense',
    specialty: 'Axeman & Paladin',
    units: ['Clubswinger', 'Spearman', 'Axeman', 'Scout', 'Paladin']
  },
  {
    name: 'Gauls',
    flag: '🇫🇷',
    strength: 'Fast & Cavalry',
    specialty: 'Theutates Thunder & Haeduan',
    units: ['Phalanx', 'Swordsman', 'Pathfinder', 'Theutates Thunder', 'Haeduan']
  },
  {
    name: 'Egyptians',
    flag: '🇪🇬',
    strength: 'Balanced Growth',
    specialty: 'Khopesh Warrior & Camel Archer',
    units: ['Slave', 'Axeman', 'Khopesh Warrior', 'Sopdu Chariot', 'Camel Archer']
  },
  {
    name: 'Huns',
    flag: '🏹',
    strength: 'Archer & Scout Masters',
    specialty: 'Mounted Archer & Steppe Rider',
    units: ['Peltast', 'Mounted Archer', 'Steppe Rider', 'Marksman', 'Scout']
  },
];

const GUIDES: Guide[] = [
  {
    title: 'Getting Started',
    description: 'Begin your Travian journey with essential tips for new players',
    category: 'Beginner',
    icon: '🎯',
    tips: [
      'Build a crop farm to feed your troops',
      'Focus on one resource in early game',
      'Join an alliance quickly for protection',
      'Complete tutorial quests for rewards',
      'Build troops gradually to support your village'
    ]
  },
  {
    title: 'Resource Management',
    description: 'Optimize your production and storage for maximum profit',
    category: 'Economy',
    icon: '💰',
    tips: [
      'Balance all 4 resources evenly',
      'Build granary and warehouse asap',
      'Use marketplace for resource trading',
      'Plan production queues 8 hours ahead',
      'Raid inactive players for resources'
    ]
  },
  {
    title: 'Military Strategy',
    description: 'Build a strong army and dominate in battle',
    category: 'Combat',
    icon: '⚔️',
    tips: [
      'Train scouts first to find targets',
      'Build cavalry for fast raids',
      'Use infantry for sieging villages',
      'Always send rams against walls',
      'Coordinate with alliance members'
    ]
  },
  {
    title: 'Defense Building',
    description: 'Protect your village from enemy attacks',
    category: 'Defense',
    icon: '🛡️',
    tips: [
      'Upgrade walls to highest level',
      'Build palisades for quick defense',
      'Place earth walls around treasury',
      'Keep defensive troops trained',
      'Send troops to allies under attack'
    ]
  },
  {
    title: 'Alliance Warfare',
    description: 'Coordinate with your alliance for maximum impact',
    category: 'PvP',
    icon: '🚩',
    tips: [
      'Join active alliances with clear goals',
      'Communicate attack plans in forum',
      'Support teammates during wars',
      'Reinforcements can be sent to friends',
      'Claim new oases together'
    ]
  },
  {
    title: 'Late Game Progression',
    description: 'Strategies for advanced players targeting endgame content',
    category: 'Advanced',
    icon: '👑',
    tips: [
      'Plan Wonder of the World location',
      'Build hero and gather artifact sets',
      'Optimize NPC merchant trades',
      'Farm gold for premium features',
      'Prepare for server endgame events'
    ]
  },
];

export default function TravianPage() {
  const [selectedGuide, setSelectedGuide] = useState<Guide | null>(null);
  const [selectedTribe, setSelectedTribe] = useState<Tribe | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-950 via-gray-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900 to-indigo-800 border-b-4 border-purple-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-purple-100 hover:text-white text-sm mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl font-bold text-purple-100 mb-2">🏛️ Travian Server</h1>
          <p className="text-purple-200">Production-Ready Local Travian Game Server – Tribes, Strategy & Guides</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Resources Overview */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">📦 The 4 Core Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {RESOURCES.map(resource => (
              <div key={resource.name} className={`bg-gradient-to-br ${resource.color} to-gray-800 rounded-xl p-6 border-2 border-purple-600`}>
                <div className="text-4xl mb-3">{resource.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{resource.name}</h3>
                <p className="text-sm text-gray-300 mb-4">Per hour production ~{resource.production}</p>
                <div className="bg-gray-900 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Max Storage</p>
                  <p className="text-lg font-bold text-white">{resource.storage.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tribes */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">🏯 The 5 Tribes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {TRIBES.map(tribe => (
              <div
                key={tribe.name}
                onClick={() => setSelectedTribe(tribe)}
                className="bg-gray-800 border-2 border-gray-700 rounded-xl p-5 cursor-pointer hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
              >
                <div className="text-5xl mb-3">{tribe.flag}</div>
                <h3 className="text-lg font-bold text-purple-100 mb-2">{tribe.name}</h3>
                <p className="text-sm text-gray-400 mb-3">{tribe.strength}</p>
                <p className="text-xs text-purple-300">→ View Details</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guides */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">📖 Strategy Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.map(guide => (
              <div
                key={guide.title}
                onClick={() => setSelectedGuide(guide)}
                className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 cursor-pointer hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
              >
                <div className="text-4xl mb-3">{guide.icon}</div>
                <h3 className="text-lg font-bold text-purple-100 mb-2">{guide.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{guide.description}</p>
                <span className="text-xs px-3 py-1 bg-purple-900/40 text-purple-300 rounded-full border border-purple-700">
                  {guide.category}
                </span>
                <p className="text-xs text-purple-300 mt-3">→ Learn More</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-purple-100 mb-6">✨ Server Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 border-2 border-purple-600 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-100 mb-4">🎮 Game Features</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>5 Tribes with unique units & bonuses</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Resource production & trading system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Building & troop training queues</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Combat system with reinforcements</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Alliance system with forums</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Wonder of the World endgame</span>
                </li>
              </ul>
            </div>
            <div className="bg-gray-800 border-2 border-purple-600 rounded-xl p-6">
              <h3 className="text-xl font-bold text-purple-100 mb-4">🔧 Infrastructure</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Docker containerized setup</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Automated game cron jobs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>6-hour automatic backups</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>Real-time monitoring dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>MailHog for email testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">✓</span>
                  <span>phpMyAdmin database management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 border-t border-gray-700">
          <div className="bg-gray-800 border border-purple-600 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Total Tribes</p>
            <p className="text-3xl font-bold text-purple-400">{TRIBES.length}</p>
          </div>
          <div className="bg-gray-800 border border-purple-600 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Core Resources</p>
            <p className="text-3xl font-bold text-purple-400">{RESOURCES.length}</p>
          </div>
          <div className="bg-gray-800 border border-purple-600 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Strategy Guides</p>
            <p className="text-3xl font-bold text-purple-400">{GUIDES.length}</p>
          </div>
          <div className="bg-gray-800 border border-purple-600 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm mb-2">Server Status</p>
            <p className="text-3xl font-bold text-green-400">Active</p>
          </div>
        </div>
      </div>

      {/* Tribe Detail Modal */}
      {selectedTribe && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedTribe(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 border-b-4 border-purple-600 p-8 flex justify-between items-start sticky top-0">
              <div>
                <div className="text-5xl mb-3">{selectedTribe.flag}</div>
                <h2 className="text-3xl font-bold text-purple-100">{selectedTribe.name}</h2>
              </div>
              <button
                onClick={() => setSelectedTribe(null)}
                className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="mb-6 pb-6 border-b border-gray-700">
                <h3 className="text-xl font-bold text-purple-100 mb-2">Strength</h3>
                <p className="text-gray-300 text-lg">{selectedTribe.strength}</p>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-purple-100 mb-3">Special Units</h3>
                <div className="grid grid-cols-2 gap-2">
                  {selectedTribe.units.map(unit => (
                    <div key={unit} className="bg-purple-900/40 border border-purple-700 rounded-lg p-3">
                      <p className="text-gray-300 font-medium">{unit}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-gray-400">Choose this tribe to master {selectedTribe.name}&apos;s unique strengths and strategy.</p>
            </div>
          </div>
        </div>
      )}

      {/* Guide Detail Modal */}
      {selectedGuide && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedGuide(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-purple-900 to-indigo-800 border-b-4 border-purple-600 p-8 flex justify-between items-start sticky top-0">
              <div>
                <div className="text-5xl mb-3">{selectedGuide.icon}</div>
                <h2 className="text-3xl font-bold text-purple-100">{selectedGuide.title}</h2>
                <p className="text-purple-300 text-sm mt-2">{selectedGuide.category}</p>
              </div>
              <button
                onClick={() => setSelectedGuide(null)}
                className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <p className="text-gray-300 mb-6 pb-6 border-b border-gray-700 text-lg">{selectedGuide.description}</p>
              <h3 className="text-xl font-bold text-purple-100 mb-4">Key Tips</h3>
              <ul className="space-y-3">
                {selectedGuide.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <span className="text-purple-400 font-bold mt-1">{idx + 1}.</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
