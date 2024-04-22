import { ref } from "vue";
import { auth } from "@/firebase/init";
import {
  fetchOrder as fetchOrderFromModel,
  fetchProductDetails,
  deleteProductFromCart,
  updateOrderInDatabase,
} from "../models/confirmOrderModel";
import { DocumentData } from "firebase/firestore";
import { db } from "@/firebase/init";
import { doc, updateDoc } from "firebase/firestore";

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

async function editOrder(index: number, newQuantity: number) {
  loading.value = true;
  try {
    if (!order.value) {
      console.error("Order is null or undefined");
      return;
    }
    if (!order.value.cart || index < 0 || index >= order.value.cart.length) {
      console.error("Invalid index or cart is undefined");
      return;
    }

    // Update the quantity of the product at the given index
    order.value.cart[index].quantity = newQuantity;

    // Check if cart is iterable
    if (!Array.isArray(order.value.cart)) {
      console.error("Cart is not iterable");
      return;
    }

    // Update the order in the database
    await updateOrderInDatabase(order.value);

    // Re-fetch the order data
    await fetchOrderAndUpdate(order.value.id);
  } catch (error) {
    console.error("Error updating order:", error);
  }
  loading.value = false;
}

const processOrder = async (orderId: string, router: any) => {
  // Update the totalPrice and cart of the order
  loading.value = true;
  if (order.value) {
    let overallTotalPrice = 0;
    let newCart = [];

    for (let i = 0; i < order.value.cart.length; i++) {
      let item = order.value.cart[i];
      let productDetails = await fetchProductDetails(item.productId);
      if (productDetails) {
        let sizeData = productDetails.sizes[item.size];
        let quantity = item.quantity;
        let totalPrice = 0;

        if (item.isPreOrdered) {
          if (!sizeData) {
            // If size doesn't match, get the last size and its last price
            const lastSizeName = Object.keys(productDetails.sizes).pop();
            if (lastSizeName) {
              sizeData = productDetails.sizes[lastSizeName];
            } else {
              continue;
            }
          }
          const price = sizeData[sizeData.length - 1].price;
          totalPrice = price * quantity;
        } else {
          for (let i = 0; i < sizeData.length; i++) {
            if (quantity <= sizeData[i].remaining_stocks) {
              totalPrice += sizeData[i].price * quantity;
              quantity = 0;
              break;
            } else {
              totalPrice += sizeData[i].price * sizeData[i].remaining_stocks;
              quantity -= sizeData[i].remaining_stocks;
            }
          }
        }

        // Create a new item object that only includes the necessary fields
        let newItem = {
          productId: item.productId,
          size: item.size,
          quantity: item.quantity,
          isPreOrdered: item.isPreOrdered,
          totalPrice: totalPrice,
        };
        newCart.push(newItem);
        overallTotalPrice += totalPrice;
      }
    }

    order.value.totalPrice = overallTotalPrice;
    // Update the entire cart and total price of the order in the database
    await updateDoc(doc(db, "userOrder", order.value.id), {
      cart: newCart,
      totalPrice: order.value.totalPrice,
    });
    console.log("Order updated successfully");
    console.log("Total Price: ", overallTotalPrice);
    // Navigate to the submit order page
  }

  router.push({ name: "submitOrder", params: { orderId: orderId } });
  loading.value = false;
};

export { order, editOrder, loading, deleteProductController, processOrder };
