import styles from './NotLoginUserPanel.module.css';

interface OpenModalFunction {
  (type: 'login' | 'register'): void;
}

interface NotLoginUserPanelProps {
  isOpen: OpenModalFunction;
}

const NotLoginUserPanel: React.FC<NotLoginUserPanelProps> = ({ isOpen }) => {
  return (
    <div className={styles['not-login-user-panel-wrapper']}>
      <button className={styles['button']} onClick={() => isOpen('login')}>
        Log In
      </button>
      <button
        className={`${styles.button} ${styles.register}`}
        onClick={() => isOpen('register')}
      >
        Registration
      </button>
    </div>
  );
};

export default NotLoginUserPanel;
