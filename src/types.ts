import { ChangeEvent } from 'react';

export interface IAction<T> {
  type: string;
  payload: { [key: string]: T };
}

export interface IIssueAction {
  type: string;
  payload: IIssue;
}

export interface IActionPopUp {
  type: string;
  payload?: { [key: string]: boolean };
}

export enum GameRole {
  scrumMaster = 'scrum master',
  player = 'player',
  observer = 'observer',
}

export interface IUser {
  firstName: string;
  lastName?: string;
  jobPostion?: string;
  urlToImage?: string;
  role: string;
}

export interface IGameSettings {
  ScrumMasterAsPlayer: boolean;
  changingCardInRoundEnd: boolean;
  isTimerNeeded: boolean;
  scoreType: keyof IScoreTypes;
  scoreTypeShort: string;
  flipCardsWhenAllVoted: boolean;
  addPlayerWhenGameStarted: boolean;
  timer?: string;
  cards: number;
}

export interface IPopUpProps {
  content: JSX.Element;
  name: keyof typeof PopUpNames;
}
export enum PopUpNames {
  isOpen = 'isOpen',
  ConnectToLobbyPopUp = 'ConnectToLobbyPopUp',
  CreateIssuePopUp = 'CreateIssuePopUp',
}

export type IPopUp = {
  [key in PopUpNames]: boolean;
};

export interface IUploadButtonProps {
  handleUpdateImage(imageURL: string): void;
}

export interface ISwitcherProps {
  label: string;
  name: string;
  handleChecked(e: ChangeEvent<HTMLInputElement>): void;
}

export interface IConnection {
  url: string;
}

export interface IIssue {
  title: string;
  priority: string;
  link: string;
}

export interface IRootState {
  connection: IConnection;
  user: { user: IUser; members: IUser[] };
  popUp: IPopUp;
  issues: { title: string; priority: string; link: string }[];
  gameSettings: IGameSettings;
}

export interface IUserState {
  user: IUser;
  members: IUser[];
}

export interface IScoreTypes {
  'power of 2': number[];
  'story point': number[];
  fibonacci: number[];
}
