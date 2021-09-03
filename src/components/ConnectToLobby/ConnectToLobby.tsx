import { Avatar, Box, Button, Container, Grid, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../redux/reducers/user/userActions';
import { IState } from '../../types';
import Switcher from '../shared/Switcher';
import UploadButton from '../shared/UploadButton';

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
    width: theme.spacing(7),
    height: theme.spacing(7),
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
}));

const ConnectToLobby = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { firstName, lastName, jobPostion } = useSelector((state: IState) => state.user);
  const changeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const inputName = e.target.name as 'firstName' | 'lastName' | 'jobPostion';
    dispatch(setUser(inputName, e.target.value));
  };

  return (
    <Container component="div" maxWidth="xs">
      <div className={classes.paper}>
        <Typography variant="h5" gutterBottom>
          Connect to lobby
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              autoComplete="off"
              name="firstName"
              id="firstName"
              label="First Name"
              helperText=""
              value={firstName}
              onChange={changeHandler}
              fullWidth
              required
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="off"
              value={lastName}
              onChange={changeHandler}
              helperText=""
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="email"
              label="Job position"
              name="jobPostion"
              autoComplete="off"
              value={jobPostion}
              onChange={changeHandler}
              helperText=""
            />
          </Grid>
          <Grid item xs={7}>
            <Box component="div">
              <Typography variant="subtitle1" gutterBottom>
                Upload Avatar
              </Typography>
              <div className={classes.wrapper}>
                <Avatar alt="" src="" className={classes.avatar} />
                <UploadButton />
              </div>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <div className={classes.wrapper}>
              <Switcher />
              <Typography variant="subtitle1" gutterBottom>
                Connect as Observer
              </Typography>
            </div>
          </Grid>
        </Grid>
        <div className={classes.wrapper}>
          <Button variant="contained" color="primary">
            Confirm
          </Button>
          <Button variant="contained" color="secondary">
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default ConnectToLobby;
