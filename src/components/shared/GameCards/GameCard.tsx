import { Card, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { addCard } from '../../../redux/reducers/room/roomActions';
import { IRootState } from '../../../types';
import cardBack from '../../../assets/img/CardBack.png';
import './GameCard.scss';

const GameCard = ({
  value = undefined,
  large = false,
  isFlip = false,
}: {
  value?: number | undefined;
  large?: boolean;
  isFlip?: boolean;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { scoreType } = useSelector((state: IRootState) => state.room.gameSettings);
  const handleAddCard = () => dispatch(addCard());
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="vertical">
      <Card elevation={8} className={large ? 'game-card_large game-card_front' : 'game-card game-card_front'}>
        <span>{value && scoreType}</span>
        {value ? (
          <Typography variant="h3" component="h3" align="center" color="primary">
            {value}
          </Typography>
        ) : (
          <IconButton onClick={handleAddCard}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        )}
        <span className="rotate">{value && scoreType}</span>
      </Card>

      <Card elevation={8} className={large ? 'game-card_large' : 'game-card'}>
        <img className="game-card_img" src={cardBack} alt="card_back-img" />
      </Card>
    </ReactCardFlip>
  );
};

export default GameCard;
