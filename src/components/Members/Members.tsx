import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import { IRootState, IUser } from '../../types';

const Members = (): JSX.Element => {
  const members = useSelector((state: IRootState) => state.user.members);

  return (
    <div className="wrapper">
      <Typography variant="h5" gutterBottom>
        Members:
      </Typography>
      <div className="card-container">
        {members.map((member: IUser) => (
          <MemberCard key={member.lastName} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
