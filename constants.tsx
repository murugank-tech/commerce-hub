
import { Product } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Nebula Soundbar X1",
    price: 299.99,
    category: "Electronics",
    description: "Immersive 7.1 surround sound with wireless subwoofer and Bluetooth 5.2 connectivity.",
    image: "https://picsum.photos/seed/nebula/600/400",
    rating: 4.8
  },
  {
    id: 2,
    name: "Classic Denim Jacket",
    price: 89.00,
    category: "Apparel",
    description: "Timeless style made from 100% organic cotton. Durable and vintage-washed.",
    image: "https://picsum.photos/seed/jacket/600/400",
    rating: 4.5
  },
  {
    id: 3,
    name: "Minimalist Desk Lamp",
    price: 45.50,
    category: "Home",
    description: "Adjustable warmth and brightness settings with a sleek matte finish.",
    image: "https://picsum.photos/seed/lamp/600/400",
    rating: 4.2
  },
  {
    id: 4,
    name: "Titanium Smart Watch",
    price: 349.99,
    category: "Electronics",
    description: "ECG, blood oxygen monitoring, and 5-day battery life with an always-on display.",
    image: "https://picsum.photos/seed/watch/600/400",
    rating: 4.9
  },
  {
    id: 5,
    name: "Canvas Weekender Bag",
    price: 120.00,
    category: "Accessories",
    description: "Spacious and sturdy, perfect for short trips and daily commutes.",
    image: "https://picsum.photos/seed/bag/600/400",
    rating: 4.6
  },
  {
    id: 6,
    name: "Ergonomic Mesh Chair",
    price: 259.99,
    category: "Home",
    description: "Full lumbar support and breathable mesh for maximum comfort during long work hours.",
    image: "https://picsum.photos/seed/chair/600/400",
    rating: 4.7
  },
  {
    id: 7,
    name: "Polarized Retro Sunglasses",
    price: 55.00,
    category: "Accessories",
    description: "UV400 protection with a lightweight acetate frame.",
    image: "https://picsum.photos/seed/glasses/600/400",
    rating: 4.4
  },
  {
    id: 8,
    name: "Eco-Friendly Yoga Mat",
    price: 65.00,
    category: "Home",
    description: "Non-slip texture, biodegradable TPE material with 6mm cushioning.",
    image: "https://picsum.photos/seed/yoga/600/400",
    rating: 4.3
  }
];

export const CATEGORIES = ['All', 'Electronics', 'Apparel', 'Home', 'Accessories'];
