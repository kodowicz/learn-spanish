import * as types from "../../constants/actionTypes";

export const handleMenu = isOpen => ({
  type: types.OPEN_MENU,
  payload: isOpen
});

export const changeLocation = location => ({
  type: types.CHANGE_LOCATION,
  payload: location
});

export const changeLastLocation = location => ({
  type: types.LAST_LOCATION,
  payload: location
});

export const setCurrentSetId = id => ({
  type: types.CURRENT_SET_ID,
  payload: id
});

// replace ?
export const enableEditSet = () => ({
  type: types.ENABLE_EDIT_SET
});

export const enableCreateSet = () => ({
  type: types.ENABLE_CREATE_SET
});

export const setContentHeight = height => ({
  type: types.SET_CONTENT_HEIGHT,
  payload: height
});

export const setPageScroll = isScrollTop => ({
  type: types.SET_PAGE_SCROLL,
  payload: isScrollTop
});

export const scrollToTop = isScrollTop => ({
  type: types.SCROLL_TO_TOP,
  payload: isScrollTop
});
