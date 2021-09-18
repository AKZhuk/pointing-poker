import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { IRootState } from '../../types';
import Timer from '../shared/Timer';

const RoundControlPanel = () => {
  const {
    room: {
      roomKey,
      game: { activeIssueId },
    },
    user: { role, id },
  } = useSelector((state: IRootState) => state);
  return (
    <div>
      <Timer />
      <Button
        variant="contained"
        color="secondary"
        onClick={() => SendWSMessage('resetRound', roomKey, { issueId: activeIssueId })}
      >
        Reset Round
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          SendWSMessage('setActiveIssue', roomKey, {});
        }}
      >
        Next issue
      </Button>
    </div>
  );
};

export default RoundControlPanel;
