import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/init.ts";

type orderData = {
  orderNumber: number;
  userId: string;
  userName: string;
  userContactNumber: string;
  cart: cartData[];
  totalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus: string;
  dateOrdered: string;
};

type cartData = {
  productId: string;
  quantity: number;
  totalPrice: number;
  size: string;
};

export const addToCart = async (newAddToCart: cartData) => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const userDoc = doc(db, "users", auth.currentUser.uid);
  let userData = (await getDoc(userDoc)).data();

  if (!userData) {
    throw new Error("User data not found");
  }

  // If the user doesn't have an orders field, add it
  if (!userData.orders) {
    userData.orders = [];
    await updateDoc(userDoc, { ...userData });
  }

  const orderCollection = collection(db, "userOrder");
  let orderDoc;
  let currentOrderData;

  if (
    userData.orders.length > 0 &&
    userData.orders[userData.orders.length - 1].status === "OnQueue"
  ) {
    orderDoc = doc(
      db,
      "userOrder",
      userData.orders[userData.orders.length - 1].userOrderID
    );
    currentOrderData = (await getDoc(orderDoc)).data() as orderData;
    currentOrderData.cart.push(newAddToCart);
    await updateDoc(orderDoc, { ...currentOrderData });
  } else {
    const orderCountSnapshot = await getDocs(orderCollection);
    const newOrder: orderData = {
      orderNumber: orderCountSnapshot.size + 1,
      userId: auth.currentUser.uid,
      userName: "",
      userContactNumber: "",
      cart: [newAddToCart],
      totalPrice: newAddToCart.totalPrice,
      paymentStatus: "",
      paymentMethod: "",
      orderStatus: "OnQueue",
      dateOrdered: new Date().toISOString(),
    };
    const newOrderDoc = await addDoc(orderCollection, newOrder);
    userData.orders.push({
      userOrderID: newOrderDoc.id,
      status: "OnQueue",
      paymentStatus: "pending",
    });
    await updateDoc(userDoc, { ...userData });
  }
};

export const getOnQueueOrder = async () => {
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
    const currentOrderData = (await getDoc(orderDoc)).data() as orderData;
    return { id: orderDoc.id, data: currentOrderData };
  } else {
    return 0;
  }
};
