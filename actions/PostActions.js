import {
  GET_POSTS,
  GET_POSTS_SUCCESS,
  GET_POST,
  GET_POST_SUCCESS,
  GET_POST_FAILURE,
  CLEAR_POST
} from "./types";
import axios from "axios";
import { api } from "../api/api";

const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
};

const endpoint = "/api/professional/listAll";
export function getPosts() {
  return dispatch => {
    dispatch({ type: GET_POSTS });

    return axios
      .get(`${api}${endpoint}`, config)
      .then(response => {
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: GET_POSTS_SUCCESS,
          payload: []
        });
        return null;
      });
  };
}

export function getPost(_id) {
  return dispatch => {
    dispatch({ type: GET_POST });
    axios
      .get(`http://localhost:3001/${endpoint}/${_id}`, config)
      .then(response => {
        dispatch({
          type: GET_POST_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({ type: GET_POST_FAILURE, payload: error });
      });
  };
}

export function clearPost() {
  return { type: CLEAR_POST };
}
