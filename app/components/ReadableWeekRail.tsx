'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, Search, Ticket, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Badge, TextInput, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface ReadableWeekRailProps {
  games: Game[];
  selectedWeek: string;
}

export default function ReadableWeekRail({ games, selectedWeek }: ReadableWeekRailProps) {
  const [railSearch, setRailSearch] = useState('');
  const [showAll, setShowAll] = useState(false);

  const filteredGames = games.filter(g =>
    g.teams.teamA.name.toLowerCase().includes(railSearch.toLowerCase()) ||
    g.teams.teamB.name.toLowerCase().includes(railSearch.toLowerCase())
  );

  const displayedGames = showAll ? filteredGames : filteredGames.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Live': return '!bg-red-500 !text-white animate-pulse';
      case 'Final': return '!bg-gray-700 !text-gray-300';
      case 'Upcoming': return '!bg-green-600 !text-white';
      default: return '!bg-gray-600 !text-white';
    }
  };

  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  };

  const formatDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 sticky top-24"
    >
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="text-[#4A9FD8]" size={18} />
        <h3 className="text-base font-black text-white">WEEK {selectedWeek} GAMES</h3>
      </div>

      {/* Search */}
      <TextInput
        placeholder="Search games..."
        size="sm"
        value={railSearch}
        onChange={(e) => setRailSearch(e.target.value)}
        leftSection={<Search size={14} className="text-gray-400" />}
        className="mb-3"
        classNames={{
          input: '!bg-black !border-gray-700 !text-white placeholder:!text-gray-500 !text-sm',
        }}
      />

      <div className="space-y-3">
        {displayedGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${
              game.isFeatured
                ? 'bg-gradient-to-br from-[#4A9FD8]/15 to-[#1a4d7a]/15 border-[#4A9FD8]/40'
                : 'bg-black/60 border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30'
            } border rounded-lg p-3 transition-all`}
          >
            {/* Date + Status Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{formatDate(game.dateTime)}</span>
                <Badge size="sm" className={getStatusColor(game.status)}>
                  {game.status}
                </Badge>
              </div>
              {game.isFeatured && (
                <Badge size="sm" className="!bg-[#4A9FD8] !text-white">★ Featured</Badge>
              )}
            </div>

            {/* Teams */}
            <div className="space-y-2 mb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getAssetPath(game.teams.teamA.logo)}
                      alt={game.teams.teamA.name}
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-bold text-white truncate">{game.teams.teamA.name}</span>
                </div>
                {game.score && <span className="text-lg font-black text-[#4A9FD8] ml-2">{game.score.teamA}</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getAssetPath(game.teams.teamB.logo)}
                      alt={game.teams.teamB.name}
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                  <span className="text-sm font-bold text-white truncate">{game.teams.teamB.name}</span>
                </div>
                {game.score && <span className="text-lg font-black text-gray-400 ml-2">{game.score.teamB}</span>}
              </div>
            </div>

            {/* Time & Odds */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2 pb-2 border-b border-gray-700/50">
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{formatTime(game.dateTime)}</span>
              </div>
              {game.odds && !game.score && (
                <span className="text-xs">{game.odds.teamA} / {game.odds.teamB}</span>
              )}
            </div>

            {/* Win Probability Bar */}
            {game.winProb && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Win %: {game.winProb.teamA}%</span>
                  <span>{game.winProb.teamB}%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-[#4A9FD8]"
                    style={{ width: `${game.winProb.teamA}%` }}
                  ></div>
                  <div
                    className="bg-gray-600"
                    style={{ width: `${game.winProb.teamB}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <Link href={`/matchup/${game.id}`} className="flex-1">
                <Button
                  size="xs"
                  fullWidth
                  variant="outline"
                  className="!border-[#4A9FD8]/50 !text-[#4A9FD8] !text-xs"
                >
                  Details
                </Button>
              </Link>
              <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button
                  size="xs"
                  fullWidth
                  className="!bg-[#4A9FD8] !text-white !text-xs"
                  leftSection={<Ticket size={12} />}
                  rightSection={<ExternalLink size={10} />}
                >
                  Tickets
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expand/Collapse Control */}
      {filteredGames.length > 3 && (
        <Button
          size="sm"
          fullWidth
          variant="subtle"
          className="!text-[#4A9FD8] mt-3"
          onClick={() => setShowAll(!showAll)}
          rightSection={showAll ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        >
          {showAll ? 'Show Less' : `View All Games (${filteredGames.length})`}
        </Button>
      )}
    </motion.div>
  );
}
