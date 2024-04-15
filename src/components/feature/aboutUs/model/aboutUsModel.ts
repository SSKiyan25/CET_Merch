import { storage } from "@/firebase/init";
import { ref as storageRef, listAll, getDownloadURL } from "firebase/storage";

export async function fetchMetSocImages() {
  const storageReference = storageRef(storage, "organizations/metsoc");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}

export async function fetchCS3Images() {
  const storageReference = storageRef(storage, "organizations/cs3");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}

export async function fetchGEPImages() {
  const storageReference = storageRef(storage, "organizations/gep");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}

export async function fetchPICEImages() {
  const storageReference = storageRef(storage, "organizations/pice");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}

export async function fetchPSMEImages() {
  const storageReference = storageRef(storage, "organizations/psme");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}

export async function fetchCETImages() {
  const storageReference = storageRef(storage, "organizations/cet");
  const result = await listAll(storageReference);
  const urls = await Promise.all(
    result.items.map((item: any) => getDownloadURL(item))
  );
  return urls;
}
