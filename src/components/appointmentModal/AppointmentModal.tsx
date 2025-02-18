import styles from './AppointmentModal.module.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface AppointmentModalProps {
  psychologistName: string;
  psychologistAvatar: string;
  onClose: () => void;
}

interface FormAppointmentData {
  name: string;
  phone: string;
  time: string;
  email: string;
  comment?: string;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  psychologistName,
  psychologistAvatar,
  onClose,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormAppointmentData>();
  const onSubmit = (data: FormAppointmentData) => {
    toast.success('Success!');
    console.log(data);

    onClose();
  };

  return (
    <div className={styles['modal-appointment-container']}>
      <h2 className={styles['modal-appointment-title']}>
        Make an appointment with a psychologists
      </h2>
      <p className={styles['modal-appointment-text']}>
        You are on the verge of changing your life for the better. Fill out the
        short form below to book your personal appointment with a professional
        psychologist. We guarantee confidentiality and respect for your privacy.
      </p>
      <div className={styles['psychologist-info-wrapper']}>
        <img
          src={psychologistAvatar}
          alt="psychologist-avatar"
          className={styles['psychologist-avatar']}
        />
        <div>
          <span className={styles['info-span']}>Your psychologists</span>
          <h3 className={styles['info-name']}>{psychologistName}</h3>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div>
          <input
            {...register('name', { required: 'Enter a name' })}
            placeholder="Name"
          />
          {errors.name && <span className={styles.error}>Error name</span>}
        </div>
        <div className={styles['phone-time-wrapper']}>
          <div>
            <input
              {...register('phone', {
                required: 'Enter a phone number',
                pattern: {
                  value: /^\+380\d{9}$/,
                  message:
                    'Некоректний формат номера телефону. Він повинен починатися з +380 і складатися з 9 цифр',
                },
              })}
              placeholder="+380"
            />
            {errors.phone && <span className={styles.error}>Error phone</span>}
          </div>
          <div>
            <input
              type="time"
              {...register('time', { required: 'Enter a time' })}
              placeholder="00:00"
              className={styles.time}
            />
            {errors.time && <span className={styles.error}>Error time</span>}
          </div>
        </div>
        <div>
          <input
            {...register('email', { required: true, pattern: /\S+@\S+\.\S+/ })}
            placeholder="Email"
          />
          {errors.email && <span>Некоректна адреса email</span>}
        </div>
        <div>
          <textarea {...register('comment')} placeholder="Ваш коментар" />
        </div>
        <button type="submit" className={styles.button}>
          Send
        </button>
      </form>
    </div>
  );
};

export default AppointmentModal;
