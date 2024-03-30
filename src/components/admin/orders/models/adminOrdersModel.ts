import { db, auth } from "@/firebase/init.ts";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

export interface Order {
  id: string;
  cart: any[];
  dateOrdered: string;
  orderNumber: number;
  orderRefNum: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalPrice: number;
  userContactNumber: string;
  userEmailAddress: string;
  userId: string;
  userName: string;
  studentId: string;
  showDetails?: boolean;
  purchaseDate?: string;
}

export const getProductDetails = async (productId: string) => {
  const productDoc = doc(db, "products", productId);
  const productSnapshot = await getDoc(productDoc);
  return productSnapshot.exists() ? productSnapshot.data() : {};
};

export const fetchOrders = async () => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  // Fetch the current user's data
  const userDoc = doc(db, "users", auth.currentUser.uid);
  const userData = (await getDoc(userDoc)).data();

  if (!userData) {
    throw new Error("User data not found");
  }

  const ordersCollection = collection(db, "userOrder");
  let querySnapshot;

  if (userData.isAdmin) {
    // If the user is an admin, fetch all orders with status "processing" or "done"
    querySnapshot = await getDocs(
      query(
        ordersCollection,
        where("orderStatus", "in", ["processing", "done"])
      )
    );
  } else {
    // If the user is not an admin, fetch only orders with status "processing" or "done" and matching faction
    querySnapshot = await getDocs(
      query(
        ordersCollection,
        where("faction", "==", userData.faction),
        where("orderStatus", "in", ["processing", "done"])
      )
    );
  }

  return await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const orderData = doc.data() as Order;
      orderData.cart = await Promise.all(
        orderData.cart.map(async (product: any) => {
          product.details = await getProductDetails(product.productId);
          return product;
        })
      );
      return {
        ...orderData,
        id: doc.id,
        showDetails: false,
      };
    })
  );
};

export const updateOrder = async (
  orderId: string,
  updateData: Partial<Order>
) => {
  const orderDoc = doc(db, "userOrder", orderId);
  await updateDoc(orderDoc, updateData);
};
