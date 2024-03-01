import { auth, db, storage } from "@/firebase/init.ts";
import { ref, computed } from "vue";
import {
  uploadBytes,
  deleteObject,
  listAll,
  ref as storageRef,
} from "firebase/storage";

export async function uploadImage() {}
