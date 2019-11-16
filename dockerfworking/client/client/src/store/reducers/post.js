import {LOAD_POST, REMOVE_POST} from '../actionTypes';

const post = (state = [], action) => {
  switch(action.type) {
    case LOAD_POST:
      return {...action.post};
    case REMOVE_POST:
      return state = [];
    default: 
      return state;
  }
}

export default post;