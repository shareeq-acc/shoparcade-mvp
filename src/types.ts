export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  category: string;
  tag?: 'New' | 'Best Seller' | 'Popular' | 'Limited';
  isAvailable: boolean;
  type?: 'flowers' | 'cakes' | 'sweets' | 'baskets' | 'other';
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
  itemCount: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWrapper?: string;
  greetingCardText?: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}
