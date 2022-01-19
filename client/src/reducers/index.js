import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import event from './event';
import ticket from './ticket';
import venue from './venue';
import category from './category';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  event,
  ticket,
  venue,
  category
});
