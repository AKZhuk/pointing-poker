import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { IRootState } from '../../types';
import Timer from '../shared/Timer';

const RoundControlPanel = (): JSX.Element => {
  const {
    room: {
      roomKey,
      game,
      gameSettings: { isTimerNeeded },
    },
  } = useSelector((state: IRootState) => state);

  const handleFlipCard = () => {
    const newGameObj = { ...game };
    newGameObj.cardsIsFlipped = !newGameObj.cardsIsFlipped;
    SendWSMessage('updateGame', roomKey, newGameObj);
  };

  return (
    <div className="row margin-20">
      <Button
        variant="contained"
        color="secondary"
        disabled={!game.activeIssueId}
        onClick={() => SendWSMessage('resetRound', roomKey, { issueId: game.activeIssueId })}
      >
        Reset Round
      </Button>
      {isTimerNeeded && <Timer />}
      <Button
        variant="contained"
        color="primary"
        disabled={!game.activeIssueId}
        onClick={() => SendWSMessage('setActiveIssue', roomKey, {})}
      >
        Next issue
      </Button>
      {!isTimerNeeded && (
        <Button variant="contained" color="primary" disabled={!game.activeIssueId} onClick={handleFlipCard}>
          Flip Cards
        </Button>
      )}
    </div>
  );
};

export default RoundControlPanel;
