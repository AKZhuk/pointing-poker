import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { IRootState } from '../../types';
import Timer from '../shared/Timer';

const RoundControlPanel = (): JSX.Element => {
  const {
    room: {
      roomKey,
      game: { activeIssueId },
    },
  } = useSelector((state: IRootState) => state);
  return (
    <div className="row margin-20">
      <Button
        variant="contained"
        color="secondary"
        onClick={() => SendWSMessage('resetRound', roomKey, { issueId: activeIssueId })}
      >
        Reset Round
      </Button>
      <Timer />
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
