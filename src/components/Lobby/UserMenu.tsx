import { Button, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { delay } from '../../helpers/helpers';
import { SendWSMessage } from '../../helpers/WebSocketApi';
import { GameRole, IRootState, Routes } from '../../types';
import MemberCard from '../shared/Members/MemberCard';

const UserMenu = (): JSX.Element => {
  const [copy, setCopy] = useState(false);
  const [alertText, setAlertText] = useState('');
  const {
    connection: { url },
    room: { roomKey, scrumMaster, issues, members, gameSettings },
    user: { role },
    user,
  } = useSelector((state: IRootState) => state);
  const fullUrl = `${url}`;
  const copyURL = async (): Promise<void> => {
    navigator.clipboard.writeText(fullUrl);
    setCopy(true);
    await delay(1.5);
    setCopy(false);
  };
  const handleStartGame = async (): Promise<void> => {
    if (issues.length === 0) {
      setAlertText('Create at least one Issue');
      await delay(2);
      setAlertText('');
    } else if (members.length === 0) {
      setAlertText('Invite your teammates');
      await delay(2);
      setAlertText('');
    } else {
      SendWSMessage('changeSettings', roomKey, gameSettings);
      SendWSMessage('changeRoute', roomKey, Routes.game);
      SendWSMessage('setActiveIssue', roomKey, {});
    }
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
            <Button variant="contained" color="primary" disabled={!!alertText} onClick={handleStartGame}>
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
          {alertText && (
            <div className="menu__alertBox">
              <Alert severity="warning">{alertText}</Alert>
            </div>
          )}
        </>
      ) : (
        <Button
          className="button_exit"
          variant="contained"
          color="secondary"
          onClick={() => SendWSMessage('removeMember', roomKey, user)}
        >
          Exit
        </Button>
      )}
    </div>
  );
};

export default UserMenu;
