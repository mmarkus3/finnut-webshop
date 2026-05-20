export interface Campaign {
  id?: string;
  code?: string;
  name?: string;
  discountPercentage?: number;
  discountAmount?: number;
  [key: string]: unknown;
}
