import axios from "axios"

export const CREATE_USER_START = "CREATE_USER_START";
export const CREATE_USER_SUCCESS = "CREATE_USER_SUCCESS";
export const CREATE_USER_FAIL = "CREATE_USER_FAIL";

export const createUserStart = user => ({
  type: CREATE_USER_START,
  payload: user
});

export const createUserSuccess = user => ({
  type: CREATE_USER_SUCCESS,
  payload: {
    ...user
  }
});

export const createUserFail = error => ({
  type: CREATE_USER_FAIL,
  payload: {
    error
  }
});

export const signUp = user => {

  return dispatch => {
    dispatch(createUserStart());

    axios
      .post("https://bw-weight-lifting.herokuapp.com/api/auth/register", user)
      .then(response => {
        console.log("SIGNUP SUCCESS", response);
        dispatch(createUserSuccess(response.data));
        localStorage.setItem("token", response.data.access_token)
        console.log(response);
      })
      .catch(error => {
        dispatch(createUserFail(error.response));
        console.log("SIGNUP ERROR", error);
      });
  };
};
