import { CREATE_USER, LOGIN, LOGOUT, SET_USERNAME, SET_PASSWORD, LOGIN_SUCCESS, LOGIN_FAILED } from '../actions/types';

export default (user = {}, action) => {
	switch (action.type) {
		case CREATE_USER:
			return action.user;
		case LOGIN:
			return action.user;
		case LOGOUT:
			return {};
		default:
			return user;
	}
};

/* export function CreateUser(
	state = {
		user : {}
	},
	action
) {
	switch (action.type) {
		case CREATE_USER: {
			return action.user;
		}
		case LOGIN: {
			return action.user;
		}
		case LOGOUT:
			return {};
	}
} */

/* export function UserLogin(
	state = {
		username    : '',
		password    : '',
		loginStatus : 'uninitiated',
		user        : {}
	},
	action
) {
	switch (action.type) {
		case SET_USERNAME: {
			console.log('In set username reducer');
			return { ...state, username: action.payload };
		}
		case SET_PASSWORD: {
			console.log('In set password reducer');
			return { ...state, password: action.payload };
		}
		case LOGIN: {
			return { ...state, loginStatus: 'ongoing' };
		}
		case LOGIN_SUCCESS: {
		}
		case LOGIN_FAILED: {
			return { ...state, loginStatus: 'failed' };
		}
		default: {
			return state;
		}
	}
} */
