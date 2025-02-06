import styles from './LoginUserPanel.module.css';
import { FaUser } from 'react-icons/fa';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { UserBasicInfo } from '../../../types';

interface LoginUserPanelProps {
  user: UserBasicInfo | null;
}

const LoginUserPanel: React.FC<LoginUserPanelProps> = ({ user }) => {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out');
    } catch (error: any) {
      console.log('Logout error', error.message);
    }
  };
  return (
    <div className={styles['login-user-panel-wrapper']}>
      <button className={styles['info-button']}>
        <span>
          <FaUser />
        </span>
        {user?.displayName ? user.displayName : 'User'}
      </button>
      <button className={styles['logout-button']} onClick={() => logout()}>
        Log out
      </button>
    </div>
  );
};

export default LoginUserPanel;
