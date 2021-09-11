import { useSelector } from 'react-redux';
import GameCard from './GameCard';
import { IRootState, IScoreTypes } from '../../types';

export const scoreTypes: IScoreTypes = {
  'power of 2': [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  'story point': [1 / 2, 1, 2, 3, 5, 8, 13, 20, 30, 100],
  fibonacci: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
};

const GameCards = ({ isGame = false }: { isGame?: boolean }): JSX.Element => {
  const { cards, scoreType } = useSelector((state: IRootState) => state.gameSettings);

  return (
    <div className="card-container">
      {scoreTypes[scoreType].slice(0, cards).map(elem => (
        <GameCard key={elem} value={elem} large />
      ))}
      {!isGame && <GameCard large />}
    </div>
  );
};

export default GameCards;
