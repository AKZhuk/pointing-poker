import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { setOpen } from '../../../redux/reducers/popUp/popUpActions';
import { GameRole, IIssue, IRootState } from '../../../types';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { scoreTypes } from '../GameCards/GameCards';

const IssueCard = ({
  issue = undefined,
  editable = false,
  removable = false,
  setEditableIssue,
  handleCurrentIssue,
}: {
  issue?: IIssue | undefined;
  editable?: boolean;
  removable?: boolean;
  handleCurrentIssue?: (issue: IIssue) => void;
  setEditableIssue?: Dispatch<SetStateAction<IIssue>>;
}): JSX.Element => {
  const dispatch = useDispatch();
  const {
    user: { role, id },
    room: {
      roomKey,
      scrumMaster,
      route,
      gameSettings: { scoreType, cards },
      game: { activeIssueId },
    },
  } = useSelector((state: IRootState) => state);
  const editHandler = () => {
    if (setEditableIssue) {
      setEditableIssue(issue as IIssue);
    }
    dispatch(setOpen('ChangeIssuePopUp', true));
  };

  const handleClick = () => {
    if (issue && handleCurrentIssue) {
      handleCurrentIssue(issue);
    }
    if (role !== GameRole.scrumMaster) {
      dispatch(setOpen('IssueDetailsPopUp', true));
    }
  };
  const handleSelectChange = (e: ChangeEvent<any>) => {
    e.stopPropagation();
    if (issue) {
      const currentIssue: IIssue = JSON.parse(JSON.stringify(issue));
      currentIssue.finalScore = e.target.value;
      SendWSMessage('changeIssue', roomKey, { issue: currentIssue, id: issue.id });
    }
  };

  return (
    <Card elevation={4} className={activeIssueId === issue?.id ? 'card_active' : 'card'} onClick={handleClick}>
      <CardContent className="card-content">
        <Typography variant="h6" component="h6">
          {issue ? issue.title : 'Create issue'}
          <Typography variant="caption" display="block">
            {issue?.priority}
          </Typography>
        </Typography>
        <Box display="flex">
          {issue &&
            (route === 'game' || route === 'result') &&
            (id === scrumMaster.id && route !== 'result' ? (
              <FormControl margin="dense" variant="outlined" className="issue-formSelect">
                <InputLabel id="finalScoreId">final score</InputLabel>
                <Select
                  labelId="finalScoreId"
                  value={issue.finalScore}
                  onChange={handleSelectChange}
                  label="finalScore"
                >
                  <MenuItem value="-">-</MenuItem>
                  {scoreTypes[scoreType].slice(0, cards).map(elem => (
                    <MenuItem key={elem} value={elem}>
                      {elem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ) : (
              <Typography variant="button">
                Score: <span className="title">{issue.finalScore}</span>
              </Typography>
            ))}
          {editable && (
            <IconButton onClick={editHandler}>
              <EditIcon />
            </IconButton>
          )}
          {removable && (
            <IconButton
              aria-label="delete"
              color="secondary"
              onClick={() => SendWSMessage('removeIssue', roomKey, issue)}
            >
              <DeleteOutlineIcon color="error" />
            </IconButton>
          )}
          {!issue && (
            <IconButton onClick={() => dispatch(setOpen('CreateIssuePopUp', true))}>
              <AddIcon fontSize="large" />
            </IconButton>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
