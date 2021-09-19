import { Button, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { delay } from '../../helpers/helpers';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { GameRole, IRootState, Routes } from '../../types';
import MemberCard from '../shared/Members/MemberCard';

const UserMenu = (): JSX.Element => {
  const [copy, setCopy] = useState(false);
  const {
    gameSettings,
    connection: { url },
    room: { roomKey, scrumMaster },
    user: { role },
    user,
  } = useSelector((state: IRootState) => state);
  const fullUrl = `${url}`;

  async function copyURL(): Promise<void> {
    navigator.clipboard.writeText(fullUrl);
    setCopy(true);
    await delay(1.5);
    setCopy(false);
  }

  const handleStartGame = () => {
    SendWSMessage('changeSettings', roomKey, gameSettings);
    SendWSMessage('changeRoute', roomKey, Routes.game);
    SendWSMessage('setActiveIssue', roomKey, {});
  };

  return (
    <div className="menu">
      <MemberCard member={scrumMaster} isScrumMaster />
      {role === GameRole.scrumMaster ? (
        <>
          <Typography variant="overline" display="block" gutterBottom>
            Link to lobby:
          </Typography>
          <div className="menu__linkBox">
            <Paper className="menu__link" variant="outlined" id="url">
              {fullUrl}
            </Paper>
            {copy ? (
              <Button variant="contained" className="button_copy" disabled>
                Copied
              </Button>
            ) : (
              <Button variant="contained" color="primary" className="button_copy" onClick={copyURL}>
                Copy
              </Button>
            )}
          </div>
          <div className="menu__masterButtons">
            <Button variant="contained" color="primary" onClick={handleStartGame}>
              Start game
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                SendWSMessage('removeRoom', roomKey, {});
              }}
            >
              Cancel game
            </Button>
          </div>
        </>
      ) : (
        <Button
          className="button_exit"
          variant="contained"
          color="primary"
          onClick={() => SendWSMessage('removeMember', roomKey, user)}
        >
          Exit
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
