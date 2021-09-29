import { Dispatch } from 'react';
import { useSelector } from 'react-redux';
import { Card, CardContent, Typography } from '@material-ui/core';
import Title from '../shared/Title';
import MemberCard from '../shared/Members/MemberCard';
import { GameRole, IRootState, IUser } from '../../types';

const Votes = ({ setKickUser }: { setKickUser: Dispatch<IUser | null> }): JSX.Element => {
  const handleUser = (member: IUser) => {
    setKickUser(member);
  };

  const {
    room: {
      members,
      game: { activeIssueId, vote },
      scrumMaster,
      gameSettings: { scoreType, ScrumMasterAsPlayer },
    },
  } = useSelector((state: IRootState) => state);

  const findUserVoice = (userId: string): string => {
    const voice = activeIssueId !== '' && vote[activeIssueId].find(elem => elem.userId === userId);
    return voice ? `${voice.voice} ${scoreType}` : 'In progress';
  };

  return (
    <section>
      <Title text="Votes:" variant="h5" align="left" />
      {members
        ?.filter(member => member.role === GameRole.player)
        .map((member: IUser) => (
          <div key={member.id} className="vote">
            <Card className="card card__sm" elevation={4}>
              <CardContent className="card-content">
                <Typography variant="h6">{findUserVoice(member.id)}</Typography>
              </CardContent>
            </Card>
            <MemberCard member={member} onKickMember={handleUser} />
          </div>
        ))}
      {ScrumMasterAsPlayer && (
        <div className="vote" key={scrumMaster.id}>
          <Card className="card card__sm" elevation={4}>
            <CardContent className="card-content">
              <Typography variant="h6">{findUserVoice(scrumMaster.id)}</Typography>
            </CardContent>
          </Card>
          <MemberCard member={scrumMaster} />
        </div>
      )}
    </section>
  );
};

export default Votes;
