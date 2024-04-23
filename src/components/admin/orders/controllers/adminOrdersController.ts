import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import {
  Order,
  fetchOrders,
  updateOrder,
  updateProduct,
  getProductDetails,
} from "../models/adminOrdersModel";

export const setup = () => {
  const order = ref<Order | null>(null);
  const orders = ref<Order[]>([]);
  const loadingPage = ref(false);
  const loadingCheckbox = ref(false);

  onMounted(async () => {
    loadingPage.value = true;
    initFlowbite();
    orders.value = await fetchOrders();
    loadingPage.value = false;
  });

  const markAsPaid = async (order: Order) => {
    loadingCheckbox.value = true;
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
          productUpdateData = {
            totalOrders: productData.totalOrders - item.quantity,
            totalSales: (productData.totalSales || 0) - item.totalPrice,
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
          productUpdateData = {
            totalOrders: productData.totalOrders + item.quantity,
            totalSales: (productData.totalSales || 0) + item.totalPrice,
          };
          await updateProduct(item.productId, productUpdateData);
        }
      }
    }
    await updateOrder(order.id, updateData);
    orders.value = await fetchOrders();
    loadingCheckbox.value = false;
  };

  const readyOrder = async (order: Order) => {
    loadingCheckbox.value = true;
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
    loadingCheckbox.value = false;
  };

  const declineOrder = async (order: Order, remarks: string) => {
    loadingPage.value = true;

    // Check if the order already has a remarks field
    if (!("remarks" in order)) {
      order.remarks = remarks;
    }

    // Set the paymentStatus to "decline" and update remarks
    await updateOrder(order.id, {
      paymentStatus: "declined",
      orderStatus: "declined",
      remarks: order.remarks,
    });

    // Iterate over the cart items and update the product sizes
    for (const item of order.cart) {
      // Skip if the item is pre-ordered
      if (item.isPreOrdered) continue;

      const productData = await getProductDetails(item.productId);
      if (productData) {
        if (item.size && productData.sizes[item.size]) {
          // Iterate over the size indices and update the remaining_stocks and reserved_stocks
          for (const [sizeIndex, quantity] of Object.entries(
            item.sizeIndices
          )) {
            const sizeData = productData.sizes[item.size][sizeIndex];
            if (sizeData) {
              sizeData.remaining_stocks += Number(quantity);
              sizeData.reserved_stocks -= Number(quantity);
            }
          }
        } else {
          // If the size is an empty string or "N/A", update the stocks and remaining_stocks of each index
          for (const [sizeIndex, quantity] of Object.entries(
            item.sizeIndices
          )) {
            const sizeData = productData.sizes["N/A"][sizeIndex];
            if (sizeData) {
              sizeData.remaining_stocks += Number(quantity);
              sizeData.reserved_stocks -= Number(quantity);
            }
          }
        }
        await updateProduct(item.productId, productData);
      }
    }

    // Refresh the orders
    orders.value = await fetchOrders();
    loadingPage.value = false;
  };

  return {
    orders,
    order,
    markAsPaid,
    declineOrder,
    readyOrder,
    loadingPage,
    loadingCheckbox,
  };
};
