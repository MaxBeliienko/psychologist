interface ReviewCardProps {
  review: { reviewer: string; rating: number; comment: string };
}

const ReviewCard: React.FC<ReviewCardProps> = review => {
  console.log(review.review);

  const { reviewer, rating, comment } = review.review;

  return (
    <div>
      <div></div>
      <div>{comment}</div>
    </div>
  );
};

export default ReviewCard;
