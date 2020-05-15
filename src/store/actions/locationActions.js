export const changeLocation = location => ({
  type: 'CHANGE_LOCATION',
  location
});

export const changeLastLocation = location => ({
  type: 'LAST_LOCATION',
  location
});

export const setCurrentSetId = id => ({
  type: 'CURRENT_SET_ID',
  id
});


export const enableEditSet = () => ({
  type: 'ENABLE_CREATE_SET',
  payload: false
});
