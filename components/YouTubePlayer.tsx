'use client';

import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoUrl: string;
  playing: boolean;
  onPause?: () => void;
  onPlay?: () => void;
}

export default function YouTubePlayer({ videoUrl, playing, onPause, onPlay }: YouTubePlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [videoId, setVideoId] = useState<string>('');

  useEffect(() => {
    // Extract video ID from YouTube URL
    const match = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    if (match && match[1]) {
      setVideoId(match[1]);
    }
  }, [videoUrl]);

  useEffect(() => {
    if (!iframeRef.current || !videoId) return;

    // YouTube iframe API control
    const iframe = iframeRef.current;
    const message = playing 
      ? '{"event":"command","func":"playVideo","args":""}' 
      : '{"event":"command","func":"pauseVideo","args":""}';
    
    iframe.contentWindow?.postMessage(message, '*');
  }, [playing, videoId]);

  if (!videoId) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <p className="text-white">Loading video...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        ref={iframeRef}
        className="absolute"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          pointerEvents: 'none'
        }}
        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&autoplay=${playing ? 1 : 0}&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&playsinline=1&cc_load_policy=0&autohide=1`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
