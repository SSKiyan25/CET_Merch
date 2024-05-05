import { db } from "@/firebase/init";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { fetchUser } from "../models/userModel";

export interface Seller {
  contactEmail: string;
  phoneNumber: string;
  faction: string;
  fbLink: string;
  role: string;
}

export const fetchSellerProducts = async () => {
  const productCollection = collection(db, "products");
  let q;

  const userData = await fetchUser();
  if (!userData) {
    console.error("No user data found");
    return;
  }
  // If the user is a seller
  if (userData.faction === "all") {
    q = query(
      productCollection,
      where("isArchived", "==", false),
      orderBy("name")
    );
  } else {
    q = query(
      productCollection,
      where("isArchived", "==", false),
      where("faction", "==", userData.faction),
      orderBy("name")
    );
  }

  const productSnapshot = await getDocs(q);
  const products = productSnapshot.docs.map((doc) => {
    const data = doc.data();
    return data ? { id: doc.id, ...data } : null;
  });

  return products;
};

export const fetchSellers = async (): Promise<Seller[]> => {
  const userCollection = collection(db, "users");
  const q = query(userCollection, where("role", "==", "seller"));

  const userSnapshot = await getDocs(q);
  const sellers = userSnapshot.docs.map((doc) => {
    const data = doc.data() as Seller;
    return data ? { id: doc.id, ...data } : null;
  });

  return sellers.filter(Boolean) as Seller[];
};
