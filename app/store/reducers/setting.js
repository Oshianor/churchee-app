import { CHANGE_MODE, CHANGE_FONT_SIZE, CHANGE_BASE_COLOR, TOGGLE_HOME_SECTIONS } from "../types";


const initialstate = {
  mode: false,
  baseColor: '#4cd964',
  icon: 'black',
  fontSize: 14,
  titleSize: 22,
  primary: 'black',
  accent: 'white',
  background: 'white',
  surface: 'white',
  text: 'black',
  disabled: 'gray',
  placeholder: 'gray',
  backdrop: 'gray',
};

export default (state = initialstate, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      const surface = !action.payload ? 'white' : '#3c3d3d';
      const text = !action.payload ? 'black' : 'white';
      const primary = !action.payload ? 'black' : 'white';
      const background = !action.payload ? 'white' : 'black';
      const icon = !action.payload ? 'black' : 'white';
      return Object.assign({}, state, {
        surface,
        icon,
        text,
        primary,
        background,
        mode: action.payload,
      });
    case CHANGE_FONT_SIZE:
      return Object.assign({}, state, {
        fontSize: action.payload,
        titleSize: action.payload + 5
      });
    case CHANGE_BASE_COLOR:
      return Object.assign({}, state, {
        baseColor: action.payload,
      });
    case TOGGLE_HOME_SECTIONS:
      return Object.assign({}, state, {
        [action.payload.type]: action.payload.data,
      });
    default:
      return state;
  }
};



// white mode
// const initialstate = {
//   mode: false,
//   baseColor: '#4cd964',
//   icon: 'black',
//   fontSize: 14,
//   titleSize: 22,
//   primary: 'black',
//   accent: 'white',
//   background: 'white',
//   surface: 'white',
//   text: 'black',
//   disabled: 'gray',
//   placeholder: 'gray',
//   backdrop: 'gray',
// };


// dark mode
// const initialstate = {
//   mode: true,
//   baseColor: '#4cd964',
//   icon: 'white',
//   fontSize: 14,
//   titleSize: 22,
//   primary: 'white',
//   accent: 'white',
//   background: 'black',
//   surface: '#3c3d3d',
//   text: 'white',
//   disabled: 'gray',
//   placeholder: 'gray',
//   backdrop: 'gray',
// };