import { getDoc, doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/firebase/init.ts";

export async function fetchOrder(orderId?: string) {
  if (orderId) {
    const orderDoc = doc(db, "userOrder", orderId);
    const orderData = (await getDoc(orderDoc)).data();
    return { id: orderDoc.id, ...orderData };
  } else {
    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const userDoc = doc(db, "users", auth.currentUser.uid);
    const userData = (await getDoc(userDoc)).data();

    if (!userData) {
      throw new Error("User data not found");
    }

    if (
      userData.orders &&
      userData.orders.length > 0 &&
      userData.orders[userData.orders.length - 1].status === "OnQueue"
    ) {
      const orderDoc = doc(
        db,
        "userOrder",
        userData.orders[userData.orders.length - 1].userOrderID
      );
      const currentOrderData = (await getDoc(orderDoc)).data();
      return { id: orderDoc.id, ...currentOrderData };
    } else {
      throw new Error("No order in queue");
    }
  }
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

  const newCartArray = orderData.cart.filter(
    (_: any, itemIndex: number) => itemIndex !== index
  );

  await updateDoc(orderDocRef, {
    cart: newCartArray,
  });

  return newCartArray;
}
