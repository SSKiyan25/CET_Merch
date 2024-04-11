import { db } from "@/firebase/init";
import { getDoc, doc, DocumentData } from "firebase/firestore";

export async function fetchProduct(id: any): Promise<DocumentData | undefined> {
  //console.log("fetchProduct called with id: ", id);
  try {
    if (!id) {
      throw new Error("Product ID is undefined");
    }
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    //console.log("docSnap: ", docSnap);

    if (docSnap.exists()) {
      //console.log("Product data: ", docSnap.data());
      return docSnap.data();
    } else {
      throw new Error("No such document!");
    }
  } catch (error) {
    console.error("Fetch error: ", error);
  }
}
