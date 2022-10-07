export const filterActionTypes = {
  SETFILTERPARAM: "SETFILTERPARAM",
};

export const setFilterParam = (filterParam) => (dispatch) => {
  return dispatch({
    type: filterActionTypes.SETFILTERPARAM,
    payload: filterParam,
  });
};
