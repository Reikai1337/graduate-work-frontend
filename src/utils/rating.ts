type RatingData = {
  id: number;
  rating: number;
};

export const calculateAverageRating = (data: RatingData[]): number => {
  let totalRating = 0;
  const numRatings = data.length;

  for (let i = 0; i < numRatings; i++) {
    totalRating += data[i].rating;
  }

  const averageRating = totalRating / numRatings;

  return Number(averageRating.toFixed(2));
};
