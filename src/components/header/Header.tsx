import { useState } from 'react';
import Logo from '../logo/Logo';
import UserPanel from '../userPanel/UserPanel';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Modal from '../modal/Modal';
import FormRegister from '../formRegister/FormRegister';
import FormLogin from '../formLogin/FormLogin';
import { UserBasicInfo } from '../../types';
import { IoHome, IoPeople } from 'react-icons/io5';
import { RiSpeakAiFill } from 'react-icons/ri';
import ThemeSwitcher from '../themeSwitcher/ThemeSwitcher';

interface OpenModalFunction {
  (type: 'login' | 'register'): void;
}

interface HeadreProps {
  user: UserBasicInfo | null;
}

const Header: React.FC<HeadreProps> = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<'login' | 'register' | null>(
    null
  );

  const openModal: OpenModalFunction = type => {
    setModalContent(type);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };
  return (
    <div className={styles['header-container']}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={styles['nav-nav-link']}>
              <IoHome className={styles['nav-icon']} />
              <span className={styles['nav-span']}>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/psychologist" className={styles['nav-nav-link']}>
              <IoPeople className={styles['nav-icon']} />
              <span className={styles['nav-span']}>Psychologist</span>
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/favorites" className={styles['nav-nav-link']}>
                <RiSpeakAiFill className={styles['nav-icon']} />
                <span className={styles['nav-span']}>Favorites</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      <UserPanel isOpen={openModal} user={user} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === 'register' && <FormRegister onClose={closeModal} />}
        {modalContent === 'login' && <FormLogin onClose={closeModal} />}
      </Modal>
      <div className={styles['theme-wrapper']}>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default Header;
