import { useSelector } from 'react-redux';
import { GameRole, IIssue, IRootState } from '../../../types';
import CreateIssue from './CreateIssue';
import IssueCard from './IssueCard';
import PopUp from '../PopUp';

const Issues = (): JSX.Element => {
  const {
    room: { issues },
    user,
  } = useSelector((state: IRootState) => state);

  return (
    <>
      {issues.map((issue: IIssue) =>
        user.role === GameRole.scrumMaster ? (
          <>
            <IssueCard key={issue.id} issue={issue} editable removable />
          </>
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
    </>
  );
};

export default Issues;
