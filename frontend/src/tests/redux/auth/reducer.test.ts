import {
  authFailed,
  authReducer,
  AuthState,
  fetchedLogin, fetchedLogout, fetchedMe,
  fetchedRegistration, fetchedSendEmail, fetchedSetPassword, fetchedVerifyCode, loginSuccess, logoutSuccess, meSuccess,
  registrationSuccess, sendEmailSuccess, setPasswordSuccess, verifyCodeSuccess
} from '../../../redux/ducks/auth/auth.slice';
import { IMeResponse } from '../../../api/auth.api';

const initialState: AuthState = {
  userId: null,
  roles: null,
  username: null,
  isAuth: false,
  loading: false,
  isRegister: false,
  error: null,
  token: null,
  forgotPassword: {
    isSendedMail: false,
    isVerifiedCode: false,
    isSetPassword: false,
  }
};


describe('Registration', () => {
  it('Request should be send',() => {
    const requestData = {
      email: 'oleg14ua71@gmail.com',
      username: 'stroka01',
      fullname: 'Oleh Strokan',
      password: '258120'
    }
    const action = fetchedRegistration(requestData);
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Registration should be success',() => {
    const action = registrationSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isRegister: true,
      loading: false
    })
  });
  it('Registration should be failed',() => {
    const action = authFailed({ response: { data: { message: 'error' } }});
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error:  'error'
    })
  });
})

describe('Login', () => {
  it('Request should be send',() => {
    const requestData = {
      email: 'oleg14ua71@gmail.com',
      password: '258120'
    }
    const action = fetchedLogin(requestData);
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Login should be success',() => {
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
    const action = loginSuccess(responseData);
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isAuth: true,
      token: 'sdofijso3hef984f2983h3129dj23r38u',
      userId: 12,
      roles: [{
        id: 14,
        value: 'admin',
        description: 'permission for admin',
        UserRolesModel: {
          id: 13,
          roleId: 2,
          userId: 12
        }}],
      loading: false
    })
  });
})

describe('Logout', () => {
  it('Request should be send', function () {
    const action = fetchedLogout();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Logout should be success',  () => {
    const action = logoutSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuth: false,
      token: null,
      userId: null
    })
  });
})

describe('Auth/me', () => {
  it('Request should be send', function () {
    const action = fetchedMe();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Auth/me should be success',  () => {
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
    const action = meSuccess(responseData);
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      isAuth: true,
      userId: 12,
      username: 'stroka01',
      roles: [{
        id: 14,
        value: 'admin',
        description: 'permission for admin',
        UserRolesModel: {
          id: 13,
          roleId: 2,
          userId: 12
        }}],
    })
  });
})

describe('Send email', () => {
  it('Request should be send', function () {
    const action = fetchedSendEmail('oleg14ua71@gmail.com');
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Send email should be success', function () {
    const action = sendEmailSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      forgotPassword: {
        ...state.forgotPassword,
        isSendedMail: true,
      }
    })
  });
})


describe('`Verify code', () => {
  it('Request should be send', function () {
    const action = fetchedVerifyCode({ email: 'oleg14ua71@gmail.com', code: '192109'});
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Send email should be success', function () {
    const action = verifyCodeSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      forgotPassword: {
        ...state.forgotPassword,
        isVerifiedCode: true,
      }
    })
  });
})

describe('`Set password', () => {
  it('Request should be send', function () {
    const action = fetchedSetPassword({ email: 'oleg14ua71@gmail.com', code: '192109', password: '2392093'});
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true
    })
  });
  it('Set password should be success', function () {
    const action = setPasswordSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      forgotPassword: {
        ...state.forgotPassword,
        isSetPassword: true,
      }
    })
  });
})



