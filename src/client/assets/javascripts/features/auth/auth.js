// @flow

import { createStructuredSelector } from 'reselect';
import * as jwt from 'jsonwebtoken';

// Action Types

// Define types in the form of 'npm-module-or-myapp/feature-name/ACTION_TYPE_NAME'
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGOUT_USER = 'LOGOUT_USER';
const FETCH_PROTECTED_DATA_REQUEST = 'FETCH_PROTECTED_DATA_REQUEST';
const RECEIVE_PROTECTED_DATA = 'RECEIVE_PROTECTED_DATA';

// This will be used in our root reducer and selectors

export const NAME = 'auth';

// Define the initial state for `friends` module

type State = {
  token: ?string,
  isAuthenticated: boolean,
  isAuthenticating: boolean,
  statusText: ?string
};

const initialState: State = {
    token: null,
    isAuthenticated: false,
    isAuthenticating: false,
    statusText: null
};

export default function reducer(state: State = initialState, action: any = {}): State {

  const {type, payload} = action;

  switch (type) {

    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        isAuthenticating: true,
        statusText: null
      };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
        token: payload.token,
        statusText: 'You have been successfully logged in.'
      };
    }

    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        statusText: `Authentication Error: ${payload.status} ${payload.statusText}`
      };
    }

    case LOGOUT_USER: {
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        statusText: 'You have been successfully logged out.'
      };
    }

    default:
      return state;
  }

}

// Action Creators

import { checkHttpStatus, parseJSON } from '../../utils';
import { push } from 'react-router-redux';

export function loginUserSuccess(token: string) {
  localStorage.setItem('token', token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token
    }
  };
}

function loginUserFailure(error: Object) {
  localStorage.removeItem('token');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  };
}

function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  };
}

function logout() {
    localStorage.removeItem('token');
    return {
      type: LOGOUT_USER
    };
}

function logoutAndRedirect() {
  return (dispatch: Function) => {
    dispatch(logout());
    dispatch(push(null, '/login'));
  };
}

function receiveProtectedData(data: Object) {
  return {
    type: RECEIVE_PROTECTED_DATA,
    payload: {
      data: data
    }
  };
}

function fetchProtectedDataRequest() {
  return {
    type: FETCH_PROTECTED_DATA_REQUEST
  };
}

function loginUser(username: string, password: string, redirect: string="/") {
  return async dispatch => {
    try {
      dispatch(loginUserRequest());
      let response = await fakeFetch('http://localhost:8080/login', {
        method: 'post',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
      });
      // let status = await checkHttpStatus(response);
      // let json = await parseJSON(status);
      console.log(response)
      let json = JSON.parse(response.response);

      try {
        dispatch(loginUserSuccess(json.token));
        dispatch(push(null, redirect));
      } catch (e) {
        dispatch(loginUserFailure({
          response: { status: 403, statusText: 'Invalid token' }
        }));
      }
    } catch (e) {
      dispatch(loginUserFailure(e));
    }
  };
}

// Selectors

const auth = (state) => state[NAME];

export const selector = createStructuredSelector({
  auth
});

export const actionCreators = {
  loginUser
};

function fakeFetch(url, request_details) {
  let {username, password} = JSON.parse(request_details.body);
  if (username === 'a@b.com') {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({response: '{"token":"12345"}', status: 200}), 1000);
    });
  } else {
    return new Promise((resolve, reject) => {
      reject({response: { status: 403, statusText: 'Invalid token' }});
    });
  }
}
