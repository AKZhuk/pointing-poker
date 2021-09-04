import { Card, CardContent, Typography, Avatar, IconButton } from '@material-ui/core';
import BlockIcon from '@material-ui/icons/Block';
import { useDispatch } from 'react-redux';
import { removeMember } from '../../redux/reducers/user/userActions';
import { IUser } from '../../types';
import './Members.scss';

const MemberCard = ({ member }: { member: IUser }): JSX.Element => {
  const dispatch = useDispatch();
  const kickHandler = () => {
    dispatch(removeMember(member.lastName as string));
  };

  return (
    <Card className="card">
      <CardContent className="card-content">
        <Avatar alt="Remy Shar.lastNamep" src={member.urlToImage} className="avatar" />
        <Typography variant="h6" component="h3">
          {`${member.firstName} ${member.lastName}`}
          <Typography variant="caption" display="block" gutterBottom>
            {member.jobPostion}
          </Typography>
        </Typography>
        <IconButton onClick={kickHandler}>
          <BlockIcon fontSize="large" color="error" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default MemberCard;
