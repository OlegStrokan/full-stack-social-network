import { registration } from '../../../redux/ducks/auth/saga';
import { AuthActionTypes } from '../../../redux/ducks/auth/action.types';
import { call, put } from 'redux-saga/effects';
import { authAPI } from '../../../api/auth.api';
import { authFailed, registrationSuccess } from '../../../redux/ducks/auth/auth.slice';

describe('Registration saga', () => {
  const requestData = {
    email: 'oleg14ua71@gmail.com',
    username: 'stroka01',
    fullname: 'Oleh Strokan',
    password: '258120'
  }
  it('Registration should be success',  () => {
    const saga = registration({ type: AuthActionTypes.FETCHED_REGISTRATION, payload: requestData});
    const response = { };

    expect(saga.next().value).toEqual(call(authAPI.registration, requestData))

    expect(saga.next(response).value).toEqual(put(registrationSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
  it('Registration should get an error',  () => {
    const saga = registration({ type: AuthActionTypes.FETCHED_REGISTRATION, payload: requestData});
    const response = { };

    expect(saga.next().value).toEqual(call(authAPI.registration, requestData))

    expect(saga.next(response).value).toEqual(put(authFailed(response)));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})
