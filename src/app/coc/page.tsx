'use client';

import Link from "next/link";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  tags: string[];
  featured: boolean;
  date: string;
  views: number;
  content: string;
}

const CATEGORIES = [
  { name: 'all', label: '🗂 All' },
  { name: 'troops', label: '⚔️ Troops' },
  { name: 'heroes', label: '🦸 Heroes' },
  { name: 'spells', label: '✨ Spells' },
  { name: 'buildings', label: '🏗️ Buildings' },
  { name: 'strategy', label: '🎯 Strategy' },
];

const ARTICLES: Article[] = [
  {
    id: 'troop-barbarian',
    title: 'Barbarian – Statistik & Tips Penggunaan',
    category: 'troops',
    summary: 'Troop dasar CoC. Murah, cepat spawn, cocok untuk wall breaking dan filler.',
    tags: ['barbarian', 'common troop', 'th1'],
    featured: false,
    date: '2026-01-05',
    views: 241,
    content: `## Barbarian

**Barbarian** adalah salah satu troop paling ikonik di Clash of Clans.

### Statistik
- DPS Range: 8–72 (Level 1–11)
- HP Range: 45–350
- Training Cost: 25 Elixir (fixed)
- Target Priority: Bangunan terdekat

### Keunggulan
✓ Murah sekali – hanya 25 Elixir per unit
✓ Training time singkat
✓ Cocok sebagai filler army
✓ Ideal untuk farming loot

### Tips
1. Wall Breaker Combo
2. Filler Attack untuk exhaust Elixir
3. Clan Games events`
  },
  {
    id: 'troop-archer',
    title: 'Archer – Analisis & Strategi Penggunaan Optimal',
    category: 'troops',
    summary: 'Ranged troop yang serbaguna. Bisa menyerang dari luar tembok dan ideal untuk snipe resource.',
    tags: ['archer', 'ranged', 'barch', 'farming'],
    featured: true,
    date: '2026-01-08',
    views: 389,
    content: `## Archer

**Archer** adalah troop jarak jauh ikonik untuk farming.

### Statistik
- DPS Range: 7–62
- HP Range: 20–115
- Range: 3.5 tile
- Training Cost: 50 Elixir

### BARCH Strategy (Barbarian + Archer)
- 50% Barbarian, 50% Archer
- Best untuk farming Collectors
- Hemat Dark Elixir production

### Cocok untuk
- TH3–TH6: Main farming army
- TH7–TH9: BARCH optimal
- TH10+: Filler/snipe`
  },
  {
    id: 'troop-dragon',
    title: 'Dragon – Guide Lengkap Mass Dragon Attack',
    category: 'troops',
    summary: 'Salah satu troop paling populer untuk 3-star di TH8.',
    tags: ['dragon', 'th8', 'air attack', 'mass dragon'],
    featured: true,
    date: '2026-01-15',
    views: 512,
    content: `## Dragon

**Dragon** adalah troop udara untuk TH8 3-star.

### Statistik
- DPS Range: 160–320
- HP Range: 1,900–4,200
- Training Cost: 25,000 Elixir
- Training Time: 30 menit

### Mass Dragon Strategy
- 10–12 Dragon
- 3–5 Balloon support
- 2× Lightning + 1× Rage

### Golden Rules
1. Destroy Air Defense first
2. Prevent Clan Castle troops
3. Funnel Dragons together
4. Rage at core push`
  },
  {
    id: 'hero-queen',
    title: 'Archer Queen – Stats & Queen Walk Guide',
    category: 'heroes',
    summary: 'Hero serbaguna dengan jangkauan jauh dan invisibility. Essential untuk funneling dan attacking.',
    tags: ['archer queen', 'hero', 'funneling', 'queen walk'],
    featured: true,
    date: '2026-02-01',
    views: 456,
    content: `## Archer Queen

**Archer Queen** adalah hero serbaguna dengan invisibility ability.

### Statistik
- Level Max: 90 (TH14)
- DPS Range: 60–300+
- HP Range: 300–2,500+
- Special: Invisibility when idle

### Abilities
- ⚡ Ranged attack (3 tiles)
- 👻 Invisibility passive
- 🏃 High mobility

### Queen Walk Strategy
1. Deploy Queen with healing
2. Clear perimeter buildings
3. Create funnel for main army
4. Max level queen = easier attacks`
  },
  {
    id: 'spell-lightning',
    title: 'Lightning Spell – Guide Penggunaan & Calculation',
    category: 'spells',
    summary: 'Spell damage single-target. Essential untuk Air Defense dan Clan Castle.',
    tags: ['lightning', 'spell', 'air defense', 'damage'],
    featured: false,
    date: '2026-02-05',
    views: 423,
    content: `## Lightning Spell

**Lightning Spell** adalah spell damage single-target paling efisien.

### Statistik
- Damage Range: 150–1,200+
- Radius: 2.5 tile
- Cost: 150,000 Elixir / 7 DE
- Training Time: 10 menit

### Penggunaan Utama
1. Kuras Air Defense
2. Destroy Clan Castle
3. Eliminate specific towers
4. Clear Inferno Dragon

### Formula
- Level 1: 150 damage
- Scaling: ~100 per level
- TH8: 2 Lightning per AD`
  },
  {
    id: 'strategy-farming',
    title: 'Farming Strategy Guide – Optimal Loot Routes',
    category: 'strategy',
    summary: 'Master guide untuk maximize farming profit dengan minimal risk.',
    tags: ['farming', 'profit', 'strategy', 'efficient'],
    featured: true,
    date: '2026-02-15',
    views: 789,
    content: `## Farming Strategy

Panduan lengkap untuk maximize profit.

### Farming Leagues
- Crystal (1200–1600): Best Gold & Elixir
- Gold (1600–2000): High loot, harder
- Silver (800–1200): Easier, okay loot
- Bronze (400–800): Too easy, minimal loot

### Best Armies
1. BARCH: Gold farming optimal
2. Goblin Knife: Max loot, high risk
3. Dragons: Capital gold, slow
4. Baby Dragon: Balanced

### Tips
✓ Scout before attacking
✓ Target exposed collectors
✓ Count defenses
✓ Calculate profit vs trophy loss`
  },
];

export default function CocPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = ARTICLES.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesSearch = searchTerm === '' ||
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = ARTICLES.filter(a => a.featured);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-950 via-gray-900 to-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 to-yellow-800 border-b-4 border-yellow-600 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <Link href="/" className="text-amber-100 hover:text-white text-sm mb-4 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl font-bold text-yellow-100 mb-2">🏰 CoC Knowledge Base</h1>
          <p className="text-amber-100">Clash of Clans Reference – Troops, Heroes, Spells & Strategy</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="🔍 Search troops, heroes, spells..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 bg-gray-800 border-2 border-amber-700 rounded-xl text-white placeholder-gray-400 focus:border-yellow-500 outline-none transition text-lg"
          />
        </div>

        {/* Featured */}
        {!searchTerm && selectedCategory === 'all' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-yellow-100 mb-6">⭐ Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticle(article)}
                  className="bg-gradient-to-br from-amber-900/40 to-gray-800 border-2 border-yellow-600 rounded-xl p-6 cursor-pointer hover:border-yellow-400 hover:shadow-lg hover:shadow-yellow-500/20 transition"
                >
                  <h3 className="text-xl font-bold text-yellow-100 mb-3">{article.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{article.summary}</p>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>👁 {article.views}</span>
                    <span>→ Read</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-3 rounded-lg font-medium transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-yellow-600 text-white border-2 border-yellow-400'
                    : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-yellow-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-gray-800 border-2 border-gray-700 rounded-xl p-6 cursor-pointer hover:border-yellow-500 hover:shadow-lg hover:shadow-yellow-500/20 transition"
            >
              <span className="text-xs px-3 py-1 bg-gray-700 text-yellow-300 rounded-full">
                {CATEGORIES.find(c => c.name === article.category)?.label}
              </span>
              <h3 className="text-lg font-bold text-yellow-100 mt-3 mb-2 line-clamp-2">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{article.summary}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>👁 {article.views}</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No articles found</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedArticle && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-yellow-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-amber-900 to-yellow-800 border-b-4 border-yellow-600 p-8 flex justify-between items-start sticky top-0">
              <div>
                <p className="text-yellow-300 text-sm mb-2">
                  {CATEGORIES.find(c => c.name === selectedArticle.category)?.label}
                </p>
                <h2 className="text-2xl font-bold text-yellow-100">{selectedArticle.title}</h2>
              </div>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-10 h-10 bg-gray-900 hover:bg-gray-800 rounded-full text-white text-xl"
              >
                ✕
              </button>
            </div>
            <div className="p-8">
              <p className="text-gray-300 mb-6 pb-6 border-b border-gray-700">{selectedArticle.summary}</p>
              <div className="prose prose-invert max-w-none text-gray-300 whitespace-pre-wrap">
                {selectedArticle.content}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-700 flex justify-between text-sm text-gray-500">
                <span>👁 {selectedArticle.views} views</span>
                <span>📅 {selectedArticle.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
