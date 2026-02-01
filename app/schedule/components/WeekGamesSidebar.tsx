'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ExternalLink, TrendingUp } from 'lucide-react';
import { Badge, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface WeekGamesSidebarProps {
  games: Game[];
  selectedWeek: string;
}

export default function WeekGamesSidebar({ games, selectedWeek }: WeekGamesSidebarProps) {
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
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar"
    >
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-[#4A9FD8]" size={20} />
        <h3 className="text-lg font-black text-white">WEEK {selectedWeek} GAMES</h3>
      </div>

      <div className="space-y-3">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${
              game.isFeatured
                ? 'bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border-[#4A9FD8]'
                : 'bg-black/60 border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30'
            } border rounded-xl p-3 transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{formatDate(game.dateTime)}</span>
                <Badge size="xs" className={getStatusColor(game.status)}>
                  {game.status}
                </Badge>
              </div>
              {game.isFeatured && (
                <Badge size="xs" className="!bg-[#4A9FD8] !text-white">Featured</Badge>
              )}
            </div>

            {/* Teams */}
            <div className="space-y-1.5 mb-2">
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
                  <span className="text-xs font-bold text-white truncate">{game.teams.teamA.name}</span>
                </div>
                {game.score && <span className="text-lg font-black text-[#4A9FD8]">{game.score.teamA}</span>}
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
                  <span className="text-xs font-bold text-white truncate">{game.teams.teamB.name}</span>
                </div>
                {game.score && <span className="text-lg font-black text-gray-400">{game.score.teamB}</span>}
              </div>
            </div>

            {/* Time & Odds */}
            <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
              <div className="flex items-center gap-1">
                <Clock size={10} />
                {formatTime(game.dateTime)}
              </div>
              {game.odds && !game.score && (
                <div className="flex items-center gap-1">
                  <TrendingUp size={10} />
                  {game.odds.teamA} / {game.odds.teamB}
                </div>
              )}
            </div>

            {/* Win Probability */}
            {game.winProb && (
              <div className="mb-2 text-xs">
                <div className="flex justify-between text-gray-400 mb-1">
                  <span>Win Prob</span>
                  <span>{game.winProb.teamA}% - {game.winProb.teamB}%</span>
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

            {/* Actions */}
            <div className="flex gap-2">
              <Link href={`/matchup/${game.id}`} className="flex-1">
                <Button
                  size="xs"
                  fullWidth
                  variant="outline"
                  className="!border-[#4A9FD8] !text-[#4A9FD8] hover:!bg-[#4A9FD8]/10 font-bold"
                >
                  Details
                </Button>
              </Link>
              <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button
                  size="xs"
                  fullWidth
                  className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                  rightSection={<ExternalLink size={12} />}
                >
                  Tickets
                </Button>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
