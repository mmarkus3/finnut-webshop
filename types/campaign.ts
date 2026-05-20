export interface Campaign {
  id: string;
  code: string;
  products: { id: string; name: string; discountFixed?: number; discountPercentage?: number }[];
}