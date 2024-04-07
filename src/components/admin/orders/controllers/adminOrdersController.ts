import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import {
  Order,
  fetchOrders,
  updateOrder,
  updateProduct,
  getProductDetails,
} from "../models/adminOrdersModel.ts";

export const setup = () => {
  const order = ref<Order | null>(null);
  const orders = ref<Order[]>([]);
  const loadingPage = ref(false);

  onMounted(async () => {
    loadingPage.value = true;
    initFlowbite();
    orders.value = await fetchOrders();
    loadingPage.value = false;
  });

  const markAsPaid = async (order: Order) => {
    let updateData;
    let productUpdateData;

    //If checkbox was unchecked
    if (order.paymentStatus === "paid") {
      updateData = {
        paymentStatus: "pending",
        orderStatus: "processing",
        purchaseDate: "",
      };

      // Iterate over the cart items and decrement the totalOrders, totalSales and stocks for each product
      for (const item of order.cart) {
        const productData = await getProductDetails(item.productId);
        if (productData) {
          const sizeIndex = productData.sizes.findIndex(
            (size: any) => size.value === item.size
          );
          if (sizeIndex !== -1) {
            productData.sizes[sizeIndex].stocks += item.quantity;
          }
          productUpdateData = {
            totalOrders: productData.totalOrders - item.quantity,
            totalSales: (productData.totalSales || 0) - item.totalPrice,
            sizes: productData.sizes,
          };
          await updateProduct(item.productId, productUpdateData);
        }
      }
    } else {
      updateData = {
        paymentStatus: "paid",
        orderStatus: "done",
        purchaseDate: new Date().toISOString(),
      };

      // Iterate over the cart items and increment the totalOrders, totalSales and stocks for each product
      for (const item of order.cart) {
        const productData = await getProductDetails(item.productId);
        if (productData) {
          const sizeIndex = productData.sizes.findIndex(
            (size: any) => size.value === item.size
          );
          if (sizeIndex !== -1) {
            productData.sizes[sizeIndex].stocks -= item.quantity;
          }
          productUpdateData = {
            totalOrders: productData.totalOrders + item.quantity,
            totalSales: (productData.totalSales || 0) + item.totalPrice,
            sizes: productData.sizes,
          };
          await updateProduct(item.productId, productUpdateData);
        }
      }
    }
    await updateOrder(order.id, updateData);
    orders.value = await fetchOrders();
  };

  const readyOrder = async (order: Order) => {
    let updateData;
    //If checkbox was unchecked
    if (order.orderStatus === "ready") {
      updateData = {
        orderStatus: "processing",
      };
    } else {
      updateData = {
        orderStatus: "ready",
      };
    }

    // Update the order
    await updateOrder(order.id, updateData);

    // Refresh the orders
    orders.value = await fetchOrders();
  };

  const declineOrder = async (order: Order) => {
    // Set the paymentStatus to "decline"
    await updateOrder(order.id, {
      paymentStatus: "decline",
      orderStatus: "decline",
    });

    // Refresh the orders
    orders.value = await fetchOrders();
  };

  return {
    orders,
    order,
    markAsPaid,
    declineOrder,
    readyOrder,
    loadingPage,
  };
};
