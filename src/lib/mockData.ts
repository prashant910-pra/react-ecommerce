import { Product } from '@/types';

export const mockProducts: Product[] = [
  { 
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 99.99,
    originalPrice: 129.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    category: 'Electronics',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    features: ['Active Noise Cancellation', '30-hour Battery', 'Wireless Charging', 'Premium Audio Quality']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    category: 'Electronics',
    description: 'Advanced fitness tracking with heart rate monitoring, GPS, and smart notifications.',
    rating: 4.7,
    reviewCount: 89,
    inStock: true,
    features: ['Heart Rate Monitor', 'GPS Tracking', 'Water Resistant', '7-day Battery']
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29.99,
    originalPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
    category: 'Clothing',
    description: 'Comfortable organic cotton t-shirt available in multiple colors and sizes.',
    rating: 4.3,
    reviewCount: 45,
    inStock: true,
    features: ['100% Organic Cotton', 'Pre-shrunk', 'Machine Washable', 'Eco-friendly']
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop',
    category: 'Photography',
    description: '85mm f/1.8 portrait lens for professional photography with exceptional image quality.',
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    features: ['f/1.8 Aperture', 'Professional Grade', 'Image Stabilization', 'Weather Sealed']
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop',
    category: 'Gaming',
    description: 'RGB backlit mechanical gaming keyboard with customizable switches and macro support.',
    rating: 4.6,
    reviewCount: 156,
    inStock: true,
    features: ['Mechanical Switches', 'RGB Backlighting', 'Programmable Macros', 'Anti-ghosting']
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop',
    category: 'Fitness',
    description: 'Non-slip yoga mat made from eco-friendly materials with excellent cushioning.',
    rating: 4.4,
    reviewCount: 73,
    inStock: false,
    features: ['Non-slip Surface', 'Eco-friendly', '6mm Thickness', 'Carry Strap Included']
  },
  {
    id: '7',
    name: 'Stainless Steel Water Bottle',
    price: 24.99,
    originalPrice: 34.99,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop',
    category: 'Lifestyle',
    description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours.',
    rating: 4.2,
    reviewCount: 91,
    inStock: true,
    features: ['24-hour Cold', '12-hour Hot', 'BPA Free', 'Leak Proof']
  },
  {
    id: '8',
    name: 'Wireless Phone Charger',
    price: 39.99,
    image: '/images/WirelessCharger.jpg',
    category: 'Electronics',
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    rating: 4.1,
    reviewCount: 34,
    inStock: true,
    features: ['Qi Compatible', 'Fast Charging', 'LED Indicator', 'Overcharge Protection']
  }
];

export const categories = [
  'All Categories',
  'Electronics',
  'Clothing',
  'Photography',
  'Gaming',
  'Fitness',
  'Lifestyle'
];