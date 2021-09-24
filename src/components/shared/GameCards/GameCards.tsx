import { ButtonBase } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { IRootState, IScoreTypes } from '../../../types';
import GameCard from './GameCard';

export const scoreTypes: IScoreTypes = {
  'power of 2': [1, 2, 4, 8, 16, 32, 64, 128, 256, 512],
  'story point': [1 / 2, 1, 2, 3, 5, 8, 13, 20, 30, 100],
  fibonacci: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89],
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
    <div className="card-container">
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
      {!isGame && <GameCard large />}
    </div>
  );
};

export default GameCards;
