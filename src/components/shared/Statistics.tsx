import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../types';
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
    // вынести расчет на сервер
    const stat =
      (vote[issueId]?.filter(data => data.voice === cardValue)?.length /
        members.filter(member => member.role === GameRole.player).length) *
      100;
    return stat ? `${stat.toFixed(2)}%` : '0%';
  };

  return (
    <div>
      <Title text="Statistic:" variant="h5" align="left" />
      <div className="card-container">
        {scoreTypes[scoreType].slice(0, cards).map(elem => (
          <section key={elem}>
            <GameCard value={elem} />
            <Title text={calculateIssueStat(elem)} variant="h5" align="center" />
          </section>
        ))}
      </div>
    </div>
  );
};

export default Statistics;
