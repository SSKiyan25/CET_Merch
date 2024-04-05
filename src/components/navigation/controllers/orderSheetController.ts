import { getOnQueueOrders, getProductById } from "../models/orderSheetModel.ts";

interface ProductData {
  id: string;
  name: string;
  category: string;
  faction: string;
}

interface cartData {
  productId: string;
  quantity: number;
  totalPrice: number;
  size: string;
}

interface cartDataWithProduct extends cartData {
  product: ProductData;
}

export interface orderData {
  orderNumber: number;
  userId: string;
  userName: string;
  userContactNumber: string;
  cart: cartData[];
  totalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus: string;
  dateOrdered: string;
  faction: string;
  id: string;
}

export interface orderDataWithProduct extends orderData {
  cart: cartDataWithProduct[];
}

export const getOnQueueOrdersController = async (): Promise<
  orderDataWithProduct[]
> => {
  const orders = await getOnQueueOrders();

  const ordersWithProductData: orderDataWithProduct[] = await Promise.all(
    orders.map(async (order) => {
      const cartWithProductData: cartDataWithProduct[] = await Promise.all(
        order.data.cart.map(
          async (cartItem: cartData): Promise<cartDataWithProduct> => {
            const product = await getProductById(cartItem.productId);
            return { ...cartItem, product };
          }
        )
      );

      return { ...order.data, cart: cartWithProductData, id: order.id };
    })
  );

  return ordersWithProductData;
};
