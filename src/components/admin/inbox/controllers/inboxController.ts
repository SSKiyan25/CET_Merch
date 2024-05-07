import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
  limit,
  startAfter,
  DocumentSnapshot,
} from "firebase/firestore";
import { db, auth } from "@/firebase/init";
import { Inbox } from "../models/inboxModel";

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

let lastDocs: (DocumentSnapshot | null)[] = [];

let currentPage = { value: 0 };
let totalInboxMessages = { value: 0 };
let loadingPage = { value: false };
export let inbox: Inbox[] = [];

export const fetchInboxMessages = async (
  currentPageValue: number | null = null,
  startAfterDoc: DocumentSnapshot | null = null
): Promise<Inbox[]> => {
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

  inboxQuery = query(inboxQuery, limit(10));
  if (startAfterDoc) {
    inboxQuery = query(inboxQuery, startAfter(startAfterDoc));
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

  // Save the last document from the results
  let lastDoc = inboxSnapshot.docs[inboxSnapshot.docs.length - 1];
  if (typeof currentPageValue === "number") {
    lastDocs[currentPageValue] = lastDoc;
  }

  return inboxMessages;
};

export const nextPage = async (): Promise<Inbox[]> => {
  if ((currentPage.value + 1) * 5 < totalInboxMessages.value) {
    loadingPage.value = true;
    currentPage.value = currentPage.value + 1;
    const startAfterDoc = lastDocs[currentPage.value - 1];
    const newInbox = await fetchInboxMessages(currentPage.value, startAfterDoc);
    loadingPage.value = false;
    return newInbox;
  }
  return [];
};

export const prevPage = async (): Promise<Inbox[]> => {
  if (currentPage.value > 0) {
    loadingPage.value = true;
    currentPage.value = currentPage.value - 1;
    const startAfterDoc =
      currentPage.value > 0 ? lastDocs[currentPage.value - 1] : null;
    const newInbox = await fetchInboxMessages(currentPage.value, startAfterDoc);
    loadingPage.value = false;
    return newInbox;
  }
  return [];
};

export const updateInboxMessage = async (inbox: Inbox): Promise<void> => {
  const inboxDoc = doc(db, "inbox", inbox.id);
  await updateDoc(inboxDoc, {
    status: inbox.status,
  });
};
