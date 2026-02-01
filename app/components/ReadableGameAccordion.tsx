'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { Badge, Collapse, Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface ReadableGameAccordionProps {
  games: Game[];
}

export default function ReadableGameAccordion({ games }: ReadableGameAccordionProps) {
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl overflow-hidden"
    >
      {/* Header - Always Visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-[#4A9FD8]/5 transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="text-base text-white font-bold">Game Center</span>
          <Badge size="md" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">
            {nonFeaturedGames.length} {nonFeaturedGames.length === 1 ? 'game' : 'games'}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            {expanded ? 'Collapse' : 'Expand to view all games'}
          </span>
          {expanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded Content - Table-like Rows */}
      <Collapse in={expanded}>
        <div className="px-4 pb-4 border-t border-[#4A9FD8]/20">
          <div className="space-y-2 mt-4">
            {nonFeaturedGames.map((game) => (
              <div
                key={game.id}
                className="bg-black/60 border border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30 rounded-lg p-3 transition-all"
              >
                <div className="grid grid-cols-12 gap-3 items-center">
                  {/* Status + Time */}
                  <div className="col-span-2">
                    <Badge size="sm" className={`${getStatusColor(game.status)} mb-1`}>{game.status}</Badge>
                    <div className="text-xs text-gray-400">
                      {game.status === 'Live' ? '2nd • 3:21' : formatTime(game.dateTime)}
                    </div>
                  </div>

                  {/* Team A */}
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center flex-shrink-0">
                      <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={24} height={24} unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{game.teams.teamA.name}</div>
                      <div className="text-xs text-gray-500">{game.teams.teamA.record}</div>
                    </div>
                  </div>

                  {/* Score / Odds */}
                  <div className="col-span-2 text-center">
                    {game.score ? (
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-xl font-black text-[#4A9FD8]">{game.score.teamA}</span>
                        <span className="text-gray-500">-</span>
                        <span className="text-xl font-black text-gray-400">{game.score.teamB}</span>
                      </div>
                    ) : game.odds ? (
                      <div className="text-xs text-gray-400">
                        {game.odds.teamA} / {game.odds.teamB}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">vs</span>
                    )}
                  </div>

                  {/* Team B */}
                  <div className="col-span-3 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center flex-shrink-0">
                      <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={24} height={24} unoptimized />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-white truncate">{game.teams.teamB.name}</div>
                      <div className="text-xs text-gray-500">{game.teams.teamB.record}</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex gap-2 justify-end">
                    <Link href={`/matchup/${game.id}`}>
                      <Button
                        size="xs"
                        variant="outline"
                        className="!border-[#4A9FD8]/50 !text-[#4A9FD8]"
                      >
                        Details
                      </Button>
                    </Link>
                    <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer">
                      <Button
                        size="xs"
                        className="!bg-[#4A9FD8] !text-white"
                        rightSection={<ExternalLink size={12} />}
                      >
                        Tix
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Venue */}
                <div className="mt-2 pt-2 border-t border-gray-700/50 text-xs text-gray-500">
                  {game.venue} • {game.city}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Collapse>
    </motion.div>
  );
}
