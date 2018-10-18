import { SELECT_RASTER, SELECT_VECTOR } from '../constants/action-types';

export const selectRasterLayer = rasterLayer => ({
  type: SELECT_RASTER,
  payload: rasterLayer
});

export const selectVectorLayer = vectorLayer => ({
  type: SELECT_VECTOR,
  payload: vectorLayer
});
