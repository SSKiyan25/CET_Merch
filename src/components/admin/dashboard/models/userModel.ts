import { db, auth } from "@/firebase/init.ts";
import { doc, getDoc } from "firebase/firestore";

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

    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};
