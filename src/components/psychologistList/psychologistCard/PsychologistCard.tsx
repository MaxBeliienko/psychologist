import styles from './PsychologistCard.module.css';
import { Psychologist } from '../../../types';
import { FaStar } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { useState, useEffect } from 'react';
import { useUser } from '../../../context/UserContext';
import { toast } from 'react-toastify';
import ReviewCard from '../reviewCard/ReviewCard';
import Modal from '../../modal/Modal';
import AppointmentModal from '../../appointmentModal/AppointmentModal';

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
}) => {
  const {
    about,
    avatar_url,
    experience,
    initial_consultation,
    license,
    name,
    price_per_hour,
    rating,
    reviews,
    specialization,
    id,
  } = psychologist;
  const { user } = useUser();

  const [showReadMore, setShowReadMore] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<'appointment' | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      return;
    }
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites) as string[];
      setIsFavorite(favorites.includes(id));
    }
  }, [id, user]);

  const openModal: (type: 'appointment') => void = type => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleShowMoreClick: () => void = () => {
    setShowReadMore(!showReadMore);
  };

  const handleFavoriteClick: () => void = () => {
    if (!user) {
      toast.warning('Please log in to add to favorites!');
      return;
    }
    const favorites = JSON.parse(
      localStorage.getItem('favorites') || '[]'
    ) as string[];
    const updatedFavorites = isFavorite
      ? favorites.filter(favoriteId => favoriteId !== id)
      : [...favorites, id];
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles['card-container']}>
      <div className={styles['card-img-block-wrapper']}>
        <img src={avatar_url} alt="" className={styles['card-avatar']} />
        <span className={styles['card-span-status']}></span>
      </div>
      <div className={styles['card-info-container']}>
        <div className={styles['subtitle-info-wrapper']}>
          <div>
            <p className={styles.subtitle}>Psychologist</p>
            <h2 className={styles['title-name']}>{name}</h2>
          </div>
          <div className={styles['card-character']}>
            <FaStar className={styles.star} />
            <p>Rating: {rating}</p>
            <span className={styles.span}>|</span>
            <p>
              Price / hour:{' '}
              <span className={styles.price}>{price_per_hour}$</span>{' '}
            </p>
            <button
              className={styles['heart-button']}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? (
                <FaHeart className={styles.heart} />
              ) : (
                <CiHeart className={styles.heart} />
              )}
            </button>
          </div>
        </div>
        <div className={styles['basic-info-container']}>
          <div className={styles['basic-info-wrapper']}>
            <p>
              <span>Experience: </span>
              {experience}
            </p>
            <p>
              <span>License: </span>
              {license}
            </p>
            <p>
              <span>Specialization: </span>
              {specialization}
            </p>
            <p>
              <span>Initial_consultation: </span>
              {initial_consultation}
            </p>
          </div>
          <p className={styles.about}>{about}</p>
        </div>
        <div>
          {!showReadMore ? (
            <button
              className={styles['read-more-button']}
              onClick={handleShowMoreClick}
            >
              Read more
            </button>
          ) : (
            <div>
              <ul className={styles['review-list']}>
                {reviews.map((review, index) => {
                  return (
                    <li key={index}>
                      <ReviewCard review={review} />
                    </li>
                  );
                })}
              </ul>
              <div className={styles['btn-cont']}>
                <button
                  className={styles['appointment-button']}
                  onClick={() => openModal('appointment')}
                >
                  Make an appointment
                </button>
                <button
                  className={styles['read-more-button']}
                  onClick={handleShowMoreClick}
                >
                  Hide
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === 'appointment' && (
          <AppointmentModal
            psychologistName={name}
            psychologistAvatar={avatar_url}
            onClose={closeModal}
          />
        )}
      </Modal>
    </div>
  );
};

export default PsychologistCard;
