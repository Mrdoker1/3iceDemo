'use client';

import { MessageCircle, BarChart3, Users, ExternalLink } from 'lucide-react';
import { Badge, Button, Progress } from '@mantine/core';
import { motion } from 'framer-motion';

export default function LiveEngagement() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-2xl font-black text-white mb-4">LIVE FAN ENGAGEMENT</h3>
      <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <Badge size="lg" className="!bg-purple-600 !text-white">
            Powered by LiveLike
          </Badge>
          <Badge size="sm" className="!bg-pink-600 !text-white animate-pulse">
            LIVE
          </Badge>
        </div>

        {/* Sample Poll */}
        <div className="bg-black/40 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="text-purple-400" size={20} />
            <h4 className="text-sm font-bold text-white">Fan Poll: Who will win tonight?</h4>
          </div>
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Minnesota</span>
                <span className="text-purple-400 font-bold">58%</span>
              </div>
              <Progress value={58} className="h-2" classNames={{ root: '!bg-gray-800', section: '!bg-purple-500' }} />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-white">Buffalo</span>
                <span className="text-pink-400 font-bold">42%</span>
              </div>
              <Progress value={42} className="h-2" classNames={{ root: '!bg-gray-800', section: '!bg-pink-500' }} />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-400 mt-2">
            <Users size={12} />
            <span>2,847 votes</span>
          </div>
        </div>

        {/* Chat Preview */}
        <div className="bg-black/40 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="text-purple-400" size={20} />
            <h4 className="text-sm font-bold text-white">Live Chat</h4>
            <Badge size="xs" className="!bg-green-600 !text-white">Active</Badge>
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex gap-2">
              <span className="text-purple-400 font-bold">@HockeyFan23:</span>
              <span className="text-gray-300">Let&apos;s go Minnesota! 🏒</span>
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

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm text-gray-300 mb-3">
            Join thousands of fans in real-time polls, predictions, and live chat during games!
          </p>
          <a href="https://www.livelike.com" target="_blank" rel="noopener noreferrer">
            <Button
              size="md"
              className="!bg-gradient-to-r !from-purple-600 !to-pink-600 !text-white font-bold"
              rightSection={<ExternalLink size={16} />}
            >
              Join Live Engagement
            </Button>
          </a>
        </div>

        {/* Info Note */}
        <div className="mt-4 p-3 bg-black/40 rounded-lg border border-purple-500/20">
          <p className="text-xs text-gray-400 leading-relaxed">
            <strong className="text-purple-400">Note:</strong> Live engagement features are available during game broadcasts. 
            Participate in polls, trivia, and chat with fellow fans to enhance your viewing experience.
          </p>
        </div>
      </div>

      {/* Ticketing & Merch Section */}
      <div className="mt-6 bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-6">
        <h4 className="text-xl font-black text-white mb-4">TICKETING & MERCHANDISE</h4>
        <div className="space-y-3 text-sm text-gray-300">
          <div className="flex items-start gap-2">
            <span className="text-[#4A9FD8] font-black">•</span>
            <p>
              <strong className="text-white">Tickets:</strong> All ticket purchases are handled through our official partner, 
              Ticketmaster. Click any &quot;Get Tickets&quot; button to be redirected to the secure ticketing platform.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#4A9FD8] font-black">•</span>
            <p>
              <strong className="text-white">Merchandise:</strong> Official 3ICE gear is available in our Shop section. 
              Orders are fulfilled by our merchandise partner with secure payment processing.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-[#4A9FD8] font-black">•</span>
            <p>
              <strong className="text-white">Customer Support:</strong> For ticket or merchandise inquiries, 
              please contact our support team through the respective platform.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
