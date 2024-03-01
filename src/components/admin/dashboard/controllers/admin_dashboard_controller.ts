import { ref, computed } from "vue";
import { auth, db, storage } from "@/firebase/init.ts";
import {
  uploadBytes,
  deleteObject,
  listAll,
  ref as storageRef,
} from "firebase/storage";

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

  return {
    image,
    onFileChange,
    uploadFeaturedImage,
  };
};
