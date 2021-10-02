import { Card, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { addCard } from '../../../redux/reducers/room/roomActions';
import { IRootState } from '../../../types';
import cardBack from '../../../assets/img/Cover.png';
import './GameCard.scss';

const GameCard = ({
  value = undefined,
  large = false,
  isFlip = false,
}: {
  value?: string | undefined;
  large?: boolean;
  isFlip?: boolean;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { scoreType } = useSelector((state: IRootState) => state.room.gameSettings);
  const handleAddCard = () => dispatch(addCard());

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
      <Card elevation={8} className={large ? 'game-card_large game-card_front' : 'game-card game-card_front'}>
        {value ? (
          <img className="game-card__img" src={`./assets/${scoreType}/${value}.png`} alt={`card ${value}`} />
        ) : (
          <div className="game-card_addIcon">
            <IconButton onClick={handleAddCard}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        )}
      </Card>

      <Card elevation={8} className={large ? 'game-card_large' : 'game-card'}>
        <img className="game-card__img" src={cardBack} alt="card back img" />
      </Card>
    </ReactCardFlip>
  );
};

export default GameCard;
