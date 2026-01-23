'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronRight, MapPin, Calendar, Ticket, ZoomIn, ZoomOut, Move, ArrowLeft } from 'lucide-react';
import { Button, ActionIcon, NumberInput, Badge } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';

// Canvas component for rendering seats
interface SeatCanvasProps {
  seatMap: Array<{
    row: string;
    seats: Array<{
      number: number;
      id: string;
      occupied: boolean;
    }>;
  }>;
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
  zoom: number;
  pan: { x: number; y: number };
  isDragging: boolean;
}

const SeatCanvas: React.FC<SeatCanvasProps> = ({
  seatMap,
  selectedSeats,
  onSeatClick,
  zoom,
  pan,
  isDragging,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // Handle window resize
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const rect = canvas.getBoundingClientRect();
      setCanvasSize({ width: rect.width, height: rect.height });
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Draw seats on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvasSize.width * window.devicePixelRatio;
    canvas.height = canvasSize.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    // Clear canvas
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

    // Apply transformations
    ctx.save();
    ctx.translate(canvasSize.width / 2 + pan.x, canvasSize.height / 2 + pan.y);
    ctx.scale(zoom, zoom);

    const seatSize = 32;
    const seatGap = 4;
    const aisleGap = 40;
    const rowGap = 6;
    
    // Calculate dimensions
    const maxSeatsInRow = Math.max(...seatMap.map(r => r.seats.length));
    const midPoint = Math.floor(maxSeatsInRow / 2);
    const totalWidth = maxSeatsInRow * seatSize + (maxSeatsInRow - 1) * seatGap + aisleGap;
    const totalHeight = seatMap.length * (seatSize + rowGap);
    
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;

    // Draw stage label at bottom (like on stadium view)
    ctx.fillStyle = '#1F2937';
    const stageWidth = 200;
    const stageHeight = 40;
    ctx.fillRect(-stageWidth / 2, startY + totalHeight + 30, stageWidth, stageHeight);
    ctx.fillStyle = '#9CA3AF';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('STAGE', 0, startY + totalHeight + 50);

    seatMap.forEach((rowData, rowIndex) => {
      const { row, seats } = rowData;
      const rowMidPoint = Math.floor(seats.length / 2);
      const y = startY + rowIndex * (seatSize + rowGap);

      // Draw row label on the left
      ctx.fillStyle = '#9CA3AF';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(row, startX - 15, y + seatSize / 2);

      // Draw row label on the right
      ctx.textAlign = 'left';
      ctx.fillText(row, startX + totalWidth + 15, y + seatSize / 2);

      seats.forEach((seat, seatIndex) => {
        const xOffset = seatIndex >= rowMidPoint ? aisleGap : 0;
        const x = startX + seatIndex * (seatSize + seatGap) + xOffset;

        // Determine seat state
        const isSelected = selectedSeats.includes(seat.id);
        const isHovered = hoveredSeat === seat.id;
        const isOccupied = seat.occupied;

        // Draw seat
        ctx.save();

        if (isSelected) {
          // Selected seat
          ctx.fillStyle = '#4A9FD8';
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2.5;
          ctx.shadowColor = 'rgba(74, 159, 216, 0.6)';
          ctx.shadowBlur = 12;
        } else if (isOccupied) {
          // Occupied seat
          ctx.fillStyle = 'rgba(31, 41, 55, 0.5)';
          ctx.strokeStyle = '#1F2937';
          ctx.lineWidth = 1;
        } else if (isHovered) {
          // Hovered seat
          ctx.fillStyle = '#4B5563';
          ctx.strokeStyle = '#6B7280';
          ctx.lineWidth = 2;
        } else {
          // Available seat
          ctx.fillStyle = 'rgba(55, 65, 81, 0.5)';
          ctx.strokeStyle = '#4B5563';
          ctx.lineWidth = 1;
        }

        // Draw rounded rectangle for seat
        const radius = 3;
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + seatSize - radius, y);
        ctx.quadraticCurveTo(x + seatSize, y, x + seatSize, y + radius);
        ctx.lineTo(x + seatSize, y + seatSize - radius);
        ctx.quadraticCurveTo(x + seatSize, y + seatSize, x + seatSize - radius, y + seatSize);
        ctx.lineTo(x + radius, y + seatSize);
        ctx.quadraticCurveTo(x, y + seatSize, x, y + seatSize - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Draw seat number
        ctx.fillStyle = isOccupied ? '#6B7280' : '#FFFFFF';
        ctx.font = isSelected ? 'bold 11px sans-serif' : '600 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(seat.number), x + seatSize / 2, y + seatSize / 2);
      });
    });

    ctx.restore();
  }, [seatMap, selectedSeats, hoveredSeat, zoom, pan, canvasSize]);

  // Handle mouse move for hover
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Transform mouse coordinates to canvas space
    const canvasX = (mouseX - canvasSize.width / 2 - pan.x) / zoom;
    const canvasY = (mouseY - canvasSize.height / 2 - pan.y) / zoom;

    const seatSize = 32;
    const seatGap = 4;
    const aisleGap = 40;
    const rowGap = 6;
    
    const maxSeatsInRow = Math.max(...seatMap.map(r => r.seats.length));
    const totalWidth = maxSeatsInRow * seatSize + (maxSeatsInRow - 1) * seatGap + aisleGap;
    const totalHeight = seatMap.length * (seatSize + rowGap);
    
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;

    let foundSeat: string | null = null;

    seatMap.forEach((rowData, rowIndex) => {
      const { seats } = rowData;
      const rowMidPoint = Math.floor(seats.length / 2);
      const y = startY + rowIndex * (seatSize + rowGap);

      seats.forEach((seat, seatIndex) => {
        const xOffset = seatIndex >= rowMidPoint ? aisleGap : 0;
        const x = startX + seatIndex * (seatSize + seatGap) + xOffset;

        if (
          canvasX >= x &&
          canvasX <= x + seatSize &&
          canvasY >= y &&
          canvasY <= y + seatSize
        ) {
          foundSeat = seat.id;
        }
      });
    });

    setHoveredSeat(foundSeat);
  };

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Transform mouse coordinates to canvas space
    const canvasX = (mouseX - canvasSize.width / 2 - pan.x) / zoom;
    const canvasY = (mouseY - canvasSize.height / 2 - pan.y) / zoom;

    const seatSize = 32;
    const seatGap = 4;
    const aisleGap = 40;
    const rowGap = 6;
    
    const maxSeatsInRow = Math.max(...seatMap.map(r => r.seats.length));
    const totalWidth = maxSeatsInRow * seatSize + (maxSeatsInRow - 1) * seatGap + aisleGap;
    const totalHeight = seatMap.length * (seatSize + rowGap);
    
    const startX = -totalWidth / 2;
    const startY = -totalHeight / 2;

    seatMap.forEach((rowData, rowIndex) => {
      const { seats } = rowData;
      const rowMidPoint = Math.floor(seats.length / 2);
      const y = startY + rowIndex * (seatSize + rowGap);

      seats.forEach((seat, seatIndex) => {
        const xOffset = seatIndex >= rowMidPoint ? aisleGap : 0;
        const x = startX + seatIndex * (seatSize + seatGap) + xOffset;

        if (
          canvasX >= x &&
          canvasX <= x + seatSize &&
          canvasY >= y &&
          canvasY <= y + seatSize &&
          !seat.occupied
        ) {
          onSeatClick(seat.id);
        }
      });
    });
  };

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      style={{ cursor: isDragging ? 'grabbing' : hoveredSeat ? 'pointer' : 'grab' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onMouseLeave={() => setHoveredSeat(null)}
    />
  );
};

type SeatSection = {
  id: string;
  name: string;
  price: number;
  available: number;
  color: string;
};

type SpecificSection = {
  id: string;
  name: string;
  category: string;
};

const sections: SeatSection[] = [
  { id: 'lower', name: 'Lower Bowl', price: 150, available: 245, color: '#DC2626' },
  { id: 'club', name: 'Club Seats', price: 250, available: 89, color: '#FBBF24' },
  { id: 'upper', name: 'Upper Bowl', price: 75, available: 412, color: '#A855F7' },
];

const specificSections: SpecificSection[] = [
  // Lower Bowl
  { id: 'section-114', name: 'Section 114', category: 'lower' },
  { id: 'section-113', name: 'Section 113', category: 'lower' },
  { id: 'section-113b', name: 'Section 113B', category: 'lower' },
  { id: 'section-114b', name: 'Section 114B', category: 'lower' },
  { id: 'section-115', name: 'Section 115', category: 'lower' },
  { id: 'section-116', name: 'Section 116', category: 'lower' },
  { id: 'section-104', name: 'Section 104', category: 'lower' },
  { id: 'section-105', name: 'Section 105', category: 'lower' },
  { id: 'section-106b', name: 'Section 106B', category: 'lower' },
  { id: 'section-106', name: 'Section 106', category: 'lower' },
  { id: 'section-107', name: 'Section 107', category: 'lower' },
  { id: 'section-108', name: 'Section 108', category: 'lower' },
  { id: 'section-101', name: 'Section 101', category: 'lower' },
  { id: 'section-109', name: 'Section 109', category: 'lower' },
  // Club Seats
  { id: 'section-c1', name: 'Section C1', category: 'club' },
  { id: 'section-c2', name: 'Section C2', category: 'club' },
  { id: 'section-c3', name: 'Section C3', category: 'club' },
  // Upper Bowl
  { id: 'section-117', name: 'Section 117', category: 'upper' },
  { id: 'section-110', name: 'Section 110', category: 'upper' },
];

export default function Home() {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [selectedSpecificSection, setSelectedSpecificSection] = useState<string | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [seats, setSeats] = useState(2);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [step, setStep] = useState<'section' | 'seats'>('section');
  const [zoom, setZoom] = useState(0.8);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update navigation title on mount and when step changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const event = new CustomEvent('updateHeader', {
        detail: {
          title: step === 'seats' ? 'Select Your Seats' : '3ICE Arena Selection',
          subtitle: 'Minnesota vs Buffalo • AUG 14, 2024',
          venue: '3ICE Arena',
          showBackButton: false,
        }
      });
      window.dispatchEvent(event);
    }
  }, [step]);

  const selectedSectionData = sections.find(s => s.id === selectedSection);
  const selectedSpecificSectionData = specificSections.find(s => s.id === selectedSpecificSection);

  // Generate seat map based on section
  const generateSeatMap = () => {
    let rows: string[];
    let seatsPerRow: number;
    let occupiedSeats: string[];

    switch (selectedSection) {
      case 'lower':
        rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
        seatsPerRow = 32;
        occupiedSeats = ['A5', 'A6', 'B10', 'C3', 'D15', 'E8', 'F12', 'G7', 'H14', 'A28', 'B22', 'D30', 'F25'];
        break;
      case 'club':
        rows = ['A', 'B', 'C'];
        seatsPerRow = 24;
        occupiedSeats = ['A8', 'B4', 'C12', 'B20'];
        break;
      case 'upper':
        rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
        seatsPerRow = 36;
        occupiedSeats = ['A10', 'B15', 'C20', 'E5', 'G18', 'I12', 'A30', 'D25', 'F32', 'H28'];
        break;
      default:
        rows = ['A'];
        seatsPerRow = 1;
        occupiedSeats = [];
    }
    
    return rows.map(row => ({
      row,
      seats: Array.from({ length: seatsPerRow }, (_, i) => ({
        number: i + 1,
        id: `${row}${i + 1}`,
        occupied: occupiedSeats.includes(`${row}${i + 1}`),
      })),
    }));
  };

  const seatMap = selectedSection ? generateSeatMap() : [];

  const handleSeatClick = (seatId: string) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatId));
    } else if (selectedSeats.length < seats) {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleSectionSelect = (sectionId: string, specificSectionId: string) => {
    const specificSection = specificSections.find(s => s.id === specificSectionId);
    if (specificSection) {
      setSelectedSection(specificSection.category);
      setSelectedSpecificSection(specificSectionId);
      setStep('seats');
      setSelectedSeats([]);
      setZoom(0.9);
      setPan({ x: 0, y: 0 });
    }
  };

  const handleBack = () => {
    setStep('section');
    setSelectedSection(null);
    setSelectedSpecificSection(null);
    setSelectedSeats([]);
    setZoom(0.8);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 2.5));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      requestAnimationFrame(() => {
        setPan({
          x: e.clientX - dragStart.x,
          y: e.clientY - dragStart.y,
        });
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 top-20 left-20 bg-gradient-to-b from-black via-gray-900 to-black text-white flex overflow-hidden">
      {/* Main Arena View - Full Height */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Arena/Seats View - Full Height */}
        <div className="flex-1 relative bg-gradient-to-b from-gray-900/50 to-black/50 overflow-hidden">
          {step === 'section' ? (
            /* Arena Selection View */
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                ref={svgContainerRef}
                className="relative w-full h-full max-w-6xl cursor-move"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
              >
                <svg 
                  viewBox="0 0 1400 900" 
                  className="w-full h-full"
                  style={{ 
                    transform: `scale(${zoom}) translate3d(${pan.x / zoom}px, ${pan.y / zoom}px, 0)`,
                    transformOrigin: 'center center',
                    willChange: isDragging ? 'transform' : 'auto',
                    transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                  }}
                >
                  {/* Ice Rink - Flat View */}
                  <g transform="translate(700, 450)">
                    <motion.g
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      {/* Rink */}
                      <rect x="-350" y="-200" width="700" height="400" rx="50" fill="#3A4A5A" fillOpacity="0.6" />
                      <rect x="-330" y="-180" width="660" height="360" rx="40" fill="none" stroke="#4A9FD8" strokeWidth="3" />
                    
                    {/* Center Lines */}
                    <line x1="0" y1="-180" x2="0" y2="180" stroke="#4A9FD8" strokeWidth="2.5" opacity="0.6" />
                    <line x1="-330" y1="0" x2="330" y2="0" stroke="#DC2626" strokeWidth="2.5" opacity="0.5" />
                    
                    {/* Center Circle */}
                    <circle cx="0" cy="0" r="60" fill="none" stroke="#4A9FD8" strokeWidth="2.5" opacity="0.6" />
                    <circle cx="0" cy="0" r="3" fill="#4A9FD8" opacity="0.6" />
                    
                    {/* Face-off Circles */}
                    <circle cx="-150" cy="-60" r="40" fill="none" stroke="#6B8199" strokeWidth="2.5" opacity="0.5" />
                    <circle cx="150" cy="-60" r="40" fill="none" stroke="#6B8199" strokeWidth="2.5" opacity="0.5" />
                    <circle cx="-150" cy="60" r="40" fill="none" stroke="#6B8199" strokeWidth="2.5" opacity="0.5" />
                    <circle cx="150" cy="60" r="40" fill="none" stroke="#6B8199" strokeWidth="2.5" opacity="0.5" />
                    
                      {/* Goals */}
                      <rect x="-320" y="-30" width="8" height="60" fill="#8B9DAF" opacity="0.4" />
                      <rect x="312" y="-30" width="8" height="60" fill="#8B9DAF" opacity="0.4" />
                    </motion.g>
                  </g>

                  {/* Upper Bowl */}
                  <motion.g
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    {/* Left */}
                    <rect 
                      x="100" y="100" width="100" height="700" rx="15" 
                      fill="#A855F7" 
                      fillOpacity={hoveredSection === 'section-117' ? "0.85" : "0.7"}
                      stroke={hoveredSection === 'section-117' ? "#FBBF24" : "#8B5CF6"}
                      strokeWidth={hoveredSection === 'section-117' ? "5" : "3"}
                      onClick={() => handleSectionSelect('upper', 'section-117')}
                      onMouseEnter={() => setHoveredSection('section-117')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="150" y="460" fill="white" fontSize="28" fontWeight="bold" textAnchor="middle" pointerEvents="none">117</text>
                    
                    {/* Right */}
                    <rect 
                      x="1200" y="100" width="100" height="700" rx="15" 
                      fill="#A855F7" 
                      fillOpacity={hoveredSection === 'section-110' ? "0.85" : "0.7"}
                      stroke={hoveredSection === 'section-110' ? "#FBBF24" : "#8B5CF6"}
                      strokeWidth={hoveredSection === 'section-110' ? "5" : "3"}
                      onClick={() => handleSectionSelect('upper', 'section-110')}
                      onMouseEnter={() => setHoveredSection('section-110')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="1250" y="460" fill="white" fontSize="28" fontWeight="bold" textAnchor="middle" pointerEvents="none">110</text>
                    
                    {/* Top - общая секция Upper Bowl */}
                    <rect 
                      x="220" y="50" width="960" height="80" rx="15" 
                      fill="#A855F7" 
                      fillOpacity={hoveredSection === 'upper-top' ? "0.85" : "0.7"}
                      stroke={hoveredSection === 'upper-top' ? "#FBBF24" : "#8B5CF6"}
                      strokeWidth={hoveredSection === 'upper-top' ? "5" : "3"}
                      onClick={() => handleSectionSelect('upper', 'section-117')}
                      onMouseEnter={() => setHoveredSection('upper-top')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="700" y="98" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" pointerEvents="none">UPPER BOWL</text>
                  </motion.g>

                  {/* Lower Bowl */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {/* Bottom Row */}
                    <rect 
                      x="220" y="770" width="120" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-114' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-114' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-114' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-114')}
                      onMouseEnter={() => setHoveredSection('section-114')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="280" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">114</text>
                    
                    <rect 
                      x="360" y="770" width="140" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-113' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-113' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-113' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-113')}
                      onMouseEnter={() => setHoveredSection('section-113')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="430" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">113</text>
                    
                    <rect 
                      x="520" y="770" width="160" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-113b' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-113b' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-113b' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-113b')}
                      onMouseEnter={() => setHoveredSection('section-113b')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="600" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">113B</text>
                    
                    <rect 
                      x="720" y="770" width="160" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-114b' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-114b' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-114b' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-114b')}
                      onMouseEnter={() => setHoveredSection('section-114b')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="800" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">114B</text>
                    
                    <rect 
                      x="900" y="770" width="140" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-115' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-115' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-115' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-115')}
                      onMouseEnter={() => setHoveredSection('section-115')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="970" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">115</text>
                    
                    <rect 
                      x="1060" y="770" width="120" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-116' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-116' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-116' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-116')}
                      onMouseEnter={() => setHoveredSection('section-116')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="1120" y="818" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">116</text>

                    {/* Top Row */}
                    <rect 
                      x="220" y="150" width="120" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-104' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-104' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-104' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-104')}
                      onMouseEnter={() => setHoveredSection('section-104')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="280" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">104</text>
                    
                    <rect 
                      x="360" y="150" width="140" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-105' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-105' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-105' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-105')}
                      onMouseEnter={() => setHoveredSection('section-105')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="430" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">105</text>
                    
                    <rect 
                      x="520" y="150" width="160" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-106b' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-106b' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-106b' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-106b')}
                      onMouseEnter={() => setHoveredSection('section-106b')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="600" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">106B</text>
                    
                    <rect 
                      x="720" y="150" width="160" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-106' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-106' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-106' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-106')}
                      onMouseEnter={() => setHoveredSection('section-106')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="800" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">106</text>
                    
                    <rect 
                      x="900" y="150" width="140" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-107' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-107' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-107' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-107')}
                      onMouseEnter={() => setHoveredSection('section-107')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="970" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">107</text>
                    
                    <rect 
                      x="1060" y="150" width="120" height="80" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-108' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-108' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-108' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-108')}
                      onMouseEnter={() => setHoveredSection('section-108')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="1120" y="198" fill="white" fontSize="22" fontWeight="bold" textAnchor="middle" pointerEvents="none">108</text>

                    {/* Sides */}
                    <rect 
                      x="220" y="250" width="60" height="500" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-101' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-101' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-101' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-101')}
                      onMouseEnter={() => setHoveredSection('section-101')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="255" y="500" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" transform="rotate(-90 255 500)" pointerEvents="none">101</text>
                    
                    <rect 
                      x="1120" y="250" width="60" height="500" rx="12" 
                      fill="#DC2626" 
                      fillOpacity={hoveredSection === 'section-109' ? "0.95" : "0.85"}
                      stroke={hoveredSection === 'section-109' ? "#FBBF24" : "#B91C1C"}
                      strokeWidth={hoveredSection === 'section-109' ? "5" : "3"}
                      onClick={() => handleSectionSelect('lower', 'section-109')}
                      onMouseEnter={() => setHoveredSection('section-109')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="1145" y="500" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" transform="rotate(90 1145 500)" pointerEvents="none">109</text>
                  </motion.g>

                  {/* Club Seats */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <rect 
                      x="360" y="860" width="140" height="50" rx="10" 
                      fill="#FBBF24" 
                      fillOpacity={hoveredSection === 'section-c1' ? "1" : "0.95"}
                      stroke={hoveredSection === 'section-c1' ? "#FFFFFF" : "#F59E0B"}
                      strokeWidth={hoveredSection === 'section-c1' ? "5" : "3"}
                      onClick={() => handleSectionSelect('club', 'section-c1')}
                      onMouseEnter={() => setHoveredSection('section-c1')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="430" y="892" fill="#000" fontSize="20" fontWeight="bold" textAnchor="middle" pointerEvents="none">C1</text>
                    
                    <rect 
                      x="520" y="860" width="360" height="50" rx="10" 
                      fill="#FBBF24" 
                      fillOpacity={hoveredSection === 'section-c2' ? "1" : "0.95"}
                      stroke={hoveredSection === 'section-c2' ? "#FFFFFF" : "#F59E0B"}
                      strokeWidth={hoveredSection === 'section-c2' ? "5" : "3"}
                      onClick={() => handleSectionSelect('club', 'section-c2')}
                      onMouseEnter={() => setHoveredSection('section-c2')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="700" y="892" fill="#000" fontSize="20" fontWeight="bold" textAnchor="middle" pointerEvents="none">C2</text>
                    
                    <rect 
                      x="900" y="860" width="140" height="50" rx="10" 
                      fill="#FBBF24" 
                      fillOpacity={hoveredSection === 'section-c3' ? "1" : "0.95"}
                      stroke={hoveredSection === 'section-c3' ? "#FFFFFF" : "#F59E0B"}
                      strokeWidth={hoveredSection === 'section-c3' ? "5" : "3"}
                      onClick={() => handleSectionSelect('club', 'section-c3')}
                      onMouseEnter={() => setHoveredSection('section-c3')}
                      onMouseLeave={() => setHoveredSection(null)}
                      className="cursor-pointer transition-all"
                    />
                    <text x="970" y="892" fill="#000" fontSize="20" fontWeight="bold" textAnchor="middle" pointerEvents="none">C3</text>
                  </motion.g>

                  {/* STAGE Label */}
                  <motion.g
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <rect x="630" y="695" width="140" height="35" rx="8" fill="#1F2937" />
                    <text x="700" y="718" fill="#9CA3AF" fontSize="16" fontWeight="bold" textAnchor="middle">STAGE</text>
                  </motion.g>
                </svg>
              </motion.div>

              {/* Zoom Controls - Floating */}
              <div className="absolute top-8 right-8 flex flex-col gap-2">
                <ActionIcon
                  onClick={handleZoomIn}
                  size="xl"
                  variant="filled"
                  color="dark"
                  title="Zoom In"
                >
                  <ZoomIn size={20} />
                </ActionIcon>
                <ActionIcon
                  onClick={handleZoomOut}
                  size="xl"
                  variant="filled"
                  color="dark"
                  title="Zoom Out"
                >
                  <ZoomOut size={20} />
                </ActionIcon>
              </div>

              {/* Legend - Top Left */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute top-8 left-8 inline-flex flex-col gap-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg"
              >
                {sections.map((section, idx) => (
                  <motion.div 
                    key={section.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + idx * 0.1 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className={`w-3 h-3 rounded`} style={{ backgroundColor: section.color }} />
                    <span className="text-xs font-bold">{section.name}</span>
                    <span className="text-xs text-gray-400">${section.price}</span>
                  </motion.div>
                ))}
                <div className="h-px w-full bg-gray-600 my-1"></div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  className="flex items-center gap-2"
                >
                  <Move size={14} className="text-[#4A9FD8]" />
                  <span className="text-xs text-gray-400">Pan & Zoom</span>
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                  className="flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2L8 14M8 2L5 5M8 2L11 5M8 14L5 11M8 14L11 11" stroke="#4A9FD8" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <span className="text-xs text-gray-400">Click Section                  </span>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : (
            /* Seat Selection View - Full Screen */
            <div className="absolute inset-0 flex flex-col">
              {/* Top Info Bar - Sticky */}
              <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-black/80 backdrop-blur-md border-b border-gray-800 z-30">
                <div className="flex items-center gap-4">
                  <div>
                    <span className="text-white font-bold text-lg">{selectedSpecificSectionData?.name || selectedSectionData?.name}</span>
                  </div>
                  <div className="h-6 w-px bg-gray-700"></div>
                  <div className="text-gray-400 text-sm">
                    Price: <span className="text-[#4A9FD8] font-bold text-lg">${selectedSectionData?.price}</span> per seat
                  </div>
                </div>
                <Button
                  onClick={handleBack}
                  leftSection={<ArrowLeft size={16} />}
                  variant="subtle"
                  color="gray"
                  size="md"
                >
                  Back to Arena
                </Button>
              </div>

              {/* Seat Map - Full Screen with Canvas */}
              <div className="flex-1 flex flex-col items-center justify-center overflow-hidden relative">
                {/* Legend - Top Left */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="absolute top-8 left-8 inline-flex flex-col gap-2 bg-black/80 backdrop-blur-sm px-3 py-2 rounded-lg z-10"
                >
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-3 h-3 rounded bg-gray-700/50 border border-gray-600" />
                    <span className="text-xs font-bold">Available</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-3 h-3 rounded bg-[#4A9FD8] border-2 border-white" />
                    <span className="text-xs font-bold">Selected</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="w-3 h-3 rounded bg-gray-800/50 border border-gray-800" />
                    <span className="text-xs font-bold">Occupied</span>
                  </motion.div>
                  <div className="h-px w-full bg-gray-600 my-1"></div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.6 }}
                    className="flex items-center gap-2"
                  >
                    <Move size={14} className="text-[#4A9FD8]" />
                    <span className="text-xs text-gray-400">Pan & Zoom</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                    className="flex items-center gap-2"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2L8 14M8 2L5 5M8 2L11 5M8 14L5 11M8 14L11 11" stroke="#4A9FD8" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    <span className="text-xs text-gray-400">Click Seat</span>
                  </motion.div>
                </motion.div>

                {/* Zoom Controls - Top Right */}
                <div className="absolute top-8 right-8 flex flex-col gap-2 z-10">
                  <ActionIcon
                    onClick={handleZoomIn}
                    size="xl"
                    variant="filled"
                    color="dark"
                    title="Zoom In"
                  >
                    <ZoomIn size={20} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={handleZoomOut}
                    size="xl"
                    variant="filled"
                    color="dark"
                    title="Zoom Out"
                  >
                    <ZoomOut size={20} />
                  </ActionIcon>
                </div>

                {/* Canvas Container */}
                <motion.div 
                  ref={svgContainerRef}
                  className="relative w-full h-full cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6 }}
                >
                  <SeatCanvas
                    seatMap={seatMap}
                    selectedSeats={selectedSeats}
                    onSeatClick={handleSeatClick}
                    zoom={zoom}
                    pan={pan}
                    isDragging={isDragging}
                  />
                </motion.div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      <div className="w-[420px] bg-black/98 backdrop-blur-md border-l border-[#4A9FD8]/20 flex flex-col">
        <div className="flex-1 overflow-auto p-6 space-y-4 custom-scrollbar">
          <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
            <h3 className="text-xl font-black mb-4">Booking</h3>
            
            {selectedSection ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Selected Section</p>
                  <p className="text-lg font-bold">{selectedSectionData?.name}</p>
                  <p className="text-xl font-black text-[#4A9FD8] mt-0.5">${selectedSectionData?.price} <span className="text-xs text-gray-400 font-normal">/seat</span></p>
                </div>

                <div className="border-t border-gray-800 pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 text-center">How Many Seats?</p>
                  <div className="flex items-center justify-center">
                    <NumberInput
                      id="seat-count"
                      name="seatCount"
                      value={seats}
                      onChange={(value) => {
                        setSeats(typeof value === 'number' ? value : 1);
                        setSelectedSeats([]);
                      }}
                      min={1}
                      max={10}
                      size="lg"
                      styles={{
                        input: {
                          textAlign: 'center',
                          fontWeight: 900,
                          fontSize: '1.5rem',
                          width: '120px'
                        }
                      }}
                    />
                  </div>
                </div>

                {step === 'seats' && (
                  <div className="border-t border-gray-800 pt-4">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 text-center">Selected Seats</p>
                    <div className="flex flex-wrap gap-2 min-h-[36px] justify-center">
                      {selectedSeats.length > 0 ? (
                        selectedSeats.map(seat => (
                          <Badge key={seat} size="md" variant="filled" color="blue" className="flex items-center justify-center">
                            {seat}
                          </Badge>
                        ))
                      ) : (
                        <p className="text-gray-500 text-xs w-full text-center">No seats selected</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <MapPin size={40} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 text-sm">Select a section to begin</p>
              </div>
            )}
          </div>

          {selectedSection && (
            <div className="bg-gray-900/50 rounded-xl p-5 border border-gray-800">
              <h3 className="text-lg font-black mb-4">Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Subtotal ({selectedSeats.length} seats)</span>
                  <span className="font-bold">${(selectedSectionData?.price || 0) * selectedSeats.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Processing Fees</span>
                  <span className="font-bold">${selectedSeats.length > 0 ? 30 : 0}</span>
                </div>
                <div className="border-t border-gray-700 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black">Total</span>
                    <span className="text-2xl font-black text-[#4A9FD8]">
                      ${(selectedSectionData?.price || 0) * selectedSeats.length + (selectedSeats.length > 0 ? 30 : 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  disabled={step === 'section' || selectedSeats.length !== seats}
                  fullWidth
                  size="md"
                  variant="filled"
                  color="blue"
                  onClick={() => {
                    if (selectedSeats.length === seats && selectedSectionData) {
                      // Add to cart logic
                      const cartItem = {
                        id: `ticket-${Date.now()}`,
                        section: selectedSpecificSectionData?.name || selectedSectionData.name,
                        seats: selectedSeats,
                        price: selectedSectionData.price,
                        total: selectedSectionData.price * selectedSeats.length + 30
                      };
                      
                      // Dispatch cart update event
                      if (typeof window !== 'undefined') {
                        try {
                          const cartData = localStorage.getItem('cart');
                          let existingCart: any[] = [];
                          
                          if (cartData) {
                            const parsed = JSON.parse(cartData);
                            existingCart = Array.isArray(parsed) ? parsed : [];
                          }
                          
                          existingCart.push(cartItem);
                          localStorage.setItem('cart', JSON.stringify(existingCart));
                          
                          const event = new CustomEvent('cartUpdate', {
                            detail: { count: existingCart.length, showCart: true }
                          });
                          window.dispatchEvent(event);
                        } catch (error) {
                          console.error('Error adding to cart:', error);
                          // Reset cart if corrupted
                          localStorage.setItem('cart', JSON.stringify([cartItem]));
                          const event = new CustomEvent('cartUpdate', {
                            detail: { count: 1, showCart: true }
                          });
                          window.dispatchEvent(event);
                        }
                      }
                      
                      // Reset selection
                      setSelectedSeats([]);
                    }
                  }}
                  leftSection={<ChevronRight size={18} />}
                >
                  {step === 'section' 
                    ? 'Select a section first' 
                    : selectedSeats.length === seats 
                      ? 'Add to Cart' 
                      : `Select ${seats - selectedSeats.length} more seat(s)`
                  }
                </Button>

                <Button
                  disabled={step === 'section' || selectedSeats.length !== seats}
                  fullWidth
                  size="md"
                  variant="filled"
                  color="green"
                  className={selectedSeats.length === seats ? '!bg-green-600 hover:!bg-green-700' : ''}
                  leftSection={<Ticket size={18} />}
                  rightSection={step === 'seats' && selectedSeats.length === seats ? <ChevronRight size={18} /> : null}
                >
                  {step === 'section' 
                    ? 'Select a section first' 
                    : selectedSeats.length === seats 
                      ? 'Buy Now' 
                      : `Select ${seats - selectedSeats.length} more seat(s)`
                  }
                </Button>
              </div>

              <p className="text-xs text-center text-gray-600 mt-3">
                SECURE CHECKOUT POWERED BY 3ICE
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
