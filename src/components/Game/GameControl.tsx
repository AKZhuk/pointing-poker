import { Box, Button, Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../types';
import MemberCard from '../shared/Members/MemberCard';
import Timer from '../shared/Timer';

const GameControl = (): JSX.Element => {
  const {
    room: { scrumMaster },
    user: { role },
  } = useSelector((state: IRootState) => state);

  const handleStopGame = () => {
    console.log('stop game');
  };

  const handleExit = () => {
    console.log('exit');
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
        <Button variant="outlined" color="primary" onClick={handleStopGame}>
          Stop Game
        </Button>
      ) : (
        <>
          <Timer />
          <Button variant="outlined" color="primary" onClick={handleExit}>
            Exit
          </Button>
        </>
      )}
    </div>
  );
};

export default GameControl;
