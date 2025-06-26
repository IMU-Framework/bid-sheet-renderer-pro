
export interface BidItem {
  id: string;
  name: string;
  specification?: string;
  quantity: number;
  unit: string;
  unitPrice: number;
}

export interface BidGroup {
  id: string;
  category: string;
  description?: string;
  items: BidItem[];
  subtotal: number;
}
