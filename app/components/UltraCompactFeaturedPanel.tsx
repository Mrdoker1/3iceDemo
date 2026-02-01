'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, Play, TrendingUp, ExternalLink, Trophy } from 'lucide-react';
import { Button, Badge, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface UltraCompactFeaturedPanelProps {
  game: Game;
}

export default function UltraCompactFeaturedPanel({ game }: UltraCompactFeaturedPanelProps) {
  const formatGameDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Live': return '!bg-red-500 !text-white animate-pulse';
      case 'Final': return '!bg-gray-700 !text-gray-300';
      case 'Upcoming': return '!bg-green-600 !text-white';
      default: return '!bg-gray-600 !text-white';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative bg-gradient-to-r from-[#4A9FD8]/15 via-black/40 to-[#1a4d7a]/15 border border-[#4A9FD8]/40 rounded-md overflow-hidden"
    >
      {/* Top Meta Line - Single Row */}
      <div className="flex items-center justify-between px-2 py-1 bg-black/60 border-b border-[#4A9FD8]/20">
        <div className="flex items-center gap-1.5 text-xs">
          <Trophy size={10} className="text-[#4A9FD8]" />
          <span className="font-bold text-gray-400 uppercase tracking-wide text-xs">
            {game.competitionLabel || 'Patrick Cup • Week 1'}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Badge size="xs" className="!bg-[#4A9FD8] !text-white uppercase font-bold !text-xs !px-1 !h-4">
            Featured
          </Badge>
          <Badge size="xs" className={`${getStatusColor(game.status)} !text-xs !px-1 !h-4`}>
            {game.status}
          </Badge>
        </div>
      </div>

      <div className="p-2">
        {/* Teams Row - Ultra Compact */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 mb-2">
          {/* Team A */}
          <div className="flex items-center gap-1.5">
            <div className="w-8 h-8 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent rounded-full p-1 flex items-center justify-center border border-[#4A9FD8]/30 flex-shrink-0">
              <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={24} height={24} unoptimized />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-black text-white text-xs leading-tight truncate">{game.teams.teamA.name}</div>
              <div className="text-xs text-gray-500 leading-tight">{game.teams.teamA.record}</div>
            </div>
            {game.score && <div className="text-xl font-black text-[#4A9FD8]">{game.score.teamA}</div>}
          </div>

          {/* VS / Info */}
          <div className="flex flex-col items-center justify-center px-2">
            <div className="text-sm font-black text-[#4A9FD8]">VS</div>
            <div className="text-xs text-gray-400 text-center flex items-center gap-0.5">
              <Calendar size={8} />
              <span className="text-xs">{formatGameDateTime(game.dateTime)}</span>
            </div>
          </div>

          {/* Team B */}
          <div className="flex items-center gap-1.5 flex-row-reverse">
            <div className="w-8 h-8 bg-white/5 rounded-full p-1 flex items-center justify-center border border-white/20 flex-shrink-0">
              <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={24} height={24} unoptimized />
            </div>
            <div className="min-w-0 flex-1 text-right">
              <div className="font-black text-white text-xs leading-tight truncate">{game.teams.teamB.name}</div>
              <div className="text-xs text-gray-500 leading-tight">{game.teams.teamB.record}</div>
            </div>
            {game.score && <div className="text-xl font-black text-gray-400">{game.score.teamB}</div>}
          </div>
        </div>

        {/* Dense 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-2">
          {/* Left Column: Why + Win Prob */}
          <div className="space-y-1.5">
            {game.whyItMatters && (
              <div className="bg-black/40 rounded p-1.5">
                <h4 className="text-xs font-bold text-[#4A9FD8] mb-0.5 uppercase">Why It Matters</h4>
                <p className="text-xs text-gray-300 leading-tight line-clamp-2">{game.whyItMatters}</p>
              </div>
            )}

            {game.winProb && (
              <div className="bg-black/40 rounded p-1.5">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-0.5">
                    <TrendingUp size={10} className="text-[#4A9FD8]" />
                    <h4 className="text-xs font-bold text-white uppercase">Win Prob</h4>
                  </div>
                  <span className="text-xs text-gray-500">Mock</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400 text-xs">{game.teams.teamA.name.split(' ').pop()}</span>
                    <span className="font-black text-[#4A9FD8] text-xs">{game.winProb.teamA}%</span>
                  </div>
                  <Progress value={game.winProb.teamA} size="xs" classNames={{ root: '!bg-gray-800 !h-1', section: '!bg-[#4A9FD8]' }} />
                </div>
                <div className="text-xs text-gray-500 mt-1">Last 5 + goalie matchup</div>
              </div>
            )}
          </div>

          {/* Right Column: Odds + Key Stats */}
          <div className="space-y-1.5">
            {game.bettingOdds && (
              <div className="bg-black/40 rounded p-1.5">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-xs font-bold text-white uppercase">Odds</h4>
                  <span className="text-xs text-gray-500">Mock</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs mb-1.5">
                  <div>
                    <div className="text-gray-500 text-xs">ML</div>
                    <div className="font-bold text-[#4A9FD8] text-xs">{game.bettingOdds.moneyline.teamA}</div>
                    <div className="font-bold text-gray-400 text-xs">{game.bettingOdds.moneyline.teamB}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">Spread</div>
                    <div className="font-bold text-[#4A9FD8] text-xs">{game.bettingOdds.spread.teamA.split(' ')[0]}</div>
                    <div className="font-bold text-gray-400 text-xs">{game.bettingOdds.spread.teamB.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 text-xs">O/U</div>
                    <div className="font-bold text-white text-xs">{game.bettingOdds.total.line}</div>
                  </div>
                </div>
                <a href="https://www.draftkings.com" target="_blank" rel="noopener noreferrer">
                  <Button size="xs" fullWidth variant="outline" className="!border-[#4A9FD8]/50 !text-[#4A9FD8] !h-5 !text-xs !py-0" rightSection={<ExternalLink size={10} />}>
                    Bet ↗
                  </Button>
                </a>
              </div>
            )}

            {game.keyStats && game.keyStats.length > 0 && (
              <div className="bg-black/40 rounded p-1.5">
                <h4 className="text-xs font-bold text-white mb-1 uppercase">Key Stats</h4>
                <div className="space-y-0.5">
                  {game.keyStats.slice(0, 3).map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A9FD8] w-10 text-right text-xs">{stat.teamA}</span>
                      <span className="text-gray-500 flex-1 text-center text-xs">{stat.label}</span>
                      <span className="font-bold text-gray-400 w-10 text-xs">{stat.teamB}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Leaders, Injuries, Notes */}
        <Tabs defaultValue="leaders" classNames={{
          root: 'mb-1.5',
          list: '!bg-black/40 !border-none !mb-1.5 !gap-0',
          tab: '!text-gray-400 !text-xs !py-1 !px-2 data-[active=true]:!text-[#4A9FD8] data-[active=true]:!border-[#4A9FD8] !h-6',
          panel: '!p-0',
        }}>
          <Tabs.List>
            <Tabs.Tab value="leaders">Leaders</Tabs.Tab>
            <Tabs.Tab value="injuries">Injuries</Tabs.Tab>
            <Tabs.Tab value="notes">Notes</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="leaders">
            {game.teamLeaders && (
              <div className="bg-black/40 rounded p-1.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="text-xs text-[#4A9FD8] font-bold mb-1">{game.teams.teamA.name.split(' ').pop()}</div>
                    {game.teamLeaders.teamA.slice(0, 2).map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-1 mb-1">
                        <Image src={leader.avatar} alt={leader.name} width={16} height={16} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate leading-tight">{leader.name.split(' ').pop()}</div>
                          <div className="text-xs text-gray-500 leading-tight">{leader.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold mb-1">{game.teams.teamB.name.split(' ').pop()}</div>
                    {game.teamLeaders.teamB.slice(0, 2).map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-1 mb-1">
                        <Image src={leader.avatar} alt={leader.name} width={16} height={16} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate leading-tight">{leader.name.split(' ').pop()}</div>
                          <div className="text-xs text-gray-500 leading-tight">{leader.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="injuries">
            {game.injuries && game.injuries.length > 0 ? (
              <div className="bg-black/40 rounded p-1.5">
                <div className="space-y-1">
                  {game.injuries.slice(0, 3).map((injury, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-white text-xs truncate flex-1">{injury.player.split(' ').pop()}</span>
                      <Badge size="xs" className={`${
                        injury.status === 'Out' ? '!bg-red-600/80' :
                        injury.status === 'Doubtful' ? '!bg-orange-600/80' :
                        '!bg-yellow-600/80'
                      } !text-xs !px-1 !h-4`}>
                        {injury.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded p-1.5 text-center text-xs text-gray-500">
                No injuries
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="notes">
            <div className="bg-black/40 rounded p-1.5">
              {game.didYouKnow && game.didYouKnow.length > 0 && (
                <div className="space-y-1 mb-1.5">
                  {game.didYouKnow.slice(0, 2).map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-1">
                      <span className="text-[#4A9FD8] font-black text-xs">•</span>
                      <p className="text-xs text-gray-300 leading-tight">{fact}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 italic pt-1 border-t border-gray-700/50">
                Mock API • OutSportsData
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>

        {/* CTAs - Ultra Compact */}
        <div className="flex gap-1">
          <Link href={`/matchup/${game.id}`} className="flex-1">
            <Button size="xs" fullWidth className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold !h-6 !text-xs !py-0">
              Hub
            </Button>
          </Link>
          <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="xs" fullWidth variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8] !h-6 !text-xs !py-0" leftSection={<Ticket size={10} />}>
              Tix ↗
            </Button>
          </a>
          {game.vodUrl && (
            <Button size="xs" variant="outline" className="!border-white/30 !text-white !h-6 !text-xs !py-0 !px-2" leftSection={<Play size={10} />}>
              Watch
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
