import { SELECT_RASTER, SELECT_VECTOR } from '../constants/action-types';
//Initial state
const initialState = {
  rasterLayer: {},
  vectorLayer: {}
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_RASTER:
      return { ...state, rasterLayer: Object.assign({}, action.payload)};
    case SELECT_VECTOR:
      return { ...state, vectorLayer: Object.assign({}, action.payload) };
    default:
      return state;
  }
};
export default rootReducer;
