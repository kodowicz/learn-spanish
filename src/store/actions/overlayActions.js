export const chooseMethod = isOpen => ({
  type: 'SWITCH_CHOICE_METHOD',
  isOpen
});

export const cancelSesion = isCancelled => ({
  type: 'CANCEL_SESION',
  isCancelled
});

export const askForDeleting = isDeleted => ({
  type: 'ASKING_TO_DELETE_SET',
  payload: isDeleted
})
