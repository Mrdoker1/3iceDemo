'use client';

import { Calendar, MapPin, Clock, Ticket, Trophy, Users, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Button, Badge } from '@mantine/core';
import { motion } from 'framer-motion';

interface ScheduleEvent {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  status: 'completed' | 'upcoming';
  homeTeam?: string;
  awayTeam?: string;
  score?: { home: number; away: number };
  month?: string;
  city?: string;
  state?: string;
  coordinates?: { lat: number; lng: number };
}

const scheduleEvents: ScheduleEvent[] = [
  {
    id: '1',
    name: '3ICE Tennessee',
    date: 'Jun 12, 2026',
    time: '7:00 PM EST',
    location: 'Clarksville, TN',
    venue: 'F & M Bank Arena',
    status: 'completed',
    month: 'June',
    city: 'Clarksville',
    state: 'TN',
    coordinates: { lat: 36.5298, lng: -87.3595 },
  },
  {
    id: '2',
    name: '3ICE Dallas',
    date: 'Jun 19, 2026',
    time: '7:00 PM EST',
    location: 'Allen, TX',
    venue: 'CUTX Center',
    status: 'completed',
    month: 'June',
    city: 'Allen',
    state: 'TX',
    coordinates: { lat: 33.1031, lng: -96.6706 },
  },
  {
    id: '3',
    name: '3ICE Chicago',
    date: 'Jun 26, 2026',
    time: '7:00 PM EST',
    location: 'Geneva, IL',
    venue: 'Fox Valley Ice Arena',
    status: 'completed',
    month: 'June',
    city: 'Geneva',
    state: 'IL',
    coordinates: { lat: 41.8875, lng: -88.3054 },
  },
  {
    id: '4',
    name: '3ICE Minnesota',
    date: 'Jul 10, 2026',
    time: '7:00 PM EST',
    location: 'Minneapolis, MN',
    venue: '3M Arena',
    status: 'completed',
    month: 'July',
    city: 'Minneapolis',
    state: 'MN',
    coordinates: { lat: 44.9778, lng: -93.2650 },
  },
  {
    id: '5',
    name: '3ICE Boston',
    date: 'Jul 17, 2026',
    time: '7:00 PM EST',
    location: 'Lowell, MA',
    venue: 'Tsongas Center',
    status: 'completed',
    month: 'July',
    city: 'Lowell',
    state: 'MA',
    coordinates: { lat: 42.6334, lng: -71.3162 },
  },
  {
    id: '6',
    name: '3ICE New York/New Jersey',
    date: 'Jul 24, 2026',
    time: '7:00 PM EST',
    location: 'Newark, NJ',
    venue: 'Prudential Center',
    status: 'completed',
    month: 'July',
    city: 'Newark',
    state: 'NJ',
    coordinates: { lat: 40.7357, lng: -74.1710 },
  },
  {
    id: '7',
    name: '3ICE Buffalo',
    date: 'Jul 31, 2026',
    time: '7:00 PM EST',
    location: 'Buffalo, NY',
    venue: 'LeCom Harborcenter',
    status: 'completed',
    month: 'July',
    city: 'Buffalo',
    state: 'NY',
    coordinates: { lat: 42.8864, lng: -78.8784 },
  },
  {
    id: '8',
    name: '3ICE Pittsburgh',
    date: 'Aug 7, 2026',
    time: '7:00 PM EST',
    location: 'Pittsburgh, PA',
    venue: 'PPG Paints Arena',
    status: 'completed',
    month: 'August',
    city: 'Pittsburgh',
    state: 'PA',
    coordinates: { lat: 40.4406, lng: -79.9959 },
  },
  {
    id: '9',
    name: 'Patrick Cup Championship',
    date: 'Aug 14, 2026',
    time: '6:00 PM EST',
    location: 'Phoenix, AZ',
    venue: 'Mullett Arena',
    status: 'completed',
    month: 'August',
    city: 'Phoenix',
    state: 'AZ',
    homeTeam: 'Minnesota',
    awayTeam: 'Buffalo',
    score: { home: 4, away: 2 },
    coordinates: { lat: 33.4484, lng: -112.0740 },
  },
];

export default function SchedulePage() {
  const [selectedMonth, setSelectedMonth] = useState<string>('all');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const completedGames = scheduleEvents.filter((e) => e.status === 'completed');
  
  const months: string[] = ['all', ...Array.from(new Set(scheduleEvents.map(e => e.month).filter((m): m is string => m !== undefined)))];

  // Season Stats
  const totalGames = scheduleEvents.length;
  const totalCities = new Set(scheduleEvents.map(e => e.city)).size;

  // Update header with schedule info
  useEffect(() => {
    const event = new CustomEvent('scheduleHeaderUpdate', {
      detail: {
        title: 'SEASON SCHEDULE',
        subtitle: 'Coast to coast hockey action across North America',
        stats: [
          { label: 'Events', value: totalGames },
          { label: 'Cities', value: totalCities },
          { label: 'Teams', value: 8 },
        ],
      },
    });
    window.dispatchEvent(event);

    // Cleanup on unmount
    return () => {
      const clearEvent = new CustomEvent('scheduleHeaderUpdate', {
        detail: null,
      });
      window.dispatchEvent(clearEvent);
    };
  }, [totalGames, totalCities]);

  // Countdown Timer
  useEffect(() => {
    // Set target date to 30 days from now for demo purposes
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(19, 0, 0, 0); // 7:00 PM
    
    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };
    
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Main Layout: Featured Event + Upcoming Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          {/* Left Side - Featured Event + Tour Map (2 columns) */}
          <div className="lg:col-span-2 space-y-6">
          {/* Championship Highlight */}
          <motion.div 
            className="relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
          >
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent blur-3xl"
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            ></motion.div>
            <div className="relative bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border-2 border-[#4A9FD8] rounded-2xl p-6 backdrop-blur-sm">
              <motion.div 
                className="flex items-center justify-center mb-3"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Badge 
                  size="md" 
                  variant="filled"
                  className="!bg-[#4A9FD8] !text-white uppercase tracking-wider"
                  leftSection={<Trophy size={14} />}
                >
                  Next Featured Event
                </Badge>
              </motion.div>
              <motion.h2 
                className="text-2xl sm:text-3xl font-black text-center text-white mb-3"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
              >
                PATRICK CUP CHAMPIONSHIP
              </motion.h2>
              <div className="text-center mb-5">
                <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-300 mb-1">
                  <Calendar size={16} className="text-[#4A9FD8]" />
                  <span>August 14, 2026 • 7:00 PM MST</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
                  <MapPin size={14} className="text-[#4A9FD8]" />
                  <span>Mullett Arena • Phoenix, AZ</span>
                </div>
              </div>
              
              {/* Teams and Timer */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-6 mb-5">
                {/* Minnesota */}
                <motion.div 
                  className="text-center"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                >
                  <motion.div 
                    className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-[#4A9FD8]/10 to-transparent backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 border-3 border-[#4A9FD8] p-3 shadow-lg shadow-[#4A9FD8]/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/Minnesota.png"
                      alt="Minnesota"
                      width={120}
                      height={120}
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1.5">Minnesota</div>
                  <Badge size="sm" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8] !text-xs">Record: 12-4-0</Badge>
                </motion.div>
                
                {/* VS and Timer */}
                <motion.div 
                  className="flex flex-col items-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5, type: "spring", stiffness: 200 }}
                >
                  <motion.div 
                    className="text-4xl sm:text-5xl font-black text-[#4A9FD8] mb-4"
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >VS</motion.div>
                  
                  {/* Countdown Timer */}
                  <div className="flex gap-1.5 mb-2">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white bg-[#4A9FD8]/10 border border-[#4A9FD8]/30 rounded-lg px-2.5 py-1.5 min-w-[55px] shadow-lg">
                        {String(timeLeft.days).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-bold">Days</div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8] flex items-start pt-1.5">:</div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white bg-[#4A9FD8]/10 border border-[#4A9FD8]/30 rounded-lg px-2.5 py-1.5 min-w-[55px] shadow-lg">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-bold">Hrs</div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8] flex items-start pt-1.5">:</div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white bg-[#4A9FD8]/10 border border-[#4A9FD8]/30 rounded-lg px-2.5 py-1.5 min-w-[55px] shadow-lg">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-bold">Min</div>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8] flex items-start pt-1.5">:</div>
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-black text-white bg-[#4A9FD8]/10 border border-[#4A9FD8]/30 rounded-lg px-2.5 py-1.5 min-w-[55px] shadow-lg">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </div>
                      <div className="text-xs text-gray-400 uppercase tracking-wide mt-1 font-bold">Sec</div>
                    </div>
                  </div>
                  
                  <div className="text-xs text-[#4A9FD8] uppercase tracking-widest font-bold">Until Championship</div>
                </motion.div>
                
                {/* Buffalo */}
                <motion.div 
                  className="text-center"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                >
                  <motion.div 
                    className="w-28 h-28 sm:w-32 sm:h-32 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-3 border-3 border-white/30 p-3 shadow-lg shadow-white/10"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Image
                      src="/Buffalo.png"
                      alt="Buffalo"
                      width={120}
                      height={120}
                      className="object-contain"
                      unoptimized
                    />
                  </motion.div>
                  <div className="text-xl sm:text-2xl font-black text-white mb-1.5">Buffalo</div>
                  <Badge size="sm" className="!bg-white/10 !text-gray-300 !text-xs">Record: 11-5-0</Badge>
                </motion.div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/ticketing">
                  <Button 
                    size="md" 
                    className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                    leftSection={<Ticket size={18} />}
                  >
                    Buy Tickets Now
                  </Button>
                </Link>
                <Link href="/">
                  <Button 
                    size="md" 
                    variant="outline"
                    className="!border-2 !border-[#4A9FD8] !text-[#4A9FD8] hover:!bg-[#4A9FD8]/10 font-bold"
                    leftSection={<Play size={18} />}
                  >
                    Watch Full Game
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* 2026 Tour Map under Featured Event */}
          <div className="relative bg-gradient-to-br from-[#4A9FD8]/10 via-[#1a4d7a]/5 to-transparent border border-[#4A9FD8]/20 rounded-2xl p-6 overflow-hidden">
            {/* Background gradient effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(74,159,216,0.15),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(26,77,122,0.1),transparent_50%)]"></div>
            
            <div className="relative">
              <h3 className="text-xl font-black text-white mb-5 flex items-center gap-2">
                <MapPin className="text-[#4A9FD8]" size={22} />
                2026 TOUR MAP
              </h3>
              
              {/* Tour Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
                <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8]">{totalCities}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Cities</div>
                </div>
                <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8]">6</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">States</div>
                </div>
                <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8]">3</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Months</div>
                </div>
                <div className="text-center bg-black/30 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#4A9FD8]">50K+</div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide">Fans</div>
                </div>
              </div>
              
              {/* City List */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Array.from(new Set(scheduleEvents.map(e => ({ city: e.city, state: e.state })))).map((location, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-2 bg-black/30 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-lg px-3 py-2 hover:border-[#4A9FD8]/50 hover:bg-[#4A9FD8]/5 transition-colors group"
                  >
                    <MapPin size={12} className="text-[#4A9FD8] flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-white truncate">{location.city}, {location.state}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>

          {/* Right Sidebar - Upcoming Games List */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-2xl p-5 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <motion.h3 
                className="text-lg font-black text-white mb-4 flex items-center gap-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <Calendar className="text-[#4A9FD8]" size={20} />
                AUGUST 2026
              </motion.h3>
              
              <motion.div 
                className="space-y-3"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.6
                    }
                  }
                }}
              >
                {/* Featured Game in Sidebar */}
                <motion.div 
                  className="bg-gradient-to-br from-[#4A9FD8]/20 to-[#1a4d7a]/20 border border-[#4A9FD8] rounded-xl p-3"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ scale: 1.02, borderColor: "rgba(74, 159, 216, 0.8)" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-xs text-gray-400 uppercase">WED</div>
                        <div className="text-2xl font-black text-white">AUG 14</div>
                        <div className="text-xs text-gray-400">7:00 PM</div>
                      </div>
                      <Badge size="xs" className="!bg-[#4A9FD8] !text-white">Featured</Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Image src="/Minnesota.png" alt="MIN" width={20} height={20} unoptimized />
                    </div>
                    <span className="text-xs font-bold text-white">MINNESOTA</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <Image src="/Buffalo.png" alt="BUF" width={20} height={20} unoptimized />
                    </div>
                    <span className="text-xs font-bold text-white">BUFFALO</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <MapPin size={10} />
                    <span className="truncate">Mullett Arena, Phoenix</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href="/ticketing" className="flex-1">
                      <Button size="xs" fullWidth className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold">
                        Tickets
                      </Button>
                    </Link>
                    <Button size="xs" variant="outline" className="!border-[#4A9FD8] !text-[#4A9FD8]">
                      Details
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
              
              <h3 className="text-lg font-black text-white mt-6 mb-4 flex items-center gap-2">
                <Calendar className="text-[#4A9FD8]" size={20} />
                JULY 2026
              </h3>
              
              <motion.div 
                className="space-y-2"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.8
                    }
                  }
                }}
              >
                {/* Past Games in List Format */}
                {completedGames.slice(0, 6).map((event) => (
                  <Link href="/" key={event.id}>
                    <motion.div 
                      className="bg-black/60 border border-[#4A9FD8]/10 hover:border-[#4A9FD8]/30 rounded-lg p-3 transition-all cursor-pointer group"
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                      whileHover={{ x: 5, borderColor: "rgba(74, 159, 216, 0.5)" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="text-center min-w-[50px]">
                          <div className="text-xs text-gray-500 uppercase">{event.date.split(' ')[0]}</div>
                          <div className="text-lg font-black text-white">{event.date.split(' ')[1]}</div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            {event.homeTeam && event.awayTeam ? (
                              <>
                                <span className="text-xs font-bold text-white truncate">{event.homeTeam}</span>
                                <span className="text-lg font-black text-[#4A9FD8]">{event.score?.home}</span>
                              </>
                            ) : (
                              <span className="text-xs font-bold text-white truncate">{event.name}</span>
                            )}
                          </div>
                          {event.homeTeam && event.awayTeam && (
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-xs font-bold text-gray-400 truncate">{event.awayTeam}</span>
                              <span className="text-lg font-black text-gray-400">{event.score?.away}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                            <MapPin size={10} />
                            <span className="truncate">{event.city}</span>
                          </div>
                        </div>
                        
                        <Badge size="xs" className="!bg-gray-800 !text-gray-400 group-hover:!bg-[#4A9FD8] group-hover:!text-white transition-colors">
                          <Play size={10} />
                        </Badge>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Past Games Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-black">
              <span className="text-white">PAST </span>
              <span className="text-[#4A9FD8]">GAMES</span>
            </h2>
            
            {/* Month Filter */}
            <motion.div 
              className="flex gap-2 flex-wrap"
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.6
                  }
                }
              }}
            >
              {months.map((month) => (
                <motion.div
                  key={month}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 }
                  }}
                >
                  <Button
                    onClick={() => setSelectedMonth(month || 'all')}
                    variant={selectedMonth === month ? 'filled' : 'outline'}
                    className={
                      selectedMonth === month
                        ? '!bg-[#4A9FD8] !text-white'
                        : '!border-gray-700 !text-gray-400 hover:!border-[#4A9FD8] hover:!text-[#4A9FD8]'
                    }
                    size="sm"
                  >
                    {month === 'all' ? 'All' : month}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.7
                }
              }
            }}
          >
            {completedGames.filter(game => selectedMonth === 'all' || game.month === selectedMonth).map((event) => (
              <Link href="/" key={event.id}>
                <motion.div 
                  className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 hover:border-[#4A9FD8]/50 rounded-xl overflow-hidden transition-all group cursor-pointer h-full"
                  variants={{
                    hidden: { opacity: 0, y: 30, scale: 0.9 },
                    visible: { opacity: 1, y: 0, scale: 1 }
                  }}
                  whileHover={{ 
                    y: -8, 
                    scale: 1.03,
                    boxShadow: "0 20px 40px rgba(74, 159, 216, 0.3)"
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Event Image/Thumbnail */}
                  <div className="relative h-40 bg-gradient-to-br from-[#1a4d7a] via-[#0f2744] to-[#0A0A0A] overflow-hidden">
                    {/* Background Image */}
                    <Image
                      src={`https://images.unsplash.com/photo-1515703407324-5f753afd8be8?w=400&h=300&fit=crop&q=80&${event.id}`}
                      alt={event.name}
                      fill
                      className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300"
                      unoptimized
                    />
                    
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    
                    <Badge 
                      className="!bg-gray-800/90 !text-gray-400 absolute top-2 right-2 z-10"
                      size="xs"
                    >
                      Replay
                    </Badge>
                    {event.month && (
                      <Badge 
                        className="!bg-[#4A9FD8]/90 !text-white absolute top-2 left-2 z-10"
                        size="xs"
                      >
                        {event.month}
                      </Badge>
                    )}
                    
                    {/* Play button overlay on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <div className="w-14 h-14 rounded-full bg-[#4A9FD8]/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                        <Play size={28} className="text-white ml-1" fill="white" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Event Details */}
                  <div className="p-4">
                    <h3 className="text-base font-bold text-white group-hover:text-[#4A9FD8] transition-colors mb-3 line-clamp-2">
                      {event.name}
                    </h3>
                    
                    <div className="space-y-1.5 text-xs mb-3">
                      <div className="flex items-center gap-2 text-gray-400">
                        <Calendar size={12} className="text-[#4A9FD8]" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin size={12} className="text-[#4A9FD8]" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                    
                    {/* Score */}
                    {event.score && (
                      <div className="bg-[#4A9FD8]/10 rounded-lg p-2.5 mb-3 border border-[#4A9FD8]/20">
                        <div className="flex items-center justify-between text-xs mb-1.5">
                          <span className="text-white font-bold truncate">{event.homeTeam}</span>
                          <span className="text-xl font-black text-[#4A9FD8]">{event.score.home}</span>
                        </div>
                        <div className="h-px bg-gray-700 mb-1.5"></div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-gray-400 font-bold truncate">{event.awayTeam}</span>
                          <span className="text-xl font-black text-gray-400">{event.score.away}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Actions */}
                    <Button 
                      fullWidth
                      size="sm"
                      variant="light"
                      className="!text-[#4A9FD8] hover:!bg-[#4A9FD8] hover:!text-white font-bold !text-xs"
                      leftSection={<Play size={14} />}
                    >
                      Watch Replay
                    </Button>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </motion.div>

        {/* Season Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-[#1a4d7a]/20 to-transparent border-l-4 border-[#4A9FD8] rounded-lg p-6 inline-block">
            <p className="text-gray-300">
              <span className="font-bold text-white">All events 7pm local time</span> except Championship (6pm)
            </p>
          </div>
          
          {/* Social/Newsletter CTA */}
          <div className="mt-12 max-w-2xl mx-auto">
            <div className="bg-gradient-to-br from-[#4A9FD8]/10 to-[#1a4d7a]/10 border border-[#4A9FD8]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-black text-white mb-3">
                Never Miss a Game
              </h3>
              <p className="text-gray-400 mb-6">
                Get notified about upcoming events, exclusive content, and special offers
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="lg"
                  className="!bg-[#4A9FD8] hover:!bg-[#3a8fc8] !text-white font-bold"
                >
                  Subscribe to Updates
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="!border-[#4A9FD8] !text-[#4A9FD8] hover:!bg-[#4A9FD8]/10 font-bold"
                >
                  Download Calendar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
