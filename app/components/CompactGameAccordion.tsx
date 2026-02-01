'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge, Collapse } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface CompactGameAccordionProps {
  games: Game[];
}

export default function CompactGameAccordion({ games }: CompactGameAccordionProps) {
  const [expanded, setExpanded] = useState(false);

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

  const nonFeaturedGames = games.filter(g => !g.isFeatured);

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-md overflow-hidden"
    >
      {/* Collapsed Summary Row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-1.5 hover:bg-[#4A9FD8]/5 transition-colors"
      >
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-white font-bold">Game Center</span>
          <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8] !text-xs !px-1 !h-4">
            {nonFeaturedGames.length} games
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-gray-400">
            {expanded ? 'Collapse' : 'Expand'}
          </span>
          {expanded ? <ChevronUp size={14} className="text-gray-400" /> : <ChevronDown size={14} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded Content */}
      <Collapse in={expanded}>
        <div className="p-1.5 pt-0 border-t border-[#4A9FD8]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
            {nonFeaturedGames.map((game) => (
              <Link
                key={game.id}
                href={`/matchup/${game.id}`}
                className="bg-black/60 border border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30 rounded p-1.5 transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <Badge size="xs" className={`${getStatusColor(game.status)} !text-xs !px-1 !h-4`}>{game.status}</Badge>
                  <span className="text-xs text-gray-400">
                    {game.status === 'Live' ? '2nd • 3:21' : formatTime(game.dateTime)}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                        <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={12} height={12} unoptimized />
                      </div>
                      <span className="text-xs font-bold text-white truncate">{game.teams.teamA.name.split(' ').pop()}</span>
                    </div>
                    {game.score ? (
                      <span className="text-sm font-black text-[#4A9FD8]">{game.score.teamA}</span>
                    ) : (
                      <span className="text-xs text-gray-500">{game.odds?.teamA}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                        <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={12} height={12} unoptimized />
                      </div>
                      <span className="text-xs font-bold text-white truncate">{game.teams.teamB.name.split(' ').pop()}</span>
                    </div>
                    {game.score ? (
                      <span className="text-sm font-black text-gray-400">{game.score.teamB}</span>
                    ) : (
                      <span className="text-xs text-gray-500">{game.odds?.teamB}</span>
                    )}
                  </div>
                </div>

                <div className="mt-1 pt-1 border-t border-gray-700/50 text-xs text-gray-500 truncate">
                  {game.venue}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Collapse>
    </motion.div>
  );
}
