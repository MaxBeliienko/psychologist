import styles from './ReviewCard.module.css';
import { FaStar } from 'react-icons/fa';

interface ReviewCardProps {
  review: { reviewer: string; rating: number; comment: string };
}

const ReviewCard: React.FC<ReviewCardProps> = review => {
  const { reviewer, rating, comment } = review.review;
  const arr = reviewer.split('');

  return (
    <div className={styles['review-card-wrapper']}>
      <div className={styles['info-wrapper']}>
        <span className={styles['reviewer-avatar']}>{arr[0]}</span>
        <div>
          <h3>{reviewer}</h3>
          <span>
            <FaStar className={styles.star} />
            {rating}
          </span>
        </div>
      </div>
      <p className={styles.comment}>{comment}</p>
    </div>
  );
};

export default ReviewCard;
