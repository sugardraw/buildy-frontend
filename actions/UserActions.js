import { CREATE_USER, GET_USER, GET_USER_SUCCESS, GET_USER_FAILED } from './types';
import axios from 'axios';
import { api } from '../api/api';

const config = {
	headers : {
		Accept         : 'application/json',
		'Content-Type' : 'application/json'
	}
};

const userEndpoint = '/api/user/listAll';
const endpoint = '/api/user/save';

export function createUser() {
	return (dispatch) => {
		dispatch({ type: CREATE_USER });

		return axios
			.post(`${api}${endpoint}`, config)
			.then((response) => {
				dispatch({
					type    : CREATE_USER,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({
					type    : CREATE_USER,
					payload : []
				});
				return null;
			});
	};
}

export function getUser() {
	return (dispatch) => {
		dispatch({ type: GET_USER });

		return axios
			.get(`${api}${userEndpoint}`, config)
			.then((response) => {
				dispatch({
					type    : GET_USER_SUCCESS,
					payload : response.data
				});
			})
			.catch((error) => {
				dispatch({
					type    : GET_USER_FAILED,
					payload : []
				});
				return null;
			});
	};
}
