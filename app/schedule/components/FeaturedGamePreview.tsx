'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Ticket, Play, TrendingUp, ExternalLink, AlertCircle, Activity } from 'lucide-react';
import { Button, Badge, Progress } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { Game } from '@/lib/mockScheduleData';

interface FeaturedGamePreviewProps {
  game: Game;
}

export default function FeaturedGamePreview({ game }: FeaturedGamePreviewProps) {
  const formatGameDate = (dateTime: string) => {
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border-2 border-[#4A9FD8] rounded-xl p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <Badge size="lg" className="!bg-[#4A9FD8] !text-white uppercase">
          Featured Game Preview
        </Badge>
        <Badge size="lg" className={getStatusColor(game.status)}>
          {game.status}
        </Badge>
      </div>

      {/* Teams & Score */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* Team A */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-2 bg-[#4A9FD8]/10 rounded-full p-3 flex items-center justify-center">
            <Image src={getAssetPath(game.teams.teamA.logo)} alt={game.teams.teamA.name} width={60} height={60} unoptimized />
          </div>
          <div className="font-black text-white text-lg">{game.teams.teamA.name}</div>
          <div className="text-xs text-gray-400">{game.teams.teamA.record}</div>
          {game.score && <div className="text-3xl font-black text-[#4A9FD8] mt-2">{game.score.teamA}</div>}
        </div>

        {/* VS / Time */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-black text-[#4A9FD8] mb-2">VS</div>
          <div className="text-xs text-gray-400 text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
              <Calendar size={12} />
              {formatGameDate(game.dateTime)}
            </div>
            <div className="flex items-center gap-1 justify-center">
              <MapPin size={12} />
              {game.city}
            </div>
          </div>
        </div>

        {/* Team B */}
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-2 bg-white/5 rounded-full p-3 flex items-center justify-center">
            <Image src={getAssetPath(game.teams.teamB.logo)} alt={game.teams.teamB.name} width={60} height={60} unoptimized />
          </div>
          <div className="font-black text-white text-lg">{game.teams.teamB.name}</div>
          <div className="text-xs text-gray-400">{game.teams.teamB.record}</div>
          {game.score && <div className="text-3xl font-black text-gray-400 mt-2">{game.score.teamB}</div>}
        </div>
      </div>

      {/* Why It Matters */}
      {game.whyItMatters && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-[#4A9FD8] mb-2 uppercase">Why This Matchup Matters</h4>
          <p className="text-sm text-gray-300 leading-relaxed">{game.whyItMatters}</p>
        </div>
      )}

      {/* Win Probability */}
      {game.winProb && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#4A9FD8]" size={18} />
            <h4 className="text-sm font-bold text-white uppercase">Win Probability</h4>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">{game.teams.teamA.name}</span>
              <span className="font-black text-[#4A9FD8]">{game.winProb.teamA}%</span>
            </div>
            <Progress value={game.winProb.teamA} className="h-2" classNames={{ root: '!bg-gray-800', section: '!bg-[#4A9FD8]' }} />
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-gray-400">{game.teams.teamB.name}</span>
              <span className="font-black text-gray-400">{game.winProb.teamB}%</span>
            </div>
            <Progress value={game.winProb.teamB} className="h-2" classNames={{ root: '!bg-gray-800', section: '!bg-gray-600' }} />
          </div>
        </div>
      )}

      {/* Betting Odds */}
      {game.bettingOdds && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-white mb-3 uppercase">Betting Odds</h4>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div>
              <div className="text-gray-500 mb-2">Moneyline</div>
              <div className="font-bold text-[#4A9FD8]">{game.bettingOdds.moneyline.teamA}</div>
              <div className="font-bold text-gray-400">{game.bettingOdds.moneyline.teamB}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-2">Spread</div>
              <div className="font-bold text-[#4A9FD8]">{game.bettingOdds.spread.teamA}</div>
              <div className="font-bold text-gray-400">{game.bettingOdds.spread.teamB}</div>
            </div>
            <div>
              <div className="text-gray-500 mb-2">Total ({game.bettingOdds.total.line})</div>
              <div className="font-bold text-white">O {game.bettingOdds.total.over}</div>
              <div className="font-bold text-white">U {game.bettingOdds.total.under}</div>
            </div>
          </div>
          <a href="https://www.draftkings.com" target="_blank" rel="noopener noreferrer" className="mt-3 block">
            <Button size="xs" fullWidth variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8]" rightSection={<ExternalLink size={14} />}>
              Bet Now
            </Button>
          </a>
        </div>
      )}

      {/* Key Stats Comparison */}
      {game.keyStats && game.keyStats.length > 0 && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-white mb-3 uppercase">Key Matchup Stats</h4>
          <div className="space-y-2">
            {game.keyStats.slice(0, 4).map((stat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="font-bold text-[#4A9FD8] w-16 text-right">{stat.teamA}</span>
                <span className="text-gray-400 flex-1 text-center">{stat.label}</span>
                <span className="font-bold text-gray-400 w-16">{stat.teamB}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Team Leaders */}
      {game.teamLeaders && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <h4 className="text-sm font-bold text-white mb-3 uppercase">Team Leaders</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-xs text-[#4A9FD8] font-bold mb-2">{game.teams.teamA.name}</div>
              {game.teamLeaders.teamA.map((leader, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <Image src={leader.avatar} alt={leader.name} width={24} height={24} className="rounded-full" unoptimized />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white truncate">{leader.name}</div>
                    <div className="text-xs text-gray-500">{leader.stat}: {leader.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="text-xs text-gray-400 font-bold mb-2">{game.teams.teamB.name}</div>
              {game.teamLeaders.teamB.map((leader, idx) => (
                <div key={idx} className="flex items-center gap-2 mb-2">
                  <Image src={leader.avatar} alt={leader.name} width={24} height={24} className="rounded-full" unoptimized />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-white truncate">{leader.name}</div>
                    <div className="text-xs text-gray-500">{leader.stat}: {leader.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Injury Report */}
      {game.injuries && game.injuries.length > 0 && (
        <div className="bg-black/30 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="text-red-500" size={18} />
            <h4 className="text-sm font-bold text-white uppercase">Injury Report</h4>
          </div>
          <div className="space-y-2">
            {game.injuries.map((injury, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <span className="text-white">{injury.player}</span>
                <span className="text-gray-400">({injury.team === 'teamA' ? game.teams.teamA.name : game.teams.teamB.name})</span>
                <Badge size="xs" className={
                  injury.status === 'Out' ? '!bg-red-600' :
                  injury.status === 'Doubtful' ? '!bg-orange-600' :
                  injury.status === 'Questionable' ? '!bg-yellow-600' :
                  '!bg-blue-600'
                }>
                  {injury.status}
                </Badge>
                <span className="text-gray-500">{injury.injury}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="flex gap-3">
        <Link href={`/matchup/${game.id}`} className="flex-1">
          <Button size="md" fullWidth className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold">
            View Matchup Hub
          </Button>
        </Link>
        <a href={game.ticketUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button size="md" fullWidth variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8]" rightSection={<ExternalLink size={16} />}>
            <Ticket size={16} className="mr-1" /> Tickets
          </Button>
        </a>
        {game.vodUrl && (
          <Button size="md" variant="outline" className="!border-white/30 !text-white" leftSection={<Play size={16} />}>
            Watch
          </Button>
        )}
      </div>
    </motion.div>
  );
}
