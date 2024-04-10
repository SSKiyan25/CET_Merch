import { getOnQueueOrders } from "../models/orderSheetModel";
import { ref, watch } from "vue";

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

export const getOnQueueOrdersController = () => {
  const onQueueOrders = getOnQueueOrders();
  const onQueueOrdersWithProduct = ref<orderDataWithProduct[] | null>(null);

  watch(onQueueOrders, (newOrders) => {
    if (newOrders) {
      const updatedOrdersWithProduct: orderDataWithProduct[] = [];

      newOrders.forEach((order: any) => {
        const cartWithProductData: cartDataWithProduct[] = (
          order.data.cart as cartDataWithProduct[]
        ).map((cartItem: cartDataWithProduct): cartDataWithProduct => {
          return { ...cartItem, product: cartItem.product };
        });

        updatedOrdersWithProduct.push({
          ...order.data,
          cart: cartWithProductData,
          id: order.id,
        });
      });

      onQueueOrdersWithProduct.value = updatedOrdersWithProduct;
    }
  });

  return onQueueOrdersWithProduct;
};
