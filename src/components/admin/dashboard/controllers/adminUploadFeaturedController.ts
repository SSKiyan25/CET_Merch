import { onMounted, ref } from "vue";
import { initFlowbite } from "flowbite";
import {
  uploadImage,
  fetchImages,
  deleteImage,
} from "../models/adminFeaturedModel.ts";
import { auth, db } from "@/firebase/init.ts";
import { getDoc, doc } from "firebase/firestore";

export const setup = () => {
  const image = ref<File | null>(null);
  const imageUrls = ref<string[]>([]);
  const isAdmin = ref(false);

  const onFileChange = (e: Event) => {
    const files = (e.target as HTMLInputElement).files;
    if (files) {
      const file = files[0];
      if (!file.type.startsWith("image/")) {
        alert("File is not an image.");
        console.error("File is not an image.");
        return;
      }
      image.value = file;
    }
  };

  const uploadFeaturedImage = async () => {
    if (image.value) {
      try {
        await uploadImage(image.value);
        console.log("Image uploaded successfully");
      } catch (error) {
        console.error("Error uploading image: ", error);
      }
    }
  };

  const fetchAllImages = async () => {
    if (isAdmin.value) {
      try {
        const urls = await fetchImages();
        imageUrls.value = urls;
      } catch (error) {
        console.error("Error fetching images: ", error);
      }
    }
  };

  const deleteFeaturedImage = async (url: string) => {
    try {
      await deleteImage(url);
      // Remove the URL from the imageUrls array
      imageUrls.value = imageUrls.value.filter((imageUrl) => imageUrl !== url);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  onMounted(async () => {
    initFlowbite();
    const user = auth.currentUser;
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        isAdmin.value = docSnap.data().isAdmin;
        if (isAdmin.value) {
          fetchAllImages();
        }
      }
    }
  });

  return {
    image,
    onFileChange,
    uploadFeaturedImage,
    imageUrls,
    deleteFeaturedImage,
    isAdmin,
  };
};
