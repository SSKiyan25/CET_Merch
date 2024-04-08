import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/init.ts";
import { ref } from "vue";

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
  product?: ProductData;
};

type ProductData = {
  id: string;
  name: string;
  category: string;
  faction: string;
};

export const getOnQueueOrders = () => {
  const onQueueOrders = ref<{ id: string; data: orderData }[]>([]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      const ordersCollection = collection(db, "userOrder");
      const userQuery = query(
        ordersCollection,
        where("orderStatus", "==", "OnQueue"),
        where("userId", "==", user.uid)
      );

      // Listen for real-time updates
      onSnapshot(userQuery, async (snapshot) => {
        const newOnQueueOrders: { id: string; data: orderData }[] = [];

        for (const doc of snapshot.docs) {
          const order = doc.data() as orderData;

          for (const cartItem of order.cart) {
            const product = await getProductById(cartItem.productId);
            cartItem.product = product;
          }

          newOnQueueOrders.push({ id: doc.id, data: order });
        }

        onQueueOrders.value = newOnQueueOrders;
      });
    }
  });

  return onQueueOrders;
};

export const getProductById = async (
  productId: string
): Promise<ProductData> => {
  const docRef = doc(db, "products", productId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as ProductData;
  } else {
    throw new Error("No such product!");
  }
};
