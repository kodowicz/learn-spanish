export const handleMenu = isOpen => ({
  type: "OPEN_MENU",
  payload: isOpen
});

export const changeLocation = location => ({
  type: "CHANGE_LOCATION",
  payload: location
});

export const changeLastLocation = location => ({
  type: "LAST_LOCATION",
  payload: location
});

export const setCurrentSetId = id => ({
  type: "CURRENT_SET_ID",
  payload: id
});

// replace ?
export const enableEditSet = () => ({
  type: "ENABLE_EDIT_SET"
});

export const enableCreateSet = () => ({
  type: "ENABLE_CREATE_SET"
});

export const setContentHeight = height => ({
  type: "SET_CONTENT_HEIGHT",
  payload: height
});

export const setPageScroll = isScrollTop => ({
  type: "SET_PAGE_SCROLL",
  payload: isScrollTop
});

export const scrollToTop = isScrollTop => ({
  type: "SCROLL_TO_TOP",
  payload: isScrollTop
});
