import { db, storage } from "@/firebase/init.ts";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  getDoc,
  query,
  where,
  startAfter,
  limit,
  orderBy,
  DocumentSnapshot,
} from "firebase/firestore";
import {
  uploadBytesResumable,
  getDownloadURL,
  ref as storageRef,
  deleteObject,
} from "firebase/storage";

export const fetchProducts = async (
  faction: string,
  startAfterDoc: DocumentSnapshot | null = null,
  limitCount = 5
) => {
  const productCollection = collection(db, "products");
  let q = query(
    productCollection,
    where("isArchived", "==", false),
    where("faction", "==", faction),
    orderBy("name"),
    limit(limitCount)
  );

  if (startAfterDoc) {
    q = query(q, startAfter(startAfterDoc));
  }

  const productSnapshot = await getDocs(q);
  const products = productSnapshot.docs
    .map((doc) => {
      const data = doc.data();
      return data ? { id: doc.id, ...data } : null;
    })
    .filter(Boolean);

  const lastDoc = productSnapshot.docs[productSnapshot.docs.length - 1];

  // Query to get total number of products
  const totalQuery = query(productCollection, where("isArchived", "==", false));
  const totalSnapshot = await getDocs(totalQuery);
  const totalProducts = totalSnapshot.docs.length;

  return { products, lastDoc, totalProducts };
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

async function uploadFileToFirebase(file: File, productName: string) {
  const storageReference = storageRef(
    storage,
    `gs://csshoppee-76342.appspot.com/products/${productName}/${file.name}`
  );
  const uploadTask = uploadBytesResumable(storageReference, file);

  const downloadURL = await new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
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
        resolve(downloadURL);
      }
    );
  });

  return downloadURL;
}

export const updateProduct = async (
  id: string,
  productData: any,
  coverPhotoFile: File | null,
  additionalPhotosFiles: FileList | null
) => {
  const productRef = doc(db, "products", id);

  if (coverPhotoFile) {
    // Delete the existing cover photo from Firebase Storage
    if (productData.coverPhoto) {
      const coverPhotoRef = storageRef(storage, productData.coverPhoto);
      await deleteObject(coverPhotoRef);
    }

    // Create a new File object for the cover photo
    const newCoverPhoto = new File(
      [coverPhotoFile],
      `${productData.name}_coverPhoto`,
      { type: coverPhotoFile.type }
    );

    // Upload the new cover photo to Firebase Storage
    const storageReference = storageRef(
      storage,
      `gs://csshoppee-76342.appspot.com/products/${productData.name}/${newCoverPhoto.name}`
    );
    const uploadTask = uploadBytesResumable(storageReference, newCoverPhoto);

    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          productData.coverPhoto = downloadURL;
          resolve(downloadURL);
        }
      );
    });
  }

  if (additionalPhotosFiles) {
    // Create new File objects for the additional photos and upload them
    for (let i = 0; i < additionalPhotosFiles.length; i++) {
      const file = additionalPhotosFiles[i];
      const newPhotoName = `${productData.name}_Photo[${i}]${file.name.slice(
        file.name.lastIndexOf(".")
      )}`;
      const newPhotoFile = new File([file], newPhotoName, { type: file.type });
      const downloadURL = await uploadFileToFirebase(
        newPhotoFile,
        productData.name
      );
      productData.photos.push(downloadURL);
    }
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

export const deletePhoto = async (photoURL: string, productId: string) => {
  const photoRef = storageRef(storage, photoURL);
  await deleteObject(photoRef);

  // Get the product document
  const productRef = doc(db, "products", productId);
  const productSnapshot = await getDoc(productRef);
  const productData = productSnapshot.data();

  if (productData) {
    // Filter out the deleted photo URL
    const updatedPhotos = productData.photos.filter(
      (url: string) => url !== photoURL
    );

    // Update the product document
    await updateDoc(productRef, { photos: updatedPhotos });
  }
};
