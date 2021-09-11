import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import GameCard from './GameCards/GameCard';
import { scoreTypes } from './GameCards/GameCards';
import Title from './Title';

const Statistics = (): JSX.Element => {
  const {
    gameSettings: { scoreType, cards },
  } = useSelector((state: IRootState) => state);

  return (
    <div>
      <Title text="Statistic:" variant="h5" align="left" />
      <div className="card-container">
        {scoreTypes[scoreType].slice(0, cards).map(elem => (
          <div key={elem}>
            <GameCard value={elem} />
            <Title text="35%" variant="h5" align="center" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
