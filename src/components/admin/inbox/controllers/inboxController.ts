import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db, auth } from "@/firebase/init.ts";
import { Inbox } from "../models/inboxModel.ts";

const fetchUser = async () => {
  if (!auth.currentUser) {
    console.error("No current user");
    return null;
  }

  try {
    const userDoc = doc(db, "users", auth.currentUser.uid);
    const userSnapshot = await getDoc(userDoc);
    const userData = userSnapshot.data();

    if (!userData) {
      throw new Error("User data is null");
    }

    return userData;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

export const fetchInboxMessages = async (): Promise<Inbox[]> => {
  let inboxCollection = collection(db, "inbox");
  let inboxQuery;
  let userFaction;
  let isAdmin;
  if (auth.currentUser) {
    const user = await fetchUser();
    if (user) {
      isAdmin = user.isAdmin;
      userFaction = user.faction;
    }
  }

  if (isAdmin) {
    inboxQuery = inboxCollection;
  } else {
    inboxQuery = query(inboxCollection, where("faction", "==", userFaction));
  }

  const inboxSnapshot = await getDocs(inboxQuery);
  const inboxMessages: Inbox[] = [];

  inboxSnapshot.forEach((doc) => {
    const data = doc.data() as Inbox;
    inboxMessages.push({
      id: doc.id,
      username: data.username,
      email: data.email,
      message: data.message,
      faction: data.faction,
      status: data.status,
      phoneNumber: data.phoneNumber,
      dateSent: data.dateSent,
      studentId: data.studentId,
    });
  });

  return inboxMessages;
};

export const updateInboxMessage = async (inbox: Inbox): Promise<void> => {
  const inboxDoc = doc(db, "inbox", inbox.id);
  await updateDoc(inboxDoc, {
    status: inbox.status,
  });
};
