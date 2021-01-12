import { Todo } from "../todo/types";

export enum PopupStatus {
  Close, Open
};

export interface PopupState {
  todo?: Todo;
  status: PopupStatus;
}

export const OPEN_POPUP = 'popup/open';
export const CLOSE_POPUP = 'popup/close';

interface OpenPopupAction {
  type: typeof OPEN_POPUP;
  payload: {
    todo?: Todo;
    status: PopupStatus;
  };
}

interface ClosePopupAction {
  type: typeof CLOSE_POPUP;
}

export type PopupActionTypes 
  = OpenPopupAction 
  | ClosePopupAction;