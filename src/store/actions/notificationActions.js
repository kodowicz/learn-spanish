import * as types from "../../constants/actionTypes";

export const cleanNotification = () => ({
  type: types.CLEAN_NOTIFICATION
});

export const setNotification = message => ({
  type: types.INVALID_DATA,
  message
})
