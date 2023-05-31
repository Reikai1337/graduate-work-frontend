import { ImageResponse } from "../image/types";
import { ReviewResponse } from "../review/types";

export type ProductTypeResponse = {
  id: number;
  name: string;
};

export type ProductResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  sale: number;
  weight: number;
  weightType: string;
  type: ProductTypeResponse;
  image: ImageResponse | null;
  package: string;
  barcode: string;
  boxSize: string;
  storageConditions: string;
  quantityPerBox: number;
  reviews: ReviewResponse[];
};

export type CreateProductParams = {
  name: string;
  description: string;
  price: number;
  sale: number;
  weight: number;
  type: string;
  weightType: string;
  imageId: number | null;
  package: string;
  barcode: string;
  boxSize: string;
  storageConditions: string;
  quantityPerBox: number;
};

export type UpdateProductParams = {
  name: string;
  description: string;
  price: number;
  sale: number;
  weight: number;
  type: string;
  weightType: string;
  imageId: number | null;
  package: string;
  barcode: string;
  boxSize: string;
  storageConditions: string;
  quantityPerBox: number;
};
