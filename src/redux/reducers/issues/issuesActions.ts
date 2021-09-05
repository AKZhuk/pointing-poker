import { IIssue, IIssueAction } from '../../../types';

export const DELETE_ISSUE = 'DELETE_ISSUE';
export const ADD_ISSUE = 'ADD_ISSUE';

export const removeIssue = (issue: IIssue): IIssueAction => ({
  type: DELETE_ISSUE,
  payload: issue,
});

export const addIssue = (issue: IIssue): IIssueAction => ({
  type: ADD_ISSUE,
  payload: issue,
});
