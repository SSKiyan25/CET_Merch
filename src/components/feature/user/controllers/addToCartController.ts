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

export const setup = () => {
  interface cartData {
    productId: string;
    userId: string;
    quantity: number;
    totalPrice: number;
    size: string;
  }

  interface orderData {
    orderNumber: number;
    userId: string;
    userName: string;
    userContactNumber: string;
    products: cartData[]; //products in the cart
    totalPrice: number;
    paymentStatus: string;
    paymentMethod: string;
    orderStatus: string;
    dateOrdered: string;
  }

  const newAddToCartData = ref<cartData>({
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
        const orderData = orderDoc.data() as orderData;
        if (orderData.products) {
          orderData.products.push(newAddToCart);
        } else {
          orderData.products = [newAddToCart];
        }
        await updateDoc(orderDoc.ref, { ...orderData });
      } else {
        // If no order is on queue, create a new one
        const orderCountSnapshot = await getDocs(orderCollection);
        const newOrder: orderData = {
          orderNumber: orderCountSnapshot.size + 1,
          userId: auth.currentUser.uid,
          userName: "", // Update this accordingly
          userContactNumber: "", // Update this accordingly
          products: [newAddToCart],
          totalPrice: newAddToCart.totalPrice,
          paymentStatus: "", // Update this accordingly
          paymentMethod: "", // Update this accordingly
          orderStatus: "OnQueue",
          dateOrdered: new Date().toISOString(), // Update this accordingly
        };
        await addDoc(orderCollection, newOrder);
      }
    }

    return docRef.id; // return the id of the newly added document
  };

  return { handleAddToCartSubmit, newAddToCartData };
};
