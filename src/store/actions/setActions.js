import * as types from "../../constants/actionTypes";

export const searchForSets = input => ({
  type: types.SEARCH_SETS,
  payload: input
});

export const sortTerms = () => ({
  type: types.SORT_TERMS
});
