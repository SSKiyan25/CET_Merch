import { db } from "@/firebase/init";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

export interface SizeType {
  dateAdded: string;
  price: number;
  reserved_stocks: number;
  stocks: number | string;
  remaining_stocks: number;
}

export interface Product {
  category: string;
  coverPhoto: string;
  dateCreated: string;
  description: string;
  faction: string;
  sizes: Record<string, SizeType[]>;
  id: string;
  isArchived: boolean;
  isPublished: boolean;
  lastModified: string;
  name: string;
  photos: string[];
  totalOrders: number;
  totalSales: number;
  views: number;
}

export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const productSnapshot = await getDocs(productCollection);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const fetchFeaturedProducts = async () => {
  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("isArchived", "==", false),
    where("isPublished", "==", true),
    where("faction", "==", "CET")
  );
  const productSnapshot = await getDocs(q);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const fetchPopularProducts = async () => {
  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("isArchived", "==", false),
    where("isPublished", "==", true),
    where("views", ">", 0),
    orderBy("views", "desc"),
    limit(8)
  );
  const productSnapshot = await getDocs(q);
  return productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};

export const fetchBestSellingProducts = async () => {
  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("isArchived", "==", false),
    where("isPublished", "==", true),
    where("totalSales", ">", 0),
    orderBy("totalSales", "desc"),
    limit(4)
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
