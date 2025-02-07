import styles from './PsychologistList.module.css';
import { Psychologist } from '../../types';
import PsychologistCard from './psychologistCard/PsychologistCard';

interface PsychologistListProps {
  psychologists: Psychologist[] | null;
}

const PsychologistList: React.FC<PsychologistListProps> = ({
  psychologists,
}) => {
  console.log(psychologists);

  return (
    <div className={styles['list-container']}>
      {psychologists ? (
        <>
          <div>Filter</div>
          <ul className={styles['list-wrapper']}>
            {Object.entries(psychologists).map(([id, psychologist]) => {
              return (
                <li key={id}>
                  <PsychologistCard psychologist={psychologist} />
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        'Currently, there are no psychologists in the base!'
      )}
    </div>
  );
};

export default PsychologistList;
