import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button } from '@material-ui/core';
import { IpopUpProps, IState } from '../../types';
import { setOpen } from '../../redux/reducers/popUp/popUpActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: '10px',
    },
  }),
);

const PopUp = (props: IpopUpProps): JSX.Element => {
  const { content, buttonName } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: IState) => state.popUp);

  const handleOpen = () => {
    dispatch(setOpen('isOpen', true));
  };

  const handleClose = () => {
    dispatch(setOpen('isOpen', false));
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        {buttonName}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>{content}</div>
        </Fade>
      </Modal>
    </div>
  );
};
export default PopUp;
