// types for our e-commerce app

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  stock: number;
  thumbnail: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

