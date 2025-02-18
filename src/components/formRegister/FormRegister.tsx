import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import styles from './FormRegister.module.css';
import { toast } from 'react-toastify';

interface FormRegisterProps {
  onClose: () => void;
}

interface FormRegisterData {
  name: string;
  email: string;
  password: string;
}

const FormRegister: React.FC<FormRegisterProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormRegisterData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormRegisterData) => {
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });
      toast.success('Registartion success!');
      onClose();
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    }
  };
  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.info}>
          <h2>Registration</h2>
          <p>
            Thank you for your interest in our platform! In order to register,
            we need some information. Please provide us with the following
            information.
          </p>
        </div>
        <div className={styles['inputs-wrapper']}>
          <div>
            <input
              {...register('name', { required: 'Enter a name' })}
              type="text"
              placeholder="Name"
            />
            {errors.name && (
              <span className={styles.error}>{errors.name.message}</span>
            )}
          </div>
          <div>
            <input
              {...register('email', {
                required: 'Enter an email',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Email is not valid',
                },
              })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>
          <div className={styles['password-wrapper']}>
            <input
              {...register('password', {
                required: 'Enter a password',
                minLength: { value: 6, message: 'Min 6 symbols' },
              })}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className={styles['eye-button']}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
            {errors.password && (
              <span className={styles.error}>{errors.password.message}</span>
            )}
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          {isSubmitting ? 'Registration...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
