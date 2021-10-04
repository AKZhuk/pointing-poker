import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

function Notification({ isOpen, onClose, text }: { isOpen: boolean; onClose: () => void; text: string }): JSX.Element {
  return (
    <Snackbar
      open={isOpen}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Alert severity="warning" variant="filled">
        {text}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
