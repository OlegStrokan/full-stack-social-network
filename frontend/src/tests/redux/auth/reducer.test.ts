import { authReducer, AuthState, fetchedRegistration, registrationSuccess } from '../../../redux/ducks/auth/auth.slice';

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
