export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

export const GET_POST = "GET_POST";
export const GET_POST_SUCCESS = "GET_POST_SUCCESS";
export const GET_POST_FAILURE = "GET_POST_FAILURE";
export const CLEAR_POST = "CLEAR_POST";

export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_USER = "GET_USER";
export const GET_USER_FAILED = "GET_USER_FAILED";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const SET_PASSWORD = "SET_PASSWORD";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";

/* export default function reducer(
	state = {
	  username: "",
	  password: "",
	  loginStatus: "uninitiated",
	  user: {}
	},
	action
  ) {
	switch (action.type) {
	  case "SET_USERNAME_STARTED": {
		console.log("In set username reducer");
		return { ...state, username: action.payload };
		break;
	  }
	  case "SET_PASSWORD_STARTED": {
		console.log("In set password reducer");
		return { ...state, password: action.payload };
		break;
	  }
	  case "DO_LOGIN_STARTED": {
		return { ...state, loginStatus: "ongoing" };
		break;
	  }
	  case "DO_LOGIN_SUCCESS": {
		return { ...state, loginStatus: "success", user: action.payload };
		break;
	  }
	  case "DO_LOGIN_FAILED": {
		return { ...state, loginStatus: "failed" };
		break;
	  }
	  default: {
		return state;
	  }
	}
  } */
