'use client';

import { useState } from 'react';
import { Calendar, Search, Star } from 'lucide-react';
import { Badge, SegmentedControl, TextInput, Select, Switch } from '@mantine/core';
import { motion } from 'framer-motion';
import { mockScheduleWeeks, mockStandings, mockTopPerformers, educationalFacts, Game } from '@/lib/mockScheduleData';
import CompactFeaturedPreview from './components/CompactFeaturedPreview';
import CompactLeagueGrid from './components/CompactLeagueGrid';
import CompactGameCenter from './components/CompactGameCenter';
import CompactWeekSidebar from './components/CompactWeekSidebar';
import CompactEngagement from './components/CompactEngagement';

export default function ScheduleHub() {
  const [selectedWeek, setSelectedWeek] = useState<string>('1');
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredOnly, setFeaturedOnly] = useState(false);

  const currentWeekData = mockScheduleWeeks.find(w => w.week === parseInt(selectedWeek));
  let currentGames = currentWeekData?.games || [];

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
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 py-4">
        
        {/* Compact Top Controls Row */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-4"
        >
          <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg p-2.5">
            {/* Single Row: Title + Week + Filters */}
            <div className="flex flex-wrap items-center gap-2 lg:gap-3">
              <div className="flex items-center gap-2">
                <Calendar className="text-[#4A9FD8]" size={18} />
                <h2 className="text-lg font-black text-white">SCHEDULE HUB</h2>
              </div>
              
              <SegmentedControl
                value={selectedWeek}
                onChange={setSelectedWeek}
                size="xs"
                data={[
                  { label: 'Week 1', value: '1' },
                  { label: 'Week 2', value: '2' },
                ]}
                classNames={{
                  root: '!bg-black/60',
                  indicator: '!bg-[#4A9FD8]',
                  label: 'text-white font-bold text-xs px-3',
                }}
              />

              <div className="hidden lg:block h-4 w-px bg-gray-700"></div>

              <Select
                placeholder="Team"
                size="xs"
                data={[{ value: '', label: 'All Teams' }, ...allTeams.map(t => ({ value: t, label: t }))]}
                value={selectedTeam}
                onChange={setSelectedTeam}
                clearable
                className="w-32"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-xs !h-7',
                  dropdown: '!bg-black !border-gray-700 !shadow-xl',
                  option: '!text-white hover:!bg-[#4A9FD8]/30 !text-xs !bg-black',
                }}
              />

              <Select
                placeholder="Status"
                size="xs"
                data={[
                  { value: 'all', label: 'All' },
                  { value: 'live', label: 'Live' },
                  { value: 'upcoming', label: 'Upcoming' },
                  { value: 'final', label: 'Final' },
                ]}
                value={selectedStatus}
                onChange={(val) => setSelectedStatus(val || 'all')}
                className="w-28"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-xs !h-7',
                  dropdown: '!bg-black !border-gray-700 !shadow-xl',
                  option: '!text-white hover:!bg-[#4A9FD8]/30 !text-xs !bg-black',
                }}
              />

              <Select
                placeholder="City"
                size="xs"
                data={[{ value: '', label: 'All Cities' }, ...allCities.map(c => ({ value: c, label: c }))]}
                value={selectedCity}
                onChange={setSelectedCity}
                clearable
                className="w-28"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white !text-xs !h-7',
                  dropdown: '!bg-black !border-gray-700 !shadow-xl',
                  option: '!text-white hover:!bg-[#4A9FD8]/30 !text-xs !bg-black',
                }}
              />

              <TextInput
                placeholder="Search..."
                size="xs"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftSection={<Search size={14} className="text-gray-400" />}
                className="w-32"
                classNames={{
                  input: '!bg-black/60 !border-gray-700 !text-white placeholder:!text-gray-500 !text-xs !h-7',
                }}
              />

              <div className="flex items-center gap-1.5 bg-black/60 border border-gray-700 rounded px-2 py-1">
                <Star size={14} className={featuredOnly ? 'text-[#4A9FD8]' : 'text-gray-400'} />
                <span className="text-xs text-white">Featured</span>
                <Switch
                  size="xs"
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

        {/* Dense Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* LEFT COLUMN (3/4 width) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Compact Featured Game Preview */}
            {featuredGame && <CompactFeaturedPreview game={featuredGame} />}

            {/* Compact League Grid (3 cards in 1 row) */}
            <CompactLeagueGrid
              standings={mockStandings}
              topPerformers={mockTopPerformers}
              educationalFacts={educationalFacts}
            />

            {/* Compact Game Center */}
            <CompactGameCenter games={currentGames} />

            {/* Compact Engagement (Collapsed) */}
            <CompactEngagement />

            {/* Disclaimer Footer Bar */}
            <div className="bg-black/30 border border-gray-700/50 rounded-lg p-2.5">
              <div className="flex flex-wrap gap-3 text-xs text-gray-400">
                <div className="flex items-center gap-1.5">
                  <Badge size="xs" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">Tickets</Badge>
                  <span>via Ticketmaster</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge size="xs" className="!bg-purple-600/20 !text-purple-400">Merch</Badge>
                  <span>Fulfilled by partner</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Badge size="xs" className="!bg-orange-600/20 !text-orange-400">Betting</Badge>
                  <span>Redirects to sportsbook</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR (1/4 width) - STICKY */}
          <div className="lg:col-span-1">
            <CompactWeekSidebar games={currentGames} selectedWeek={selectedWeek} />
          </div>
        </div>
      </div>
    </div>
  );
}
