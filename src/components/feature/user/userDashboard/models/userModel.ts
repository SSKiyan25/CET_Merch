import { db, auth } from "@/firebase/init";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  orderBy,
} from "firebase/firestore";

export interface Order {
  id: string;
  cart: any[];
  dateOrdered: string;
  orderNumber: number;
  orderRefNum: string;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  totalPrice: number;
  userContactNumber: string;
  userEmailAddress: string;
  userId: string;
  userName: string;
  studentId: string;
  showDetails?: boolean;
  purchaseDate?: string;
  remarks?: string;
}

export interface SizeData {
  dateAdded: string;
  price: number;
  remaining_stocks: number;
  reserved_stocks: number;
  stocks: number;
}

export interface ProductData {
  id?: string;
  name: string;
  category: string;
  faction: string;
  description: string;
  coverPhoto: File;
  photos: string[];
  isPublished: boolean;
  isArchived: boolean;
  status: string;
  views: number;
  totalOrders: number;
  dateCreated: string;
  lastModified: string;
  totalSales: number;
  sizes: { [key: string]: SizeData[] };
}

export const fetchUserOrders = async () => {
  if (!auth.currentUser) {
    throw new Error("User not authenticated");
  }

  // Fetch the current user's orders
  const ordersCollection = collection(db, "userOrder");

  // Query where orderStatus is less than "OnQueue" and order by dateOrdered
  const querySnapshot1 = await getDocs(
    query(
      ordersCollection,
      where("userId", "==", auth.currentUser.uid),
      where("orderStatus", "<", "OnQueue"),
      orderBy("dateOrdered", "desc")
    )
  );

  // Query where orderStatus is greater than "OnQueue" and order by dateOrdered
  const querySnapshot2 = await getDocs(
    query(
      ordersCollection,
      where("userId", "==", auth.currentUser.uid),
      where("orderStatus", ">", "OnQueue"),
      orderBy("dateOrdered", "desc")
    )
  );

  // Convert the querySnapshots to arrays of orders and combine them
  const orders = [
    ...querySnapshot1.docs.map((doc) => doc.data()),
    ...querySnapshot2.docs.map((doc) => doc.data()),
  ];

  return orders;
};

export const fetchProduct = async (id: string) => {
  const productRef = doc(db, "products", id);
  const singleProductSnapshot = await getDoc(productRef);
  if (singleProductSnapshot.exists()) {
    const data = singleProductSnapshot.data();
    return data ? { id: singleProductSnapshot.id, ...data } : null;
  }
  return null;
};

export const getProductDetails = async (productId: string) => {
  const productDoc = doc(db, "products", productId);
  const productSnapshot = await getDoc(productDoc);
  return productSnapshot.exists() ? productSnapshot.data() : {};
};

export const updateProduct = async (
  productId: string,
  updateProductData: Partial<ProductData>
) => {
  const productDoc = doc(db, "products", productId);
  await updateDoc(productDoc, updateProductData);
};

export const cancelUserOrder = async (order: any, remarks: string) => {
  // Check if the order already has a remarks field
  if (!("remarks" in order)) {
    order.remarks = remarks;
  }

  // Query the order and update the orderStatus to "cancelled"
  const q = query(
    collection(db, "userOrder"),
    where("orderRefNum", "==", order.orderRefNum)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docSnapshot = querySnapshot.docs[0];
    const orderRef = docSnapshot.ref;
    await updateDoc(orderRef, {
      orderStatus: "cancelled",
      paymentStatus: "cancelled",
      remarks: order.remarks,
    });
  } else {
    console.error(
      `No document found with order reference number ${order.orderRefNum}`
    );
  }

  // Iterate over the cart items and update the product sizes
  for (const item of order.cart) {
    // Skip if the item is pre-ordered
    if (item.isPreOrdered) continue;

    const productData = await getProductDetails(item.productId);
    if (productData) {
      if (item.size && productData.sizes[item.size]) {
        // Iterate over the size indices and update the remaining_stocks and reserved_stocks
        for (const [sizeIndex, quantity] of Object.entries(item.sizeIndices)) {
          const sizeData = productData.sizes[item.size][sizeIndex];
          if (sizeData) {
            sizeData.remaining_stocks += Number(quantity);
            sizeData.reserved_stocks -= Number(quantity);
          }
        }
      } else {
        // If the size is an empty string or "N/A", update the stocks and remaining_stocks of each index
        for (const [sizeIndex, quantity] of Object.entries(item.sizeIndices)) {
          const sizeData = productData.sizes["N/A"][sizeIndex];
          if (sizeData) {
            sizeData.remaining_stocks += Number(quantity);
            sizeData.reserved_stocks -= Number(quantity);
          }
        }
      }
      await updateProduct(item.productId, productData);
    }
  }
};
