import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { IPopUp, IPopUpProps, IRootState, PopUpNames } from '../../types';
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

const PopUp = ({ content, name }: IPopUpProps): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const popUpState: IPopUp = useSelector((state: IRootState) => state.popUp);
  const getIsOpen = (): boolean => {
    const popUpStateName = Object.keys(popUpState).find<keyof typeof PopUpNames>(
      (key): key is keyof typeof PopUpNames => {
        return key === name;
      },
    );
    if (popUpStateName !== undefined) {
      return popUpState[popUpStateName] as boolean;
    }
    return popUpState.isOpen as boolean;
  };
  const isOpen = getIsOpen();

  const handleClose = () => {
    dispatch(setOpen(name, false));
  };

  return (
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
  );
};
export default PopUp;
