'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, Play, TrendingUp, ExternalLink, Trophy } from 'lucide-react';
import { Button, Badge, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface CompactFeaturedPreviewProps {
  game: Game;
}

export default function CompactFeaturedPreview({ game }: CompactFeaturedPreviewProps) {
  const formatGameDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-r from-[#4A9FD8]/15 via-black/40 to-[#1a4d7a]/15 border-2 border-[#4A9FD8]/40 rounded-lg overflow-hidden"
    >
      {/* Hero Anchor - Top Meta Line */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-[#4A9FD8]/20">
        <div className="flex items-center gap-2">
          <Trophy size={14} className="text-[#4A9FD8]" />
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
            {game.competitionLabel || 'Patrick Cup • Week 1'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge size="xs" className="!bg-[#4A9FD8] !text-white uppercase font-bold">
            Featured Matchup
          </Badge>
          <Badge size="xs" className={getStatusColor(game.status)}>
            {game.status}
          </Badge>
        </div>
      </div>

      <div className="p-4">
        {/* Teams Row - Compact */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          {/* Team A */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-1.5 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent rounded-full p-2 flex items-center justify-center border border-[#4A9FD8]/30">
              <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={40} height={40} unoptimized />
            </div>
            <div className="font-black text-white text-sm leading-tight">{game.teams.teamA.name}</div>
            <div className="text-xs text-gray-500">{game.teams.teamA.record}</div>
            {game.score && <div className="text-2xl font-black text-[#4A9FD8] mt-1">{game.score.teamA}</div>}
          </div>

          {/* VS / Info */}
          <div className="flex flex-col items-center justify-center">
            <div className="text-xl font-black text-[#4A9FD8] mb-1">VS</div>
            <div className="text-xs text-gray-400 text-center space-y-0.5">
              <div className="flex items-center gap-1 justify-center">
                <Calendar size={10} />
                <span className="text-xs">{formatGameDateTime(game.dateTime)}</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <MapPin size={10} />
                <span className="text-xs">{game.city}</span>
              </div>
            </div>
          </div>

          {/* Team B */}
          <div className="text-center">
            <div className="w-14 h-14 mx-auto mb-1.5 bg-white/5 rounded-full p-2 flex items-center justify-center border border-white/20">
              <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={40} height={40} unoptimized />
            </div>
            <div className="font-black text-white text-sm leading-tight">{game.teams.teamB.name}</div>
            <div className="text-xs text-gray-500">{game.teams.teamB.record}</div>
            {game.score && <div className="text-2xl font-black text-gray-400 mt-1">{game.score.teamB}</div>}
          </div>
        </div>

        {/* Dense 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-3">
          {/* Left Column: Why + Win Prob */}
          <div className="space-y-2">
            {game.whyItMatters && (
              <div className="bg-black/40 rounded p-2.5">
                <h4 className="text-xs font-bold text-[#4A9FD8] mb-1 uppercase">Why It Matters</h4>
                <p className="text-xs text-gray-300 leading-snug line-clamp-2">{game.whyItMatters}</p>
              </div>
            )}

            {game.winProb && (
              <div className="bg-black/40 rounded p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={12} className="text-[#4A9FD8]" />
                    <h4 className="text-xs font-bold text-white uppercase">Win Probability</h4>
                  </div>
                  <span className="text-xs text-gray-500">Mock model</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{game.teams.teamA.name}</span>
                    <span className="font-black text-[#4A9FD8]">{game.winProb.teamA}%</span>
                  </div>
                  <Progress value={game.winProb.teamA} size="xs" classNames={{ root: '!bg-gray-800', section: '!bg-[#4A9FD8]' }} />
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-400">{game.teams.teamB.name}</span>
                    <span className="font-black text-gray-400">{game.winProb.teamB}%</span>
                  </div>
                  <Progress value={game.winProb.teamB} size="xs" classNames={{ root: '!bg-gray-800', section: '!bg-gray-600' }} />
                </div>
                <div className="text-xs text-gray-500 mt-1.5">Uses last 5 games + goalie matchup</div>
              </div>
            )}
          </div>

          {/* Right Column: Odds + Key Stats */}
          <div className="space-y-2">
            {game.bettingOdds && (
              <div className="bg-black/40 rounded p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-white uppercase">Betting Odds</h4>
                  <span className="text-xs text-gray-500">Mock odds</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs mb-2">
                  <div>
                    <div className="text-gray-500 mb-1 text-xs">ML</div>
                    <div className="font-bold text-[#4A9FD8] text-xs">{game.bettingOdds.moneyline.teamA}</div>
                    <div className="font-bold text-gray-400 text-xs">{game.bettingOdds.moneyline.teamB}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1 text-xs">Spread</div>
                    <div className="font-bold text-[#4A9FD8] text-xs">{game.bettingOdds.spread.teamA.split(' ')[0]}</div>
                    <div className="font-bold text-gray-400 text-xs">{game.bettingOdds.spread.teamB.split(' ')[0]}</div>
                  </div>
                  <div>
                    <div className="text-gray-500 mb-1 text-xs">O/U</div>
                    <div className="font-bold text-white text-xs">{game.bettingOdds.total.line}</div>
                  </div>
                </div>
                <a href="https://www.draftkings.com" target="_blank" rel="noopener noreferrer">
                  <Button size="xs" fullWidth variant="outline" className="!border-[#4A9FD8]/50 !text-[#4A9FD8] !h-6 !text-xs" rightSection={<ExternalLink size={12} />}>
                    Bet Now
                  </Button>
                </a>
              </div>
            )}

            {game.keyStats && game.keyStats.length > 0 && (
              <div className="bg-black/40 rounded p-2.5">
                <h4 className="text-xs font-bold text-white mb-1.5 uppercase">Key Stats</h4>
                <div className="space-y-1">
                  {game.keyStats.slice(0, 3).map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="font-bold text-[#4A9FD8] w-12 text-right">{stat.teamA}</span>
                      <span className="text-gray-500 flex-1 text-center text-xs">{stat.label}</span>
                      <span className="font-bold text-gray-400 w-12">{stat.teamB}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Leaders, Injuries, Notes */}
        <Tabs defaultValue="leaders" classNames={{
          root: 'mb-3',
          list: '!bg-black/40 !border-none !mb-2',
          tab: '!text-gray-400 !text-xs !py-1.5 !px-3 data-[active=true]:!text-[#4A9FD8] data-[active=true]:!border-[#4A9FD8]',
          panel: '!p-0',
        }}>
          <Tabs.List>
            <Tabs.Tab value="leaders">Leaders</Tabs.Tab>
            <Tabs.Tab value="injuries">Injuries</Tabs.Tab>
            <Tabs.Tab value="notes">Notes</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="leaders">
            {game.teamLeaders && (
              <div className="bg-black/40 rounded p-2.5">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-xs text-[#4A9FD8] font-bold mb-1.5">{game.teams.teamA.name}</div>
                    {game.teamLeaders.teamA.map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 mb-1.5">
                        <Image src={leader.avatar} alt={leader.name} width={20} height={20} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate leading-tight">{leader.name}</div>
                          <div className="text-xs text-gray-500 leading-tight">{leader.stat}: {leader.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs text-gray-400 font-bold mb-1.5">{game.teams.teamB.name}</div>
                    {game.teamLeaders.teamB.map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 mb-1.5">
                        <Image src={leader.avatar} alt={leader.name} width={20} height={20} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-white truncate leading-tight">{leader.name}</div>
                          <div className="text-xs text-gray-500 leading-tight">{leader.stat}: {leader.value}</div>
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
              <div className="bg-black/40 rounded p-2.5">
                <div className="space-y-1.5">
                  {game.injuries.map((injury, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <span className="text-white">{injury.player}</span>
                      <span className="text-gray-500 text-xs">({injury.team === 'teamA' ? game.teams.teamA.name : game.teams.teamB.name})</span>
                      <Badge size="xs" className={
                        injury.status === 'Out' ? '!bg-red-600/80' :
                        injury.status === 'Doubtful' ? '!bg-orange-600/80' :
                        injury.status === 'Questionable' ? '!bg-yellow-600/80' :
                        '!bg-blue-600/80'
                      }>
                        {injury.status}
                      </Badge>
                      <span className="text-gray-500 text-xs">{injury.injury}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-black/40 rounded p-2.5 text-center text-xs text-gray-500">
                No injuries reported
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="notes">
            <div className="bg-black/40 rounded p-2.5">
              {game.didYouKnow && game.didYouKnow.length > 0 && (
                <div className="space-y-1.5 mb-2">
                  {game.didYouKnow.slice(0, 2).map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#4A9FD8] font-black text-xs">•</span>
                      <p className="text-xs text-gray-300 leading-snug">{fact}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 italic pt-2 border-t border-gray-700/50">
                Data based on mock API from OutSportsData
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>

        {/* CTAs - Compact */}
        <div className="flex gap-2">
          <Link href={`/matchup/${game.id}`} className="flex-1">
            <Button size="sm" fullWidth className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold !h-8 !text-xs">
              Matchup Hub
            </Button>
          </Link>
          <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" fullWidth variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8] !h-8 !text-xs" leftSection={<Ticket size={14} />}>
              Tickets
            </Button>
          </a>
          {game.vodUrl && (
            <Button size="sm" variant="outline" className="!border-white/30 !text-white !h-8 !text-xs" leftSection={<Play size={14} />}>
              Watch
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
