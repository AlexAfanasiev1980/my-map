import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IСoordinatesSlice {
  coordinates: number[][]
}

const initialState: IСoordinatesSlice = {
  coordinates: []
};

export const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    setCoordinates: (state, action: PayloadAction<number[][]>) => {
      state.coordinates = action.payload;
    },
    setCoordinatesAsync: (state, action: PayloadAction<number[][]>) => {},
    setCoordinatesSuccess: (state) => {},
    setCoordinatesFailure: (state) => {},
  },
});

export const { actions: coordinatesActions, reducer: coordinatesReducer } =
coordinatesSlice;
