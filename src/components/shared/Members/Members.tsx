import { useSelector } from 'react-redux';
import { useState } from 'react';
import MemberCard from './MemberCard';
import { IRootState, IUser, PopUpNames } from '../../../types';
import Title from '../Title';
import KickMember from './KickMember';
import PopUp from '../PopUp';

const Members = (): JSX.Element => {
  const { deleteMemberPopUp } = PopUpNames;
  const room = useSelector((state: IRootState) => state.room);
  const [user, setUser] = useState<{ firstName: string; lastName: string | undefined; id: string }>({
    firstName: '',
    lastName: 'sd',
    id: '',
  });

  const handleUser = (firstName: string, lastName: string | undefined, id: string) => {
    setUser({
      firstName,
      lastName,
      id,
    });
  };

  return (
    <div className="wrapper">
      <Title text="Members:" variant="h5" align="left" />
      <div className="card-container">
        {room?.members.map((member: IUser) => (
          <MemberCard key={member.lastName} member={member} onKickMember={handleUser} />
        ))}
      </div>
      <PopUp content={<KickMember firstName={user.firstName} lastName={user.lastName} />} name={deleteMemberPopUp} />
    </div>
  );
};

export default Members;
