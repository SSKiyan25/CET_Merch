import { storage } from "@/firebase/init";
import {
  uploadBytes,
  ref as storageRef,
  getDownloadURL,
  listAll,
  deleteObject,
} from "firebase/storage";

export const uploadImage = async (image: File) => {
  const storageReference = storageRef(
    storage,
    "gs://csshoppee-76342.appspot.com/featured/" + image.name
  );
  const blob = image.slice(0, image.size, image.type);
  await uploadBytes(storageReference, blob);
};

export const fetchImages = async () => {
  const storageReference = storageRef(
    storage,
    "gs://csshoppee-76342.appspot.com/featured"
  );
  const res = await listAll(storageReference);
  const urls = await Promise.all(res.items.map((item) => getDownloadURL(item)));
  return urls;
};

export const deleteImage = async (url: string) => {
  const storageReference = storageRef(storage, url);
  await deleteObject(storageReference);
};
