import {
  collection,
  getDocs,
  query,
  where,
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

export const getOnQueueOrders = (): Promise<
  { id: string; data: orderData }[]
> => {
  return new Promise(async (resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const onQueueOrders: { id: string; data: orderData }[] = [];

        const querySnapshot = await getDocs(
          query(
            collection(db, "userOrder"),
            where("orderStatus", "==", "OnQueue"),
            where("userId", "==", user.uid)
          )
        );

        for (const doc of querySnapshot.docs) {
          const order = doc.data() as orderData;

          for (const cartItem of order.cart) {
            const product = await getProductById(cartItem.productId);
            cartItem.product = product;
          }

          onQueueOrders.push({ id: doc.id, data: order });
        }

        resolve(onQueueOrders);
      } else {
        reject(new Error("User not authenticated"));
      }
    });
  });
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
