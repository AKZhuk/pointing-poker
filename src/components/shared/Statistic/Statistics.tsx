import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../../types';
import GameCard from '../GameCards/GameCard';
import { scoreTypes } from '../GameCards/GameCards';
import Title from '../Title';
import './Statistic.scss';

const Statistics = ({ issueId, isFlipped = true }: { issueId: string; isFlipped?: boolean }): JSX.Element => {
  const {
    room: {
      members,
      gameSettings: { scoreType, cards, ScrumMasterAsPlayer },
      game: { vote },
    },
  } = useSelector((state: IRootState) => state);

  const calculateIssueStat = (cardValue: number) => {
    // вынести расчет на сервер
    const stat =
      (vote[issueId]?.filter(data => data.voice === cardValue)?.length /
        (members.filter(member => member.role === GameRole.player).length + (ScrumMasterAsPlayer ? 1 : 0))) *
      100;
    return stat ? `${stat.toFixed(1)}%` : '0%';
  };

  return (
    <>
      <Title text="Statistic:" variant="h5" align="left" />
      <div className="card-container">
        {scoreTypes[scoreType].slice(0, cards).map(elem => (
          <section key={elem} className="StatisticCard">
            <GameCard value={elem} isFlip={!isFlipped} />
            {isFlipped && (
              <div className="StatisticCard_result">
                <Title text={calculateIssueStat(elem)} variant="h5" align="center" />
              </div>
            )}
          </section>
        ))}
      </div>
    </>
  );
};

export default Statistics;
