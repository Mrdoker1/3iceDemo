'use client';

import { MessageCircle, BarChart3, Users, ExternalLink } from 'lucide-react';
import { Badge, Button, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';

interface ReadableLiveLikeCardProps {
  hasLiveGame?: boolean;
}

export default function ReadableLiveLikeCard({ hasLiveGame = false }: ReadableLiveLikeCardProps) {
  // Collapsed state for non-live games
  if (!hasLiveGame) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-500/20 rounded-xl overflow-hidden h-full"
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Badge size="md" className="!bg-purple-600/50 !text-white">
                LiveLike
              </Badge>
              <span className="text-sm text-white font-bold">Fan Engagement</span>
            </div>
            <Badge size="sm" className="!bg-gray-700 !text-gray-400">
              Offline
            </Badge>
          </div>

          <div className="bg-black/40 rounded-lg p-4 text-center">
            <MessageCircle className="text-purple-400/50 mx-auto mb-3" size={32} />
            <h4 className="text-sm font-bold text-white mb-2">Available During Live Games</h4>
            <p className="text-xs text-gray-400 mb-4">
              Join live polls, chat with fans, and participate in real-time engagement when games are in progress.
            </p>
            <a href="https://www.livelike.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="sm"
                fullWidth
                variant="outline"
                className="!border-purple-500/50 !text-purple-400"
                rightSection={<ExternalLink size={14} />}
              >
                Learn More
              </Button>
            </a>
          </div>

          <div className="text-xs text-gray-500 text-center mt-3">Powered by LiveLike • Partner integration</div>
        </div>
      </motion.div>
    );
  }

  // Full expanded state for live games
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-500/20 rounded-xl overflow-hidden h-full"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Badge size="md" className="!bg-purple-600 !text-white">
              LiveLike
            </Badge>
            <span className="text-sm text-white font-bold">Fan Engagement</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge size="sm" className="!bg-pink-600 !text-white animate-pulse">
              LIVE
            </Badge>
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Users size={14} />
              <span>2.8k</span>
            </div>
          </div>
        </div>

        <Tabs defaultValue="poll" classNames={{
          root: '',
          list: '!bg-black/40 !border-none !mb-3',
          tab: '!text-gray-400 !text-sm !py-2 !px-3 data-[active=true]:!text-purple-400 data-[active=true]:!border-purple-400',
          panel: '!p-0',
        }}>
          <Tabs.List>
            <Tabs.Tab value="poll">Live Poll</Tabs.Tab>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="poll">
            <div className="bg-black/40 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="text-purple-400" size={16} />
                <h4 className="text-sm font-bold text-white">Who will win tonight?</h4>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Minnesota</span>
                    <span className="text-purple-400 font-bold">58%</span>
                  </div>
                  <Progress value={58} size="md" classNames={{ root: '!bg-gray-800', section: '!bg-purple-500' }} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Buffalo</span>
                    <span className="text-pink-400 font-bold">42%</span>
                  </div>
                  <Progress value={42} size="md" classNames={{ root: '!bg-gray-800', section: '!bg-pink-500' }} />
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-3">
                <Users size={12} />
                <span>2,847 votes • Poll closes at game start</span>
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="chat">
            <div className="bg-black/40 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle className="text-purple-400" size={16} />
                <h4 className="text-sm font-bold text-white">Live Chat</h4>
                <Badge size="sm" className="!bg-green-600 !text-white">Active</Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="text-purple-400 font-bold">@HockeyFan23:</span>
                  <span className="text-gray-300">Let's go Minnesota! 🏒</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-pink-400 font-bold">@BuffaloFan:</span>
                  <span className="text-gray-300">Buffalo is taking this one!</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-blue-400 font-bold">@3ICEFanatic:</span>
                  <span className="text-gray-300">This is going to be epic! 🔥</span>
                </div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>

        <div className="mt-3">
          <a href="https://www.livelike.com" target="_blank" rel="noopener noreferrer">
            <Button
              size="sm"
              fullWidth
              className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white font-bold"
              rightSection={<ExternalLink size={14} />}
            >
              Open Live Engagement
            </Button>
          </a>
          <div className="text-xs text-gray-500 text-center mt-2">Powered by LiveLike • Partner integration</div>
        </div>
      </div>
    </motion.div>
  );
}
