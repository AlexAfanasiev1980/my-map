import { delay, put, takeEvery, Effect, ForkEffect } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { coordinatesActions } from './slice';

export function* watchSetCoordinates(
  action: PayloadAction<number[][]>
): Generator<Effect, void> {
  try {
    if (action.payload.length === 0) {
      throw new Error('Invalid parameter');
    }
    yield delay(1000);
    yield put(coordinatesActions.setCoordinates(action.payload));
    yield put(coordinatesActions.setCoordinatesSuccess());
  } catch (error) {
    yield put(coordinatesActions.setCoordinatesFailure());
  }
}

export function* watchCounterSagas(): Generator<ForkEffect, void> {
  yield takeEvery(coordinatesActions.setCoordinatesAsync, watchSetCoordinates);
}

const counterSagas = watchCounterSagas;

export default counterSagas;
