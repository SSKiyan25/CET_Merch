import { db } from "@/firebase/init.ts";
import { collection, query, where, orderBy, getDocs } from "firebase/firestore";
import { fetchUser } from "../models/userModel.ts";

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
