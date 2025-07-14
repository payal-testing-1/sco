export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  barcode: string;
  category: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  scannedAt: Date;
}

export interface ScanResult {
  barcode: string;
  product?: Product;
  timestamp: Date;
}