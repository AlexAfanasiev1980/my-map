import { runSaga } from 'redux-saga';
import { AnyAction } from '@reduxjs/toolkit';
import { watchSetCoordinates } from './saga';
import { coordinatesActions } from './slice';

describe('counter saga', () => {
  it('should handle coordinates', async () => {
    const dispatchedActions: AnyAction[] = [];
    const fakeStore = {
      getState: () => ({ coordinates: [[25, 56]] }),
      dispatch: (action: AnyAction) => dispatchedActions.push(action),
    };

    await runSaga(fakeStore, watchSetCoordinates, {
      payload: [[56, 25]],
      type: coordinatesActions.setCoordinatesAsync.type,
    }).toPromise();
    expect(dispatchedActions).toContainEqual(
      coordinatesActions.setCoordinates([[56, 25]])
    );
  });
});

it('should handle coordinates in case of failure', async () => {
  const dispatchedActions: AnyAction[] = [];
  const fakeStore = {
    getState: () => ({ coordinates: [] }),
    dispatch: (action: AnyAction) => dispatchedActions.push(action),
  };

  await runSaga(fakeStore, watchSetCoordinates, {
    payload: [],
    type: coordinatesActions.setCoordinates.type,
  }).toPromise();
  expect(dispatchedActions).toEqual([
    coordinatesActions.setCoordinatesFailure(),
  ]);
});

  it('should handle coordinates in case of success', async () => {
    const dispatchedActions: AnyAction[] = [];
    const fakeStore = {
      getState: () => ({ coordinates: [] }),
      dispatch: (action: AnyAction) => dispatchedActions.push(action),
    };
    await runSaga(fakeStore, watchSetCoordinates, {
      payload: [[25, 56]],
      type: coordinatesActions.setCoordinates.type,
    }).toPromise();
    expect(dispatchedActions).toEqual([
      coordinatesActions.setCoordinates([[25, 56]]),
      coordinatesActions.setCoordinatesSuccess(),
    ]);
  });
