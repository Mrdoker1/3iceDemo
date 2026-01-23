'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ShoppingBag, Filter, X, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { Accordion, Checkbox } from '@mantine/core';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  team: string;
  category: 'jersey' | 'hat' | 'hoodie' | 'tshirt' | 'accessories';
  image: string;
}

const teams = [
  'All Teams',
  '3ICE Minnesota',
  '3ICE Dallas',
  '3ICE Pittsburgh',
  '3ICE Boston',
  '3ICE Chicago',
  '3ICE Buffalo',
  '3ICE Tennessee',
  '3ICE NY/NJ',
];

const categories = [
  { id: 'all', name: 'All Items' },
  { id: 'jersey', name: 'Jerseys' },
  { id: 'hoodie', name: 'Hoodies' },
  { id: 'tshirt', name: 'T-Shirts' },
  { id: 'hat', name: 'Hats' },
  { id: 'accessories', name: 'Accessories' },
];

// Helper function to get jersey image
const getJerseyImage = (team: string, isAway: boolean = false) => {
  const teamName = team.split(' ').pop()?.toLowerCase();
  if (teamName === 'minnesota') {
    return '/jersey-minnesota.png';
  } else if (teamName === 'buffalo') {
    return '/jersey-buffalo.png';
  }
  return '/jersey-minnesota.png'; // fallback
};

const products: Product[] = [
  {
    id: '1',
    name: 'Home Jersey',
    price: 129.99,
    team: '3ICE Minnesota',
    category: 'jersey',
    image: '/jersey-minnesota.png',
  },
  {
    id: '2',
    name: 'Away Jersey',
    price: 129.99,
    team: '3ICE Minnesota',
    category: 'jersey',
    image: '/jersey-minnesota.png',
  },
  {
    id: '3',
    name: 'Team Snapback',
    price: 34.99,
    team: '3ICE Minnesota',
    category: 'hat',
    image: '/merch/hat1.jpg',
  },
  {
    id: '4',
    name: 'Champion Hoodie',
    price: 79.99,
    team: '3ICE Minnesota',
    category: 'hoodie',
    image: '/merch/hoodie1.jpg',
  },
  {
    id: '5',
    name: 'Home Jersey',
    price: 129.99,
    team: '3ICE Buffalo',
    category: 'jersey',
    image: '/jersey-buffalo.png',
  },
  {
    id: '6',
    name: 'Team Snapback',
    price: 34.99,
    team: '3ICE Dallas',
    category: 'hat',
    image: '/merch/hat2.jpg',
  },
  {
    id: '7',
    name: 'Performance Tee',
    price: 39.99,
    team: '3ICE Dallas',
    category: 'tshirt',
    image: '/merch/tshirt1.jpg',
  },
  {
    id: '8',
    name: 'Home Jersey',
    price: 129.99,
    team: '3ICE Pittsburgh',
    category: 'jersey',
    image: '/merch/jersey4.jpg',
  },
  {
    id: '9',
    name: 'Team Hoodie',
    price: 74.99,
    team: '3ICE Pittsburgh',
    category: 'hoodie',
    image: '/merch/hoodie2.jpg',
  },
  {
    id: '10',
    name: 'Team Beanie',
    price: 29.99,
    team: '3ICE Boston',
    category: 'hat',
    image: '/merch/hat3.jpg',
  },
  {
    id: '11',
    name: 'Home Jersey',
    price: 129.99,
    team: '3ICE Boston',
    category: 'jersey',
    image: '/merch/jersey5.jpg',
  },
  {
    id: '12',
    name: 'Fan Tee',
    price: 34.99,
    team: '3ICE Chicago',
    category: 'tshirt',
    image: '/merch/tshirt2.jpg',
  },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const teamParam = searchParams.get('team');

  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (teamParam) {
      setSelectedTeam(decodeURIComponent(teamParam));
    }
  }, [teamParam]);

  // Update header with shop info
  useEffect(() => {
    const event = new CustomEvent('scheduleHeaderUpdate', {
      detail: {
        title: 'OFFICIAL SHOP',
        subtitle: 'Rep your favorite team with authentic 3ICE merchandise',
        stats: [],
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
  }, []);

  const filteredProducts = products.filter((product) => {
    const teamMatch = selectedTeam === 'All Teams' || product.team === selectedTeam;
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    return teamMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Team Filter Banner */}
        {teamParam && (
          <div className="mb-8 bg-gradient-to-r from-[#4A9FD8]/20 to-transparent border-l-4 border-[#4A9FD8] rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">
                  GO <span className="text-[#4A9FD8]">{selectedTeam.split(' ').pop()?.toUpperCase()}</span>!
                </h2>
                <p className="text-gray-300">
                  Showing exclusive {selectedTeam} merchandise
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedTeam('All Teams');
                  window.history.pushState({}, '', '/shop');
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#0A0A0A] border border-[#4A9FD8]/20 rounded-xl p-6 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="text-[#4A9FD8]" size={20} />
                <h2 className="text-xl font-black text-white">FILTERS</h2>
              </div>

              <Accordion 
                defaultValue={['teams', 'categories']}
                multiple
                styles={{
                  item: {
                    backgroundColor: 'rgba(31, 41, 55, 0.3)',
                    border: '1px solid rgba(55, 65, 81, 1)',
                    borderRadius: '0.5rem',
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                  },
                  control: {
                    backgroundColor: 'transparent',
                    border: 'none',
                    padding: '0.5rem 0.75rem',
                    minHeight: '32px',
                    height: '32px',
                    '&:hover': {
                      backgroundColor: 'rgba(74, 159, 216, 0.05)',
                    },
                  },
                  label: {
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: '0.6875rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  },
                  chevron: {
                    color: '#4A9FD8',
                    width: '14px',
                    height: '14px',
                  },
                  content: {
                    padding: '0.5rem 0.75rem 0.75rem',
                    borderTop: '1px solid rgba(55, 65, 81, 0.5)',
                  },
                }}
              >
                {/* Teams */}
                <Accordion.Item value="teams">
                  <Accordion.Control>Teams</Accordion.Control>
                  <Accordion.Panel>
                    {teams.map((team) => (
                      <Checkbox
                        key={team}
                        label={team}
                        checked={selectedTeam === team}
                        onChange={() => setSelectedTeam(selectedTeam === team ? 'All Teams' : team)}
                        size="xs"
                        styles={{
                          root: {
                            padding: '0.375rem 0',
                            borderRadius: '0.25rem',
                            '&:hover': {
                              backgroundColor: 'rgba(74, 159, 216, 0.05)',
                            },
                          },
                          body: {
                            alignItems: 'center',
                          },
                          label: {
                            color: '#d1d5db',
                            fontSize: '0.8125rem',
                            paddingLeft: '0.5rem',
                            cursor: 'pointer',
                          },
                          input: {
                            cursor: 'pointer',
                            '&:checked': {
                              backgroundColor: '#4A9FD8',
                              borderColor: '#4A9FD8',
                            },
                          },
                        }}
                      />
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>

                {/* Categories */}
                <Accordion.Item value="categories">
                  <Accordion.Control>Categories</Accordion.Control>
                  <Accordion.Panel>
                    {categories.map((category) => (
                      <Checkbox
                        key={category.id}
                        label={category.name}
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(selectedCategory === category.id ? 'all' : category.id)}
                        size="xs"
                        styles={{
                          root: {
                            padding: '0.375rem 0',
                            borderRadius: '0.25rem',
                            '&:hover': {
                              backgroundColor: 'rgba(74, 159, 216, 0.05)',
                            },
                          },
                          body: {
                            alignItems: 'center',
                          },
                          label: {
                            color: '#d1d5db',
                            fontSize: '0.8125rem',
                            paddingLeft: '0.5rem',
                            cursor: 'pointer',
                          },
                          input: {
                            cursor: 'pointer',
                            '&:checked': {
                              backgroundColor: '#4A9FD8',
                              borderColor: '#4A9FD8',
                            },
                          },
                        }}
                      />
                    ))}
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full flex items-center justify-center gap-2 bg-[#4A9FD8] text-white font-bold py-3 px-6 rounded-lg"
            >
              <Filter size={20} />
              <span>Show Filters</span>
            </button>
          </div>

          {/* Mobile Filters Modal */}
          {showFilters && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div className="absolute inset-0 bg-black/90" onClick={() => setShowFilters(false)} />
              <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] border-t-2 border-[#4A9FD8] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-white">FILTERS</h2>
                  <button onClick={() => setShowFilters(false)}>
                    <X className="text-white" size={24} />
                  </button>
                </div>

                {/* Mobile Teams */}
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Teams
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {teams.map((team) => (
                      <button
                        key={team}
                        onClick={() => {
                          setSelectedTeam(team);
                          setShowFilters(false);
                        }}
                        className={`text-center px-3 py-2 rounded-lg transition-all ${
                          selectedTeam === team
                            ? 'bg-[#4A9FD8] text-white font-bold'
                            : 'text-gray-300 bg-[#1a4d7a]/20 hover:bg-[#4A9FD8]/10'
                        }`}
                      >
                        {team.replace('3ICE ', '')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Mobile Categories */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                    Categories
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setShowFilters(false);
                        }}
                        className={`text-center px-3 py-2 rounded-lg transition-all ${
                          selectedCategory === category.id
                            ? 'bg-[#4A9FD8] text-white font-bold'
                            : 'text-gray-300 bg-[#1a4d7a]/20 hover:bg-[#4A9FD8]/10'
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-400">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <ShoppingBag className="mx-auto text-gray-600 mb-4" size={64} />
                <h3 className="text-2xl font-bold text-gray-400 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <Link href={`/shop/${product.id}`} key={product.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.2, 
                        delay: index * 0.02,
                        ease: "easeOut"
                      }}
                      whileHover={{ y: -8 }}
                      className="group bg-[#0A0A0A] border border-[#4A9FD8]/20 hover:border-[#4A9FD8] rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#4A9FD8]/20 cursor-pointer"
                    >
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-[#1a4d7a]/30 to-black relative overflow-hidden">
                      {product.category === 'jersey' ? (
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                          <Image
                            src={product.image}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="object-contain group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-4xl font-black text-white/10 mb-2">3ICE</div>
                            <div className="text-sm text-gray-600">{product.team.split(' ').pop()}</div>
                          </div>
                        </div>
                      )}
                      {/* Team Badge */}
                      <div className="absolute top-3 left-3 bg-[#4A9FD8] text-white text-xs font-bold px-3 py-1 rounded-full z-10">
                        {product.team.split(' ').pop()}
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="mb-2">
                        <span className="text-xs text-gray-400 uppercase tracking-wider">
                          {product.team}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#4A9FD8] transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-black text-[#4A9FD8]">
                          ${product.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Add to cart logic for shop items
                            const cartItem = {
                              id: `shop-${product.id}-${Date.now()}`,
                              type: 'merchandise',
                              name: product.name,
                              team: product.team,
                              category: product.category,
                              price: product.price,
                              quantity: 1,
                              total: product.price,
                              image: product.image
                            };
                            
                            // Dispatch cart update event
                            if (typeof window !== 'undefined') {
                              const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
                              existingCart.push(cartItem);
                              localStorage.setItem('cart', JSON.stringify(existingCart));
                              
                              const event = new CustomEvent('cartUpdate', {
                                detail: { count: existingCart.length, showCart: true }
                              });
                              window.dispatchEvent(event);
                            }
                          }}
                          className="bg-[#4A9FD8] hover:bg-[#3a8fc8] text-white font-bold py-2 px-4 rounded-lg transition-all flex items-center gap-2"
                        >
                          <ShoppingBag size={18} />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black text-[#4A9FD8] mb-4">3ICE</div>
          <p className="text-gray-400">Loading shop...</p>
        </div>
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
