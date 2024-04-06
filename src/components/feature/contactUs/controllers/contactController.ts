import { ref } from "vue";
import { db } from "@/firebase/init.ts";
import { collection, addDoc } from "firebase/firestore";
import { Inbox } from "../models/contactModel.ts";

export const isLoading = ref(false);
export const createInboxMessage = async (inbox: Inbox, router: any) => {
  isLoading.value = true;
  const inboxCollection = collection(db, "inbox");
  inbox.dateSent = new Date().toISOString();
  inbox.status = "unread";
  const docRef = await addDoc(inboxCollection, inbox);
  isLoading.value = false;
  router.push({ name: "launchPage" });

  return docRef.id;
};
