export interface Order {
  id?: string;
  status: 'draft' | 'pending' | 'placed' | 'sent';
  products: OrderProduct[];
  customer?: OrderCustomer;
  deliveryMethod?: string;
  discount?: string;
  returnUrl?: string;
  country: string;
}

export interface OrderProduct {
  id: string;
  name: string;
  amount: number;
}

export interface OrderCustomer {
  firstname: string;
  lastname: string;
  email: string;
  address_street: string;
  address_city: string;
  address_zip: string;
  phone: string;
}