'use client';

import Link from 'next/link';
import { useState } from 'react';

interface Game {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  releaseDate: string;
  genre: string[];
  platform: string[];
}

const GAMES_DATA: Game[] = [
  {
    id: 'elden-ring',
    name: 'Elden Ring',
    category: 'Action RPG',
    rating: 4.8,
    reviews: 12450,
    description: 'A collaboration between FromSoftware and George R. R. Martin. Explore the vast Lands Between in this epic action RPG.',
    features: ['Open World', 'Co-op', 'PvP', 'Boss Battles', 'Character Customization'],
    releaseDate: '2022-02-25',
    genre: ['Action', 'RPG', 'Fantasy'],
    platform: ['PlayStation', 'Xbox', 'PC']
  },
  {
    id: 'baldurs-gate-3',
    name: "Baldur's Gate 3",
    category: 'RPG',
    rating: 4.9,
    reviews: 8932,
    description: 'Experience D&D like never before in this immersive RPG with countless choices and outcomes.',
    features: ['Story-Driven', 'Choices Matter', 'Party System', 'Turn-Based Combat', 'Multiplayer'],
    releaseDate: '2023-08-03',
    genre: ['RPG', 'Fantasy', 'Adventure'],
    platform: ['PlayStation', 'Xbox', 'PC']
  },
  {
    id: 'palworld',
    name: 'Palworld',
    category: 'Action Adventure',
    rating: 4.5,
    reviews: 15230,
    description: 'Catch, train, and battle creatures in a modern survival action game with crafting and farming.',
    features: ['Monster Catching', 'Base Building', 'Co-op', 'Crafting', 'Exploration'],
    releaseDate: '2024-01-19',
    genre: ['Action', 'Adventure', 'Survival'],
    platform: ['Xbox', 'PC']
  },
  {
    id: 'hades',
    name: 'Hades',
    category: 'Roguelike',
    rating: 4.7,
    reviews: 9845,
    description: 'Hack and slash your way out of the Underworld with stunning visuals and addictive gameplay.',
    features: ['Roguelike', 'Fast-Paced Combat', 'Narrative', 'Gorgeous Art', 'Soundtrack'],
    releaseDate: '2020-09-17',
    genre: ['Action', 'Roguelike', 'Fantasy'],
    platform: ['PlayStation', 'Xbox', 'PC', 'Nintendo Switch']
  },
  {
    id: 'stardew-valley',
    name: 'Stardew Valley',
    category: 'Simulation',
    rating: 4.8,
    reviews: 22100,
    description: 'Leave the city life behind and build your farming empire in this cozy simulation game.',
    features: ['Farming', 'Relationships', 'Mining', 'Fishing', 'Co-op'],
    releaseDate: '2016-02-26',
    genre: ['Simulation', 'RPG', 'Casual'],
    platform: ['PlayStation', 'Xbox', 'PC', 'Nintendo Switch']
  },
  {
    id: 'cyberpunk-2077',
    name: 'Cyberpunk 2077',
    category: 'Action RPG',
    rating: 4.3,
    reviews: 11200,
    description: 'Immerse yourself in a futuristic dystopia with branching storylines and intense action.',
    features: ['Open World', 'Choices Matter', 'Character Creation', 'Hacking', 'Vehicle Combat'],
    releaseDate: '2020-12-10',
    genre: ['Action', 'RPG', 'Sci-Fi'],
    platform: ['PlayStation', 'Xbox', 'PC']
  }
];

export default function GamePage() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<string>('rating');

  const categories = ['All', ...Array.from(new Set(GAMES_DATA.map(g => g.category)))];

  const filteredGames = filterCategory === 'All'
    ? GAMES_DATA
    : GAMES_DATA.filter(g => g.category === filterCategory);

  const sortedGames = [...filteredGames].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'date':
        return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-600'}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm mb-4 inline-block">
            ← Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">🎮 GameVault</h1>
          <p className="text-gray-400">Discover and explore the best games across all platforms</p>
        </div>

        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Filter */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Filter by Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    filterCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-3">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-48 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-blue-500 outline-none"
            >
              <option value="rating">Highest Rating</option>
              <option value="reviews">Most Reviews</option>
              <option value="date">Newest</option>
              <option value="name">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {sortedGames.map(game => (
            <div
              key={game.id}
              onClick={() => setSelectedGame(game)}
              className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-blue-500 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-500/20 group"
            >
              {/* Game Header */}
              <div className="h-40 bg-gradient-to-br from-blue-600 to-purple-600 relative flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform">{game.id.charAt(0).toUpperCase()}</div>
              </div>

              {/* Game Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{game.name}</h3>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">{game.category}</span>
                    <span className="text-sm font-semibold text-yellow-400">{game.rating}/5</span>
                  </div>
                  {renderStars(game.rating)}
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{game.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {game.genre.slice(0, 2).map(g => (
                    <span key={g} className="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded">
                      {g}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                  <span className="text-xs text-gray-500">{game.reviews.toLocaleString()} reviews</span>
                  <button className="text-blue-400 hover:text-blue-300 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {selectedGame && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={() => setSelectedGame(null)}>
            <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={e => e.stopPropagation()}>
              {/* Modal Header */}
              <div className="h-48 bg-gradient-to-br from-blue-600 to-purple-600 relative flex items-center justify-center">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="absolute top-4 right-4 w-10 h-10 bg-gray-900/80 hover:bg-gray-900 rounded-full flex items-center justify-center text-white"
                >
                  ✕
                </button>
                <div className="text-7xl">{selectedGame.id.charAt(0).toUpperCase()}</div>
              </div>

              <div className="p-8">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedGame.name}</h2>
                <p className="text-gray-400 mb-6">{selectedGame.category}</p>

                {/* Rating */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-300 font-medium">Rating</span>
                    <span className="text-2xl font-bold text-yellow-400">{selectedGame.rating}/5</span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {renderStars(selectedGame.rating)}
                  </div>
                  <p className="text-sm text-gray-400">{selectedGame.reviews.toLocaleString()} community reviews</p>
                </div>

                {/* Description */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-3">About</h3>
                  <p className="text-gray-300">{selectedGame.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6 pb-6 border-b border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedGame.features.map(feature => (
                      <div key={feature} className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-700">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Release Date</p>
                    <p className="text-white font-medium">{new Date(selectedGame.releaseDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Genres</p>
                    <p className="text-white font-medium">{selectedGame.genre.join(', ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Platforms</p>
                    <p className="text-white font-medium">{selectedGame.platform.join(', ')}</p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
                  Add to Wishlist ♡
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-700">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Total Games</p>
            <p className="text-3xl font-bold text-blue-400">{GAMES_DATA.length}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Avg Rating</p>
            <p className="text-3xl font-bold text-yellow-400">
              {(GAMES_DATA.reduce((sum, g) => sum + g.rating, 0) / GAMES_DATA.length).toFixed(1)}
            </p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <p className="text-gray-400 text-sm mb-2">Categories</p>
            <p className="text-3xl font-bold text-purple-400">{categories.length - 1}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
