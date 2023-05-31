export type UploadReviewParams = {
  userId: number;
  productId: number;
  rating: number;
};

export type ReviewResponse = {
  id: number;
  rating: number;
};
