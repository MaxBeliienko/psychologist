import Logo from '../logo/Logo';
import UserPanel from '../userPanel/UserPanel';
import styles from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header: React.FC = () => {
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
          <li>
            <NavLink to="/favorites">Favorites</NavLink>
          </li>
        </ul>
      </nav>
      <UserPanel />
    </div>
  );
};

export default Header;
