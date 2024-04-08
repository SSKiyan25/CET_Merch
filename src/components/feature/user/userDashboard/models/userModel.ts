import { db, auth } from "@/firebase/init.ts";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

export const fetchUserOrders = async () => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  // Fetch the current user's orders
  const ordersCollection = collection(db, "userOrder");

  // Query where orderStatus is less than "OnQueue"
  const querySnapshot1 = await getDocs(
    query(
      ordersCollection,
      where("userId", "==", auth.currentUser.uid),
      where("orderStatus", "<", "OnQueue")
    )
  );

  // Query where orderStatus is greater than "OnQueue"
  const querySnapshot2 = await getDocs(
    query(
      ordersCollection,
      where("userId", "==", auth.currentUser.uid),
      where("orderStatus", ">", "OnQueue")
    )
  );

  // Convert the querySnapshots to arrays of orders and combine them
  const orders = [
    ...querySnapshot1.docs.map((doc) => doc.data()),
    ...querySnapshot2.docs.map((doc) => doc.data()),
  ];

  return orders;
};

export const fetchProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  const singleProductSnapshot = await getDoc(productRef);
  if (singleProductSnapshot.exists()) {
    const data = singleProductSnapshot.data();
    return data ? { id: singleProductSnapshot.id, ...data } : null;
  }
  return null;
};

export const cancelUserOrder = async (order: any) => {
  const q = query(
    collection(db, "userOrder"),
    where("orderRefNum", "==", order.orderRefNum)
  );
  const querySnapshot = await getDocs(q);
  console.log("Query Snapshot", querySnapshot.docs[0]);
  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const orderRef = docSnapshot.ref;
    console.log("Order Ref", orderRef);
    await updateDoc(orderRef, {
      orderStatus: "cancelled",
    });
  } else {
    console.error(
      `No document found with order reference number ${order.orderRefNum}`
    );
  }
};
