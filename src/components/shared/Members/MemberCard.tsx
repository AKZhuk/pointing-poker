import { Card, CardContent, Typography, Avatar, IconButton } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useSelector } from 'react-redux';
import { SendWSMessage } from '../../../helpers/WebSocketApi';
import { IRootState, IUser } from '../../../types';
import './Members.scss';

const MemberCard = ({ member, isScrumMaster }: { member: IUser; isScrumMaster?: boolean }): JSX.Element => {
  const {
    room: { roomKey },
  } = useSelector((state: IRootState) => state);

  return (
    <Card className={isScrumMaster ? 'card__scrumMaster' : 'card'}>
      <CardContent className="card-content">
        <Avatar alt="Remy Shar.lastNamep" src={member.urlToImage} className="avatar" />
        <Typography variant="h6" component="h3">
          {isScrumMaster && (
            <Typography variant="caption" display="block" gutterBottom>
              Scrum Master
            </Typography>
          )}
          {`${member.firstName} ${member.lastName}`}
          <Typography variant="caption" display="block" gutterBottom>
            {member.jobPostion}
          </Typography>
        </Typography>
        {isScrumMaster ? null : (
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
