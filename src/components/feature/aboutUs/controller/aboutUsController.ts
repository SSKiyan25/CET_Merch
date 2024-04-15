import {
  fetchMetSocImages,
  fetchCS3Images,
  fetchGEPImages,
  fetchPICEImages,
  fetchPSMEImages,
  fetchCETImages,
} from "../model/aboutUsModel";

export async function displayMetSocImages() {
  const metSocUrls = await fetchMetSocImages();
  return metSocUrls;
}

export async function displayCS3Images() {
  const cs3Urls = await fetchCS3Images();
  return cs3Urls;
}

export async function displayGEPImages() {
  const gepUrls = await fetchGEPImages();
  return gepUrls;
}

export async function displayPICEImages() {
  const piceUrls = await fetchPICEImages();
  return piceUrls;
}

export async function displayPSMEImages() {
  const psmeUrls = await fetchPSMEImages();
  return psmeUrls;
}

export async function displayCETImages() {
  const cetUrls = await fetchCETImages();
  return cetUrls;
}
