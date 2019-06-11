export const changeLocation = location => ({
  type: 'CHANGE_LOCATION',
  location
});

export const changeLastLocation = location => ({
  type: 'LAST_LOCATION',
  location
});

export const currentSetId = id => ({
  type: 'CURRENT_SET_ID',
  id
})
