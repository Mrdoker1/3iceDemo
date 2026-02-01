'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge, Button, Tabs } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface GameCenterProps {
  games: Game[];
}

export default function GameCenter({ games }: GameCenterProps) {
  const [expandedGame, setExpandedGame] = useState<string | null>(null);

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-2xl font-black text-white mb-4">GAME CENTER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl overflow-hidden"
          >
            {/* Game Card Header */}
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <Badge size="xs" className={getStatusColor(game.status)}>{game.status}</Badge>
                <span className="text-xs text-gray-400">{formatTime(game.dateTime)}</span>
              </div>

              {/* Teams */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                      <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={24} height={24} unoptimized />
                    </div>
                    <span className="text-sm font-bold text-white">{game.teams.teamA.name}</span>
                  </div>
                  {game.score && <span className="text-2xl font-black text-[#4A9FD8]">{game.score.teamA}</span>}
                  {!game.score && game.odds && <span className="text-xs text-gray-400">{game.odds.teamA}</span>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                      <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={24} height={24} unoptimized />
                    </div>
                    <span className="text-sm font-bold text-white">{game.teams.teamB.name}</span>
                  </div>
                  {game.score && <span className="text-2xl font-black text-gray-400">{game.score.teamB}</span>}
                  {!game.score && game.odds && <span className="text-xs text-gray-400">{game.odds.teamB}</span>}
                </div>
              </div>

              <div className="flex items-center gap-1 text-xs text-gray-400 mb-3">
                <MapPin size={12} />
                {game.venue}
              </div>

              {/* Expand/Collapse Button */}
              <Button
                size="xs"
                fullWidth
                variant="subtle"
                className="!text-[#4A9FD8]"
                onClick={() => setExpandedGame(expandedGame === game.id ? null : game.id)}
                rightSection={expandedGame === game.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              >
                {expandedGame === game.id ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {expandedGame === game.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-[#4A9FD8]/20"
                >
                  <Tabs defaultValue="summary" classNames={{
                    root: 'p-4',
                    list: '!bg-black/40 !border-none mb-3',
                    tab: '!text-gray-400 data-[active=true]:!text-[#4A9FD8] data-[active=true]:!border-[#4A9FD8]',
                  }}>
                    <Tabs.List>
                      <Tabs.Tab value="summary">Summary</Tabs.Tab>
                      <Tabs.Tab value="stats">Stats</Tabs.Tab>
                      <Tabs.Tab value="odds">Odds</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="summary">
                      <div className="text-xs text-gray-300 space-y-2">
                        {game.winProb && (
                          <div>
                            <div className="text-gray-500 mb-1">Win Probability</div>
                            <div className="flex justify-between">
                              <span>{game.teams.teamA.name}: {game.winProb.teamA}%</span>
                              <span>{game.teams.teamB.name}: {game.winProb.teamB}%</span>
                            </div>
                          </div>
                        )}
                        <Link href={`/matchup/${game.id}`}>
                          <Button size="xs" fullWidth className="!bg-[#4A9FD8] !text-white mt-2">
                            View Full Matchup
                          </Button>
                        </Link>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="stats">
                      <div className="text-xs space-y-1">
                        {game.keyStats?.slice(0, 3).map((stat, idx) => (
                          <div key={idx} className="flex justify-between text-gray-300">
                            <span className="text-[#4A9FD8]">{stat.teamA}</span>
                            <span className="text-gray-500">{stat.label}</span>
                            <span className="text-gray-400">{stat.teamB}</span>
                          </div>
                        ))}
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="odds">
                      <div className="text-xs space-y-2">
                        {game.bettingOdds && (
                          <>
                            <div>
                              <div className="text-gray-500 mb-1">Moneyline</div>
                              <div className="flex justify-between text-white">
                                <span>{game.bettingOdds.moneyline.teamA}</span>
                                <span>{game.bettingOdds.moneyline.teamB}</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-gray-500 mb-1">Total</div>
                              <div className="text-white">O/U {game.bettingOdds.total.line}</div>
                            </div>
                          </>
                        )}
                      </div>
                    </Tabs.Panel>
                  </Tabs>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
