'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, ChevronRight, Send, Users, TrendingUp, ShoppingBag, Flame, Clock, ChevronLeft, Calendar, Bell, Ticket } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import VideoPlayer from '@/components/VideoPlayer';
import { getAssetPath } from '@/lib/utils';

interface Game {
  id: string;
  title: string;
  date: string;
  teams: { home: string; away: string };
  videoUrl: string;
  thumbnail: string;
  duration: string;
  description: string;
}

const games: Game[] = [
  {
    id: '1',
    title: '2025 Patty Cup Championship',
    date: 'Aug 14, 2024',
    teams: { home: '3ICE Minnesota', away: '3ICE Buffalo' },
    videoUrl: 'https://www.youtube.com/watch?v=UBNTSjYgpbI&t=30',
    thumbnail: 'https://img.youtube.com/vi/UBNTSjYgpbI/maxresdefault.jpg',
    duration: '2:15:30',
    description: 'Epic championship finale between Minnesota and Dallas',
  },
  {
    id: '2',
    title: '3ICE Season Highlights 2024',
    date: 'Aug 7, 2024',
    teams: { home: '3ICE Pittsburgh', away: '3ICE Boston' },
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    duration: '2:08:45',
    description: 'Best moments from the 2024 season',
  },
  {
    id: '3',
    title: 'Playoff Semi-Final Action',
    date: 'Jul 31, 2024',
    teams: { home: '3ICE Chicago', away: '3ICE Buffalo' },
    videoUrl: 'https://www.youtube.com/watch?v=UBNTSjYgpbI',
    thumbnail: 'https://img.youtube.com/vi/UBNTSjYgpbI/maxresdefault.jpg',
    duration: '2:12:20',
    description: 'Intense playoff hockey at its finest',
  },
];

export default function WatchPage() {
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [currentGame, setCurrentGame] = useState(games[0]);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'JohnDoe99', message: 'MINNESOTA looking strong tonight!', color: 'bg-blue-500' },
    { id: 2, user: 'SarahK', message: 'That last goal was insane! What a play.', color: 'bg-purple-500' },
    { id: 3, user: 'RookieTwo', message: 'Dallas needs better defense in the middle.', color: 'bg-orange-500' },
    { id: 4, user: 'MikeG', message: 'Let\'s goooo 3ICE!', color: 'bg-pink-500' },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const featuredRailRef = useRef<HTMLDivElement>(null);
  const trendingRailRef = useRef<HTMLDivElement>(null);
  const highlightsRailRef = useRef<HTMLDivElement>(null);
  const isInitialLoadRef = useRef(true);

  const scrollRail = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 420;
      const newScrollLeft = direction === 'left' 
        ? ref.current.scrollLeft - scrollAmount 
        : ref.current.scrollLeft + scrollAmount;
      ref.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  // Update header on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('watchHeaderChange', {
        detail: {
          title: 'WATCH',
          subtitle: 'Live games and on-demand replays',
          stats: null
        }
      });
      window.dispatchEvent(event);
    }

    // Mark initial load as complete after a short delay
    setTimeout(() => {
      isInitialLoadRef.current = false;
    }, 100);

    // Cleanup: reset header on unmount
    return () => {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('resetHeader');
        window.dispatchEvent(event);
      }
    };
  }, []);

  useEffect(() => {
    // Only scroll chat on new messages, not on initial load
    if (!isInitialLoadRef.current) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const colors = ['bg-blue-500', 'bg-purple-500', 'bg-orange-500', 'bg-pink-500', 'bg-green-500'];
      const newMessage = {
        id: chatMessages.length + 1,
        user: 'You',
        message: chatMessage,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  const handlePause = () => {
    setShowPauseMenu(true);
    setSelectedTeam(null);
  };

  const handlePlay = () => {
    setShowPauseMenu(false);
  };

  const handleTeamSelection = (team: string) => {
    setSelectedTeam(team);
  };

  const handleGameSelect = (game: Game) => {
    setCurrentGame(game);
    setShowPauseMenu(false);
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">
              AUG 14, 2024 • PATRICK CUP CHAMPIONSHIP
            </div>
            <h1 className="text-4xl font-black text-white">Minnesota vs Buffalo</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-[#4A9FD8] text-white px-3 py-1 rounded-md font-bold text-sm">
              VOD
            </div>
            <div className="text-gray-400 text-sm flex items-center gap-1">
              <Users size={16} />
              12,402 Views
            </div>
          </div>
        </div>

        {/* Main Layout - Video + Sidebar */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 mb-12">
          {/* Video Player Section */}
          <div className="min-w-0">

          {/* Video Player */}
          <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border-2 border-[#4A9FD8]/30">
            {/* Video Player */}
            <VideoPlayer 
              src={`${process.env.NODE_ENV === 'production' ? '/3iceDemo' : ''}/game-video.mp4`}
              autoPlay={true}
              onPause={handlePause}
              onPlay={handlePlay}
              isLive={false}
            />

            {/* Match Info Badge - Top right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 pointer-events-none">
              <div className="bg-black/70 backdrop-blur-sm text-white font-bold px-3 py-1.5 rounded-md text-sm">
                <span className="text-[#4A9FD8]">Minnesota</span> <span className="text-gray-500">vs</span> <span className="text-white">Buffalo</span>
              </div>
            </div>

            {/* Pause Menu Overlay - Shows in center below header */}
            {showPauseMenu && (
              <div 
                className="absolute inset-0 z-30 flex items-center justify-center pb-20 cursor-pointer"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    handlePlay();
                  }
                }}
              >
                <div 
                  className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
                  onClick={() => handlePlay()}
                />
                <div className="relative max-w-4xl w-full px-8 z-30 cursor-default">
                  {!selectedTeam ? (
                    <>
                      <h2 className="text-3xl font-black text-center mb-3 text-white">
                        SHOP YOUR <span className="text-[#4A9FD8]">TEAM</span>
                      </h2>
                      <p className="text-center text-gray-400 text-sm mb-6">
                        Choose your team to see exclusive game-day gear
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        {/* Minnesota Team */}
                        <div className="group bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 hover:border-[#4A9FD8] rounded-xl p-6 transition-all">
                          <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                            <Image
                              src={getAssetPath("/jersey-minnesota.png")}
                              alt="Minnesota Jersey"
                              fill
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>
                          <div className="text-2xl font-black text-white mb-1">
                            {currentGame.teams.home.split(' ').pop()}
                          </div>
                          <div className="text-xs text-gray-400 mb-1">{currentGame.teams.home}</div>
                          <div className="text-[#4A9FD8] font-black text-lg mb-4">$129.99</div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const cartItem = {
                                  id: `pause-minnesota-${Date.now()}`,
                                  type: 'merchandise',
                                  name: 'Home Jersey',
                                  team: currentGame.teams.home,
                                  category: 'jersey',
                                  price: 129.99,
                                  quantity: 1,
                                  total: 129.99,
                                  image: getAssetPath('/jersey-minnesota.png')
                                };
                                
                                if (typeof window !== 'undefined') {
                                  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                                  existingCart.push(cartItem);
                                  localStorage.setItem('cart', JSON.stringify(existingCart));
                                  
                                  const event = new CustomEvent('cartUpdate', {
                                    detail: { count: existingCart.length, showCart: true }
                                  });
                                  window.dispatchEvent(event);
                                }
                                handlePlay();
                              }}
                              className="flex-1 bg-[#4A9FD8] hover:bg-[#3a8fc8] text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                              <ShoppingBag size={16} />
                              Add to Cart
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTeamSelection(currentGame.teams.home);
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-lg transition-all"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>

                        {/* Buffalo Team */}
                        <div className="group bg-gradient-to-br from-white/5 to-transparent border-2 border-white/20 hover:border-[#4A9FD8] rounded-xl p-6 transition-all">
                          <div className="relative h-40 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-blue-900 to-blue-950">
                            <Image
                              src={getAssetPath("/jersey-buffalo.png")}
                              alt="Buffalo Jersey"
                              fill
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>
                          <div className="text-2xl font-black text-white mb-1">
                            {currentGame.teams.away.split(' ').pop()}
                          </div>
                          <div className="text-xs text-gray-400 mb-1">{currentGame.teams.away}</div>
                          <div className="text-[#4A9FD8] font-black text-lg mb-4">$129.99</div>
                          
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const cartItem = {
                                  id: `pause-buffalo-${Date.now()}`,
                                  type: 'merchandise',
                                  name: 'Home Jersey',
                                  team: currentGame.teams.away,
                                  category: 'jersey',
                                  price: 129.99,
                                  quantity: 1,
                                  total: 129.99,
                                  image: getAssetPath('/jersey-buffalo.png')
                                };
                                
                                if (typeof window !== 'undefined') {
                                  const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                                  existingCart.push(cartItem);
                                  localStorage.setItem('cart', JSON.stringify(existingCart));
                                  
                                  const event = new CustomEvent('cartUpdate', {
                                    detail: { count: existingCart.length, showCart: true }
                                  });
                                  window.dispatchEvent(event);
                                }
                                handlePlay();
                              }}
                              className="flex-1 bg-[#4A9FD8] hover:bg-[#3a8fc8] text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                            >
                              <ShoppingBag size={16} />
                              Add to Cart
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTeamSelection(currentGame.teams.away);
                              }}
                              className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-3 rounded-lg transition-all"
                            >
                              <ChevronRight size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border-2 border-[#4A9FD8] rounded-2xl p-8 mb-8">
                        <div className="flex items-center justify-center gap-4 mb-6">
                          <div className="relative w-32 h-32 rounded-xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                            <Image
                              src={selectedTeam.includes('Minnesota') ? getAssetPath('/jersey-minnesota.png') : getAssetPath('/jersey-buffalo.png')}
                              alt={`${selectedTeam} Jersey`}
                              fill
                              className="object-contain p-2"
                              unoptimized
                            />
                          </div>
                        </div>
                        <h3 className="text-3xl font-black text-white mb-4">
                          GO <span className="text-[#4A9FD8]">{selectedTeam.split(' ').pop()?.toUpperCase()}</span>!
                        </h3>
                        <p className="text-gray-300 mb-8 text-lg">
                          Check out exclusive {selectedTeam} game-day collection
                        </p>
                        <Link
                          href={`/shop?team=${encodeURIComponent(selectedTeam)}`}
                          className="inline-flex items-center space-x-3 bg-[#4A9FD8] hover:bg-[#3a8fc8] text-white font-bold py-4 px-10 rounded-xl transition-all transform hover:scale-105 text-lg shadow-lg"
                        >
                          <span>View Collection</span>
                          <ChevronRight size={24} />
                        </Link>
                      </div>
                      <button
                        onClick={() => setSelectedTeam(null)}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        ← Back to team selection
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Netflix-Style Rails Below Video */}
          <div className="space-y-8 mt-8">
            {/* Featured Matches Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                FEATURED <span className="text-[#4A9FD8]">MATCHES</span>
              </h3>
              <button
                onClick={() => scrollRail(featuredRailRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-r-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => scrollRail(featuredRailRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-l-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronRight size={32} />
              </button>
              <div ref={featuredRailRef} className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {games.map((game) => (
                  <div
                    key={`featured-${game.id}`}
                    className="group cursor-pointer flex-shrink-0 w-[400px] snap-start"
                    onClick={() => handleGameSelect(game)}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-3">
                      <Image 
                        src={game.thumbnail} 
                        alt={game.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                        <div className="bg-[#4A9FD8]/80 group-hover:bg-[#4A9FD8] rounded-full p-4 transition-colors transform group-hover:scale-110">
                          <Play className="text-white" size={32} fill="white" />
                        </div>
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 rounded text-xs font-mono text-white">
                        {game.duration}
                      </div>
                    </div>
                    <h4 className="text-lg font-bold text-white group-hover:text-[#4A9FD8] transition-colors mb-1">
                      {game.title}
                    </h4>
                    <p className="text-sm text-gray-400">{game.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trending Moments Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                TRENDING <span className="text-[#4A9FD8]">MOMENTS</span>
              </h3>
              <button
                onClick={() => scrollRail(trendingRailRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-r-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => scrollRail(trendingRailRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-l-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronRight size={32} />
              </button>
              <div ref={trendingRailRef} className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={`moment-${i}`} className="group cursor-pointer flex-shrink-0 w-[300px] snap-start">
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#4A9FD8]/20 to-blue-900/20 flex items-center justify-center">
                        <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} fill="white" />
                      </div>
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Flame size={12} />
                        HOT
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        0:{(i * 15).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#4A9FD8] transition-colors line-clamp-2">
                      Amazing Goal by Zuccarello! Incredible save!
                    </h4>
                    <p className="text-xs text-gray-400">2.3K views • 2 hours ago</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Championship Highlights Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                CHAMPIONSHIP <span className="text-[#4A9FD8]">HIGHLIGHTS</span>
              </h3>
              <button
                onClick={() => scrollRail(highlightsRailRef, 'left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-r-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() => scrollRail(highlightsRailRef, 'right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black/90 text-white p-2 rounded-l-lg opacity-0 group-hover/rail:opacity-100 transition-opacity"
              >
                <ChevronRight size={32} />
              </button>
              <div ref={highlightsRailRef} className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {games.map((game) => (
                  <div
                    key={`highlight-${game.id}`}
                    className="group cursor-pointer flex-shrink-0 w-[350px] snap-start"
                    onClick={() => handleGameSelect(game)}
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-3">
                      <Image 
                        src={game.thumbnail} 
                        alt={game.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <p className="text-xs text-white/80 mb-1">Watch Now</p>
                          <div className="flex items-center gap-2">
                            <Play className="text-white" size={20} fill="white" />
                            <span className="text-sm font-bold text-white">{game.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#4A9FD8] transition-colors">
                      {game.teams.home} vs {game.teams.away}
                    </h4>
                    <p className="text-sm text-gray-400">{game.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Player Spotlights Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                PLAYER <span className="text-[#4A9FD8]">SPOTLIGHTS</span>
              </h3>
              <div className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {['Zuccarello', 'Pavelski', 'Kane', 'Toews', 'Ovechkin', 'Crosby'].map((player, i) => (
                  <div key={`player-${i}`} className="group cursor-pointer flex-shrink-0 w-[250px] snap-start">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-3 bg-gradient-to-br from-[#4A9FD8]/20 to-blue-900/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl font-black text-white/20">{player.slice(0, 1)}</div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                        <div className="text-sm text-[#4A9FD8] font-bold mb-1">#{i + 10}</div>
                        <div className="text-lg font-black text-white">{player}</div>
                        <div className="text-xs text-gray-400">Forward • 3ICE</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Best Goals Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                BEST <span className="text-[#4A9FD8]">GOALS OF THE SEASON</span>
              </h3>
              <div className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={`goal-${i}`} className="group cursor-pointer flex-shrink-0 w-[280px] snap-start">
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-2 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={48} fill="white" />
                      </div>
                      <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs font-black px-2 py-1 rounded">
                        #{i}
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        0:{(i * 8).toString().padStart(2, '0')}
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#4A9FD8] transition-colors line-clamp-2">
                      Incredible goal by Team Player!
                    </h4>
                    <p className="text-xs text-gray-400">Season {2024 - i}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Behind The Scenes Rail */}
            <div className="group/rail relative">
              <h3 className="text-2xl font-black text-white mb-4">
                BEHIND THE <span className="text-[#4A9FD8]">SCENES</span>
              </h3>
              <div className="flex gap-4 overflow-x-scroll pb-4 scrollbar-hide snap-x snap-mandatory">
                {games.map((game, i) => (
                  <div
                    key={`bts-${game.id}`}
                    className="group cursor-pointer flex-shrink-0 w-[320px] snap-start"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-800 hover:border-[#4A9FD8] transition-all mb-3 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={40} fill="white" />
                      </div>
                      <div className="absolute top-2 left-2 bg-purple-600 text-white text-xs font-bold px-2 py-1 rounded">
                        EXCLUSIVE
                      </div>
                    </div>
                    <h4 className="text-base font-bold text-white group-hover:text-[#4A9FD8] transition-colors">
                      Locker Room Access: {game.teams.home.split(' ').pop()}
                    </h4>
                    <p className="text-sm text-gray-400">Inside look at game day prep</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 xl:block hidden">
            {/* Upcoming Schedule */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <Calendar size={20} className="text-[#4A9FD8]" />
                UPCOMING SCHEDULE
              </h3>
              <div className="space-y-3">
                <div className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-[#4A9FD8] font-bold">AUG 18 • 7:00 PM EST</span>
                    <Bell size={14} className="text-gray-500 hover:text-[#4A9FD8] cursor-pointer" />
                  </div>
                  <div className="text-sm font-bold text-white">MINNESOTA VS JERSEY</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-bold">AUG 19 • 4:30 PM EST</span>
                    <Bell size={14} className="text-gray-500 hover:text-[#4A9FD8] cursor-pointer" />
                  </div>
                  <div className="text-sm font-bold text-white">DALLAS VS NEW YORK</div>
                </div>
                <div className="bg-gray-800/50 rounded-lg p-3 hover:bg-gray-800 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400 font-bold">AUG 21 • 8:00 PM EST</span>
                    <Bell size={14} className="text-gray-500 hover:text-[#4A9FD8] cursor-pointer" />
                  </div>
                  <div className="text-sm font-bold text-white">CHICAGO VS BOSTON</div>
                </div>
              </div>
            </div>

            {/* Arena Experience CTA */}
            <div className="bg-gradient-to-br from-[#4A9FD8] to-[#3a8fc8] rounded-xl p-6">
              <h3 className="text-xl font-black text-black mb-2">
                3ICE ARENA EXPERIENCE
              </h3>
              <p className="text-sm text-black/80 mb-4">
                Join us for the 3ICE Championship at our state-of-the-art arena.
              </p>
              <Link href="/ticketing" className="w-full bg-black hover:bg-gray-900 text-white font-black py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2">
                <Ticket size={20} />
                GET TICKETS
              </Link>
            </div>

            {/* Match Stats */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-black text-white">FINAL SCORE</h3>
                <span className="text-xs text-[#4A9FD8] font-bold">{currentGame.date.split(',')[0]}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto mb-3 relative">
                    <Image
                      src={getAssetPath("/Minnesota.png")}
                      alt="Minnesota"
                      width={80}
                      height={80}
                      className="object-contain drop-shadow-[0_0_15px_rgba(74,159,216,0.5)]"
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-1">Minnesota</div>
                  <div className="text-5xl font-black text-[#4A9FD8]">3</div>
                </div>
                <div className="text-gray-500 font-black text-xl px-4">VS</div>
                <div className="text-center flex-1">
                  <div className="w-20 h-20 mx-auto mb-3 relative">
                    <Image
                      src={getAssetPath("/Buffalo.png")}
                      alt="Buffalo"
                      width={80}
                      height={80}
                      className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    />
                  </div>
                  <div className="text-sm font-bold text-gray-400 mb-1">Buffalo</div>
                  <div className="text-5xl font-black text-white">2</div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <h3 className="font-black text-white">Comments</h3>
                <span className="text-xs text-gray-400">
                  4.5k comments
                </span>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-2">
                    <div className={`w-8 h-8 ${msg.color} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-xs font-bold text-white">{msg.user.slice(0, 2).toUpperCase()}</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-gray-400">{msg.user}</div>
                      <div className="text-sm text-white">{msg.message}</div>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              <div className="p-4 border-t border-gray-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Say something..."
                    className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A9FD8] text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="bg-[#4A9FD8] hover:bg-[#3a8fc8] text-white p-2 rounded-lg transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Game Highlights */}
            <div className="bg-gradient-to-br from-[#4A9FD8]/10 to-transparent border-2 border-[#4A9FD8]/30 rounded-xl p-6">
              <h3 className="text-lg font-black text-white mb-2 flex items-center gap-2">
                <Flame className="text-[#4A9FD8]" size={20} />
                KEY MOMENTS
              </h3>
              <p className="text-xs text-gray-400 mb-4">Jump to exciting plays</p>
              <div className="space-y-2">
                <button className="w-full group bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-[#4A9FD8] rounded-lg p-3 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Zuccarello Goal</div>
                      <div className="text-xs text-gray-400">Period 2 • 04:32</div>
                    </div>
                    <Play size={16} className="text-[#4A9FD8]" />
                  </div>
                </button>
                <button className="w-full group bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-[#4A9FD8] rounded-lg p-3 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Game Winner</div>
                      <div className="text-xs text-gray-400">Period 3 • 00:45</div>
                    </div>
                    <Play size={16} className="text-[#4A9FD8]" />
                  </div>
                </button>
                <button className="w-full group bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-[#4A9FD8] rounded-lg p-3 transition-all text-left">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">Best Saves</div>
                      <div className="text-xs text-gray-400">All Periods</div>
                    </div>
                    <Play size={16} className="text-[#4A9FD8]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Shop the Look */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <ShoppingBag size={20} className="text-[#4A9FD8]" />
                SHOP THE LOOK
              </h3>
              <div className="space-y-3">
                <div 
                  onClick={() => {
                    const cartItem = {
                      id: `watch-merch-1-${Date.now()}`,
                      type: 'merchandise',
                      name: 'Minnesota Hoodie',
                      team: '3ICE Minnesota',
                      category: 'hoodie',
                      price: 74.99,
                      quantity: 1,
                      total: 74.99,
                      image: getAssetPath('/jersey-minnesota.png')
                    };
                    
                    if (typeof window !== 'undefined') {
                      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                      existingCart.push(cartItem);
                      localStorage.setItem('cart', JSON.stringify(existingCart));
                      
                      const event = new CustomEvent('cartUpdate', {
                        detail: { count: existingCart.length, showCart: true }
                      });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="group cursor-pointer bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0">
                      <Image
                        src={getAssetPath("/jersey-minnesota.png")}
                        alt="Minnesota Hoodie"
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">Minnesota Hoodie</h4>
                      <p className="text-xs text-gray-400">Official Gear</p>
                      <p className="text-[#4A9FD8] font-black text-sm mt-1">$74.99</p>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => {
                    const cartItem = {
                      id: `watch-merch-2-${Date.now()}`,
                      type: 'merchandise',
                      name: 'Pro Jersey',
                      team: '3ICE Minnesota',
                      category: 'jersey',
                      price: 120.00,
                      quantity: 1,
                      total: 120.00,
                      image: getAssetPath('/jersey-minnesota.png')
                    };
                    
                    if (typeof window !== 'undefined') {
                      const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                      existingCart.push(cartItem);
                      localStorage.setItem('cart', JSON.stringify(existingCart));
                      
                      const event = new CustomEvent('cartUpdate', {
                        detail: { count: existingCart.length, showCart: true }
                      });
                      window.dispatchEvent(event);
                    }
                  }}
                  className="group cursor-pointer bg-gray-800/50 hover:bg-gray-800 rounded-lg p-3 transition-all"
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0">
                      <Image
                        src={getAssetPath("/jersey-minnesota.png")}
                        alt="Pro Jersey"
                        fill
                        className="object-contain p-1"
                        unoptimized
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">Pro Jersey</h4>
                      <p className="text-xs text-gray-400">Game Day</p>
                      <p className="text-[#4A9FD8] font-black text-sm mt-1">$120.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/shop"
                className="block w-full mt-4 text-center text-sm text-[#4A9FD8] hover:text-[#3a8fc8] font-bold transition-colors"
              >
                View All Products →
              </Link>
            </div>


            {/* Top Performers */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#4A9FD8]" />
                TOP PERFORMERS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#4A9FD8]/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-[#4A9FD8]">MZ</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">M. Zuccarello</div>
                      <div className="text-xs text-gray-400">MIN • Forward</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-[#4A9FD8]">2G 1A</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                      <span className="text-xs font-black text-white">JP</span>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">J. Pavelski</div>
                      <div className="text-xs text-gray-400">BUF • Forward</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-black text-white">1G 2A</div>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-sm text-[#4A9FD8] hover:text-[#3a8fc8] font-bold transition-colors">
                VIEW FULL BOX SCORE
              </button>
            </div>
          </div>
        </div>

        {/* More Games Section */}
        <div>
          <h2 className="text-2xl font-black mb-6 text-white">
            MORE <span className="text-[#4A9FD8]">GAMES</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.filter(g => g.id !== currentGame.id).map((game) => (
              <div
                key={game.id}
                className="group cursor-pointer"
                onClick={() => handleGameSelect(game)}
              >
                <div className="relative aspect-video rounded-xl overflow-hidden border border-[#4A9FD8]/20 hover:border-[#4A9FD8] transition-all mb-4">
                  {/* YouTube Thumbnail */}
                  <Image 
                    src={game.thumbnail} 
                    alt={game.title}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="bg-[#4A9FD8]/80 group-hover:bg-[#4A9FD8] rounded-full p-4 transition-colors transform group-hover:scale-110">
                      <Play className="text-white" size={32} fill="white" />
                    </div>
                  </div>
                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/90 px-2 py-1 rounded text-xs font-mono text-white">
                    {game.duration}
                  </div>
                </div>
                <h3 className="font-bold text-white group-hover:text-[#4A9FD8] transition-colors mb-1">
                  {game.title}
                </h3>
                <p className="text-sm text-gray-400 mb-1">{game.date}</p>
                <p className="text-xs text-gray-500">{game.description}</p>
              </div>
            ))}
          </div>

          {/* All Games Grid */}
          <div className="mt-12">
            <h2 className="text-2xl font-black mb-6 text-white">
              FULL <span className="text-[#4A9FD8]">GAME LIBRARY</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {games.map((game) => (
                <div
                  key={`grid-${game.id}`}
                  className={`group cursor-pointer ${currentGame.id === game.id ? 'ring-2 ring-[#4A9FD8]' : ''} rounded-lg overflow-hidden`}
                  onClick={() => handleGameSelect(game)}
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-[#4A9FD8]/20 hover:border-[#4A9FD8] transition-all">
                    <Image 
                      src={game.thumbnail} 
                      alt={game.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                      <div className="bg-[#4A9FD8]/80 group-hover:bg-[#4A9FD8] rounded-full p-2 transition-colors">
                        <Play className="text-white" size={20} fill="white" />
                      </div>
                    </div>
                    {currentGame.id === game.id && (
                      <div className="absolute top-2 left-2 bg-[#4A9FD8] text-white text-xs font-bold px-2 py-1 rounded">
                        NOW PLAYING
                      </div>
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white group-hover:text-[#4A9FD8] transition-colors mt-2 line-clamp-2">
                    {game.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
