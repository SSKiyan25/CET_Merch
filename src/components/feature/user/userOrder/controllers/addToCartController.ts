import { ref } from "vue";
import { addToCart, getOnQueueOrder } from "../models/addToCartModel.ts";

interface cartData {
  productId: string;
  quantity: number;
  totalPrice: number;
  size: string;
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
}

export const setup = () => {
  const newAddToCartData = ref<cartData>({
    productId: "",
    quantity: 0,
    totalPrice: 0,
    size: "",
  });

  const handleAddToCartSubmit = async (newAddToCart: cartData) => {
    console.log("New Add To Cart Data: ", newAddToCart);
    await addToCart(newAddToCart);
  };
  return { handleAddToCartSubmit, newAddToCartData };
};

export const getOnQueueOrderController = async () => {
  const order = await getOnQueueOrder();
  return order;
};
