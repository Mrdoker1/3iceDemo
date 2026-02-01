'use client';

import Image from 'next/image';
import { Trophy, TrendingUp, Lightbulb } from 'lucide-react';
import { Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { StandingsTeam, TopPerformer } from '@/lib/mockScheduleData';

interface CompactLeagueGridProps {
  standings: StandingsTeam[];
  topPerformers: TopPerformer[];
  educationalFacts: string[];
}

export default function CompactLeagueGrid({ standings, topPerformers, educationalFacts }: CompactLeagueGridProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
    >
      {/* Standings */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Trophy className="text-[#4A9FD8]" size={14} />
          <h4 className="text-xs font-black text-white uppercase">Standings</h4>
        </div>
        <div className="text-xs text-gray-500 mb-2">Top 6 teams</div>
        <div className="space-y-1.5">
          {standings.slice(0, 6).map((team) => (
            <div key={team.rank} className="flex items-center gap-1.5 text-xs">
              <span className="text-gray-500 w-3">{team.rank}</span>
              <div className="w-5 h-5 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                <Image src={getAssetPath(team.logo)} alt={team.name} width={16} height={16} unoptimized />
              </div>
              <span className="text-white flex-1 truncate text-xs">{team.name}</span>
              <span className="text-gray-400 text-xs">{team.wins}-{team.losses}</span>
              <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8] !text-xs !px-1.5 !h-4">
                {team.streak}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <TrendingUp className="text-[#4A9FD8]" size={14} />
          <h4 className="text-xs font-black text-white uppercase">Top Performers</h4>
        </div>
        <div className="text-xs text-gray-500 mb-2">League leaders</div>
        <div className="space-y-2">
          {topPerformers.slice(0, 5).map((player, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              <Image src={player.avatar} alt={player.name} width={24} height={24} className="rounded-full" unoptimized />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white font-bold truncate leading-tight">{player.name}</div>
                <div className="text-xs text-gray-500 leading-tight">{player.team}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">{player.stat}</div>
                <div className="text-xs font-black text-[#4A9FD8]">{player.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Did You Know */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-2">
          <Lightbulb className="text-[#4A9FD8]" size={14} />
          <h4 className="text-xs font-black text-white uppercase">Did You Know?</h4>
        </div>
        <div className="text-xs text-gray-500 mb-2">This week's context</div>
        <div className="space-y-2">
          {educationalFacts.slice(0, 2).map((fact, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <span className="text-[#4A9FD8] font-black text-xs">•</span>
              <p className="text-xs text-gray-300 leading-snug">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
