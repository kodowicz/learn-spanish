export const chooseMethod = isOpen => ({
  type: "SWITCH_CHOICE_METHOD",
  payload: isOpen
});

export const cancelSesion = isCancelled => ({
  type: "CANCEL_SESION",
  payload: isCancelled
});

export const askForDeleting = isDeleted => ({
  type: "ASKING_TO_DELETE_SET",
  payload: isDeleted
});

export const openPasswordOverlay = isOpen => ({
  type: "OPEN_PASSWORD",
  payload: isOpen
});

export const closeChangePassword = isOpen => ({
  type: "CLOSE_PASSWORD",
  payload: isOpen
});

export const finishGame = isFinished => ({
  type: "GAME_OVER",
  payload: isFinished
});
