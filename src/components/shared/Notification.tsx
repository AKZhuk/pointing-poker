import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { ISeverity } from '../../types';

const Notification = ({
  isOpen,
  onClose,
  text,
  severity = 'warning',
}: {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  severity?: ISeverity;
}): JSX.Element => {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity={severity} variant="filled" onClose={onClose}>
        {text}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
