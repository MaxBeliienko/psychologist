import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { FaRegEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import styles from './FormLogin.module.css';

interface FormLoginProps {
  onClose: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

const FormLogin: React.FC<FormLoginProps> = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      onClose();
      console.log('User logged in', userCredential.user);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.info}>
        <h2>Login</h2>
        <p>
          Welcome back! Please enter your credentials to access your account and
          continue your search for a psychologist.
        </p>
      </div>
      <div className={styles['inputs-wrapper']}>
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
        {isSubmitting ? 'Logging in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default FormLogin;
