import { ref } from "vue";
import { db } from "@/firebase/init";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { Inbox, Seller } from "../models/contactModel";

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

export const fetchSellers = async () => {
  const usersCollection = collection(db, "users");
  const q = query(usersCollection, where("role", "==", "seller"));
  const querySnapshot = await getDocs(q);
  const sellers: Seller[] = [];

  querySnapshot.forEach((doc) => {
    sellers.push(doc.data() as Seller);
  });

  return sellers;
};
