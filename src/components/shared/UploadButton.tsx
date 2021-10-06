import { ChangeEvent } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, IUploadButtonProps } from '../../types';
import { SERVER_URL, uploadAvatar } from '../../helpers/HttpServerApi';
import { filterFileExtention } from '../../helpers/helpers';
import { setNotification } from '../../redux/reducers/room/roomActions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }),
);

const UploadButton = ({ fileHandler, accept, isDisabled }: IUploadButtonProps): JSX.Element => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const extentionsRegExps = {
    img: /jpg|png|svg|jpeg|gif/,
    excel: /xls|xlsx/,
  };
  const userid = useSelector((state: IRootState) => state.user.id);
  const handleChange = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file: File = (e.target.files as FileList)[0];
    if (accept === 'avatar') {
      if (file && filterFileExtention(file, extentionsRegExps.img)) {
        const res = await uploadAvatar(file, userid);
        if (res.result) fileHandler(`${SERVER_URL}/${res.result}`);
        else console.error(res.error);
      } else {
        dispatch(
          setNotification({
            text: 'Incorrect file type. File must be: jpg, png, svg, jpeg or gif',
            isOpen: true,
            severity: 'error',
          }),
        );
      }
    } else if (file && filterFileExtention(file, extentionsRegExps.excel)) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        fileHandler(reader.result);
      };
    } else
      dispatch(
        setNotification({ text: 'Incorrect file type. File must be: xls or xlsx', isOpen: true, severity: 'error' }),
      );
  };

  return (
    <div className={classes.root}>
      <label htmlFor="contained-button-file">
        <input
          accept={accept}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          disabled={isDisabled}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
};

export default UploadButton;
