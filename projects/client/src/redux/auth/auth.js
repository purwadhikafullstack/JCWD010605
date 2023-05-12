import user_types from "./types";
const init_state = {
  id: 0,
  username: "",
  avatar_url: "",
  name: "",
  description: "",
  email: "",
  checked: false
};

function userReducer(state = init_state, action) {

console.log(action.payload);
  if (action.type === user_types.USER_LOGIN) {
    return {
      ...state,
      id: action.payload.id,
      username: action.payload.username,
      email: action.payload.email,
      avatar_url: action.payload.avatar_url,
      name: action.payload.name,
      description: action.payload.description,
      checked: false
    }; 
  } else if (action.type === user_types.USER_LOGOUT) {
    return init_state;
  } else if (action.type === user_types.USER_CHECKED) {
    return {...state, checked: true}
  }
  return state;
}

export default userReducer;