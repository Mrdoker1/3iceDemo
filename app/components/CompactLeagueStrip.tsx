'use client';

import Image from 'next/image';
import { Trophy, TrendingUp, Lightbulb } from 'lucide-react';
import { Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { StandingsTeam, TopPerformer } from '@/lib/mockScheduleData';

interface CompactLeagueStripProps {
  standings: StandingsTeam[];
  topPerformers: TopPerformer[];
  educationalFacts: string[];
}

export default function CompactLeagueStrip({ standings, topPerformers, educationalFacts }: CompactLeagueStripProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.05 }}
      className="grid grid-cols-1 md:grid-cols-3 gap-1.5"
    >
      {/* Standings */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-md p-1.5">
        <div className="flex items-center gap-1 mb-1">
          <Trophy className="text-[#4A9FD8]" size={10} />
          <h4 className="text-xs font-black text-white uppercase">Standings</h4>
        </div>
        <div className="text-xs text-gray-500 mb-1">Top 6</div>
        <div className="space-y-1">
          {standings.slice(0, 6).map((team) => (
            <div key={team.rank} className="flex items-center gap-1 text-xs">
              <span className="text-gray-500 w-2 text-xs">{team.rank}</span>
              <div className="w-4 h-4 rounded-full bg-white/5 p-0.5 flex items-center justify-center">
                <Image src={getAssetPath(team.logo)} alt={team.name} width={12} height={12} unoptimized />
              </div>
              <span className="text-white flex-1 truncate text-xs">{team.name.split(' ').pop()}</span>
              <span className="text-gray-400 text-xs">{team.wins}-{team.losses}</span>
              <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8] !text-xs !px-1 !h-3">
                {team.streak}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-md p-1.5">
        <div className="flex items-center gap-1 mb-1">
          <TrendingUp className="text-[#4A9FD8]" size={10} />
          <h4 className="text-xs font-black text-white uppercase">Leaders</h4>
        </div>
        <div className="text-xs text-gray-500 mb-1">Top 5</div>
        <div className="space-y-1">
          {topPerformers.slice(0, 5).map((player, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <Image src={player.avatar} alt={player.name} width={16} height={16} className="rounded-full" unoptimized />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-white font-bold truncate leading-tight">{player.name.split(' ').pop()}</div>
                <div className="text-xs text-gray-500 leading-tight">{player.team.split(' ').pop()}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-black text-[#4A9FD8]">{player.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Did You Know */}
      <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-md p-1.5">
        <div className="flex items-center gap-1 mb-1">
          <Lightbulb className="text-[#4A9FD8]" size={10} />
          <h4 className="text-xs font-black text-white uppercase">Did You Know?</h4>
        </div>
        <div className="text-xs text-gray-500 mb-1">Context</div>
        <div className="space-y-1">
          {educationalFacts.slice(0, 2).map((fact, idx) => (
            <div key={idx} className="flex items-start gap-1">
              <span className="text-[#4A9FD8] font-black text-xs">•</span>
              <p className="text-xs text-gray-300 leading-tight">{fact}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
