import { ref } from "vue";
import { db, auth } from "@/firebase/init.ts";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

interface cartData {
  cartId?: string;
  productId: string;
  userId: string;
  quantity: number;
  totalPrice: number;
  size: string;
}

export interface orderData {
  orderNumber: number;
  userId: string;
  userName: string;
  userContactNumber: string;
  products: cartData[];
  totalPrice: number;
  paymentStatus: string;
  paymentMethod: string;
  orderStatus: string;
  dateOrdered: string;
}

export const setup = () => {
  const newAddToCartData = ref<cartData>({
    cartId: "",
    productId: "",
    userId: "",
    quantity: 0,
    totalPrice: 0,
    size: "",
  });

  const handleAddToCartSubmit = async (newAddToCart: cartData) => {
    const cartCollection = collection(db, "userCart");
    const orderCollection = collection(db, "userOrder");

    const docRef = await addDoc(cartCollection, newAddToCart);
    const cartId = docRef.id;

    if (auth.currentUser) {
      const orderQuery = query(
        orderCollection,
        where("userId", "==", auth.currentUser.uid),
        where("orderStatus", "==", "OnQueue"),
        orderBy("dateOrdered", "desc"),
        limit(1)
      );

      const orderSnapshot = await getDocs(orderQuery);
      let orderDoc;

      if (!orderSnapshot.empty) {
        // If an order is on queue, add the product to it
        orderDoc = orderSnapshot.docs[0];
        const currentOrderData = orderDoc.data() as orderData;
        if (currentOrderData.products) {
          currentOrderData.products.push({ ...newAddToCart, cartId }); // Include the cartId
        } else {
          currentOrderData.products = [{ ...newAddToCart, cartId }]; // Include the cartId
        }
        await updateDoc(orderDoc.ref, { ...currentOrderData });
      } else {
        // If no order is on queue, create a new one
        const orderCountSnapshot = await getDocs(orderCollection);
        const newOrder: orderData = {
          orderNumber: orderCountSnapshot.size + 1,
          userId: auth.currentUser.uid,
          userName: "",
          userContactNumber: "",
          products: [{ ...newAddToCart, cartId }], // Include the cartId
          totalPrice: newAddToCart.totalPrice,
          paymentStatus: "",
          paymentMethod: "",
          orderStatus: "OnQueue",
          dateOrdered: new Date().toISOString(),
        };
        await addDoc(orderCollection, newOrder);
      }
    }
    return cartId;
  };
  return { handleAddToCartSubmit, newAddToCartData };
};

export const getOnQueueOrder = async () => {
  const orderCollection = collection(db, "userOrder");

  if (auth.currentUser) {
    const orderQuery = query(
      orderCollection,
      where("userId", "==", auth.currentUser.uid),
      where("orderStatus", "==", "OnQueue"),
      orderBy("dateOrdered", "desc"),
      limit(1)
    );

    const orderSnapshot = await getDocs(orderQuery);
    if (!orderSnapshot.empty) {
      const orderDoc = orderSnapshot.docs[0];
      const currentOrderData = orderDoc.data() as orderData;
      return { id: orderDoc.id, data: currentOrderData };
    }
  }
  return null;
};
