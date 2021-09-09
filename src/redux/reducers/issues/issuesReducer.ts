import { IIssue, IIssueAction } from '../../../types';
import { ADD_ISSUE, DELETE_ISSUE } from './issuesActions';

export const defaultIssuesState: IIssue[] = [{ title: 'issue 12', priority: 'high', link: 'dssd/sds/' }];

export const issuesReducer = (state = defaultIssuesState, action: IIssueAction): IIssue[] => {
  switch (action.type) {
    case DELETE_ISSUE:
      return state.filter(issue => issue !== action.payload);
    case ADD_ISSUE:
      return [...state, action.payload];
    default:
      return state;
  }
};
