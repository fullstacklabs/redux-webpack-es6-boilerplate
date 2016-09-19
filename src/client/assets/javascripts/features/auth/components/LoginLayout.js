import React, { Component, PropTypes } from 'react';

import LoginForm from './LoginForm';

export default class FriendsLayout extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired
  };

  render() {
    const { actions } = this.props;

    return (
      <div className="friendListApp">
        <h1>Best Rappers List</h1>
        <LoginForm loginUser={actions.loginUser} />
      </div>
    );
  }
}
