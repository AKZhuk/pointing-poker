import { Button, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delay } from '../../helpers/delay';
import { GameRole, IRootState } from '../../types';
import MemberCard from '../shared/Members/MemberCard';

const UserMenu = (): JSX.Element => {
  const history = useHistory();

  const [copy, setCopy] = useState(false);
  const {
    connection: { url },
    room: { scrumMaster },
    user: { role },
  } = useSelector((state: IRootState) => state);

  async function copyURL(): Promise<void> {
    navigator.clipboard.writeText(url);
    setCopy(true);
    await delay(1.5);
    setCopy(false);
  }

  const handleStartGame = () => {
    history.push('/game');
  };

  return (
    <div className="menu">
      <MemberCard member={scrumMaster} isScrumMaster />
      {role === GameRole.scrumMaster ? (
        <div className="menu__scramMaster">
          <Typography variant="overline" display="block" gutterBottom>
            Link to lobby:
          </Typography>
          <div className="menu__linkBox">
            <Paper className="menu__link" variant="outlined" id="url">
              {`${window.location.host}/${url}`}
            </Paper>
            {copy ? (
              <Button variant="contained" disabled>
                Copied
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={copyURL}>
                Copy
              </Button>
            )}
          </div>
          <div className="menu__masterButtons">
            <Button variant="contained" color="primary" onClick={handleStartGame}>
              Start game
            </Button>
            <Button variant="contained" color="secondary">
              Cancel game
            </Button>
          </div>
        </div>
      ) : (
        <div className="menu__memberButtons">
          <Button variant="contained" color="primary">
            Exit
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
