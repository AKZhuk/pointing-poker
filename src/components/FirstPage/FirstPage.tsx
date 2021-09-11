import './FirstPage.scss';
import { Box, Button, Container, TextField, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { ChangeEvent } from 'react';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import firstPageLogo from '../../assets/img/MainLogo.svg';
import ConnectToLobby from '../ConnectToLobby/ConnectToLobby';
import PopUp from '../shared/PopUp';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { GameRole, PopUpNames } from '../../types';
import { setUser } from '../../redux/reducers/user/userActions';

const FirstPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const { ConnectToLobbyPopUp } = PopUpNames;
  const { scrumMaster, player } = GameRole;

  const changeHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    dispatch(setConnection('url', ev.target.value));
  };

  const handleOpen = (popUpName: keyof typeof PopUpNames) => {
    dispatch(setOpen(popUpName, true));
  };

  const setUserRole = (userRole: keyof typeof GameRole) => {
    dispatch(setUser('role', userRole));
  };

  return (
    <>
      <div className="firstPage" data-testid="FirstPage-test">
        <img className="firstPage__logo" src={firstPageLogo} alt="logo-404" />
        <Container>
          <Box marginBottom={4}>
            <Typography variant="h2" gutterBottom>
              Start your planning:
            </Typography>
          </Box>
          <Typography variant="overline" gutterBottom>
            Create session:
          </Typography>
          <Box display="inline" marginLeft={8}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setUserRole(scrumMaster);
                handleOpen(ConnectToLobbyPopUp);
              }}
            >
              Start new game
            </Button>
          </Box>
        </Container>
        <Box marginTop={10}>
          <Box marginBottom={3}>
            <Typography variant="h2" gutterBottom>
              Or:
            </Typography>
          </Box>
          <Typography variant="overline" align="center" gutterBottom>
            Connect to lobby by URL:
          </Typography>
          <Box marginLeft={5} marginRight={5} display="inline">
            <TextField className="firstPage__link" label="Enter URL" onChange={changeHandler} />
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setUserRole(player);
              handleOpen(ConnectToLobbyPopUp);
            }}
          >
            Connect
          </Button>
        </Box>
      </div>
      <PopUp content={<ConnectToLobby />} name={ConnectToLobbyPopUp} />
    </>
  );
};

export default FirstPage;
