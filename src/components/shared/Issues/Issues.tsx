import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { GameRole, IIssue, IRootState } from '../../../types';
import CreateIssue from './CreateIssue';
import IssueCard from './IssueCard';
import PopUp from '../PopUp';

const Issues = ({ className }: { className?: string }): JSX.Element => {
  const {
    room: { issues },
    user,
  } = useSelector((state: IRootState) => state);
  const [editableIssue, setEditableIssue]: // | [undefined, Dispatch<SetStateAction<undefined>>]
  [IIssue, Dispatch<SetStateAction<IIssue>>] = useState(issues[0]);

  return (
    <section className={className}>
      {issues.map((issue: IIssue) =>
        user.role === GameRole.scrumMaster ? (
          <section key={issue.id}>
            <IssueCard key={issue.id} issue={issue} editable removable setEditableIssue={setEditableIssue} />
          </section>
        ) : (
          <IssueCard key={issue.id} issue={issue} />
        ),
      )}
      {user.role === GameRole.scrumMaster && (
        <>
          <IssueCard />
          <PopUp content={<CreateIssue />} name="CreateIssuePopUp" />
          <PopUp content={<CreateIssue oldIssue={editableIssue} />} name="ChangeIssuePopUp" />
        </>
      )}
    </section>
  );
};

export default Issues;
