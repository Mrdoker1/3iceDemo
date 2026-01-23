import { useEffect } from 'react';
import ProductDetail from './ProductDetail';

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

const products: Product[] = [
  { id: '1', name: 'Minnesota Home Jersey', price: 89.99, category: 'Jerseys', team: 'Minnesota', image: '/jersey-minnesota.png' as string, description: 'Official Minnesota home jersey. Premium quality fabric with moisture-wicking technology. Features team logo and player customization options.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['White'], inStock: true, rating: 4.8, reviews: 124 },
  { id: '2', name: 'Buffalo Away Jersey', price: 89.99, category: 'Jerseys', team: 'Buffalo', image: '/jersey-buffalo.png' as string, description: 'Official Buffalo away jersey. High-performance fabric designed for comfort and durability. Show your team pride with authentic styling.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Blue'], inStock: true, rating: 4.9, reviews: 156 },
  { id: '3', name: '3ICE Championship Puck', price: 24.99, category: 'Collectibles', team: 'All Teams', image: '/jersey-minnesota.png' as string, description: 'Official 3ICE championship game puck. Perfect for collectors and fans. Authentic regulation size and weight.', inStock: true, rating: 4.7, reviews: 89 },
  { id: '4', name: 'Team Cap - Minnesota', price: 29.99, category: 'Headwear', team: 'Minnesota', image: '/jersey-minnesota.png' as string, description: 'Adjustable snapback cap featuring Minnesota team logo. One size fits most. Premium embroidery and comfortable fit.', colors: ['White', 'Black'], inStock: true, rating: 4.6, reviews: 67 },
  { id: '5', name: 'Team Cap - Buffalo', price: 29.99, category: 'Headwear', team: 'Buffalo', image: '/jersey-buffalo.png' as string, description: 'Adjustable snapback cap featuring Buffalo team logo. One size fits most. Premium embroidery and comfortable fit.', colors: ['Blue', 'Black'], inStock: true, rating: 4.5, reviews: 72 },
  { id: '6', name: '3ICE Logo Hoodie', price: 64.99, category: 'Apparel', team: 'All Teams', image: '/jersey-minnesota.png' as string, description: 'Comfortable pullover hoodie with 3ICE logo. Soft fleece interior, perfect for cold game days. Unisex sizing.', sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: ['Black', 'Gray', 'Navy'], inStock: true, rating: 4.7, reviews: 143 },
];

// Generate static params for all products
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Product not found</div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.team === product.team || p.category === product.category))
    .slice(0, 4);

  return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
