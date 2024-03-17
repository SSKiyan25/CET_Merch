import { ref } from "vue";
import { db } from "@/firebase/init.ts";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
//import { useRoute } from "vue-router";

export const setup = () => {
  // const products = ref<any[]>([]);
  // const product = ref<any>(null);
  // const cart = ref<any[]>([]);
  // const route = useRoute();

  interface cartData {
    productId: string;
    userId: string;
    quantity: number;
    totalPrice: number;
    size: string;
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

    await addDoc(cartCollection, newAddToCart);
  };

  return { handleAddToCartSubmit, newAddToCartData };
};
