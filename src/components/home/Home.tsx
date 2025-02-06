import { NavLink } from 'react-router-dom';
import styles from './Home.module.css';
import mainPhoto from '../../assets/images/homepage-main.png';
import infoBlock from '../../assets/images/homepage-info-block.png';
import yellowBlock from '../../assets/images/homepage-block-yellow.png';
import violetBlock from '../../assets/images/homepage-block-violet.png';
import { MdArrowOutward } from 'react-icons/md';

const Home: React.FC = () => {
  return (
    <div className={styles['home-page-container']}>
      <div className={styles['home-page-text-container']}>
        <h1>
          The road to the <span>depths</span> of the human soul
        </h1>
        <p>
          We help you to reveal your potential, overcome challenges and find a
          guide in your own life with the help of our experienced psychologists.
        </p>
        <NavLink to="/psychologist" className={styles['text-container-link']}>
          Get started <MdArrowOutward />
        </NavLink>
      </div>
      <div className={styles['home-page-img-container']}>
        <img
          src={mainPhoto}
          alt="Psychologist image"
          className={styles['main-photo']}
        />
        <img
          src={infoBlock}
          alt="info block"
          className={styles['info-block-img']}
        />
        <img
          src={yellowBlock}
          alt="design element"
          className={styles['yellow-block-img']}
        />
        <img
          src={violetBlock}
          alt="design element"
          className={styles['violet-block-img']}
        />
      </div>
    </div>
  );
};

export default Home;
