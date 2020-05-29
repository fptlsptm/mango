import * as types from '../actions';
import { combineReducers } from 'redux';

//store
const init_auth_State = {
    mem_userid:null,
    mem_id:null,
    count:0,
    side:2,
}

//리듀서
const auth_con = (state = init_auth_State, action) => {
    switch(action.type) {
      case types.LOGIN:
          return Object.assign({}, state,{
            mem_userid:action.mem_userid,
            mem_id:action.mem_id
      });
      case types.LOGOUT:
          return Object.assign({}, state,{
            mem_userid:null,
            mem_id:null
      });

      case types.UPDATE_SIDE:
        let cou = state.side+2;
        return Object.assign({}, state,{
          side:cou,
      });
      default:

      return state;
    }
}




const DataApp = combineReducers({
    auth_con,
});

export default DataApp;
