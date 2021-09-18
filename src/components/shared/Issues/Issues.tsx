import { useSelector } from 'react-redux';
import { GameRole, IIssue, IRootState } from '../../../types';
import CreateIssue from './CreateIssue';
import IssueCard from './IssueCard';
import PopUp from '../PopUp';

const Issues = ({ className }: { className?: string }): JSX.Element => {
  const {
    room: { issues },
    user,
  } = useSelector((state: IRootState) => state);

  return (
    <section className={className}>
      {issues.map((issue: IIssue) =>
        user.role === GameRole.scrumMaster ? (
          <section>
            <IssueCard key={issue.id} issue={issue} editable removable />
          </section>
        ) : (
          <IssueCard key={issue.id} issue={issue} />
        ),
      )}
      {user.role === 'scrumMaster' && (
        <>
          <IssueCard />
          <PopUp content={<CreateIssue />} name="CreateIssuePopUp" />
        </>
      )}
    </section>
  );
};

export default Issues;
