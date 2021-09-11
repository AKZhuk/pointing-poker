import { Typography } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../../types';

const Timer = (): JSX.Element => {
  const timer = useSelector((state: IRootState) => state.gameSettings.timer);
  return <Typography variant="h4">{timer}</Typography>;
};

export default Timer;
