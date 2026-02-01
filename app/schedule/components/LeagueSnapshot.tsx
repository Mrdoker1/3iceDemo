'use client';

import Image from 'next/image';
import { Trophy, TrendingUp, Lightbulb } from 'lucide-react';
import { Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { StandingsTeam, TopPerformer } from '@/lib/mockScheduleData';

interface LeagueSnapshotProps {
  standings: StandingsTeam[];
  topPerformers: TopPerformer[];
  educationalFacts: string[];
}

export default function LeagueSnapshot({ standings, topPerformers, educationalFacts }: LeagueSnapshotProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-black text-white mb-4">LEAGUE SNAPSHOT</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Standings */}
        <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="text-[#4A9FD8]" size={20} />
            <h4 className="text-sm font-black text-white uppercase">Standings</h4>
          </div>
          <div className="space-y-2">
            {standings.map((team) => (
              <div key={team.rank} className="flex items-center gap-2 text-xs">
                <span className="text-gray-500 w-4">{team.rank}</span>
                <div className="w-6 h-6 rounded-full bg-white/5 p-1 flex items-center justify-center">
                  <Image src={getAssetPath(team.logo)} alt={team.name} width={20} height={20} unoptimized />
                </div>
                <span className="text-white flex-1 truncate">{team.name}</span>
                <span className="text-gray-400">{team.wins}-{team.losses}</span>
                <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">{team.streak}</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-[#4A9FD8]" size={20} />
            <h4 className="text-sm font-black text-white uppercase">Top Performers</h4>
          </div>
          <div className="space-y-3">
            {topPerformers.map((player, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <Image src={player.avatar} alt={player.name} width={32} height={32} className="rounded-full" unoptimized />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white font-bold truncate">{player.name}</div>
                  <div className="text-xs text-gray-500">{player.team}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{player.stat}</div>
                  <div className="text-sm font-black text-[#4A9FD8]">{player.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Did You Know */}
        <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-[#4A9FD8]" size={20} />
            <h4 className="text-sm font-black text-white uppercase">Did You Know?</h4>
          </div>
          <div className="space-y-3">
            {educationalFacts.slice(0, 3).map((fact, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-[#4A9FD8] font-black">•</span>
                <p className="text-xs text-gray-300 leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
