import { onMounted, ref } from "vue";
import { storage } from "@/firebase/init.ts";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";
import { initFlowbite } from "flowbite";

export const setup = () => {
  const image = ref<File | null>(null);

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

  const uploadFeaturedImage = () => {
    if (image.value) {
      const storageReference = storageRef(
        storage,
        "gs://csshoppee-76342.appspot.com/featured/" + image.value.name
      );
      const blob = image.value.slice(0, image.value.size, image.value.type);
      uploadBytes(storageReference, blob)
        .then(() => {
          console.log("Image uploaded successfully");
        })
        .catch((error) => {
          console.error("Error uploading image: ", error);
        });
    }
  };
  const imageUrls = ref<string[]>([]);

  const fetchImages = async () => {
    const storageReference = storageRef(
      storage,
      "gs://csshoppee-76342.appspot.com/featured"
    );
    const res = await listAll(storageReference);
    const urls = await Promise.all(
      res.items.map((item) => getDownloadURL(item))
    );
    imageUrls.value = urls;
  };

  const deleteFeaturedImage = async (url: string) => {
    try {
      const storageReference = storageRef(storage, url);
      await deleteObject(storageReference);
      // Remove the URL from the imageUrls array
      imageUrls.value = imageUrls.value.filter((imageUrl) => imageUrl !== url);
      console.log("Image deleted successfully");
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  onMounted(() => {
    initFlowbite();
    fetchImages();
  });

  return {
    image,
    onFileChange,
    uploadFeaturedImage,
    imageUrls,
    deleteFeaturedImage,
  };
};
