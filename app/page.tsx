'use client';

import { useState, useEffect } from 'react';
import { Calendar, Search, Star } from 'lucide-react';
import { Badge, SegmentedControl, TextInput, Select, Switch } from '@mantine/core';
import { motion } from 'framer-motion';
import { mockScheduleWeeks, mockStandings, mockTopPerformers, educationalFacts } from '@/lib/mockScheduleData';
import ReadableFeaturedPanel from './components/ReadableFeaturedPanel';
import ReadableLeagueCard from './components/ReadableLeagueCard';
import ReadableGameAccordion from './components/ReadableGameAccordion';
import ReadableWeekRail from './components/ReadableWeekRail';
import ReadableLiveLikeCard from './components/ReadableLiveLikeCard';

export default function ScheduleHubHomepage() {
  const [selectedWeek, setSelectedWeek] = useState<string>('1');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  // Update header on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('scheduleHeaderUpdate', {
        detail: {
          title: 'SCHEDULE + MATCHUP INTELLIGENCE',
          subtitle: 'ESPN-style schedule hub with betting odds, predictions & fan engagement',
          stats: null
        }
      });
      window.dispatchEvent(event);
    }

    return () => {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('resetHeader');
        window.dispatchEvent(event);
      }
    };
  }, []);

  const currentWeekData = mockScheduleWeeks.find(w => w.week === parseInt(selectedWeek));
  let currentGames = currentWeekData?.games || [];
  const hasLiveGame = currentGames.some(g => g.status === 'Live');

  // Apply filters
  if (selectedTeam) {
    currentGames = currentGames.filter(
      g => g.teams.teamA.name === selectedTeam || g.teams.teamB.name === selectedTeam
    );
  }

  if (selectedStatus !== 'all') {
    currentGames = currentGames.filter(g => g.status.toLowerCase() === selectedStatus);
  }

  if (selectedCity) {
    currentGames = currentGames.filter(g => g.city === selectedCity);
  }

  if (searchQuery) {
    currentGames = currentGames.filter(
      g =>
        g.teams.teamA.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.teams.teamB.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        g.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (featuredOnly) {
    currentGames = currentGames.filter(g => g.isFeatured);
  }

  const featuredGame = currentGames.find(g => g.isFeatured) || currentGames[0];
  const allTeams = Array.from(
    new Set(
      mockScheduleWeeks.flatMap(w =>
        w.games.flatMap(g => [g.teams.teamA.name, g.teams.teamB.name])
      )
    )
  ).sort();

  const allCities = Array.from(
    new Set(mockScheduleWeeks.flatMap(w => w.games.map(g => g.city).filter(Boolean)))
  ).sort() as string[];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
        
        {/* Compact Filters Row - Readable */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="mb-4"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-[#4A9FD8]" size={20} />
                <span className="text-base font-black text-white">SCHEDULE HUB</span>
              </div>
              
              <SegmentedControl
                value={selectedWeek}
                onChange={setSelectedWeek}
                size="sm"
                data={[
                  { label: 'Week 1', value: '1' },
                  { label: 'Week 2', value: '2' },
                ]}
                classNames={{
                  root: '!bg-black/60',
                  indicator: '!bg-[#4A9FD8]',
                  label: 'text-white font-bold text-sm px-4',
                }}
              />

              <div className="hidden lg:block h-5 w-px bg-gray-700"></div>

              <Select
                placeholder="Team"
                size="sm"
                data={[{ value: '', label: 'All Teams' }, ...allTeams.map(t => ({ value: t, label: t }))]}
                value={selectedTeam}
                onChange={setSelectedTeam}
                clearable
                className="w-36"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-sm',
                }}
              />

              <Select
                placeholder="Status"
                size="sm"
                data={[
                  { value: 'all', label: 'All Status' },
                  { value: 'live', label: 'Live' },
                  { value: 'upcoming', label: 'Upcoming' },
                  { value: 'final', label: 'Final' },
                ]}
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val || 'all')}
                className="w-32"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-sm',
                }}
              />

              <Select
                placeholder="City"
                size="sm"
                data={[{ value: '', label: 'All Cities' }, ...allCities.map(c => ({ value: c, label: c }))]}
                value={selectedCity}
                onChange={setSelectedCity}
                clearable
                className="w-32"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-sm',
                }}
              />

              <TextInput
                placeholder="Search games..."
                size="sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftSection={<Search size={16} className="text-gray-400" />}
                className="w-40"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white placeholder:!text-gray-500 !text-sm',
                }}
              />

              <div className="flex items-center gap-2 bg-black/60 border border-gray-700 rounded px-3 py-2">
                <Star size={16} className={featuredOnly ? 'text-[#4A9FD8]' : 'text-gray-400'} />
                <span className="text-sm text-white">Featured</span>
                <Switch
                  size="sm"
                  checked={featuredOnly}
                  onChange={(e) => setFeaturedOnly(e.currentTarget.checked)}
                  classNames={{
                    track: featuredOnly ? '!bg-[#4A9FD8]' : '!bg-gray-700',
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* 12-Column Grid Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* ROW 1: Featured Matchup (cols 1-8) + Week Rail (cols 9-12) */}
          <div className="col-span-12 lg:col-span-8">
            {featuredGame && <ReadableFeaturedPanel game={featuredGame} />}
          </div>
          
          <div className="col-span-12 lg:col-span-4">
            <ReadableWeekRail games={currentGames} selectedWeek={selectedWeek} />
          </div>

          {/* ROW 2: Standings (cols 1-3) + Leaders (cols 4-6) + Did You Know (cols 7-9) + LiveLike (cols 10-12) */}
          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ReadableLeagueCard
              standings={mockStandings}
              type="standings"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ReadableLeagueCard
              topPerformers={mockTopPerformers}
              type="leaders"
            />
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="bg-gradient-to-br from-[#4A9FD8]/10 to-blue-900/10 border border-[#4A9FD8]/20 rounded-xl p-4 h-full"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">💡</span>
                <h4 className="text-base font-black text-white uppercase">Did You Know?</h4>
              </div>
              <div className="text-xs text-gray-400 mb-3">Fan education & 3ICE insights</div>
              <div className="space-y-3">
                {educationalFacts.slice(0, 2).map((fact, idx) => (
                  <div key={idx} className="bg-black/40 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[#4A9FD8] font-black text-sm mt-0.5">•</span>
                      <p className="text-sm text-gray-300 leading-relaxed">{fact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="col-span-12 md:col-span-6 lg:col-span-3">
            <ReadableLiveLikeCard hasLiveGame={hasLiveGame} />
          </div>

          {/* ROW 3: Game Center (collapsed) */}
          <div className="col-span-12">
            <ReadableGameAccordion games={currentGames} />
          </div>

          {/* Disclaimer Footer */}
          <div className="col-span-12">
            <div className="bg-black/30 border border-gray-700/50 rounded-lg p-3">
              <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Badge size="sm" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">Tickets</Badge>
                  <span>External redirect via Ticketmaster</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge size="sm" className="!bg-purple-600/20 !text-purple-400">Merch</Badge>
                  <span>Fulfilled by partner</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge size="sm" className="!bg-orange-600/20 !text-orange-400">Betting</Badge>
                  <span>Redirects to sportsbook</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
