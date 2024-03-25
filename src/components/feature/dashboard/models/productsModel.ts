import { db } from "@/firebase/init.ts";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  isPublished: boolean;
}

export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const productSnapshot = await getDocs(productCollection);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const fetchProductById = async (id: string) => {
  const productRef = doc(db, "products", id);
  const singleProductSnapshot = await getDoc(productRef);
  if (singleProductSnapshot.exists()) {
    return {
      id: singleProductSnapshot.id,
      ...singleProductSnapshot.data(),
    } as Product;
  }
  return null;
};
