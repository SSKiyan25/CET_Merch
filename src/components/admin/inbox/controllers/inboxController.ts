import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
  updateDoc,
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

let currentPage = { value: 0 };
export let totalMessagesFetched = 0;
export let inbox: Inbox[] = [];

export let allInboxMessages: Inbox[] = [];

export const fetchInboxMessages = async (): Promise<void> => {
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

  const tempInboxMessages: Inbox[] = [];
  inboxSnapshot.forEach((doc) => {
    const data = doc.data() as Inbox;
    tempInboxMessages.push({
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
  // Update totalMessagesFetched
  totalMessagesFetched = tempInboxMessages.length;

  // Sort the messages by date
  allInboxMessages = tempInboxMessages.sort(
    (a, b) => new Date(b.dateSent).getTime() - new Date(a.dateSent).getTime()
  );
};

export const nextPage = (): Inbox[] => {
  if ((currentPage.value + 1) * 10 < allInboxMessages.length) {
    currentPage.value = currentPage.value + 1;
    return getInboxPage(currentPage.value);
  }
  return [];
};

export const prevPage = (): Inbox[] => {
  if (currentPage.value > 0) {
    currentPage.value = currentPage.value - 1;
    return getInboxPage(currentPage.value);
  }
  return [];
};

export const getInboxPage = (page: number, pageSize: number = 10): Inbox[] => {
  const start = page * pageSize;
  const end = Math.min(start + pageSize, allInboxMessages.length);
  return allInboxMessages.slice(start, end);
};

export const updateInboxMessage = async (inbox: Inbox): Promise<void> => {
  const inboxDoc = doc(db, "inbox", inbox.id);
  await updateDoc(inboxDoc, {
    status: inbox.status,
  });
};
