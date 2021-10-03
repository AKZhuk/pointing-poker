import { ButtonBase, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { useSelector, useDispatch } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { IRootState, IScoreTypes } from '../../../types';
import { addCard, removeCard } from '../../../redux/reducers/room/roomActions';
import GameCard from './GameCard';

export const scoreTypes: IScoreTypes = {
  storyPoint: ['coffee', 'unknown', '1', '2', '3', '5', '8', '13', '20', '40', '100', 'infinity'],
  'T-shirts/GameOfThrones': ['unknown', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
  'T-shirts/StarWars': ['unknown', 'XXS', 'XS', 'S', 'M', 'L', 'XL'],
  fibonacci: ['unknown', '0', '1', '3', '5', '8', '13', '21', '34', '55', '89', 'infinity'],
};
const GameCards = ({ isGame = false }: { isGame?: boolean }): JSX.Element => {
  const dispatch = useDispatch();

  const {
    user,
    room: {
      game: { activeIssueId },
      roomKey,
      gameSettings: { cards, scoreType },
    },
  } = useSelector((state: IRootState) => state);

  const handleAddCard = () => dispatch(addCard());

  const handleRemoveCard = () => dispatch(removeCard());

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
      {!isGame && (
        <div className="game-card__control">
          {cards > 4 && (
            <Fab color="secondary" size="small" aria-label="add" onClick={handleRemoveCard}>
              <RemoveIcon />
            </Fab>
          )}
          {cards < scoreTypes[scoreType].length && (
            <Fab color="primary" aria-label="add" onClick={handleAddCard}>
              <AddIcon />
            </Fab>
          )}
        </div>
      )}
    </section>
  );
};

export default GameCards;
