import { useSelector } from 'react-redux';
import { useState } from 'react';
import MemberCard from './MemberCard';
import { IRootState, IUser, PopUpNames } from '../../../types';
import Title from '../Title';
import KickMember from './KickMember';
import PopUp from '../PopUp';

const Members = (): JSX.Element => {
  const { deleteMemberPopUp } = PopUpNames;
  const { members } = useSelector((state: IRootState) => state.room);
  const [user, setUser] = useState<IUser | null>(null);

  const handleUser = (member: IUser) => {
    setUser(member);
  };

  return (
    <section>
      {members.length === 0 ? (
        <Title text="No members yet. Invite your teammates" variant="h5" align="left" />
      ) : (
        <>
          <Title text="Members:" variant="h5" align="left" />
          <div className="card-container">
            {members.map((member: IUser) => (
              <MemberCard key={member.id} member={member} onKickMember={handleUser} />
            ))}
          </div>
        </>
      )}
      <PopUp name={deleteMemberPopUp}>
        <KickMember member={user} popUpName={deleteMemberPopUp} />
      </PopUp>
    </section>
  );
};

export default Members;
