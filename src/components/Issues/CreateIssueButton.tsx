import { IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const CreateIssueButton = (): JSX.Element => {
  return (
    <IconButton>
      <AddIcon fontSize="large" />
    </IconButton>
  );
};

export default CreateIssueButton;
