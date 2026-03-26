import Link from "next/link";
import { navItems, superappInfo } from "@/data/navigation";

interface GameCard {
  slug: string;
  label: string;
  emoji: string;
  description: string;
  features: string[];
  color: string;
}

const gameCards: GameCard[] = [
  {
    slug: "Game",
    label: "GameVault",
    emoji: "🎮",
    description: "Hub for gaming knowledge, reviews & strategies",
    features: ["Game Library", "Reviews & Ratings", "Detailed Guides"],
    color: "from-blue-600 to-purple-600"
  },
  {
    slug: "coc",
    label: "Clash of Clans",
    emoji: "🏰",
    description: "CoC knowledge base with troops, heroes & strategies",
    features: ["Troops Guide", "Heroes Stats", "War Strategies"],
    color: "from-yellow-600 to-amber-600"
  },
  {
    slug: "travian",
    label: "Travian Server",
    emoji: "🏛️",
    description: "Complete local Travian game server & strategy guide",
    features: ["5 Tribes", "Resource Systems", "Battle Guides"],
    color: "from-purple-600 to-indigo-600"
  }
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {superappInfo.name}
          </h1>
          <p className="text-xl text-gray-300 mb-6">{superappInfo.description}</p>
          <p className="text-gray-400">Master your favorite games with comprehensive guides, strategies & tools</p>
        </div>

        {/* Game Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gameCards.map((game) => (
            <Link
              key={game.slug}
              href={`/${game.slug}`}
              className="group relative overflow-hidden rounded-2xl border-2 border-gray-700 hover:border-transparent transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

              {/* Card Content */}
              <div className="relative p-8 bg-gray-800 group-hover:bg-gray-750 transition-colors">
                <div className="text-5xl mb-4">{game.emoji}</div>

                <h2 className="text-2xl font-bold mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                  {game.label}
                </h2>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  {game.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {game.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400" />
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 transition-colors font-semibold">
                  Explore
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>

              {/* Top Border Gradient */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12 border-t border-gray-700">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-4xl mb-2">📚</div>
            <p className="text-gray-400 text-sm mb-1">Total Guides</p>
            <p className="text-3xl font-bold text-blue-400">16+</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-4xl mb-2">🎯</div>
            <p className="text-gray-400 text-sm mb-1">Games Covered</p>
            <p className="text-3xl font-bold text-purple-400">3</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 text-center">
            <div className="text-4xl mb-2">⭐</div>
            <p className="text-gray-400 text-sm mb-1">Featured Content</p>
            <p className="text-3xl font-bold text-yellow-400">24</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-xl p-8">
          <h3 className="text-xl font-bold text-blue-100 mb-4">Welcome to Superapp Games</h3>
          <p className="text-gray-300 mb-4">
            Your all-in-one destination for gaming strategy, knowledge bases, and server guides. Whether you&apos;re a casual player or competitive gamer, find comprehensive resources for:
          </p>
          <ul className="space-y-2 text-gray-300 mb-4">
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>GameVault:</strong> Discover, review and master the best games across platforms</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Clash of Clans:</strong> Complete knowledge base covering troops, heroes, spells and winning strategies</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-400 mt-1">✓</span>
              <span><strong>Travian:</strong> Local server with 5 tribes, resource systems, and advanced battle tactics</span>
            </li>
          </ul>
          <p className="text-gray-400 text-sm">
            Start exploring any section to access detailed guides, strategies, and community knowledge. Perfect for beginners and advanced players alike.
          </p>
        </div>
      </div>
    </div>
  );
}
