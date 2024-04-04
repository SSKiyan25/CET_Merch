import { fetchUserOrders, fetchProduct } from "../models/userModel.ts";

export const getUserOrders = async () => {
  const orders = await fetchUserOrders();

  // Fetch product details for each order
  for (let order of orders) {
    for (let item of order.cart) {
      const product = await fetchProduct(item.productId);
      item.productDetails = product;
    }
  }

  return orders;
};
