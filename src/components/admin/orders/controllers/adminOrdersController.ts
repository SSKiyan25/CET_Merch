import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { Order, fetchOrders, updateOrder } from "../models/adminOrdersModel.ts";

export const setup = () => {
  const order = ref<Order | null>(null);
  const orders = ref<Order[]>([]);

  onMounted(async () => {
    initFlowbite();
    orders.value = await fetchOrders();
  });

  const markAsPaid = async (order: Order) => {
    let updateData;

    if (order.paymentStatus === "paid") {
      updateData = {
        paymentStatus: "pending",
        orderStatus: "processing",
        purchaseDate: "",
      };
    } else {
      updateData = {
        paymentStatus: "paid",
        orderStatus: "done",
        purchaseDate: new Date().toISOString(),
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
    });

    // Refresh the orders
    orders.value = await fetchOrders();
  };

  return {
    orders,
    order,
    markAsPaid,
    declineOrder,
  };
};
