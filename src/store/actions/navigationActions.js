export const handleMenu = (isOpen) => ({
  type: 'OPEN_MENU',
  payload: isOpen
});

export const changeLocation = location => ({
  type: 'CHANGE_LOCATION',
  payload: location
});

export const changeLastLocation = location => ({
  type: 'LAST_LOCATION',
  payload: location
});

export const setCurrentSetId = id => ({
  type: 'CURRENT_SET_ID',
  payload: id
});


export const enableEditSet = () => ({
  type: 'ENABLE_CREATE_SET',
  payload: false
});
