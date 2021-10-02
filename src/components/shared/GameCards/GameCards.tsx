import { ButtonBase } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { IRootState, IScoreTypes } from '../../../types';
import GameCard from './GameCard';

export const scoreTypes: IScoreTypes = {
  storyPoint: ['coffee', 'unknown', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'infinity'],
  'T-shirts/GameOfThrones': ['unknown', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
  'T-shirts/StarWars': ['unknown', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
  fibonacci: ['unknown', '0', '1', '3', '5', '8', '13', '21', '34', '55', '89', 'infinity'],
};

const GameCards = ({ isGame = false }: { isGame?: boolean }): JSX.Element => {
  const {
    user,
    room: {
      game: { activeIssueId },
      roomKey,
      gameSettings: { cards, scoreType },
    },
  } = useSelector((state: IRootState) => state);
  return (
    <section className="card-container">
      {scoreTypes[scoreType].slice(0, cards).map(elem =>
        isGame ? (
          <ButtonBase
            key={elem}
            onClick={() => {
              SendWSMessage('setVoice', roomKey, { issueId: activeIssueId, userId: user.id, voice: elem });
            }}
          >
            <GameCard value={elem} large />
          </ButtonBase>
        ) : (
          <GameCard key={elem} value={elem} large />
        ),
      )}
      {!isGame && cards < scoreTypes[scoreType].length && <GameCard large />}
    </section>
  );
};

export default GameCards;
