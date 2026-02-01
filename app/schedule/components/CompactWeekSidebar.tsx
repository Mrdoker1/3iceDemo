'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink, Search, Ticket, Info } from 'lucide-react';
import { Badge, TextInput, ActionIcon } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface CompactWeekSidebarProps {
  games: Game[];
  selectedWeek: string;
}

export default function CompactWeekSidebar({ games, selectedWeek }: CompactWeekSidebarProps) {
  const [sidebarSearch, setSidebarSearch] = useState('');

  const filteredGames = games.filter(g =>
    g.teams.teamA.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    g.teams.teamB.name.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

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
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-3 sticky top-20 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar"
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <Calendar className="text-[#4A9FD8]" size={14} />
        <h3 className="text-sm font-black text-white">WEEK {selectedWeek}</h3>
      </div>

      {/* Inline Search */}
      <TextInput
        placeholder="Search games..."
        size="xs"
        value={sidebarSearch}
        onChange={(e) => setSidebarSearch(e.target.value)}
        leftSection={<Search size={12} className="text-gray-400" />}
        className="mb-2.5"
        classNames={{
          input: '!bg-black !border-gray-700 !text-white placeholder:!text-gray-500 !text-xs !h-6',
        }}
      />

      <div className="space-y-2">
        {filteredGames.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`${
              game.isFeatured
                ? 'bg-gradient-to-br from-[#4A9FD8]/15 to-[#1a4d7a]/15 border-[#4A9FD8]/40'
                : 'bg-black/60 border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30'
            } border rounded-lg p-2 transition-all`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-gray-500">{formatDate(game.dateTime)}</span>
                <Badge size="xs" className={getStatusColor(game.status)}>
                  {game.status}
                </Badge>
              </div>
              {game.isFeatured && (
                <Badge size="xs" className="!bg-[#4A9FD8] !text-white !text-xs !px-1.5 !h-4">★</Badge>
              )}
            </div>

            {/* Teams - Super Compact */}
            <div className="space-y-1 mb-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getAssetPath(game.teams.teamA.logo)}
                      alt={game.teams.teamA.name}
                      width={14}
                      height={14}
                      unoptimized
                    />
                  </div>
                  <span className="text-xs font-bold text-white truncate">{game.teams.teamA.name}</span>
                </div>
                {game.score && <span className="text-sm font-black text-[#4A9FD8] ml-1">{game.score.teamA}</span>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 flex-1 min-w-0">
                  <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Image
                      src={getAssetPath(game.teams.teamB.logo)}
                      alt={game.teams.teamB.name}
                      width={14}
                      height={14}
                      unoptimized
                    />
                  </div>
                  <span className="text-xs font-bold text-white truncate">{game.teams.teamB.name}</span>
                </div>
                {game.score && <span className="text-sm font-black text-gray-400 ml-1">{game.score.teamB}</span>}
              </div>
            </div>

            {/* Time & Odds */}
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <div className="flex items-center gap-0.5">
                <Clock size={10} />
                <span className="text-xs">{formatTime(game.dateTime)}</span>
              </div>
              {game.odds && !game.score && (
                <span className="text-xs">{game.odds.teamA} / {game.odds.teamB}</span>
              )}
            </div>

            {/* Win Probability Bar */}
            {game.winProb && (
              <div className="mb-1.5">
                <div className="flex justify-between text-xs text-gray-500 mb-0.5">
                  <span>{game.winProb.teamA}%</span>
                  <span>{game.winProb.teamB}%</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden flex">
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

            {/* Icon Actions */}
            <div className="flex gap-1">
              <Link href={`/matchup/${game.id}`} className="flex-1">
                <ActionIcon
                  size="xs"
                  variant="outline"
                  className="!border-[#4A9FD8]/50 !text-[#4A9FD8] w-full !h-5"
                  title="Details"
                >
                  <Info size={12} />
                </ActionIcon>
              </Link>
              <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <ActionIcon
                  size="xs"
                  className="!bg-[#4A9FD8] !text-white w-full !h-5"
                  title="Tickets"
                >
                  <Ticket size={12} />
                </ActionIcon>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
