import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { ChangeEvent, FormEvent, SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';
import { setDefaultUser, setUser } from '../../redux/reducers/user/userActions';
import { GameRole, IRootState, PopUpNames, Routes } from '../../types';
import Switcher from '../shared/Switcher';
import Title from '../shared/Title';
import UploadButton from '../shared/UploadButton';
import { setConnection } from '../../redux/reducers/connection/connectionActions';
import { setRoom } from '../../redux/reducers/room/roomActions';
import { CreateRoom, SendWSMessage } from '../../helpers/WebSocketApi';
import { getRoomKeyFromURL } from '../../helpers/helpers';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  wrapper: {
    width: '100%',
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

const ConnectToLobby = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { observer, player } = GameRole;
  const { ConnectToLobbyPopUp } = PopUpNames;
  const {
    user,
    user: { firstName, lastName, jobPostion, urlToImage, role },
    connection: { url, isConnected },
    room,
  } = useSelector((state: IRootState) => state);
  const [firstNameDirty, setFirstNameDirty] = useState(false);
  const [firstNameError, setFirstNameError] = useState(' ');
  const [formValid, setFormValid] = useState(false);
  const errorMessage = firstNameDirty && firstNameError ? firstNameError : ' ';
  const isValidationError = !!(firstNameDirty && firstNameError.length > 1);

  useEffect(() => {
    if (!isValidationError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [firstNameError, isValidationError]);

  const changeRoute = (route: keyof typeof Routes) => {
    const path = `/${route}`;
    history.push(path);
  };

  const validateInput = (inputName: string, value: string) => {
    if (inputName === 'firstName' && value.length > 0) {
      setFirstNameError(' ');
    } else if (inputName === 'firstName' && value.length === 0) {
      setFirstNameError('Имя не может быть пустым');
    }
  };

  const handleTextInputsChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputName = e.target.name as 'firstName' | 'lastName' | 'jobPostion';
    dispatch(setUser(inputName, e.target.value));
    validateInput(e.target.name, e.target.value);
  };

  const handleUpdateImage = (imageURL: string): void => {
    dispatch(setUser('urlToImage', imageURL));
  };

  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUser('role', e.target.checked ? observer : player));
  };

  const redirectToLobby = () => {
    if (isConnected) {
      changeRoute(Routes.lobby);
      dispatch(setOpen(ConnectToLobbyPopUp, false));
    }
  };

  const handleFormSubmit = (e: FormEvent): void => {
    e.preventDefault();
    if (firstName?.length > 0) {
      if (user.role === GameRole.scrumMaster) {
        room.scrumMaster = user;
        CreateRoom(room);
        dispatch(setRoom('scrumMaster', user));
      } else {
        SendWSMessage('addMember', getRoomKeyFromURL(url), user);
      }
      dispatch(setConnection('isGoToLobby', true));
      redirectToLobby();
    } else {
      validateInput('firstName', '');
    }
  };

  const handleCancelButton = (): void => {
    dispatch(setDefaultUser('firstName', ''));
    dispatch(setOpen(ConnectToLobbyPopUp, false));
  };

  const blurHandler = (e: SyntheticEvent): void => {
    const target = e.target as HTMLInputElement;
    switch (target.name) {
      case 'firstName':
        setFirstNameDirty(true);
        break;
      default:
        setFirstNameDirty(false);
    }
  };
  return (
    <Container component="div" maxWidth="xs">
      <div className={classes.paper}>
        <Title text="Connect to lobby" variant="h3" align="center" />
        <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={isValidationError}
                autoComplete="off"
                name="firstName"
                label="First Name"
                helperText={errorMessage}
                value={firstName}
                onChange={handleTextInputsChange}
                fullWidth
                required
                onBlur={blurHandler}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="off"
                value={lastName}
                onChange={handleTextInputsChange}
                helperText=" "
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job position"
                name="jobPostion"
                autoComplete="off"
                value={jobPostion}
                onChange={handleTextInputsChange}
                helperText=" "
              />
            </Grid>
            <Grid item xs={7}>
              <Box component="div">
                <Typography variant="subtitle1" gutterBottom>
                  Upload Avatar
                </Typography>
                <div className={classes.wrapper}>
                  <Avatar alt={firstName} src={urlToImage} className={classes.avatar} />
                  <UploadButton fileHandler={handleUpdateImage} accept={'image/*'} />
                </div>
              </Box>
            </Grid>
            {role !== GameRole.scrumMaster && (
              <Grid item xs={7}>
                <Switcher label="Connect as observer" name="role" handleChecked={handleChecked} />
              </Grid>
            )}
          </Grid>
          <div className={classes.wrapper}>
            <Button variant="contained" color="primary" type="submit" disabled={formValid}>
              Confirm
            </Button>
            <Button variant="contained" color="secondary" onClick={handleCancelButton}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default ConnectToLobby;
