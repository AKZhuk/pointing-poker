import { Card, CardContent, Typography, Avatar, IconButton } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { IRootState, IUser } from '../../../types';
import './Members.scss';

const MemberCard = ({ member, isScrumMaster }: { member: IUser; isScrumMaster?: boolean }): JSX.Element => {
  const {
    user: { id },
    room: { roomKey },
  } = useSelector((state: IRootState) => state);

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Avatar alt="avatar" src={member.urlToImage} className="avatar" />
        <Typography variant="h6" component="h3">
          <Typography variant="caption" display="block" gutterBottom>
            {isScrumMaster && 'Scrum Master'} {id === member.id && `it's you`}
          </Typography>
          {`${member.firstName} ${member.lastName}`}
          <Typography variant="caption" display="block" gutterBottom>
            {member.jobPostion}
          </Typography>
        </Typography>
        {isScrumMaster ? (
          <div />
        ) : (
          <IconButton
            onClick={() => {
              SendWSMessage('removeMember', roomKey, member);
            }}
          >
            <BlockIcon fontSize="large" color="error" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberCard;
