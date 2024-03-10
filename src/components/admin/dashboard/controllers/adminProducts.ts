import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
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
import { useRouter, useRoute } from "vue-router";

export const setup = () => {
  const router = useRouter();
  const route = useRoute();
  const products = ref<any[]>([]);
  const product = ref<any>(null);

  let coverPhotoFile = ref<File | null>(null);

  onMounted(async () => {
    initFlowbite();

    const productCollection = collection(db, "products");
    const productSnapshot = await getDocs(productCollection);
    products.value = productSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Check if route has id parameter
    if (route.params.id) {
      const id = route.params.id as string;
      const productRef = doc(db, "products", id);
      const singleProductSnapshot = await getDoc(productRef);
      if (singleProductSnapshot.exists()) {
        product.value = {
          id: singleProductSnapshot.id,
          ...singleProductSnapshot.data(),
        };
      }
    }
  });

  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    coverPhotoFile.value = file;
  };

  const editProduct = async (id: string, productData: any) => {
    const productRef = doc(db, "products", id);

    if (coverPhotoFile.value) {
      const storageReference = storageRef(
        storage,
        `products/${coverPhotoFile.value.name}`
      );
      const uploadTask = uploadBytesResumable(
        storageReference,
        coverPhotoFile.value
      );

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
      product.value = {
        id: updatedProductSnapshot.id,
        ...updatedProductSnapshot.data(),
      };
    }

    router.push({ name: "adminEditProduct", params: { id } });
  };

  const deleteProduct = async (id: string, productName: string) => {
    // Reference to the product folder in Storage
    const storageReference = storageRef(storage, `products/${productName}`);

    // List all files in the product folder
    const { items } = await listAll(storageReference);

    // Delete each file in the product folder
    for (const item of items) {
      await deleteObject(item).catch((error) => {
        console.error("Error deleting file:", error);
      });
    }

    // Delete the product document in Firestore
    const productRef = doc(db, "products", id);
    await deleteDoc(productRef).catch((error) => {
      console.error("Error deleting document:", error);
    });

    // Remove the product from the products array
    products.value = products.value.filter((product) => product.id !== id);
  };

  return { products, product, editProduct, handleFileUpload, deleteProduct };
};
