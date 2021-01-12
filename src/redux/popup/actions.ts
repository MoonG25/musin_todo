import { Todo } from '../todo/types';
import { CLOSE_POPUP, OPEN_POPUP, PopupActionTypes, PopupStatus } from './types';

export function openPopup(status: PopupStatus, todo?: Todo): PopupActionTypes {
  return {
    type: OPEN_POPUP,
    payload: {status, todo}
  }
}

export function closePopup(): PopupActionTypes {
  return {
    type: CLOSE_POPUP
  }
}