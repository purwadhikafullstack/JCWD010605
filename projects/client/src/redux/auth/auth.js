import user_types from "./types";
const init_state = {
  id: 0,
  username: "",
  avatar_url: "",
  name: "",
  description: "",
  email: "",
};

function userReducer(state = init_state, action) {
  //kumpulan action
  //akan mempengaruhi state
  //if direction === "login"
  //username => username dari data kita
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
    };
  } else if (action.type === user_types.USER_LOGOUT) {
    return init_state;
  }
  return state;
}

export default userReducer;

// npm i @reduxjs/toolkit
// npm i react-redux
//npm i redux
