import { db, storage } from "@/firebase/init.ts";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";

export const fetchProducts = async () => {
  const productCollection = collection(db, "products");
  const q = query(productCollection, where("isArchived", "==", false));
  const productSnapshot = await getDocs(q);
  const products = productSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return data ? { id: doc.id, ...data } : null;
    })
    .filter(Boolean);
  return products;
};

export const fetchProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  const singleProductSnapshot = await getDoc(productRef);
  if (singleProductSnapshot.exists()) {
    const data = singleProductSnapshot.data();
    return data ? { id: singleProductSnapshot.id, ...data } : null;
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
    // Delete the existing cover photo from Firebase Storage
    if (productData.coverPhoto) {
      const coverPhotoRef = storageRef(storage, productData.coverPhoto);
      await deleteObject(coverPhotoRef);
    }

    // Upload the new cover photo to Firebase Storage
    const storageReference = storageRef(
      storage,
      `products/${productData.name}`
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

export const deleteProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  try {
    await updateDoc(productRef, { isArchived: true });
  } catch (error) {
    console.error("Error archiving document:", error);
    throw error;
  }
};
