import { Box, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { GameRole, IRootState, Routes } from '../../types';
import MemberCard from '../shared/Members/MemberCard';
import Timer from '../shared/Timer';

const GameControl = (): JSX.Element => {
  const {
    room: {
      scrumMaster,
      roomKey,
      gameSettings: { isTimerNeeded },
    },
    user: { role },
    user,
  } = useSelector((state: IRootState) => state);

  const handleStopGame = () => {
    SendWSMessage('changeRoute', roomKey, Routes.result);
  };

  const handleExit = () => {
    SendWSMessage('removeMember', roomKey, user);
  };

  return (
    <div className="row">
      <Box marginBottom={3}>
        <Typography variant="overline" display="block" gutterBottom>
          Scram Master:
        </Typography>
        <MemberCard member={scrumMaster} isScrumMaster />
      </Box>
      {role === GameRole.scrumMaster ? (
        <Button variant="outlined" color="secondary" onClick={handleStopGame}>
          Stop Game
        </Button>
      ) : (
        <>
          {isTimerNeeded && <Timer />}
          <Button variant="outlined" color="secondary" onClick={handleExit}>
            Exit
          </Button>
        </>
      )}
    </div>
  );
};

export default GameControl;
