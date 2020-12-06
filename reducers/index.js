import { Action, State } from '../constants';

const initialState = {
  imagesPerPage: 12,
  gallery: {
    images: [],
    state: State.SUCCESS
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_IMAGES:
      return {
        ...state,
        gallery: action.payload,
      }
    default:
      return state;
  }
}