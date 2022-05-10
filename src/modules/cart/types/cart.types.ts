export interface CartTypes {
  cartId: string;
  products: Array<{
    id: string;
    amount: number;
    price: number;
    image: string;
  }>;
}
