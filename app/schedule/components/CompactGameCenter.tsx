'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface CompactGameCenterProps {
  games: Game[];
}

export default function CompactGameCenter({ games }: CompactGameCenterProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <h3 className="text-base font-black text-white mb-2.5">GAME CENTER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/matchup/${game.id}`}
            className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 hover:border-[#4A9FD8]/50 rounded-lg p-2.5 transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <Badge size="xs" className={getStatusColor(game.status)}>{game.status}</Badge>
              <span className="text-xs text-gray-400">
                {game.status === 'Live' ? '2nd • 3:21' : formatTime(game.dateTime)}
              </span>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                    <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={20} height={20} unoptimized />
                  </div>
                  <span className="text-xs font-bold text-white">{game.teams.teamA.name}</span>
                </div>
                {game.score ? (
                  <span className="text-lg font-black text-[#4A9FD8]">{game.score.teamA}</span>
                ) : (
                  <span className="text-xs text-gray-500">{game.odds?.teamA}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-6 h-6 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                    <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={20} height={20} unoptimized />
                  </div>
                  <span className="text-xs font-bold text-white">{game.teams.teamB.name}</span>
                </div>
                {game.score ? (
                  <span className="text-lg font-black text-gray-400">{game.score.teamB}</span>
                ) : (
                  <span className="text-xs text-gray-500">{game.odds?.teamB}</span>
                )}
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-gray-700/50 flex items-center justify-between">
              <span className="text-xs text-gray-500 truncate">{game.venue}</span>
              <ExternalLink size={12} className="text-[#4A9FD8] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
