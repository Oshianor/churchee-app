import {combineReducers} from 'redux';
import bible from './bible';
import media from './media';
import devotion from './devotion';
import account from "./account";
import sermon from './sermon';
import setting from './setting';
import feedback from './feedback';
import country from './country';
import event from './event';
import pr from './pr';

const appReducer = combineReducers({
  account,
  bible,
  media,
  devotion,
  sermon,
  setting,
  feedback,
  country,
  event,
  pr
});

export default appReducer;
