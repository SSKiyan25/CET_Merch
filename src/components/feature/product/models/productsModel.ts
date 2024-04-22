import { db, auth } from "@/firebase/init";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  updateDoc,
  setDoc,
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

export const fetchUser = async () => {
  if (!auth.currentUser) {
    console.error("No current user");
    return null;
  }

  try {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();

    if (!userData) {
      throw new Error("User data is null");
    }

    if (!userData.lastViewed) {
      userData.lastViewed = {};
    }

    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

export const updateProduct = async (product: Product) => {
  const productRef = doc(db, "products", product.id);
  await updateDoc(productRef, {
    views: product.views,
  });
};

export const updateUser = async (user: any) => {
  if (!auth.currentUser) {
    console.error("No current user");
    return;
  }
  const userRef = doc(db, "users", auth.currentUser.uid);
  await setDoc(
    userRef,
    {
      lastViewed: user.lastViewed,
    },
    { merge: true }
  );
};

export const fetchSellerProducts = async (productId: string) => {
  // Fetch the product to get its faction
  const productRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productRef);
  if (!productSnapshot.exists()) {
    console.error("Product not found");
    return null;
  }
  const productData = productSnapshot.data() as Product;

  // Fetch all products with the same faction
  const productCollection = collection(db, "products");
  const q = query(
    productCollection,
    where("faction", "==", productData.faction),
    where("isArchived", "==", false),
    where("isPublished", "==", true)
  );
  const productsSnapshot = await getDocs(q);
  return productsSnapshot.docs.map((doc: any) => ({
    id: doc.id,
    ...doc.data(),
  })) as Product[];
};
