import { login, logout, me, registration, sendEmail, setPassword, verifyCode } from '../../../redux/ducks/auth/saga';
import { AuthActionTypes } from '../../../redux/ducks/auth/action.types';
import { call, put } from 'redux-saga/effects';
import { authAPI, IMeResponse } from '../../../api/auth.api';
import {
  authFailed,
  loginSuccess,
  logoutSuccess,
  meSuccess,
  registrationSuccess, sendEmailSuccess, setPasswordSuccess, verifyCodeSuccess
} from '../../../redux/ducks/auth/auth.slice';
import { cloneableGenerator } from '@redux-saga/testing-utils';

describe('Registration saga', () => {
  const requestData = {
    email: 'oleg14ua71@gmail.com',
    username: 'stroka01',
    fullname: 'Oleh Strokan',
    password: '258120'
  }

  const g = cloneableGenerator(registration)({ type: AuthActionTypes.FETCHED_REGISTRATION, payload: requestData});

  it('Registration should be success',  () => {
    const saga = g.clone()
    const response = {};
    expect(saga.next().value).toEqual(call(authAPI.registration, requestData))

    expect(saga.next(response).value).toEqual(put(registrationSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
  it('Registration should get an error',  () => {
    const saga = g.clone()
    const response = { response: { data: { message: 'error'} } };

     saga.next();

    expect(saga.throw!(response).value).toEqual(put(authFailed(response)));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})

describe('Login saga', () => {
  const requestData = {
    email: 'oleg14ua71@gmail.com',
    password: '258120'
  }
  it('Login should be success',  () => {
    const saga = login({ type: AuthActionTypes.FETCHED_LOGIN, payload: requestData});
    const responseData = {
      username: 'stroka01',
      id: 12,
      roles: [{
        id: 14,
        value: 'admin',
        description: 'permission for admin',
        UserRolesModel: {
          id: 13,
          roleId: 2,
          userId: 12
        }}],
      iat: 19821892,
      exp: 19281821,
      token: 'sdofijso3hef984f2983h3129dj23r38u',
    }

    expect(saga.next().value).toEqual(call(authAPI.login, requestData))

    expect(saga.next(responseData).value).toEqual(put(loginSuccess(responseData)));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})

describe('Logout saga', () => {
  it('Login should be success',  () => {
    const saga = logout();

    expect(saga.next().value).toEqual(put(logoutSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})

describe('Auth/me saga', () => {
  it('Login should be success',  () => {
    const saga = me();
    const responseData: IMeResponse = {
      data: {
        id: 12,
        username: 'stroka01',
        iat: 209320392,
        exp: 230392093,
        roles: [{
          id: 14,
          value: 'admin',
          description: 'permission for admin',
          UserRolesModel: {
            id: 13,
            roleId: 2,
            userId: 12
          }}],
      }
    }

    expect(saga.next().value).toEqual(call(authAPI.me))

    expect(saga.next(responseData).value).toEqual(put(meSuccess(responseData)));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})


describe('Send Email saga', () => {
  const requestData ='oleg14ua71@gmail.com';
  it('Send email should be success',  () => {
    const saga = sendEmail({ type: AuthActionTypes.FETCHED_SEND_EMAIL, payload: requestData});


    expect(saga.next().value).toEqual(call(authAPI.sendEmail, requestData))

    expect(saga.next().value).toEqual(put(sendEmailSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})




describe('Verify code saga', () => {
  const requestData = {
    email: 'oleg14ua71@gmail.com',
    code: '258120'
  }
  it('Login should be success',  () => {
    const saga = verifyCode({ type: AuthActionTypes.FETCHED_VERIFY_CODE, payload: requestData});

    expect(saga.next().value).toEqual(call(authAPI.verifyCode, requestData))

    expect(saga.next().value).toEqual(put(verifyCodeSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})


describe('Set password saga', () => {
  const requestData = {
    email: 'oleg14ua71@gmail.com',
    code: '239102',
    password: '258120'
  }
  it('Login should be success',  () => {
    const saga = setPassword({ type: AuthActionTypes.FETCHED_SET_PASSWORD, payload: requestData});

    expect(saga.next().value).toEqual(call(authAPI.setPassword, requestData))

    expect(saga.next().value).toEqual(put(setPasswordSuccess()));

    expect(saga.next()).toEqual({ done: true, value: undefined })
  });
})
