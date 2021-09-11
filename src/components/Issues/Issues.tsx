import { useSelector } from 'react-redux';
import { GameRole, IIssue, IRootState } from '../../types';
import CreateIssue from '../CreateIssue/CreateIssue';
import PopUp from '../shared/PopUp';

import IssueCard from './IssueCard';

const Issues = (): JSX.Element => {
  const {
    issues,
    user: {
      user: { role },
    },
  } = useSelector((state: IRootState) => state);

  return (
    <>
      {issues.map((issue: IIssue) =>
        role === GameRole.scrumMaster ? (
          <>
            <IssueCard key={issue.title} issue={issue} editable removable />
          </>
        ) : (
          <IssueCard key={issue.title} issue={issue} />
        ),
      )}
      {role === 'scrumMaster' && (
        <>
          <IssueCard />
          <PopUp content={<CreateIssue />} name="CreateIssuePopUp" />
        </>
      )}
    </>
  );
};

export default Issues;
