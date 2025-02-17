import styles from './PsychologistCard.module.css';
import { Psychologist } from '../../../types';
import { FaStar } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';
import { useState } from 'react';
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
  } = psychologist;

  const [show, setShow] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<'appointment' | null>(null);

  const openModal: (type: 'appointment') => void = type => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  const handleShowMoreClick: () => void = () => {
    setShow(!show);
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
            <CiHeart className={styles.heart} />
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
          {!show ? (
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
