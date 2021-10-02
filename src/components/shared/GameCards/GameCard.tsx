import { Card, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { addCard } from '../../../redux/reducers/room/roomActions';
import { IRootState } from '../../../types';
import cardBack from '../../../assets/img/CardBack.png';
import coffeeIcon from '../../../assets/svg/coffee.svg';
import questionIcon from '../../../assets/svg/question.svg';
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

  const renderCardValue = (cardValue: number) => {
    if (cardValue > 0) {
      return (
        <>
          <span>{value && scoreType}</span>
          <Typography variant={large ? 'h3' : 'h4'} component="h3" align="center" color="primary">
            {value}
          </Typography>
          <span className="rotate">{value && scoreType}</span>
        </>
      );
    }
    if (cardValue === -1)
      return (
        <>
          <span>coffee time</span>
          <img className="game-card_icon" src={coffeeIcon} alt="coffee" />
          <span className="rotate">coffee time</span>
        </>
      );
    return (
      <>
        <span>unclear</span>
        <img className="game-card_icon" src={questionIcon} alt="question" />
        <span className="rotate">unclear</span>
      </>
    );
  };
  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
      <Card elevation={8} className={large ? 'game-card_large game-card_front' : 'game-card game-card_front'}>
        {value ? (
          renderCardValue(value)
        ) : (
          <div className="game-card_addIcon">
            <IconButton onClick={handleAddCard}>
              <AddCircleOutlineIcon fontSize="large" />
            </IconButton>
          </div>
        )}
      </Card>

      <Card elevation={8} className={large ? 'game-card_large' : 'game-card'}>
        <img className="game-card_img" src={cardBack} alt="card_back-img" />
      </Card>
    </ReactCardFlip>
  );
};

export default GameCard;
