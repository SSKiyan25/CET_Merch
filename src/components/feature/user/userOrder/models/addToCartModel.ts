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
import { db, auth } from "@/firebase/init";

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
  size?: string;
  isPreOrdered: boolean;
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
  const productSnapshot = await getDoc(productDoc);

  if (!productSnapshot.exists()) {
    throw new Error("Product data not found");
  }
  let productData = productSnapshot.data();
  const orderCollection = collection(db, "userOrder");

  // Check if the user has an order in queue
  const orderSnapshot = await getDocs(
    query(
      orderCollection,
      where("orderStatus", "==", "OnQueue"),
      where("userId", "==", auth.currentUser.uid),
      where("faction", "==", productData.faction)
    )
  );

  if (!orderSnapshot.empty) {
    // If an order exists, add the product to the existing order
    const existingOrder = orderSnapshot.docs[0];
    const existingOrderData = existingOrder.data();

    // Check if the product with the same size already exists in the cart
    const existingCartItemIndex = existingOrderData.cart.findIndex(
      (item: cartData) =>
        item.productId === newAddToCart.productId &&
        item.size === newAddToCart.size
    );

    if (existingCartItemIndex !== -1) {
      // If it does, add the quantity from the newAddToCart data to the existing one
      existingOrderData.cart[existingCartItemIndex].quantity +=
        newAddToCart.quantity;
    } else {
      // If it doesn't, add the newAddToCart data to the cart
      existingOrderData.cart.push(newAddToCart);
    }

    await updateDoc(doc(db, "userOrder", existingOrder.id), existingOrderData);
  } else {
    // If no order exists, create a new order
    const orderCountSnapshot = await getDocs(orderCollection);
    const newOrder: orderData = {
      orderNumber: orderCountSnapshot.size + 1,
      userId: auth.currentUser.uid,
      userName: "",
      userContactNumber: "",
      cart: [newAddToCart],
      totalPrice: 0,
      paymentStatus: "",
      paymentMethod: "",
      orderStatus: "OnQueue",
      faction: productData.faction,
      dateOrdered: new Date().toISOString(),
    };
    await addDoc(orderCollection, newOrder);
  }

  await updateDoc(productDoc, { ...productData });
};

export const getOnQueueOrders = async (): Promise<
  { id: string; data: orderData }[]
> => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  const onQueueOrders: { id: string; data: orderData }[] = [];

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
