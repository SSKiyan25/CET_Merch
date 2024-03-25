import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import { Order, fetchOrders } from "../models/adminOrdersModel.ts";

export const setup = () => {
  const order = ref<Order | null>(null);
  const orders = ref<Order[]>([]);

  onMounted(async () => {
    initFlowbite();
    orders.value = await fetchOrders();
  });

  return {
    orders,
    order,
  };
};
