'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, Play, TrendingUp, ExternalLink, Trophy } from 'lucide-react';
import { Button, Badge, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface ReadableFeaturedPanelProps {
  game: Game;
}

export default function ReadableFeaturedPanel({ game }: ReadableFeaturedPanelProps) {
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative bg-gradient-to-r from-[#4A9FD8]/15 via-black/40 to-[#1a4d7a]/15 border-2 border-[#4A9FD8]/40 rounded-xl overflow-hidden"
    >
      {/* Top Meta Line */}
      <div className="flex items-center justify-between px-4 py-2 bg-black/60 border-b border-[#4A9FD8]/20">
        <div className="flex items-center gap-2 text-sm">
          <Trophy size={14} className="text-[#4A9FD8]" />
          <span className="font-bold text-gray-400 uppercase tracking-wide">
            {game.competitionLabel || 'Patrick Cup • Week 1'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge size="sm" className="!bg-[#4A9FD8] !text-white uppercase font-bold">
            Featured Matchup
          </Badge>
          <Badge size="sm" className={getStatusColor(game.status)}>
            {game.status}
          </Badge>
        </div>
      </div>

      <div className="p-5">
        {/* Teams Header Row - 3 Blocks */}
        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-5">
          {/* Team A Block */}
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent rounded-full p-2 flex items-center justify-center border border-[#4A9FD8]/30">
              <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={48} height={48} unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-black text-white text-lg leading-tight">{game.teams.teamA.name}</div>
              <div className="text-sm text-gray-400">{game.teams.teamA.record}</div>
            </div>
            {game.score && <div className="text-4xl font-black text-[#4A9FD8]">{game.score.teamA}</div>}
          </div>

          {/* Center Info Block */}
          <div className="flex flex-col items-center justify-center px-4 border-x border-gray-700/50">
            <div className="text-2xl font-black text-[#4A9FD8] mb-2">VS</div>
            <div className="text-sm text-gray-400 text-center space-y-1">
              <div className="flex items-center gap-1 justify-center">
                <Calendar size={12} />
                <span>{formatGameDateTime(game.dateTime)}</span>
              </div>
              <div className="flex items-center gap-1 justify-center">
                <MapPin size={12} />
                <span>{game.venue}</span>
              </div>
              {game.city && <div className="text-xs text-gray-500">{game.city}</div>}
            </div>
          </div>

          {/* Team B Block */}
          <div className="flex items-center gap-3 flex-row-reverse">
            <div className="w-16 h-16 bg-white/5 rounded-full p-2 flex items-center justify-center border border-white/20">
              <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={48} height={48} unoptimized />
            </div>
            <div className="flex-1 min-w-0 text-right">
              <div className="font-black text-white text-lg leading-tight">{game.teams.teamB.name}</div>
              <div className="text-sm text-gray-400">{game.teams.teamB.record}</div>
            </div>
            {game.score && <div className="text-4xl font-black text-gray-400">{game.score.teamB}</div>}
          </div>
        </div>

        {/* Snapshot Chips Row - Compact Stats */}
        {(game.teams.teamA.streak || game.teams.teamA.gfpg) && (
          <div className="bg-black/30 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-gray-500 uppercase">Quick Snapshot</span>
              <span className="text-xs text-gray-600">• Data from OutSportsData API</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Team A Stats */}
              <div className="flex flex-wrap gap-2">
                {game.teams.teamA.streak && (
                  <Badge size="sm" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">
                    Streak: {game.teams.teamA.streak}
                  </Badge>
                )}
                {game.teams.teamA.gfpg && (
                  <Badge size="sm" className="!bg-green-600/20 !text-green-400">
                    GF/G: {game.teams.teamA.gfpg}
                  </Badge>
                )}
                {game.teams.teamA.gapg && (
                  <Badge size="sm" className="!bg-red-600/20 !text-red-400">
                    GA/G: {game.teams.teamA.gapg}
                  </Badge>
                )}
                {game.teams.teamA.pp && (
                  <Badge size="sm" className="!bg-purple-600/20 !text-purple-400">
                    PP: {game.teams.teamA.pp}
                  </Badge>
                )}
                {game.teams.teamA.pk && (
                  <Badge size="sm" className="!bg-blue-600/20 !text-blue-400">
                    PK: {game.teams.teamA.pk}
                  </Badge>
                )}
                {game.teams.teamA.fo && (
                  <Badge size="sm" className="!bg-orange-600/20 !text-orange-400">
                    FO: {game.teams.teamA.fo}
                  </Badge>
                )}
              </div>
              {/* Team B Stats */}
              <div className="flex flex-wrap gap-2 justify-end">
                {game.teams.teamB.streak && (
                  <Badge size="sm" className="!bg-gray-600/20 !text-gray-400">
                    Streak: {game.teams.teamB.streak}
                  </Badge>
                )}
                {game.teams.teamB.gfpg && (
                  <Badge size="sm" className="!bg-green-600/20 !text-green-400">
                    GF/G: {game.teams.teamB.gfpg}
                  </Badge>
                )}
                {game.teams.teamB.gapg && (
                  <Badge size="sm" className="!bg-red-600/20 !text-red-400">
                    GA/G: {game.teams.teamB.gapg}
                  </Badge>
                )}
                {game.teams.teamB.pp && (
                  <Badge size="sm" className="!bg-purple-600/20 !text-purple-400">
                    PP: {game.teams.teamB.pp}
                  </Badge>
                )}
                {game.teams.teamB.pk && (
                  <Badge size="sm" className="!bg-blue-600/20 !text-blue-400">
                    PK: {game.teams.teamB.pk}
                  </Badge>
                )}
                {game.teams.teamB.fo && (
                  <Badge size="sm" className="!bg-orange-600/20 !text-orange-400">
                    FO: {game.teams.teamB.fo}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3-Column Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Left Column: Why It Matters + Win Prob */}
          <div className="space-y-3">
            {game.whyItMatters && (
              <div className="bg-black/40 rounded-lg p-3">
                <h4 className="text-sm font-bold text-[#4A9FD8] mb-2 uppercase">Why It Matters</h4>
                <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">{game.whyItMatters}</p>
              </div>
            )}

            {game.winProb && (
              <div className="bg-black/40 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1">
                    <TrendingUp size={14} className="text-[#4A9FD8]" />
                    <h4 className="text-sm font-bold text-white uppercase">Win Probability</h4>
                  </div>
                  <span className="text-xs text-gray-500">Mock model</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{game.teams.teamA.name}</span>
                    <span className="font-black text-[#4A9FD8]">{game.winProb.teamA}%</span>
                  </div>
                  <Progress value={game.winProb.teamA} size="md" classNames={{ root: '!bg-gray-800', section: '!bg-[#4A9FD8]' }} />
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">{game.teams.teamB.name}</span>
                    <span className="font-black text-gray-400">{game.winProb.teamB}%</span>
                  </div>
                  <Progress value={game.winProb.teamB} size="md" classNames={{ root: '!bg-gray-800', section: '!bg-gray-600' }} />
                </div>
                <div className="text-xs text-gray-500 mt-2">Uses last 5 games + goalie matchup</div>
              </div>
            )}
          </div>

          {/* Middle Column: Betting Odds */}
          <div>
            {game.bettingOdds && (
              <div className="bg-black/40 rounded-lg p-3 h-full">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-white uppercase">Betting Odds</h4>
                  <span className="text-xs text-gray-500">Mock odds</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Moneyline</div>
                    <div className="font-bold text-[#4A9FD8] text-sm mb-1">{game.bettingOdds.moneyline.teamA}</div>
                    <div className="font-bold text-gray-400 text-sm">{game.bettingOdds.moneyline.teamB}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Spread</div>
                    <div className="font-bold text-[#4A9FD8] text-sm mb-1">{game.bettingOdds.spread.teamA}</div>
                    <div className="font-bold text-gray-400 text-sm">{game.bettingOdds.spread.teamB}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-2">Over/Under</div>
                    <div className="font-bold text-white text-sm mb-1">{game.bettingOdds.total.over}</div>
                    <div className="font-bold text-white text-sm">{game.bettingOdds.total.under}</div>
                    <div className="text-xs text-gray-500 mt-1">Line: {game.bettingOdds.total.line}</div>
                  </div>
                </div>
                <a href="https://www.draftkings.com" target="_blank" rel="noopener noreferrer">
                  <Button size="sm" fullWidth variant="outline" className="!border-[#4A9FD8]/50 !text-[#4A9FD8]" rightSection={<ExternalLink size={14} />}>
                    Bet Now
                  </Button>
                </a>
                <div className="text-xs text-gray-500 mt-2 text-center">Sportsbook redirect</div>
              </div>
            )}
          </div>

          {/* Right Column: Key Stats */}
          <div>
            {game.keyStats && game.keyStats.length > 0 && (
              <div className="bg-black/40 rounded-lg p-3 h-full">
                <h4 className="text-sm font-bold text-white mb-3 uppercase">Key Matchup Stats</h4>
                <div className="space-y-2">
                  {game.keyStats.slice(0, 6).map((stat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="font-bold text-[#4A9FD8] w-14 text-right">{stat.teamA}</span>
                      <span className="text-gray-400 flex-1 text-center text-xs">{stat.label}</span>
                      <span className="font-bold text-gray-400 w-14">{stat.teamB}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs: Leaders, Injuries, Notes */}
        <Tabs defaultValue="leaders" classNames={{
          root: 'mb-4',
          list: '!bg-black/40 !border-none !mb-3',
          tab: '!text-gray-400 !text-sm !py-2 !px-4 data-[active=true]:!text-[#4A9FD8] data-[active=true]:!border-[#4A9FD8]',
          panel: '!p-0',
        }}>
          <Tabs.List>
            <Tabs.Tab value="leaders">Team Leaders</Tabs.Tab>
            <Tabs.Tab value="injuries">Injury Report</Tabs.Tab>
            <Tabs.Tab value="notes">Notes & Facts</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="leaders">
            {game.teamLeaders && (
              <div className="bg-black/40 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-[#4A9FD8] font-bold mb-3">{game.teams.teamA.name}</div>
                    {game.teamLeaders.teamA.slice(0, 3).map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-3">
                        <Image src={leader.avatar} alt={leader.name} width={32} height={32} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-bold truncate">{leader.name}</div>
                          <div className="text-xs text-gray-400">{leader.stat}: {leader.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 font-bold mb-3">{game.teams.teamB.name}</div>
                    {game.teamLeaders.teamB.slice(0, 3).map((leader, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-3">
                        <Image src={leader.avatar} alt={leader.name} width={32} height={32} className="rounded-full" unoptimized />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-white font-bold truncate">{leader.name}</div>
                          <div className="text-xs text-gray-400">{leader.stat}: {leader.value}</div>
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
              <div className="bg-black/40 rounded-lg p-4">
                <div className="space-y-2">
                  {game.injuries.map((injury, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm p-2 bg-black/40 rounded">
                      <span className="text-white font-medium">{injury.player}</span>
                      <span className="text-gray-400 text-xs">({injury.team === 'teamA' ? game.teams.teamA.name : game.teams.teamB.name})</span>
                      <Badge size="sm" className={
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
              <div className="bg-black/40 rounded-lg p-4 text-center text-sm text-gray-500">
                No injuries reported
              </div>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="notes">
            <div className="bg-black/40 rounded-lg p-4">
              {game.didYouKnow && game.didYouKnow.length > 0 && (
                <div className="space-y-3 mb-3">
                  {game.didYouKnow.slice(0, 3).map((fact, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#4A9FD8] font-black text-sm">•</span>
                      <p className="text-sm text-gray-300 leading-relaxed">{fact}</p>
                    </div>
                  ))}
                </div>
              )}
              <div className="text-xs text-gray-500 italic pt-3 border-t border-gray-700/50">
                Mock data based on API from OutSportsData
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>

        {/* Bottom CTAs - Slim Row with Integration Badges */}
        <div className="flex gap-3">
          <Link href={`/matchup/${game.id}`} className="flex-1">
            <Button size="md" fullWidth className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold">
              Matchup Hub
            </Button>
          </Link>
          <div className="flex-1">
            <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer">
              <Button size="md" fullWidth variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8]" leftSection={<Ticket size={16} />} rightSection={<ExternalLink size={14} />}>
                Tickets
              </Button>
            </a>
            <div className="text-xs text-gray-500 text-center mt-1">Partner redirect</div>
          </div>
          {game.vodUrl && (
            <Button size="md" variant="outline" className="!border-white/30 !text-white" leftSection={<Play size={16} />}>
              Watch
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
