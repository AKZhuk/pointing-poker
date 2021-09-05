import { IIssue, IIssueAction } from '../../../types';

export const DELETE_ISSUE = 'DELETE_ISSUE';

export const removeIssue = (issue: IIssue): IIssueAction => ({
  type: DELETE_ISSUE,
  payload: issue,
});
