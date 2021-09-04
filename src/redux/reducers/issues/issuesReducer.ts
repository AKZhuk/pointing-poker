import { IIssue, IIssueAction } from '../../../types';
import { DELETE_ISSUE } from './issuesActions';

export const defaultIssuesState: IIssue[] = [
  { title: 'issue 12', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 13', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 14', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 15', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 15', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 16', priority: 'high', link: 'dssd/sds/' },
  { title: 'issue 121', priority: 'low', link: 'dssd/sds/' },
  { title: 'issue 12233', priority: 'high', link: 'dssd/sds/' },
];

export const issuesReducer = (state = defaultIssuesState, action: IIssueAction): IIssue[] => {
  switch (action.type) {
    case DELETE_ISSUE:
      return state.filter(issue => issue !== action.payload);
    default:
      return state;
  }
};
