import { fetchUser } from "../models/userModel";
import { fetchPendingOrdersCount } from "../../orders/models/adminOrdersModel";
import { fetchInboxMessages } from "../../inbox/controllers/inboxController";
import {
  fetchSellerProducts,
  fetchSellers,
} from "../models/adminDashboardModel";

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

export const fetchDashboardSellers = async () => {
  const sellers = await fetchSellers();
  return sellers;
};
