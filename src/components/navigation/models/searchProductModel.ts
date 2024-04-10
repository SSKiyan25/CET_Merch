import { db } from "@/firebase/init";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  isPublished: boolean;
  category: string;
  coverPhoto: string;
  dateCreated: string;
  faction: string;
  isArchived: boolean;
  lastModified: string;
  photos: string[];
  price: {
    dateCreated: string;
    discountedPrice: number;
    originalPrice: number;
  }[];
  sizes: { stocks: number; value: string }[];
  status: string;
  totalOrders: number;
  views: number;
}

export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("isArchived", "==", false),
    where("isPublished", "==", true)
  );
  const productSnapshot = await getDocs(q);
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
