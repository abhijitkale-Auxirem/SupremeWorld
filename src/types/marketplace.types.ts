export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  title: string;
  description: string;
  category: string;
  type: "digital" | "physical" | "service" | "subscription" | "luxury";
  price: number;
  currency: string;
  images?: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  salesCount: number;
  isAvailable: boolean;
  isFeatured: boolean;
  deliveryTime?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  productId: string;
  productTitle: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  currency: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "completed" | "cancelled" | "refunded";
  paymentStatus: "unpaid" | "paid" | "refunded";
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
