import { coordinatesReducer, coordinatesActions, IСoordinatesSlice } from './slice';

describe('counter reducer', () => {
  const initialState: IСoordinatesSlice = {
    coordinates: [],
  };

  it('should handle coordinates', () => {
    const actual = coordinatesReducer(initialState, coordinatesActions.setCoordinates([[5, 4]]));
    expect(actual.coordinates).toEqual([[5, 4]]);
  });
});
