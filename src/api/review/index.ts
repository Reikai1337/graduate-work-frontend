import { client } from "../../common/index";
import { getRequestConfig } from "../helpers";
import { ReviewResponse, UploadReviewParams } from "./types";

export const REVIEW_URL = "/review";

export const uploadReview = async (params: UploadReviewParams) => {
  return client.post<ReviewResponse>(REVIEW_URL, params, getRequestConfig());
};
