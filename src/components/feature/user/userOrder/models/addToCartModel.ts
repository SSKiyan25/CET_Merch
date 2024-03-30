import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
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
  faction: string;
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

  // Fetch the product data
  const productDoc = doc(db, "products", newAddToCart.productId);
  const productData = (await getDoc(productDoc)).data();

  if (!productData) {
    throw new Error("Product data not found");
  }

  // If the user doesn't have an orders field, add it
  if (!userData.orders) {
    userData.orders = [];
    await updateDoc(userDoc, { ...userData });
  }

  const orderCollection = collection(db, "userOrder");
  let orderDoc;
  let currentOrderData;

  // Check if the user has an order in queue
  const querySnapshot = await getDocs(
    query(
      orderCollection,
      where("orderStatus", "==", "OnQueue"),
      where("userId", "==", auth.currentUser.uid),
      where("faction", "==", productData.faction)
    )
  );

  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    orderDoc = doc(db, "userOrder", docSnapshot.id);
    currentOrderData = docSnapshot.data() as orderData;

    // Add the product to the cart
    currentOrderData.cart.push(newAddToCart);
    await updateDoc(orderDoc, { ...currentOrderData });
    return;
  }

  // If we reach this point, it means we need to create a new order
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
    faction: productData.faction,
    dateOrdered: new Date().toISOString(),
  };
  const newOrderDoc = await addDoc(orderCollection, newOrder);
  userData.orders.push({
    userOrderID: newOrderDoc.id,
    status: "OnQueue",
    paymentStatus: "pending",
  });
  await updateDoc(userDoc, { ...userData });
};

export const getOnQueueOrders = async (): Promise<
  { id: string; data: orderData }[]
> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const onQueueOrders: { id: string; data: orderData }[] = [];

  // Query the userOrder collection for "OnQueue" orders of the current user
  const querySnapshot = await getDocs(
    query(
      collection(db, "userOrder"),
      where("orderStatus", "==", "OnQueue"),
      where("userId", "==", auth.currentUser.uid)
    )
  );

  querySnapshot.forEach((doc) => {
    onQueueOrders.push({ id: doc.id, data: doc.data() as orderData });
  });

  return onQueueOrders;
};
