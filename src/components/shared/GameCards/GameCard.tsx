import { Card } from '@material-ui/core';
import { Img } from 'react-image';
import { Skeleton } from '@material-ui/lab';
import { useSelector } from 'react-redux';
import ReactCardFlip from 'react-card-flip';
import { IRootState } from '../../../types';
import cardBack from '../../../assets/img/Cover.png';
import './GameCard.scss';

const GameCard = ({
  value = undefined,
  large = false,
  isFlip = false,
}: {
  value?: string;
  large?: boolean;
  isFlip?: boolean;
}): JSX.Element => {
  const { scoreType } = useSelector((state: IRootState) => state.room.gameSettings);

  return (
    <ReactCardFlip isFlipped={isFlip} flipDirection="horizontal" flipSpeedBackToFront={1} flipSpeedFrontToBack={1}>
      <Img
        className={large ? 'game-card_large game-card_front elevation-8' : 'game-card game-card_front elevation-8'}
        src={`./assets/${scoreType}/${value}.png`}
        loader={
          <Skeleton
            variant="rect"
            animation="wave"
            className={large ? 'game-card_large game-card_front' : 'game-card game-card_front'}
          />
        }
        unloader={
          <Skeleton
            variant="rect"
            animation="wave"
            className={large ? 'game-card_large game-card_front' : 'game-card game-card_front'}
          />
        }
        alt={`card ${value}`}
      />
      <Card elevation={8} className={large ? 'game-card_large' : 'game-card'}>
        <img className="game-card__img" src={cardBack} alt="card back img" />
      </Card>
    </ReactCardFlip>
  );
};

export default GameCard;
