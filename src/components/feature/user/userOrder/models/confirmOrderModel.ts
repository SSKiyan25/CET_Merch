import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase/init";

export async function fetchOrder(orderId: string) {
  //console.log("Model: ", orderId);
  if (!orderId) {
    throw new Error("Order ID is required");
  }

  const orderDoc = doc(db, "userOrder", orderId);
  const orderData = (await getDoc(orderDoc)).data();

  if (!orderData) {
    throw new Error("Order not found");
  }
  //console.log("Model: ", orderData);
  if (orderData.orderStatus !== "OnQueue") {
    throw new Error("Order is not OnQueue");
  }

  return { id: orderDoc.id, ...orderData };
}

export async function fetchProductDetails(productId: string) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("No such document");
  }
}

export async function deleteProductFromCart(orderId: string, index: number) {
  const orderDocRef = doc(db, "userOrder", orderId);
  const orderData = (await getDoc(orderDocRef)).data();

  if (!orderData || !orderData.cart) {
    throw new Error("Order or cart not found");
  }

  if (index < 0 || index >= orderData.cart.length) {
    throw new Error("Invalid index");
  }

  // If there's only one item in the cart, delete the entire document
  if (orderData.cart.length === 1) {
    await deleteDoc(orderDocRef);
    return [];
  }

  const newCartArray = orderData.cart.filter(
    (_: any, itemIndex: number) => itemIndex !== index
  );

  await updateDoc(orderDocRef, {
    cart: newCartArray,
  });

  return newCartArray;
}

export async function updateOrderInDatabase(order: any) {
  const orderDocRef = doc(db, "userOrder", order.id);

  // Update the order in the database
  await updateDoc(orderDocRef, {
    cart: order.cart,
  });

  // Return the updated order
  return order;
}

export const updateOrderInDatabaseAfterConfirm = async (order: any) => {
  const orderRef = doc(db, "userOrder", order.id);
  await updateDoc(orderRef, {
    totalPrice: order.totalPrice,
  });
  return order;
};
