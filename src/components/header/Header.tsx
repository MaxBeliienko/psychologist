import { useState } from 'react';
import Logo from '../logo/Logo';
import UserPanel from '../userPanel/UserPanel';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Modal from '../modal/Modal';
import FormRegister from '../formRegister/FormRegister';
import FormLogin from '../formLogin/FormLogin';
import { UserBasicInfo } from '../../types';

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
      <Logo />
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/psychologist">Psychologist</NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
          )}
        </ul>
      </nav>
      <UserPanel isOpen={openModal} user={user} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {modalContent === 'register' && <FormRegister onClose={closeModal} />}
        {modalContent === 'login' && <FormLogin onClose={closeModal} />}
      </Modal>
    </div>
  );
};

export default Header;
