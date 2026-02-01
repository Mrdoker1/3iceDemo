'use client';

import { useState } from 'react';
import { MessageCircle, BarChart3, Users, ExternalLink } from 'lucide-react';
import { Badge, Button, Progress, Tabs } from '@mantine/core';
import { motion } from 'framer-motion';

export default function LiveLikeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.2 }}
      className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-500/20 rounded-md overflow-hidden"
    >
      <div className="p-1.5">
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1">
            <Badge size="xs" className="!bg-purple-600 !text-white !text-xs !px-1 !h-4">
              LiveLike
            </Badge>
            <span className="text-xs text-white font-bold">Fan Engagement</span>
            <Badge size="xs" className="!bg-pink-600 !text-white animate-pulse !text-xs !px-1 !h-4">
              LIVE
            </Badge>
          </div>
          <div className="flex items-center gap-0.5 text-xs text-gray-400">
            <Users size={10} />
            <span className="text-xs">2.8k</span>
          </div>
        </div>

        <Tabs defaultValue="poll" classNames={{
          root: '',
          list: '!bg-black/40 !border-none !mb-1.5 !gap-0',
          tab: '!text-gray-400 !text-xs !py-1 !px-2 data-[active=true]:!text-purple-400 data-[active=true]:!border-purple-400 !h-6',
          panel: '!p-0',
        }}>
          <Tabs.List>
            <Tabs.Tab value="poll">Poll</Tabs.Tab>
            <Tabs.Tab value="chat">Chat</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="poll">
            <div className="bg-black/40 rounded p-1.5">
              <div className="flex items-center gap-1 mb-1">
                <BarChart3 className="text-purple-400" size={10} />
                <h4 className="text-xs font-bold text-white">Who wins tonight?</h4>
              </div>
              <div className="space-y-1">
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white text-xs">Minnesota</span>
                    <span className="text-purple-400 font-bold text-xs">58%</span>
                  </div>
                  <Progress value={58} size="xs" classNames={{ root: '!bg-gray-800 !h-1', section: '!bg-purple-500' }} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-0.5">
                    <span className="text-white text-xs">Buffalo</span>
                    <span className="text-pink-400 font-bold text-xs">42%</span>
                  </div>
                  <Progress value={42} size="xs" classNames={{ root: '!bg-gray-800 !h-1', section: '!bg-pink-500' }} />
                </div>
              </div>
              <div className="flex items-center gap-0.5 text-xs text-gray-400 mt-1">
                <Users size={8} />
                <span className="text-xs">2,847 votes</span>
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="chat">
            <div className="bg-black/40 rounded p-1.5">
              <div className="flex items-center gap-1 mb-1">
                <MessageCircle className="text-purple-400" size={10} />
                <h4 className="text-xs font-bold text-white">Live Chat</h4>
                <Badge size="xs" className="!bg-green-600 !text-white !text-xs !px-1 !h-3">Active</Badge>
              </div>
              <div className="space-y-1 text-xs">
                <div className="flex gap-1">
                  <span className="text-purple-400 font-bold text-xs">@Fan23:</span>
                  <span className="text-gray-300 text-xs">Let's go! 🏒</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-pink-400 font-bold text-xs">@Buffalo:</span>
                  <span className="text-gray-300 text-xs">Taking this one!</span>
                </div>
                <div className="flex gap-1">
                  <span className="text-blue-400 font-bold text-xs">@3ICE:</span>
                  <span className="text-gray-300 text-xs">Epic game! 🔥</span>
                </div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>

        <div className="mt-1.5">
          <a href="https://www.livelike.com" target="_blank" rel="noopener noreferrer">
            <Button
              size="xs"
              fullWidth
              className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white font-bold !h-5 !text-xs !py-0"
              rightSection={<ExternalLink size={10} />}
            >
              Join Live ↗
            </Button>
          </a>
        </div>
      </div>
    </motion.div>
  );
}
