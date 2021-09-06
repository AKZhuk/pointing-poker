import { useSelector } from 'react-redux';
import MemberCard from './MemberCard';
import { IRootState, IUser } from '../../types';
import Title from '../shared/Title';

const Members = (): JSX.Element => {
  const members = useSelector((state: IRootState) => state.user.members);

  return (
    <div className="wrapper">
      <Title text="Members:" />
      <div className="card-container">
        {members.map((member: IUser) => (
          <MemberCard key={member.lastName} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Members;
