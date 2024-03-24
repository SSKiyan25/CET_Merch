import { db, storage } from "@/firebase/init.ts";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
  deleteObject,
  listAll,
} from "firebase/storage";

export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const productSnapshot = await getDocs(productCollection);
  const products = productSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
};

export const fetchProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  const singleProductSnapshot = await getDoc(productRef);
  if (singleProductSnapshot.exists()) {
    return {
      id: singleProductSnapshot.id,
      ...singleProductSnapshot.data(),
    };
  }
  return null;
};

export const updateProduct = async (
  id: string,
  productData: any,
  coverPhotoFile: File | null
) => {
  const productRef = doc(db, "products", id);

  if (coverPhotoFile) {
    const storageReference = storageRef(
      storage,
      `products/${coverPhotoFile.name}`
    );
    const uploadTask = uploadBytesResumable(storageReference, coverPhotoFile);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // You can use this to display upload progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error(error);
          reject(error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          // Here you can update your product data with the URL of the uploaded image
          productData.coverPhotoUrl = downloadURL;
          resolve(downloadURL);
        }
      );
    });
  }

  await updateDoc(productRef, productData);

  // Fetch the updated product data
  const updatedProductSnapshot = await getDoc(productRef);
  if (updatedProductSnapshot.exists()) {
    return {
      id: updatedProductSnapshot.id,
      ...updatedProductSnapshot.data(),
    };
  }
  return null;
};

export const deleteProduct = async (id: string, productName: string) => {
  // Reference to the product folder in Storage
  const storageReference = storageRef(storage, `products/${productName}`);

  // List all files in the product folder
  const { items } = await listAll(storageReference);

  // Delete each file in the product folder
  for (const item of items) {
    try {
      await deleteObject(item);
    } catch (error) {
      console.error("Error deleting file:", error);
      throw error;
    }
  }

  // Delete the product document in Firestore
  const productRef = doc(db, "products", id);
  try {
    await deleteDoc(productRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};
