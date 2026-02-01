'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Ticket, X, ShoppingBag as LucideShoppingBag } from 'lucide-react';
import { 
  IconTicket, 
  IconPlayerPlay, 
  IconCalendarEvent, 
  IconShoppingBag, 
  IconLogout, 
  IconShoppingCart, 
  IconX as TablerX
} from '@tabler/icons-react';
import EventHeader from './EventHeader';
import { getAssetPath } from '@/lib/utils';

const navItems = [
  { name: 'Schedule', href: '/', icon: IconCalendarEvent },
  { name: 'Watch', href: '/watch', icon: IconPlayerPlay },
  { name: 'Ticketing', href: '/ticketing', icon: IconTicket },
  { name: 'Shop', href: '/shop', icon: IconShoppingBag },
];

export default function Navigation() {
  const pathname = usePathname();
  const [eventTitle, setEventTitle] = React.useState('3ICE Arena Selection');
  const [showBackButton, setShowBackButton] = React.useState(false);
  const [onBackHandler, setOnBackHandler] = React.useState<(() => void) | null>(null);
  const [scheduleHeader, setScheduleHeader] = React.useState<{
    title: string;
    subtitle: string;
    stats: { label: string; value: number }[] | null;
  } | null>(null);
  const [cartItemsCount, setCartItemsCount] = React.useState(0);
  const [showCart, setShowCart] = React.useState(false);
  const [cartItems, setCartItems] = React.useState<any[]>([]);

  // Load cart from localStorage on mount
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsed = JSON.parse(cartData);
          const savedCart = Array.isArray(parsed) ? parsed : [];
          setCartItems(savedCart);
          setCartItemsCount(savedCart.length);
        } else {
          setCartItems([]);
          setCartItemsCount(0);
        }
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.setItem('cart', '[]');
        setCartItems([]);
        setCartItemsCount(0);
      }
    }
  }, []);

  React.useEffect(() => {
    const handleUpdateHeader = (event: CustomEvent) => {
      // For ticketing page
      setEventTitle(event.detail.title);
      setShowBackButton(event.detail.showBackButton || false);
      setOnBackHandler(() => event.detail.onBack);
      setScheduleHeader(null); // Clear schedule header when on ticketing
    };

    const handleScheduleHeaderUpdate = (event: CustomEvent) => {
      setScheduleHeader(event.detail);
      setShowBackButton(false); // No back button for schedule
      setEventTitle(''); // Clear ticketing title
    };

    const handleWatchHeaderUpdate = (event: CustomEvent) => {
      setScheduleHeader(event.detail);
      setShowBackButton(false); // No back button for watch
      setEventTitle(''); // Clear ticketing title
    };

    const handleResetHeader = () => {
      setScheduleHeader(null);
      setEventTitle('3ICE Arena Selection');
      setShowBackButton(false);
    };

    const handleCartUpdate = (event: CustomEvent) => {
      try {
        const cartData = localStorage.getItem('cart');
        if (cartData) {
          const parsed = JSON.parse(cartData);
          const savedCart = Array.isArray(parsed) ? parsed : [];
          setCartItems(savedCart);
          setCartItemsCount(event.detail.count);
        } else {
          setCartItems([]);
          setCartItemsCount(0);
        }
        
        // Open cart if showCart flag is set
        if (event.detail.showCart) {
          setShowCart(true);
        }
      } catch (error) {
        console.error('Error updating cart:', error);
        localStorage.setItem('cart', '[]');
        setCartItems([]);
        setCartItemsCount(0);
      }
    };

    window.addEventListener('updateHeader', handleUpdateHeader as EventListener);
    window.addEventListener('scheduleHeaderUpdate', handleScheduleHeaderUpdate as EventListener);
    window.addEventListener('watchHeaderChange', handleWatchHeaderUpdate as EventListener);
    window.addEventListener('resetHeader', handleResetHeader as EventListener);
    window.addEventListener('cartUpdate', handleCartUpdate as EventListener);
    
    return () => {
      window.removeEventListener('updateHeader', handleUpdateHeader as EventListener);
      window.removeEventListener('scheduleHeaderUpdate', handleScheduleHeaderUpdate as EventListener);
      window.removeEventListener('watchHeaderChange', handleWatchHeaderUpdate as EventListener);
      window.removeEventListener('resetHeader', handleResetHeader as EventListener);
      window.removeEventListener('cartUpdate', handleCartUpdate as EventListener);
    };
  }, []);

  return (
    <>
      {/* Left Sidebar - Always visible */}
      <div className="fixed top-0 left-0 h-full w-20 z-50 bg-black/98 backdrop-blur-md border-r border-[#4A9FD8]/20 flex flex-col">
        {/* Logo */}
        <div className="border-b border-[#4A9FD8]/20">
          <Link href="/" className="flex items-center justify-center h-[80px] p-4">
            <Image 
              src={getAssetPath('/logoSmall.png')}
              alt="3ICE Logo" 
              width={40} 
              height={40}
              className="w-auto h-10 object-contain"
            />
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center justify-center h-16 transition-all ${
                  isActive
                    ? 'text-[#4A9FD8] bg-[#4A9FD8]/10'
                    : 'text-gray-400 hover:text-[#4A9FD8]/70 hover:bg-[#4A9FD8]/5'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  animate={isActive ? { scale: [1, 1.15, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Icon 
                    size={26} 
                    stroke={isActive ? 2.5 : 1.5}
                    className="transition-all"
                    style={isActive ? { filter: 'drop-shadow(0 0 8px currentColor)' } : {}}
                  />
                </motion.div>
                
                {/* Active indicator */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 32, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 bg-[#4A9FD8] rounded-r" 
                    />
                  )}
                </AnimatePresence>
                
                {/* Tooltip on hover */}
                <div className="absolute left-full ml-2 px-3 py-2 bg-black/95 backdrop-blur-sm border border-[#4A9FD8]/30 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                  <span className="text-sm font-bold text-white">{item.name}</span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom branding - removed as logo is at top */}
        <div className="h-4"></div>
      </div>

      {/* Top Header */}
      <nav className="fixed top-0 left-20 right-0 z-40 bg-black/95 backdrop-blur-sm border-b border-[#4A9FD8]/20">
        <div className="flex items-center justify-between h-[80px] px-6">
          {/* Center - Logo & Event Info */}
          <div className="flex items-center flex-1">
            <Image 
              src={getAssetPath('/Logo.png')}
              alt="3ICE Logo" 
              width={120} 
              height={40}
              className="w-auto h-10 object-contain"
            />
            
            {/* Ticketing Header */}
            {pathname === '/ticketing' && !scheduleHeader && (
              <EventHeader 
                title={eventTitle}
                showBackButton={showBackButton}
                onBack={onBackHandler || undefined}
              />
            )}
            
            {/* Schedule/Shop/Watch/Matchup Header */}
            {scheduleHeader && (
              <div className="flex items-center gap-6 border-l border-gray-700 pl-4 ml-4">
                <div>
                  <h1 className="text-sm font-bold">
                    {scheduleHeader.title.includes('SCHEDULE') ? (
                      <>
                        <span className="text-white">SEASON </span>
                        <span className="text-[#4A9FD8]">SCHEDULE</span>
                      </>
                    ) : scheduleHeader.title.includes('WATCH') ? (
                      <>
                        <span className="text-[#4A9FD8]">WATCH</span>
                      </>
                    ) : scheduleHeader.title.includes('MATCHUP') ? (
                      <>
                        <span className="text-[#4A9FD8]">MATCHUP HUB</span>
                      </>
                    ) : scheduleHeader.title.includes('SHOP') ? (
                      <>
                        <span className="text-white">OFFICIAL </span>
                        <span className="text-[#4A9FD8]">SHOP</span>
                      </>
                    ) : (
                      <>
                        <span className="text-white">{scheduleHeader.title}</span>
                      </>
                    )}
                  </h1>
                  <p className="text-xs text-gray-400 mt-0.5">{scheduleHeader.subtitle}</p>
                </div>
                
                {scheduleHeader.stats && scheduleHeader.stats.length > 0 && (
                  <div className="flex items-center gap-4">
                    {scheduleHeader.stats.map((stat, idx) => (
                      <React.Fragment key={stat.label}>
                        {idx > 0 && <div className="h-8 w-px bg-[#4A9FD8]/30"></div>}
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-black text-[#4A9FD8] font-russo leading-none">{stat.value}</span>
                          <span className="text-[10px] text-gray-400 uppercase mt-0.5 tracking-wide">{stat.label}</span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right - Cart & Logout */}
          <div className="flex items-center gap-3">
            <motion.button
              onClick={() => setShowCart(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all group ${
                cartItemsCount > 0 
                  ? 'bg-gradient-to-r from-[#4A9FD8] to-[#3d8bc2] hover:from-[#5aafea] hover:to-[#4A9FD8] shadow-lg shadow-[#4A9FD8]/30' 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#4A9FD8]/50'
              }`}
            >
              <IconShoppingCart 
                size={22} 
                className={`transition-colors ${
                  cartItemsCount > 0 ? 'text-white' : 'text-gray-400 group-hover:text-[#4A9FD8]'
                }`} 
                stroke={1.5} 
              />
              <span className={`text-sm font-black transition-colors hidden sm:block ${
                cartItemsCount > 0 ? 'text-white' : 'text-gray-300 group-hover:text-white'
              }`}>
                Cart {cartItemsCount > 0 && `(${cartItemsCount})`}
              </span>
              <AnimatePresence mode="wait">
                {cartItemsCount > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"
                  />
                )}
              </AnimatePresence>
            </motion.button>
            
            <button
              onClick={() => console.log('Logout')}
              className="flex items-center gap-2 px-2 py-2 hover:opacity-80 transition-all group"
            >
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                Logout
              </span>
              <IconLogout size={18} className="text-gray-400 group-hover:text-white transition-colors" stroke={1.5} />
            </button>
          </div>
        </div>
      </nav>

      {/* Cart Modal */}
      <AnimatePresence>
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm" 
              onClick={() => setShowCart(false)} 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-gray-900 rounded-2xl border border-[#4A9FD8]/30 w-full max-w-5xl max-h-[85vh] overflow-hidden shadow-2xl"
            >
            <div className="p-6 border-b border-gray-800 flex items-center justify-between">
              <h2 className="text-2xl font-black flex items-center gap-3">
                <IconShoppingCart size={28} className="text-[#4A9FD8]" stroke={1.5} />
                Your Cart
                {cartItemsCount > 0 && (
                  <span className="text-sm font-normal text-gray-400">({cartItemsCount} items)</span>
                )}
              </h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <TablerX size={24} stroke={2} />
              </button>
            </div>
            
            {cartItemsCount === 0 ? (
              <div className="p-6">
                <div className="text-center py-12">
                  <IconShoppingCart size={64} className="text-gray-600 mx-auto mb-4" stroke={1.5} />
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                  <p className="text-gray-500 text-sm mt-2">Add tickets to get started</p>
                </div>
              </div>
            ) : (
              <div className="flex h-[70vh]">
                {/* Left - Cart Items */}
                <div className="flex-1 p-6 overflow-auto custom-scrollbar border-r border-gray-800">
                  <div id="cart-items-list" className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 flex items-start gap-3">
                      {item.type === 'merchandise' ? (
                        <>
                          {/* Merchandise Item */}
                          <div className="w-20 h-20 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image && (
                              <Image 
                                src={item.image} 
                                alt={item.name} 
                                width={80} 
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <LucideShoppingBag size={16} className="text-[#4A9FD8]" />
                              <h3 className="font-bold">{item.name}</h3>
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{item.team}</p>
                            <p className="text-lg font-black text-[#4A9FD8]">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Ticket Item */}
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Ticket size={20} className="text-[#4A9FD8]" />
                              <h3 className="font-bold text-lg">{item.section}</h3>
                            </div>
                            <p className="text-sm text-gray-400 mb-2">
                              Seats: {item.seats.join(', ')}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <span className="text-gray-400">{item.seats.length} × ${item.price}</span>
                              <span className="text-gray-400">Processing: $30</span>
                            </div>
                            <p className="text-xl font-black text-[#4A9FD8] mt-2">
                              ${item.total}
                            </p>
                          </div>
                        </>
                      )}
                      <button
                        onClick={() => {
                          const updatedCart = cartItems.filter((_, i) => i !== index);
                          setCartItems(updatedCart);
                          setCartItemsCount(updatedCart.length);
                          localStorage.setItem('cart', JSON.stringify(updatedCart));
                          
                          const event = new CustomEvent('cartUpdate', {
                            detail: { count: updatedCart.length }
                          });
                          window.dispatchEvent(event);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2 flex-shrink-0"
                        title="Remove from cart"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  </div>
                </div>

                {/* Right - Summary & Actions */}
                <div className="w-96 flex flex-col bg-gray-900/50">
                  <div className="flex-1 p-6 space-y-6">
                    {/* Order Summary */}
                    <div>
                      <h3 className="text-lg font-black mb-4 text-white">Order Summary</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Items ({cartItemsCount})</span>
                          <span className="text-white font-bold">
                            ${cartItems.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Processing Fee</span>
                          <span className="text-white font-bold">$30.00</span>
                        </div>
                        <div className="border-t border-gray-700 pt-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-black text-white">Total</span>
                            <span className="text-2xl font-black text-[#4A9FD8]">
                              ${(cartItems.reduce((sum, item) => sum + item.total, 0) + 30).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-gray-800 space-y-3">
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/30">
                      <Ticket size={20} />
                      Proceed to Checkout
                    </button>
                    <button
                      onClick={() => {
                        setCartItems([]);
                        setCartItemsCount(0);
                        localStorage.setItem('cart', '[]');
                        window.dispatchEvent(new CustomEvent('cartUpdate', { 
                          detail: { count: 0, showCart: false } 
                        }));
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white font-bold py-3 rounded-xl transition-all border border-white/10 hover:border-white/20 flex items-center justify-center gap-2"
                    >
                      <X size={20} />
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
