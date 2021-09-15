import { useSelector } from 'react-redux';
import { IRootState } from '../../types';
import GameCard from './GameCards/GameCard';
import { scoreTypes } from './GameCards/GameCards';
import Title from './Title';

const Statistics = ({ issueId }: { issueId: string }): JSX.Element => {
  const {
    room: {
      members,
      gameSettings: { scoreType, cards },
      game: { vote },
    },
  } = useSelector((state: IRootState) => state);

  const calculateIssueStat = (cardValue: number) => {
    const stat = (vote[issueId]?.filter(data => data.voice === cardValue)?.length / members.length) * 100;
    return stat ? `${stat.toFixed(2)}%` : '0%';
  };

  return (
    <div>
      <Title text="Statistic:" variant="h5" align="left" />
      <div className="card-container">
        {scoreTypes[scoreType].slice(0, cards).map(elem => (
          <div key={elem}>
            <GameCard value={elem} />
            <Title text={calculateIssueStat(elem)} variant="h5" align="center" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
