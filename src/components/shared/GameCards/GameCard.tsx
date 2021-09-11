import { Card, IconButton, Typography } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { addCard } from '../../../redux/reducers/gameSettings/gameSettingsActions';
import { IRootState } from '../../../types';
import './GameCard.scss';

const GameCard = ({
  value = undefined,
  large = false,
}: {
  value?: number | undefined;
  large?: boolean;
}): JSX.Element => {
  const dispatch = useDispatch();
  const { scoreType } = useSelector((state: IRootState) => state.gameSettings);
  const handleAddCard = () => dispatch(addCard());

  return (
    <Card className={large ? 'game-card_large' : 'game-card'}>
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
  );
};

export default GameCard;
