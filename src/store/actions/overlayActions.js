import * as types from "../../constants/actionTypes";

export const chooseMethod = isOpen => ({
  type: types.SWITCH_CHOICE_METHOD,
  payload: isOpen
});

export const cancelSesion = isCancelled => ({
  type: types.CANCEL_SESION,
  payload: isCancelled
});

export const askForDeleting = isDeleted => ({
  type: types.ASKING_TO_DELETE_SET,
  payload: isDeleted
});

export const openPasswordOverlay = isOpen => ({
  type: types.OPEN_PASSWORD,
  payload: isOpen
});

export const closeChangePassword = isOpen => ({
  type: types.CLOSE_PASSWORD,
  payload: isOpen
});

export const finishGame = isFinished => ({
  type: types.GAME_OVER,
  payload: isFinished
});
