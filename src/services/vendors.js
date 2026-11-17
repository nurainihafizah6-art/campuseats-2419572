import {
  collection,
  doc,
  onSnapshot,
  writeBatch,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase.js";

export function subscribeToVendors(onData, onError) {
  return onSnapshot(
    collection(db, "vendors"),
    (snapshot) =>
      onData(
        snapshot.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        })),
      ),
    onError,
  );
}

export function subscribeToVendor(vendorId, onData, onError) {
  return onSnapshot(
    doc(db, "vendors", vendorId),
    (snap) => onData(snap.exists() ? { id: snap.id, ...snap.data() } : null),
    onError,
  );
}

export function subscribeToMenu(vendorId, onData, onError, sortBy = "default") {
  const menuRef = collection(db, "vendors", vendorId, "menu");

  let menuQuery = menuRef;

  if (sortBy === "price") {
    menuQuery = query(menuRef, orderBy("price", "asc"));
  } else if (sortBy === "price-desc") {
    menuQuery = query(menuRef, orderBy("price", "desc"));
  } else if (sortBy === "popularity") {
    menuQuery = query(menuRef, orderBy("popularity", "desc"));
  }

  return onSnapshot(
    menuQuery,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({
        id: d.id,
        vendorId,
        ...d.data(),
      }));

      onData(items);
    },
    onError,
  );
}

export async function seedDemoData(vendors) {
  const batch = writeBatch(db);

  for (const { menu, id, ...vendor } of vendors) {
    batch.set(doc(db, "vendors", id), vendor);

    for (const { id: itemId, ...item } of menu) {
      batch.set(doc(db, "vendors", id, "menu", itemId), item);
    }
  }

  await batch.commit();
}
