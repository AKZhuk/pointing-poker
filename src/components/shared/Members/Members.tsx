import { useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import { IRootState, IUser } from '../../../types';
import Title from '../Title';

const Members = (): JSX.Element => {
  const room = useSelector((state: IRootState) => state.room);

  return (
    <div className="wrapper">
      <Title text="Members:" variant="h5" align="left" />
      <div className="card-container">
        {room?.members.map((member: IUser) => (
          <MemberCard key={member.lastName} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
