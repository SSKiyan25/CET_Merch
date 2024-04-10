import { fetchProducts } from "../models/adminProductsModel";
import { fetchUser } from "../models/userModel";
import { fetchPendingOrdersCount } from "../../orders/models/adminOrdersModel";
import { fetchInboxMessages } from "../../inbox/controllers/inboxController";
import { fetchSellerProducts } from "../models/adminDashboardModel";
import { DocumentSnapshot } from "firebase/firestore";

export const fetchProductsForSeller = async (
  startAfterDoc: DocumentSnapshot | null = null
) => {
  const user = await fetchUser();
  if (!user) {
    console.error("No current user");
    return;
  }
  const faction = user.role === "admin" ? "all" : user.faction;

  // If the user is an admin, fetch all products
  // Otherwise, fetch only the products for the user's faction
  const products = await fetchProducts(
    faction === "admin" ? "all" : faction,
    startAfterDoc
  );

  return products;
};

export const fetchTotalPendingOrders = async () => {
  const totalPendingOrders = await fetchPendingOrdersCount();
  return totalPendingOrders;
};

export const fetchTotalUnreadMessages = async () => {
  const user = await fetchUser();
  if (!user) {
    console.error("No current user");
    return;
  }

  const inboxMessages = await fetchInboxMessages();
  const totalUnreadMessages = inboxMessages.filter(
    (message) => message.status === "unread"
  ).length;

  return totalUnreadMessages;
};

export const fetchDashboardProducts = async () => {
  const products = await fetchSellerProducts();
  return products;
};
