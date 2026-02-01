'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
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
  Trophy
} from 'lucide-react';
import { Button, Badge, Progress } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface MatchupClientProps {
  game: Game | null;
}

export default function MatchupClient({ game }: MatchupClientProps) {
  const router = useRouter();

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
          title: `${game.teams.teamA.name.toUpperCase()} VS ${game.teams.teamB.name.toUpperCase()}`,
          subtitle: game.venue,
          stats: [],
        },
      });
      window.dispatchEvent(event);

      return () => {
        const clearEvent = new CustomEvent('scheduleHeaderUpdate', {
          detail: null,
        });
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
            <Link href="/schedule">
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <Button
            variant="subtle"
            leftSection={<ArrowLeft size={18} />}
            onClick={() => router.push('/schedule')}
            className="!text-gray-400 hover:!text-white"
          >
            Back to Schedule
          </Button>
        </motion.div>

        {/* Header Section - HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border-2 border-[#4A9FD8] rounded-2xl p-8 mb-8"
        >
          {/* Competition Label & Status */}
          <div className="flex items-center justify-between mb-4">
            {game.competitionLabel && (
              <Badge 
                size="lg" 
                className="!bg-[#4A9FD8]/30 !text-[#4A9FD8] !text-sm uppercase tracking-wider"
              >
                {game.competitionLabel}
              </Badge>
            )}
            <Badge size="lg" className={getStatusColor(game.status)}>
              {game.status}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="flex items-center justify-center gap-4 mb-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#4A9FD8]" />
              <span className="text-sm">{formatGameDate(game.dateTime)}</span>
            </div>
            <span className="text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#4A9FD8]" />
              <span className="text-sm">{formatGameTime(game.dateTime)}</span>
            </div>
          </div>

          {/* Teams Matchup */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-6">
            {/* Team A */}
            <motion.div 
              className="flex-1 text-center"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-[#4A9FD8] p-4 shadow-lg shadow-[#4A9FD8]/20">
                <Image
                  src={getAssetPath(game.teams.teamA.logo)}
                  alt={game.teams.teamA.name}
                  width={150}
                  height={150}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {game.teams.teamA.name.toUpperCase()}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <Badge size="lg" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">
                  {game.teams.teamA.record}
                </Badge>
                <Badge size="lg" variant="outline" className="!border-gray-600 !text-gray-400">
                  {game.teams.teamA.last5}
                </Badge>
              </div>
              {game.score && (
                <div className="text-6xl font-black text-[#4A9FD8] mt-4">
                  {game.score.teamA}
                </div>
              )}
            </motion.div>

            {/* VS */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-5xl sm:text-6xl font-black text-[#4A9FD8]"
            >
              VS
            </motion.div>

            {/* Team B */}
            <motion.div 
              className="flex-1 text-center"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30 p-4 shadow-lg shadow-white/10">
                <Image
                  src={getAssetPath(game.teams.teamB.logo)}
                  alt={game.teams.teamB.name}
                  width={150}
                  height={150}
                  className="object-contain"
                  unoptimized
                />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-2">
                {game.teams.teamB.name.toUpperCase()}
              </h2>
              <div className="flex items-center justify-center gap-3">
                <Badge size="lg" className="!bg-white/10 !text-gray-300">
                  {game.teams.teamB.record}
                </Badge>
                <Badge size="lg" variant="outline" className="!border-gray-600 !text-gray-400">
                  {game.teams.teamB.last5}
                </Badge>
              </div>
              {game.score && (
                <div className="text-6xl font-black text-gray-300 mt-4">
                  {game.score.teamB}
                </div>
              )}
            </motion.div>
          </div>

          {/* Venue */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 text-gray-300">
              <MapPin size={18} className="text-[#4A9FD8]" />
              <span className="text-base">{game.venue}</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer">
              <Button 
                size="lg" 
                className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                leftSection={<Ticket size={20} />}
                rightSection={<ExternalLink size={18} />}
              >
                Get Tickets
              </Button>
            </a>
            {game.vodUrl && (
              <a href={game.vodUrl} target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="!border-2 !border-[#4A9FD8] !text-[#4A9FD8] hover:!bg-[#4A9FD8]/10 font-bold"
                  leftSection={<Play size={20} />}
                >
                  Watch {game.status === 'Final' ? 'Replay' : game.status === 'Live' ? 'Live' : 'Preview'}
                </Button>
              </a>
            )}
          </div>
        </motion.div>

        {/* WHY THIS MATCHUP MATTERS */}
        {game.whyItMatters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-gradient-to-br from-[#4A9FD8]/10 to-[#1a4d7a]/10 border-l-4 border-[#4A9FD8] rounded-lg p-6 mb-8"
          >
            <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
              <Trophy className="text-[#4A9FD8]" size={28} />
              WHY THIS MATCHUP MATTERS
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {game.whyItMatters}
            </p>
          </motion.div>
        )}

        {/* Win Probability & Odds - Concept */}
        {(game.winProb || game.odds) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-2xl font-black text-white">WIN PROBABILITY & ODDS</h3>
              <Badge size="sm" className="!bg-purple-600 !text-white">Concept</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Win Probability */}
              {game.winProb && (
                <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-[#4A9FD8]" size={24} />
                    <h4 className="text-lg font-black text-white">WIN PROBABILITY</h4>
                  </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">{game.teams.teamA.name}</span>
                      <span className="text-2xl font-black text-[#4A9FD8]">{game.winProb.teamA}%</span>
                    </div>
                    <Progress 
                      value={game.winProb.teamA} 
                      className="h-3"
                      classNames={{
                        root: '!bg-gray-800',
                        section: '!bg-[#4A9FD8]'
                      }}
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">{game.teams.teamB.name}</span>
                      <span className="text-2xl font-black text-gray-400">{game.winProb.teamB}%</span>
                    </div>
                    <Progress 
                      value={game.winProb.teamB} 
                      className="h-3"
                      classNames={{
                        root: '!bg-gray-800',
                        section: '!bg-gray-600'
                      }}
                    />
                  </div>
                </div>
              </div>
            )}

              {/* Odds */}
              {game.odds && (
                <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="text-[#4A9FD8]" size={24} />
                    <h4 className="text-lg font-black text-white">BETTING ODDS</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{game.teams.teamA.name}</span>
                      <span className="text-3xl font-black text-[#4A9FD8]">{game.odds.teamA}</span>
                    </div>
                    <div className="h-px bg-gray-700"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">{game.teams.teamB.name}</span>
                      <span className="text-3xl font-black text-gray-400">{game.odds.teamB}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* KEY MATCHUP STATS */}
        {game.keyStats && game.keyStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <BarChart3 className="text-[#4A9FD8]" size={28} />
              KEY MATCHUP STATS
            </h3>
            <div className="mb-4 text-center">
              <span className="text-sm text-gray-400">Comparing team performance metrics</span>
            </div>
            <div className="space-y-4">
              {game.keyStats.map((stat, index) => {
                const teamAValue = parseFloat(stat.teamA.replace('%', '').replace('.', ''));
                const teamBValue = parseFloat(stat.teamB.replace('%', '').replace('.', ''));
                const maxValue = Math.max(teamAValue, teamBValue);
                const teamAPercent = (teamAValue / maxValue) * 100;
                const teamBPercent = (teamBValue / maxValue) * 100;

                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="bg-black/30 rounded-lg p-4"
                  >
                    <div className="text-center text-sm text-gray-400 mb-3 font-bold uppercase">
                      {stat.label}
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right">
                        <span className="text-2xl font-black text-[#4A9FD8]">{stat.teamA}</span>
                      </div>
                      <div className="flex-[2] flex items-center gap-2">
                        <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-[#4A9FD8] h-full rounded-full transition-all duration-500"
                            style={{ width: `${teamAPercent}%` }}
                          ></div>
                        </div>
                        <div className="flex-1 bg-gray-800 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gray-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${teamBPercent}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-2xl font-black text-gray-400">{stat.teamB}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* PLAYERS TO WATCH */}
        {game.keyPlayers && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6 mb-8"
          >
            <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-2">
              <Users className="text-[#4A9FD8]" size={28} />
              PLAYERS TO WATCH
            </h3>
            <div className="mb-4 text-center">
              <span className="text-sm text-gray-400">Impact players who could decide this matchup</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Team A Players */}
              <div>
                <h4 className="text-xl font-black text-[#4A9FD8] mb-4">
                  {game.teams.teamA.name.toUpperCase()}
                </h4>
                <div className="space-y-4">
                  {game.keyPlayers.teamA.map((player, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 bg-black/30 rounded-lg p-4"
                    >
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-[#4A9FD8]"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="text-lg font-bold text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.role}</div>
                        <div className="text-xs text-[#4A9FD8] mt-1">{player.lastGameLine}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Team B Players */}
              <div>
                <h4 className="text-xl font-black text-gray-300 mb-4">
                  {game.teams.teamB.name.toUpperCase()}
                </h4>
                <div className="space-y-4">
                  {game.keyPlayers.teamB.map((player, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center gap-4 bg-black/30 rounded-lg p-4"
                    >
                      <Image
                        src={player.avatar}
                        alt={player.name}
                        width={60}
                        height={60}
                        className="rounded-full border-2 border-gray-600"
                        unoptimized
                      />
                      <div className="flex-1">
                        <div className="text-lg font-bold text-white">{player.name}</div>
                        <div className="text-sm text-gray-400">{player.role}</div>
                        <div className="text-xs text-gray-500 mt-1">{player.lastGameLine}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* DID YOU KNOW - Educational Facts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-gradient-to-br from-[#4A9FD8]/10 to-[#1a4d7a]/10 border border-[#4A9FD8]/30 rounded-xl p-6 mb-8"
        >
          <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-2">
            <Lightbulb className="text-[#4A9FD8]" size={28} />
            DID YOU KNOW?
          </h3>
          <div className="mb-4">
            <span className="text-sm text-gray-400">Learn more about 3ICE hockey</span>
          </div>
          
          {/* Matchup-specific facts */}
          {game.didYouKnow && game.didYouKnow.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-bold text-white mb-3">About This Matchup:</h4>
              <ul className="space-y-3">
                {game.didYouKnow.map((fact, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-[#4A9FD8] font-black text-xl">•</span>
                    <span>{fact}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Educational facts about 3ICE */}
          <div>
            <h4 className="text-lg font-bold text-white mb-3">About 3ICE:</h4>
            <ul className="space-y-3">
              {educationalFacts.slice(0, 2).map((fact, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="text-[#4A9FD8] font-black text-xl">•</span>
                  <span>{fact}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* RELATED CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-black text-white mb-6 text-center">
            RELATED CONTENT
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Watch Highlights */}
            {game.vodUrl && (
              <a href={game.vodUrl} target="_blank" rel="noopener noreferrer">
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border border-[#4A9FD8]/30 rounded-xl p-6 cursor-pointer h-full"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-[#4A9FD8] rounded-full mb-4 mx-auto">
                    <Play size={24} className="text-white" />
                  </div>
                  <h4 className="text-lg font-black text-white text-center mb-2">
                    Watch Highlights
                  </h4>
                  <p className="text-sm text-gray-400 text-center">
                    Catch the best moments from this matchup
                  </p>
                  <div className="flex items-center justify-center mt-4 text-[#4A9FD8]">
                    <span className="text-sm font-bold">Watch Now</span>
                    <ExternalLink size={16} className="ml-2" />
                  </div>
                </motion.div>
              </a>
            )}
            
            {/* See Full Stats */}
            <Link href="/schedule">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6 cursor-pointer h-full"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#4A9FD8]/20 rounded-full mb-4 mx-auto">
                  <BarChart3 size={24} className="text-[#4A9FD8]" />
                </div>
                <h4 className="text-lg font-black text-white text-center mb-2">
                  See Full Stats
                </h4>
                <p className="text-sm text-gray-400 text-center">
                  Dive deeper into team and player statistics
                </p>
                <div className="flex items-center justify-center mt-4 text-[#4A9FD8]">
                  <span className="text-sm font-bold">View Stats</span>
                </div>
              </motion.div>
            </Link>
            
            {/* Explore Teams */}
            <Link href="/schedule">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6 cursor-pointer h-full"
              >
                <div className="flex items-center justify-center w-12 h-12 bg-[#4A9FD8]/20 rounded-full mb-4 mx-auto">
                  <Users size={24} className="text-[#4A9FD8]" />
                </div>
                <h4 className="text-lg font-black text-white text-center mb-2">
                  Explore Teams
                </h4>
                <p className="text-sm text-gray-400 text-center">
                  Learn more about team rosters and history
                </p>
                <div className="flex items-center justify-center mt-4 text-[#4A9FD8]">
                  <span className="text-sm font-bold">View Teams</span>
                </div>
              </motion.div>
            </Link>
          </div>
        </motion.div>

        {/* Back to Schedule CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-center"
        >
          <Link href="/schedule">
            <Button 
              size="lg" 
              variant="outline"
              className="!border-gray-700 !text-gray-400 hover:!border-[#4A9FD8] hover:!text-[#4A9FD8] font-bold"
              leftSection={<ArrowLeft size={20} />}
            >
              Back to Full Schedule
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
