'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  Play, 
  TrendingUp, 
  Award,
  BarChart3,
  Users,
  Lightbulb,
  ExternalLink,
  ArrowLeft,
  Clock,
  Trophy,
  ChevronDown,
  ChevronUp,
  AlertCircle
} from 'lucide-react';
import { Button, Badge, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game, mockScheduleWeeks } from '@/lib/mockScheduleData';

interface MatchupClientProps {
  game: Game | null;
}

export default function MatchupClient({ game }: MatchupClientProps) {
  const router = useRouter();
  const [showAllStats, setShowAllStats] = useState(false);
  const [showAllPlayers, setShowAllPlayers] = useState(false);
  const [showMoreFacts, setShowMoreFacts] = useState(false);
  const [showFullStory, setShowFullStory] = useState(false);

  // Get current week games for sidebar
  const currentWeekGames = game 
    ? mockScheduleWeeks
        .flatMap(week => week.games)
        .filter(g => g.id !== game.id) // Exclude current game
        .slice(0, 3) // Show max 3 games
    : [];

  const formatGameDate = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatGameTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
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

  const educationalFacts = [
    '3ICE features 3-on-3 hockey with running clocks and unique overtime rules that create fast-paced, high-scoring action.',
    'In 3ICE, games are played in two 8-minute halves with a shootout if tied, making every second count.',
    'The Patrick Cup is named after hockey legend Craig Patrick, celebrating excellence in the 3-on-3 format.',
    'Power plays in 3ICE create 3-on-2 situations, leading to more scoring opportunities than traditional 5-on-5 hockey.',
  ];

  // Update header with matchup info
  useEffect(() => {
    if (game) {
      const event = new CustomEvent('scheduleHeaderUpdate', {
        detail: {
          title: 'MATCHUP HUB',
          subtitle: 'Matchup details, odds & key stats',
          stats: null,
        },
      });
      window.dispatchEvent(event);

      return () => {
        const clearEvent = new CustomEvent('resetHeader');
        window.dispatchEvent(clearEvent);
      };
    }
  }, [game]);

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-2xl p-8">
            <div className="w-20 h-20 bg-[#4A9FD8]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="text-[#4A9FD8]" size={40} />
            </div>
            <h1 className="text-3xl font-black text-white mb-4">
              MATCHUP NOT FOUND
            </h1>
            <p className="text-gray-400 mb-8">
              The matchup you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button 
                size="lg" 
                className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                leftSection={<ArrowLeft size={20} />}
              >
                Back to Schedule
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Determine displayed stats and players
  const displayedStats = showAllStats ? game.keyStats : game.keyStats?.slice(0, 4);
  const displayedPlayersA = showAllPlayers ? game.keyPlayers?.teamA : game.keyPlayers?.teamA.slice(0, 3);
  const displayedPlayersB = showAllPlayers ? game.keyPlayers?.teamB : game.keyPlayers?.teamB.slice(0, 3);
  const displayedFacts = showMoreFacts 
    ? [...(game.didYouKnow || []), ...educationalFacts]
    : [...(game.didYouKnow || []).slice(0, 2), ...educationalFacts.slice(0, 1)];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <Button
            variant="subtle"
            size="sm"
            leftSection={<ArrowLeft size={16} />}
            onClick={() => router.push('/')}
            className="!text-gray-400 hover:!text-white"
          >
            Back to Schedule
          </Button>
        </motion.div>

        {/* 2-Column Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          
          {/* LEFT COLUMN: Hero + Tabbed Hub */}
          <div className="space-y-4">
            
            {/* HERO / SCOREBOARD - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gradient-to-r from-[#4A9FD8]/15 via-black/40 to-[#1a4d7a]/15 border-2 border-[#4A9FD8]/40 rounded-xl p-5"
            >
              {/* Top Meta Row */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {game.competitionLabel && (
                    <Badge size="sm" className="!bg-[#4A9FD8]/30 !text-[#4A9FD8] uppercase text-xs">
                      {game.competitionLabel}
                    </Badge>
                  )}
                </div>
                <Badge size="sm" className={getStatusColor(game.status)}>
                  {game.status}
                </Badge>
              </div>

              {/* Date & Venue Row */}
              <div className="flex items-center justify-center gap-3 mb-4 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar size={14} className="text-[#4A9FD8]" />
                  <span>{formatGameDate(game.dateTime)}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock size={14} className="text-[#4A9FD8]" />
                  <span>{formatGameTime(game.dateTime)}</span>
                </div>
              </div>

              {/* Teams Matchup - Compact Horizontal */}
              <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center mb-4">
                {/* Team A */}
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent rounded-full p-2 flex items-center justify-center border-2 border-[#4A9FD8]">
                    <Image
                      src={getAssetPath(game.teams.teamA.logo)}
                      alt={game.teams.teamA.name}
                      width={48}
                      height={48}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-black text-white truncate">{game.teams.teamA.name.toUpperCase()}</h2>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-gray-400">{game.teams.teamA.record}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500">{game.teams.teamA.last5}</span>
                    </div>
                  </div>
                  {game.score && (
                    <div className="text-4xl font-black text-[#4A9FD8]">{game.score.teamA}</div>
                  )}
                </div>

                {/* VS */}
                <div className="text-2xl font-black text-[#4A9FD8] px-3">VS</div>

                {/* Team B */}
                <div className="flex items-center gap-3 flex-row-reverse">
                  <div className="w-16 h-16 bg-white/5 rounded-full p-2 flex items-center justify-center border-2 border-white/20">
                    <Image
                      src={getAssetPath(game.teams.teamB.logo)}
                      alt={game.teams.teamB.name}
                      width={48}
                      height={48}
                      unoptimized
                    />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <h2 className="text-xl font-black text-white truncate">{game.teams.teamB.name.toUpperCase()}</h2>
                    <div className="flex items-center gap-2 justify-end text-xs">
                      <span className="text-gray-400">{game.teams.teamB.record}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-500">{game.teams.teamB.last5}</span>
                    </div>
                  </div>
                  {game.score && (
                    <div className="text-4xl font-black text-gray-400">{game.score.teamB}</div>
                  )}
                </div>
              </div>

              {/* Venue */}
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
                  <MapPin size={14} className="text-[#4A9FD8]" />
                  <span>{game.venue}</span>
                </div>
              </div>

              {/* CTAs - Primary + Secondary */}
              <div className="space-y-2">
                <div className="flex gap-3">
                  {/* Primary: Tickets */}
                  <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                    <Button 
                      size="sm"
                      fullWidth
                      className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                      leftSection={<Ticket size={16} />}
                      rightSection={<ExternalLink size={14} />}
                    >
                      Get Tickets
                    </Button>
                  </a>
                  {/* Secondary: Watch/Replay */}
                  {game.vodUrl ? (
                    <a href={game.vodUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button 
                        size="sm"
                        fullWidth
                        variant="outline"
                        className="!border-[#4A9FD8] !text-[#4A9FD8] font-bold"
                        leftSection={<Play size={16} />}
                      >
                        {game.status === 'Final' ? 'Watch Replay' : game.status === 'Live' ? 'Watch Live' : 'Preview'}
                      </Button>
                    </a>
                  ) : game.status === 'Upcoming' ? (
                    <Button 
                      size="sm"
                      fullWidth
                      variant="outline"
                      className="!border-gray-700 !text-gray-500 cursor-not-allowed flex-1"
                      leftSection={<Play size={16} />}
                      disabled
                    >
                      Watch (Coming Soon)
                    </Button>
                  ) : null}
                </div>
                {/* Small text link */}
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-1">Partner redirect • Ticketmaster</div>
                </div>
              </div>
            </motion.div>

            {/* TABBED HUB - Compact */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl overflow-hidden"
            >
              <Tabs defaultValue="overview" classNames={{
                root: '',
                list: '!bg-black/60 !border-b !border-[#4A9FD8]/20 px-4',
                tab: '!text-gray-400 !text-sm !py-3 !px-4 data-[active=true]:!text-[#4A9FD8] data-[active=true]:!border-[#4A9FD8]',
                panel: 'p-5',
              }}>
                <Tabs.List>
                  <Tabs.Tab value="overview">Overview</Tabs.Tab>
                  <Tabs.Tab value="stats">Stats</Tabs.Tab>
                  <Tabs.Tab value="players">Players</Tabs.Tab>
                  <Tabs.Tab value="injuries">Injuries/Notes</Tabs.Tab>
                </Tabs.List>

                {/* OVERVIEW TAB */}
                <Tabs.Panel value="overview">
                  <div className="space-y-4">
                    {/* Quick Snapshot - Comparison Style */}
                    {(game.teams.teamA.streak || game.teams.teamA.gfpg) && (
                      <div className="bg-gradient-to-r from-[#4A9FD8]/5 via-black/30 to-gray-600/5 rounded-lg p-3 border-l-2 border-r-2 border-l-[#4A9FD8]/30 border-r-gray-600/30">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs font-bold text-[#4A9FD8]">{game.teams.teamA.name}</div>
                          <div className="text-xs text-gray-500 uppercase font-bold">Quick Snapshot • Comparison</div>
                          <div className="text-xs font-bold text-gray-400">{game.teams.teamB.name}</div>
                        </div>
                        <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                          {/* Team A Stats - Left Aligned */}
                          <div className="flex flex-wrap gap-1.5 justify-start">
                            {game.teams.teamA.streak && (
                              <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8] !border !border-[#4A9FD8]/30">
                                {game.teams.teamA.streak}
                              </Badge>
                            )}
                            {game.teams.teamA.gfpg && (
                              <Badge size="xs" className="!bg-green-600/20 !text-green-400">
                                GF: {game.teams.teamA.gfpg}
                              </Badge>
                            )}
                            {game.teams.teamA.gapg && (
                              <Badge size="xs" className="!bg-red-600/20 !text-red-400">
                                GA: {game.teams.teamA.gapg}
                              </Badge>
                            )}
                            {game.teams.teamA.pp && (
                              <Badge size="xs" className="!bg-purple-600/20 !text-purple-400">
                                PP: {game.teams.teamA.pp}
                              </Badge>
                            )}
                            {game.teams.teamA.pk && (
                              <Badge size="xs" className="!bg-blue-600/20 !text-blue-400">
                                PK: {game.teams.teamA.pk}
                              </Badge>
                            )}
                            {game.teams.teamA.fo && (
                              <Badge size="xs" className="!bg-orange-600/20 !text-orange-400">
                                FO: {game.teams.teamA.fo}
                              </Badge>
                            )}
                          </div>
                          
                          {/* VS Divider */}
                          <div className="text-xs font-black text-gray-600">VS</div>
                          
                          {/* Team B Stats - Right Aligned */}
                          <div className="flex flex-wrap gap-1.5 justify-end">
                            {game.teams.teamB.streak && (
                              <Badge size="xs" className="!bg-gray-600/20 !text-gray-400 !border !border-gray-600/30">
                                {game.teams.teamB.streak}
                              </Badge>
                            )}
                            {game.teams.teamB.gfpg && (
                              <Badge size="xs" className="!bg-green-600/20 !text-green-400">
                                GF: {game.teams.teamB.gfpg}
                              </Badge>
                            )}
                            {game.teams.teamB.gapg && (
                              <Badge size="xs" className="!bg-red-600/20 !text-red-400">
                                GA: {game.teams.teamB.gapg}
                              </Badge>
                            )}
                            {game.teams.teamB.pp && (
                              <Badge size="xs" className="!bg-purple-600/20 !text-purple-400">
                                PP: {game.teams.teamB.pp}
                              </Badge>
                            )}
                            {game.teams.teamB.pk && (
                              <Badge size="xs" className="!bg-blue-600/20 !text-blue-400">
                                PK: {game.teams.teamB.pk}
                              </Badge>
                            )}
                            {game.teams.teamB.fo && (
                              <Badge size="xs" className="!bg-orange-600/20 !text-orange-400">
                                FO: {game.teams.teamB.fo}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Why It Matters - Editorial Insight */}
                    {game.whyItMatters && (
                      <div className="bg-gradient-to-br from-[#4A9FD8]/10 to-[#1a4d7a]/10 border-l-4 border-[#4A9FD8] rounded-lg p-3">
                        <h4 className="text-xs font-black text-white mb-2 flex items-center gap-2 uppercase">
                          <Trophy className="text-[#4A9FD8]" size={14} />
                          Why This Matchup Matters
                        </h4>
                        <div className="relative">
                          <p className={`text-sm text-gray-300 leading-relaxed ${!showFullStory ? 'line-clamp-3' : ''}`}>
                            {game.whyItMatters}
                          </p>
                          {game.whyItMatters.length > 150 && (
                            <button
                              onClick={() => setShowFullStory(!showFullStory)}
                              className="text-xs text-[#4A9FD8] hover:text-[#3a8fc8] mt-1 font-medium"
                            >
                              {showFullStory ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Two-Column: Win Prob + Odds - Dashboard Style */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {/* Win Probability */}
                      {game.winProb && (
                        <div className="bg-black/40 rounded-lg p-3 border border-[#4A9FD8]/10">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <TrendingUp className="text-[#4A9FD8]" size={14} />
                              <h4 className="text-xs font-bold text-white uppercase">Win Probability</h4>
                            </div>
                            <Badge size="xs" className="!bg-purple-600/20 !text-purple-400">Informational</Badge>
                          </div>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-400">{game.teams.teamA.name}</span>
                                <span className="text-lg font-black text-[#4A9FD8]">{game.winProb.teamA}%</span>
                              </div>
                              <Progress value={game.winProb.teamA} size="sm" classNames={{ root: '!bg-gray-800', section: '!bg-[#4A9FD8]' }} />
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-400">{game.teams.teamB.name}</span>
                                <span className="text-lg font-black text-gray-400">{game.winProb.teamB}%</span>
                              </div>
                              <Progress value={game.winProb.teamB} size="sm" classNames={{ root: '!bg-gray-800', section: '!bg-gray-600' }} />
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 italic">Mock model • Educational only</div>
                        </div>
                      )}

                      {/* Betting Odds */}
                      {game.bettingOdds && (
                        <div className="bg-black/40 rounded-lg p-3 border border-orange-600/10">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Award className="text-orange-400" size={14} />
                              <h4 className="text-xs font-bold text-white uppercase">
                                {game.status === 'Final' ? 'Closing Odds' : 'Betting Odds'}
                              </h4>
                            </div>
                            <div className="flex items-center gap-1">
                              {game.status === 'Final' && (
                                <Badge size="xs" className="!bg-gray-700 !text-gray-400">Pre-game</Badge>
                              )}
                              <Badge size="xs" className="!bg-orange-600/20 !text-orange-400">External</Badge>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mb-2">
                            <div>
                              <div className="text-xs text-gray-500 mb-1">ML</div>
                              <div className="text-sm font-bold text-[#4A9FD8]">{game.bettingOdds.moneyline.teamA}</div>
                              <div className="text-sm font-bold text-gray-400">{game.bettingOdds.moneyline.teamB}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">Spread</div>
                              <div className="text-xs font-bold text-[#4A9FD8]">{game.bettingOdds.spread.teamA}</div>
                              <div className="text-xs font-bold text-gray-400">{game.bettingOdds.spread.teamB}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500 mb-1">O/U</div>
                              <div className="text-xs font-bold text-white">{game.bettingOdds.total.over}</div>
                              <div className="text-xs font-bold text-white">{game.bettingOdds.total.under}</div>
                              <div className="text-xs text-gray-600 mt-0.5">{game.bettingOdds.total.line}</div>
                            </div>
                          </div>
                          <a href="https://www.draftkings.com" target="_blank" rel="noopener noreferrer">
                            <Button size="xs" fullWidth variant="outline" className="!border-orange-600/50 !text-orange-400 hover:!bg-orange-600/10" rightSection={<ExternalLink size={12} />}>
                              View at Sportsbook
                            </Button>
                          </a>
                          <div className="text-xs text-gray-500 mt-1.5 text-center italic">Informational only • Sportsbook redirect</div>
                        </div>
                      )}
                    </div>
                  </div>
                </Tabs.Panel>

                {/* STATS TAB */}
                <Tabs.Panel value="stats">
                  {displayedStats && displayedStats.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                          <BarChart3 className="text-[#4A9FD8]" size={16} />
                          Key Matchup Stats
                        </h4>
                        <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">Comparison View</Badge>
                      </div>
                      
                      {/* Stats Table */}
                      <div className="bg-black/30 rounded-lg overflow-hidden border border-[#4A9FD8]/10">
                        <div className="grid grid-cols-[1fr_auto_1fr] gap-2 p-2 bg-black/40 border-b border-[#4A9FD8]/10">
                          <div className="text-xs font-bold text-[#4A9FD8] text-right">{game.teams.teamA.name}</div>
                          <div className="text-xs font-bold text-gray-500">STAT</div>
                          <div className="text-xs font-bold text-gray-400">{game.teams.teamB.name}</div>
                        </div>
                        {displayedStats.map((stat, index) => (
                          <div key={index} className="grid grid-cols-[1fr_auto_1fr] gap-2 p-2 hover:bg-white/5 transition-colors border-b border-gray-800/50 last:border-0">
                            <div className="text-sm font-black text-[#4A9FD8] text-right">{stat.teamA}</div>
                            <div className="text-xs text-gray-400 text-center min-w-[120px]">{stat.label}</div>
                            <div className="text-sm font-black text-gray-400">{stat.teamB}</div>
                          </div>
                        ))}
                      </div>
                      
                      {game.keyStats && game.keyStats.length > 4 && (
                        <Button
                          size="xs"
                          fullWidth
                          variant="subtle"
                          className="!text-[#4A9FD8]"
                          onClick={() => setShowAllStats(!showAllStats)}
                          rightSection={showAllStats ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        >
                          {showAllStats ? 'Show Less' : `View All Stats (${game.keyStats.length})`}
                        </Button>
                      )}
                      
                      <div className="text-xs text-gray-500 text-center italic mt-2">
                        Mock data • Will be replaced by API
                      </div>
                    </div>
                  )}
                </Tabs.Panel>

                {/* PLAYERS TAB */}
                <Tabs.Panel value="players">
                  {game.keyPlayers && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="text-[#4A9FD8]" size={16} />
                        <h4 className="text-sm font-bold text-white uppercase">Players to Watch</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Team A */}
                        <div>
                          <div className="text-xs text-[#4A9FD8] font-bold mb-2">{game.teams.teamA.name}</div>
                          <div className="space-y-2">
                            {displayedPlayersA?.map((player, index) => (
                              <div key={index} className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                                <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-full" unoptimized />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-white font-bold truncate">{player.name}</div>
                                  <div className="text-xs text-gray-400">{player.role} • {player.lastGameLine}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        {/* Team B */}
                        <div>
                          <div className="text-xs text-gray-400 font-bold mb-2">{game.teams.teamB.name}</div>
                          <div className="space-y-2">
                            {displayedPlayersB?.map((player, index) => (
                              <div key={index} className="flex items-center gap-2 bg-black/30 rounded-lg p-2">
                                <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-full" unoptimized />
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm text-white font-bold truncate">{player.name}</div>
                                  <div className="text-xs text-gray-400">{player.role} • {player.lastGameLine}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {game.keyPlayers.teamA.length > 3 && (
                        <Button
                          size="xs"
                          fullWidth
                          variant="subtle"
                          className="!text-[#4A9FD8]"
                          onClick={() => setShowAllPlayers(!showAllPlayers)}
                          rightSection={showAllPlayers ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        >
                          {showAllPlayers ? 'Show Less' : 'View More Players'}
                        </Button>
                      )}
                    </div>
                  )}
                </Tabs.Panel>

                {/* INJURIES/NOTES TAB */}
                <Tabs.Panel value="injuries">
                  <div className="space-y-4">
                    {/* Injuries */}
                    {game.injuries && game.injuries.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertCircle className="text-red-500" size={16} />
                          <h4 className="text-sm font-bold text-white uppercase">Injury Report</h4>
                        </div>
                        <div className="space-y-2">
                          {game.injuries.map((injury, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-black/30 rounded-lg p-2 text-xs">
                              <span className="text-white font-medium">{injury.player}</span>
                              <span className="text-gray-500">({injury.team === 'teamA' ? game.teams.teamA.name : game.teams.teamB.name})</span>
                              <Badge size="xs" className={
                                injury.status === 'Out' ? '!bg-red-600/80' :
                                injury.status === 'Doubtful' ? '!bg-orange-600/80' :
                                injury.status === 'Questionable' ? '!bg-yellow-600/80' :
                                '!bg-blue-600/80'
                              }>
                                {injury.status}
                              </Badge>
                              <span className="text-gray-500">{injury.injury}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Did You Know */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="text-[#4A9FD8]" size={16} />
                        <h4 className="text-sm font-bold text-white uppercase">Did You Know?</h4>
                      </div>
                      <div className="space-y-2">
                        {displayedFacts.map((fact, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-sm text-gray-300 bg-black/30 rounded-lg p-2">
                            <span className="text-[#4A9FD8] font-black">•</span>
                            <span>{fact}</span>
                          </div>
                        ))}
                      </div>
                      <Button
                        size="xs"
                        fullWidth
                        variant="subtle"
                        className="!text-[#4A9FD8] mt-3"
                        onClick={() => setShowMoreFacts(!showMoreFacts)}
                        rightSection={showMoreFacts ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      >
                        {showMoreFacts ? 'Show Less' : 'More Facts'}
                      </Button>
                    </div>
                  </div>
                </Tabs.Panel>
              </Tabs>
            </motion.div>

            {/* RELATED CONTENT - Minimal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center"
            >
              {game.vodUrl && (
                <div className="mb-3">
                  <a href={game.vodUrl} target="_blank" rel="noopener noreferrer">
                    <Button 
                      size="sm"
                      variant="outline"
                      className="!border-[#4A9FD8]/50 !text-[#4A9FD8]"
                      leftSection={<Play size={16} />}
                      rightSection={<ExternalLink size={14} />}
                    >
                      {game.status === 'Final' ? 'Watch Highlights' : 'Watch Live'}
                    </Button>
                  </a>
                </div>
              )}
              <Link href="/" className="text-sm text-gray-400 hover:text-[#4A9FD8] transition-colors inline-flex items-center gap-1">
                <ArrowLeft size={14} />
                Back to Schedule
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Sidebar (This Week Games) */}
          {currentWeekGames.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 sticky top-24">
                <h4 className="text-sm font-black text-white mb-3 uppercase">This Week's Games</h4>
                <div className="space-y-3">
                  {currentWeekGames.map((weekGame) => (
                    <div
                      key={weekGame.id}
                      className="bg-black/60 border border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30 rounded-lg p-3 transition-all"
                    >
                      {/* Date + Status */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-400">
                          {new Date(weekGame.dateTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <Badge size="xs" className={getStatusColor(weekGame.status)}>
                          {weekGame.status}
                        </Badge>
                      </div>

                      {/* Teams */}
                      <div className="space-y-1.5 mb-2">
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Image
                                src={getAssetPath(weekGame.teams.teamA.logo)}
                                alt={weekGame.teams.teamA.name}
                                width={12}
                                height={12}
                                unoptimized
                              />
                            </div>
                            <span className="text-white font-bold truncate">{weekGame.teams.teamA.name}</span>
                          </div>
                          {weekGame.score && <span className="text-sm font-black text-[#4A9FD8] ml-2">{weekGame.score.teamA}</span>}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5 flex-1 min-w-0">
                            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                              <Image
                                src={getAssetPath(weekGame.teams.teamB.logo)}
                                alt={weekGame.teams.teamB.name}
                                width={12}
                                height={12}
                                unoptimized
                              />
                            </div>
                            <span className="text-white font-bold truncate">{weekGame.teams.teamB.name}</span>
                          </div>
                          {weekGame.score && <span className="text-sm font-black text-gray-400 ml-2">{weekGame.score.teamB}</span>}
                        </div>
                      </div>

                      {/* Open Button */}
                      <Link href={`/matchup/${weekGame.id}`}>
                        <Button
                          size="xs"
                          fullWidth
                          variant="outline"
                          className="!border-[#4A9FD8]/50 !text-[#4A9FD8] !text-xs"
                        >
                          Open
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>

                {/* View All Link */}
                <Link href="/" className="block mt-3">
                  <Button size="xs" fullWidth variant="subtle" className="!text-gray-400 hover:!text-[#4A9FD8]">
                    View Full Schedule
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
