import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import friends, { NAME as friendsName } from 'features/friends';
import auth, { NAME as authName } from 'features/auth';

export default combineReducers({
  routing,
  [friendsName]: friends,
  [authName]: auth
});
