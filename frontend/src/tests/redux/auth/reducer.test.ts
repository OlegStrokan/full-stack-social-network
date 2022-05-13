import {
  authReducer,
  AuthState,
  fetchedLogin,
  fetchedRegistration, loginSuccess,
  registrationSuccess
} from '../../../redux/ducks/auth/auth.slice';
import { IRoleDto } from '../../../types/role/role.dto';

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
    const action = registrationSuccess();
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: false,
      error: { response: { data: { message: 'error' } } }
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
