import { ref } from "vue";
import { auth } from "@/firebase/init";
import {
  fetchOrder as fetchOrderFromModel,
  fetchProductDetails,
  deleteProductFromCart,
} from "../models/confirmOrderModel";
import { DocumentData } from "firebase/firestore";

const order = ref<DocumentData | null | undefined>(null);
const loading = ref(true);
const userId = ref<string | null>(null);

auth.onAuthStateChanged((user) => {
  if (user) {
    userId.value = user.uid;
  } else {
    userId.value = null;
  }
});

export async function fetchOrderAndUpdate(orderId: string) {
  //console.log("Controller: ", orderId);
  loading.value = true;
  const newId = userId.value;
  if (typeof newId === "string") {
    try {
      const fetchedOrder = await fetchOrderFromModel(orderId);
      if (fetchedOrder) {
        const cart = (fetchedOrder as any).cart;
        if (cart) {
          // Fetch all product details concurrently
          const cartWithDetailsPromises = cart.map(async (item: any) => {
            const productDetails = await fetchProductDetails(item.productId);
            return { ...item, details: productDetails };
          });
          const cartWithDetails = await Promise.all(cartWithDetailsPromises);
          (fetchedOrder as any).cart = cartWithDetails;
        }
        order.value = fetchedOrder;
      }
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  }
  loading.value = false;
}

async function deleteProductController(index: number) {
  loading.value = true;
  try {
    if (!order.value) {
      console.error("Order is null or undefined");
      return;
    }
    if (index < 0 || index >= order.value.cart.length) {
      console.error("Invalid index");
      return;
    }

    const newCartArray = await deleteProductFromCart(order.value.id, index);

    // Fetch the product details for the new cart array
    const newCartWithDetails = [];
    for (let item of newCartArray) {
      const productDetails = await fetchProductDetails(item.productId);
      newCartWithDetails.push({ ...item, details: productDetails });
    }

    // Update order.value by creating a new object instead of directly manipulating it
    order.value = { ...order.value, cart: newCartWithDetails };
  } catch (error) {
    console.error("Error deleting document:", error);
  }
  loading.value = false;
}

export { order, loading, deleteProductController };
