import { CLOSE_POPUP, OPEN_POPUP, PopupActionTypes, PopupState, PopupStatus } from './types';

const initialState: PopupState = {
  status: PopupStatus.Close
};

export function popupReducer(
  state = initialState,
  action: PopupActionTypes
): PopupState {
  switch (action.type) {
    case OPEN_POPUP:
      const {status, todo} = action.payload;
      return {status, todo};
    case CLOSE_POPUP:
      return {
        status: PopupStatus.Close,
        todo: undefined
      }
    default:
      return state;
  }
}