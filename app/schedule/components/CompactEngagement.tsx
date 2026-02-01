'use client';

import { useState } from 'react';
import { MessageCircle, BarChart3, Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge, Button, Progress, Collapse } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

export default function CompactEngagement() {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="bg-gradient-to-br from-purple-900/10 to-pink-900/10 border border-purple-500/20 rounded-lg overflow-hidden"
    >
      {/* Collapsed Summary Row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-3 hover:bg-purple-900/10 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Badge size="sm" className="!bg-purple-600 !text-white">
            LiveLike
          </Badge>
          <span className="text-xs text-white font-bold">Polls + Chat</span>
          <Badge size="xs" className="!bg-pink-600 !text-white animate-pulse">
            LIVE
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <Users size={12} />
            <span>2.8k participants</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Live Fan Engagement</span>
          {expanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
        </div>
      </button>

      {/* Expanded Content */}
      <Collapse in={expanded}>
        <div className="p-3 pt-0 border-t border-purple-500/20">
          {/* Sample Poll */}
          <div className="bg-black/40 rounded p-2.5 mb-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="text-purple-400" size={14} />
              <h4 className="text-xs font-bold text-white">Fan Poll: Who will win tonight?</h4>
            </div>
            <div className="space-y-1.5">
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-white">Minnesota</span>
                  <span className="text-purple-400 font-bold">58%</span>
                </div>
                <Progress value={58} size="xs" classNames={{ root: '!bg-gray-800', section: '!bg-purple-500' }} />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-0.5">
                  <span className="text-white">Buffalo</span>
                  <span className="text-pink-400 font-bold">42%</span>
                </div>
                <Progress value={42} size="xs" classNames={{ root: '!bg-gray-800', section: '!bg-pink-500' }} />
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-400 mt-1.5">
              <Users size={10} />
              <span>2,847 votes</span>
            </div>
          </div>

          {/* Chat Preview */}
          <div className="bg-black/40 rounded p-2.5 mb-2.5">
            <div className="flex items-center gap-1.5 mb-2">
              <MessageCircle className="text-purple-400" size={14} />
              <h4 className="text-xs font-bold text-white">Live Chat</h4>
              <Badge size="xs" className="!bg-green-600 !text-white !text-xs !px-1.5 !h-4">Active</Badge>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex gap-1.5">
                <span className="text-purple-400 font-bold text-xs">@HockeyFan23:</span>
                <span className="text-gray-300 text-xs">Let&apos;s go Minnesota! 🏒</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-pink-400 font-bold text-xs">@BuffaloFan:</span>
                <span className="text-gray-300 text-xs">Buffalo is taking this one!</span>
              </div>
              <div className="flex gap-1.5">
                <span className="text-blue-400 font-bold text-xs">@3ICEFanatic:</span>
                <span className="text-gray-300 text-xs">This is going to be epic! 🔥</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xs text-gray-300 mb-2 leading-snug">
              Join thousands of fans in real-time polls and live chat during games!
            </p>
            <a href="https://www.livelike.com" target="_blank" rel="noopener noreferrer">
              <Button
                size="xs"
                className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white font-bold !h-7 !text-xs"
                rightSection={<ExternalLink size={12} />}
              >
                Join Live Engagement
              </Button>
            </a>
          </div>
        </div>
      </Collapse>
    </motion.div>
  );
}
