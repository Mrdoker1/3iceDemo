'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Badge, NumberInput } from '@mantine/core';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Truck, Shield, RefreshCw } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  team: string;
  image: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  inStock?: boolean;
  rating?: number;
  reviews?: number;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes && product.sizes.length > 0 ? product.sizes[0] : null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0] : null
  );
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const cartItem = {
      id: `product-${product.id}-${Date.now()}`,
      type: 'product',
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.image,
      team: product.team,
      size: selectedSize,
      color: selectedColor,
    };

    window.dispatchEvent(new CustomEvent('addToCart', { detail: cartItem }));
    window.dispatchEvent(new CustomEvent('showCart'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/shop">
            <Button
              variant="subtle"
              leftSection={<ArrowLeft size={18} />}
              className="!text-gray-400 hover:!text-white mb-6"
            >
              Back to Shop
            </Button>
          </Link>
        </motion.div>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-[#4A9FD8]/10 to-transparent rounded-2xl p-8 border border-[#4A9FD8]/20 backdrop-blur-sm">
              <div className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Truck className="mx-auto mb-2 text-[#4A9FD8]" size={24} />
                <p className="text-xs text-gray-400">Free Shipping</p>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <Shield className="mx-auto mb-2 text-[#4A9FD8]" size={24} />
                <p className="text-xs text-gray-400">Authentic</p>
              </motion.div>
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 rounded-xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
              >
                <RefreshCw className="mx-auto mb-2 text-[#4A9FD8]" size={24} />
                <p className="text-xs text-gray-400">30-Day Return</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Category & Team */}
            <div className="flex gap-2 mb-4">
              <Badge className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">{product.category}</Badge>
              <Badge className="!bg-white/10 !text-white">{product.team}</Badge>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl font-black mb-4">{product.name}</h1>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating!) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="text-5xl font-black text-[#4A9FD8] mb-6">
              ${product.price}
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Size</label>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-lg border-2 font-bold transition-all ${
                        selectedSize === size
                          ? 'border-[#4A9FD8] bg-[#4A9FD8]/20 text-[#4A9FD8]'
                          : 'border-gray-700 text-gray-400 hover:border-[#4A9FD8]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold mb-3">Color</label>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-lg border-2 font-bold transition-all ${
                        selectedColor === color
                          ? 'border-[#4A9FD8] bg-[#4A9FD8]/20 text-[#4A9FD8]'
                          : 'border-gray-700 text-gray-400 hover:border-[#4A9FD8]/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <label htmlFor="product-quantity" className="block text-sm font-bold mb-3">Quantity</label>
              <NumberInput
                id="product-quantity"
                name="quantity"
                value={quantity}
                onChange={(val) => setQuantity(Number(val) || 1)}
                min={1}
                max={10}
                className="max-w-[120px]"
              />
            </div>

            {/* Add to Cart Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="xl"
                fullWidth
                leftSection={<ShoppingCart size={24} />}
                className="!bg-gradient-to-r !from-[#4A9FD8] !to-[#3a8fc8] hover:!from-[#3a8fc8] hover:!to-[#2a7fb8] !text-white font-black text-lg !h-16"
                onClick={handleAddToCart}
              >
                ADD TO CART - ${(product.price * quantity).toFixed(2)}
              </Button>
            </motion.div>

            {/* Stock Status */}
            <div className="mt-4 text-center">
              {product.inStock ? (
                <p className="text-green-400 text-sm">✓ In Stock - Ships within 24 hours</p>
              ) : (
                <p className="text-red-400 text-sm">Out of Stock</p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-black mb-8">
            <span className="text-white">YOU MAY ALSO </span>
            <span className="text-[#4A9FD8]">LIKE</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <Link href={`/shop/${relatedProduct.id}`} key={relatedProduct.id}>
                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-[#4A9FD8]/20 hover:border-[#4A9FD8]/50 rounded-xl overflow-hidden transition-all group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className="relative h-48 bg-gradient-to-br from-[#1a4d7a] to-[#0A0A0A]">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                      unoptimized
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-white mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#4A9FD8] font-black text-xl">${relatedProduct.price}</span>
                      <Badge size="sm" className="!bg-[#4A9FD8]/20 !text-[#4A9FD8]">{relatedProduct.team}</Badge>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
