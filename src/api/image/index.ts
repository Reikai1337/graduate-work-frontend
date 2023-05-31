import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { ImageResponse } from "./types";

export const IMAGE_URL = "/image";

// export const getProducts = () => {
//   return client.get<ProductTypeResponse[]>(IMAGE_URL, getRequestConfig());
// };

export const uploadImage = async (image: File | null) => {
  if (!image) return null;

  const formData = new FormData();
  formData.append("image", image);

  return client.post<ImageResponse | null>(
    IMAGE_URL,
    formData,
    getRequestConfig({
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};
