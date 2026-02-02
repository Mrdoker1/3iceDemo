'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Switch, Badge } from '@mantine/core';
import { Settings as SettingsIcon } from 'lucide-react';
import { 
  IconCalendarEvent, 
  IconPlayerPlay, 
  IconTicket, 
  IconShoppingBag 
} from '@tabler/icons-react';
import { useMenuSettings } from '@/contexts/MenuSettingsContext';

export default function SettingsPage() {
  const { settings, toggleSetting } = useMenuSettings();

  useEffect(() => {
    const event = new CustomEvent('scheduleHeaderUpdate', {
      detail: {
        title: 'SETTINGS',
        subtitle: 'Manage navigation menu',
        stats: null,
      },
    });
    window.dispatchEvent(event);

    return () => {
      window.dispatchEvent(new CustomEvent('resetHeader'));
    };
  }, []);

  const menuItems = [
    {
      key: 'schedule' as const,
      label: 'Schedule',
      description: 'Season schedule and matchups',
      icon: IconCalendarEvent,
    },
    {
      key: 'watch' as const,
      label: 'Watch 3ICE',
      description: 'Live streams and video replays',
      icon: IconPlayerPlay,
    },
    {
      key: 'ticketing' as const,
      label: 'Ticketing',
      description: 'Buy tickets and select seats',
      icon: IconTicket,
    },
    {
      key: 'shop' as const,
      label: 'Shop',
      description: 'Official merchandise and gear',
      icon: IconShoppingBag,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black pt-[80px] pl-20">
      <div className="max-w-2xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3">
            <SettingsIcon size={32} className="text-[#4A9FD8]" strokeWidth={2} />
            <div>
              <h1 className="text-2xl font-black text-white">Navigation Settings</h1>
              <p className="text-sm text-gray-400">Control sidebar menu visibility</p>
            </div>
          </div>
        </motion.div>

        <div className="space-y-3">
          {menuItems.map((item, index) => {
            const isEnabled = settings[item.key];
            const Icon = item.icon;
            
            return (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`bg-black/40 border rounded-lg p-4 transition-all ${
                  isEnabled
                    ? 'border-[#4A9FD8]/30 bg-[#4A9FD8]/5'
                    : 'border-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isEnabled
                        ? 'bg-[#4A9FD8]/20 border border-[#4A9FD8]/30'
                        : 'bg-gray-800/50 border border-gray-700'
                    }`}>
                      <Icon 
                        size={24} 
                        className={isEnabled ? 'text-[#4A9FD8]' : 'text-gray-400'}
                        stroke={1.5}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className={`font-bold text-base ${isEnabled ? 'text-white' : 'text-gray-400'}`}>
                          {item.label}
                        </h3>
                        <Badge
                          size="xs"
                          className={isEnabled
                            ? '!bg-green-600/20 !text-green-400 !border !border-green-600/30'
                            : '!bg-gray-600/20 !text-gray-500 !border !border-gray-600/30'
                          }
                        >
                          {isEnabled ? 'Visible' : 'Hidden'}
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    size="md"
                    checked={isEnabled}
                    onChange={() => toggleSetting(item.key)}
                    classNames={{
                      track: isEnabled
                        ? '!bg-[#4A9FD8]'
                        : '!bg-gray-700',
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
