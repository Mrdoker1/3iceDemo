'use client';

import Image from 'next/image';
import { Trophy, TrendingUp } from 'lucide-react';
import { Badge } from '@mantine/core';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/utils';
import { StandingsTeam, TopPerformer } from '@/lib/mockScheduleData';

interface ReadableLeagueCardProps {
  standings?: StandingsTeam[];
  topPerformers?: TopPerformer[];
  type: 'standings' | 'leaders';
}

export default function ReadableLeagueCard({ standings, topPerformers, type }: ReadableLeagueCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: type === 'standings' ? 0.1 : 0.15 }}
      className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 h-full"
    >
      {type === 'standings' && standings ? (
        <>
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="text-[#4A9FD8]" size={18} />
            <h4 className="text-base font-black text-white uppercase">Standings</h4>
          </div>
          <div className="text-xs text-gray-400 mb-3">Current season rankings</div>
          <div className="space-y-2">
            {standings.slice(0, 6).map((team) => (
              <div key={team.rank} className="flex items-center gap-2 text-sm p-2 bg-black/40 rounded-lg hover:bg-black/60 transition-colors">
                <span className="text-gray-500 w-6 font-bold">{team.rank}</span>
                <div className="w-8 h-8 rounded-full bg-white/5 p-1 flex items-center justify-center">
                  <Image src={getAssetPath(team.logo)} alt={team.name} width={24} height={24} unoptimized />
                </div>
                <span className="text-white flex-1 truncate font-medium">{team.name}</span>
                <span className="text-gray-400 text-sm">{team.wins}-{team.losses}</span>
                <Badge size="sm" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">
                  {team.streak}
                </Badge>
              </div>
            ))}
          </div>
        </>
      ) : topPerformers ? (
        <>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="text-[#4A9FD8]" size={18} />
            <h4 className="text-base font-black text-white uppercase">Top Performers</h4>
          </div>
          <div className="text-xs text-gray-400 mb-3">League leaders this week</div>
          <div className="space-y-3">
            {topPerformers.slice(0, 5).map((player, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 bg-black/40 rounded-lg hover:bg-black/60 transition-colors">
                <Image src={player.avatar} alt={player.name} width={36} height={36} className="rounded-full" unoptimized />
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-bold truncate">{player.name}</div>
                  <div className="text-xs text-gray-400">{player.team}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{player.stat}</div>
                  <div className="text-sm font-black text-[#4A9FD8]">{player.value}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </motion.div>
  );
}
