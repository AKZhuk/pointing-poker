import { Box, Button, Paper, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { GameRole, IRootState } from '../../types';
import MemberCard from '../Members/MemberCard';
import { delay } from '../helpers/delay';
import './UserMenu.scss';

const UserMenu = (): JSX.Element => {
  const user = useSelector((state: IRootState) => state.user.user);
  const scramMaster = useSelector((state: IRootState) => state.room.scrumMaster);
  const url = useSelector((state: IRootState) => state.connection.url);
  const [copy, setCopy] = useState(false);
  async function copyURL(): Promise<void> {
    navigator.clipboard.writeText(url);
    setCopy(true);
    await delay(1.5);
    setCopy(false);
  }
  return (
    <div className="menu">
      <Box marginBottom={3}>
        <Typography variant="overline" display="block" gutterBottom>
          Scram Master:
        </Typography>
        <MemberCard member={scramMaster} isScrumMaster />
      </Box>
      {user.role === GameRole.scrumMaster ? (
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
            <Button variant="contained" color="primary">
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
