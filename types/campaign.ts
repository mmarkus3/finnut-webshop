export interface CampaignProductDiscount {
  id: string;
  name: string;
  discountPercentage?: number;
  discountFixed?: number;
}

export interface Campaign {
  code: string;
  products: CampaignProductDiscount[];
}
