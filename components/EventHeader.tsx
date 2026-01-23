'use client';

import { Calendar, MapPin, ArrowLeft } from 'lucide-react';

interface EventHeaderProps {
  title?: string;
  teams?: string;
  date?: string;
  venue?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function EventHeader({ 
  title = '3ICE Arena Selection',
  teams = 'Minnesota vs Buffalo',
  date = 'AUG 14, 2024',
  venue = '3ICE Arena, Minneapolis',
  showBackButton = false,
  onBack
}: EventHeaderProps) {
  return (
    <div className="flex items-center gap-4 border-l border-gray-700 pl-4 ml-4">
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ArrowLeft size={16} />
          <span className="text-sm font-bold">Back</span>
        </button>
      )}
      <div>
        <h2 className="text-sm font-bold text-white">{title}</h2>
        <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
          <span>{teams}</span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{venue}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
