import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actionCreators as friendsActions, selector } from '../';
import LoginLayout from './LoginLayout';

@connect(selector, (dispatch) => ({
  actions: bindActionCreators(friendsActions, dispatch)
}))
export default class LoginView extends Component {
  render() {
    return (
      <div>
        <LoginLayout {...this.props} />
      </div>
    );
  }
}
