import {
  fetchUserOrders,
  fetchProduct,
  cancelUserOrder,
} from "../models/userModel";

export const getUserOrders = async () => {
  const orders = await fetchUserOrders();

  // Fetch product details for each order
  for (let order of orders) {
    for (let item of order.cart) {
      const product = await fetchProduct(item.productId);
      item.productDetails = product;
    }
    order.id = order.id;
    //console.log("Controller order id: ", order.id);
  }

  return orders;
};

export const cancelOrder = async (order: any) => {
  await cancelUserOrder(order);
};
