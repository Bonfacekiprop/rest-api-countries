/* eslint-disable indent */
import { filterActionTypes } from "../actions/actions";

const filterInitialState = {
  filterParam: "All",
};

export default function filterReducer(state = filterInitialState, action) {
  switch (action.type) {
    case filterActionTypes.SETFILTERPARAM:
      return {
        ...state,
        filterParam: action.payload,
      };
    default:
      return state;
  }
}
