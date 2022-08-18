import axios from "axios";
import Swal from 'sweetalert2';

export const registerUser = (user) => async dispatch => {
    dispatch({ type: 'USER_REGISTER_REQUEST' })
    try {
        const res = await axios.post('/api/users/register', user);
        dispatch({ type: 'USER_REGISTER_SUCCESS', payload: res.data })
    } catch (error) {
        dispatch({ type: 'USER_REGISTER_FAIL', payload: error })
    }
}

export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
        const response = await axios.post('/api/users/login', user);
        console.log(response);
        dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
        localStorage.setItem("currentUser", JSON.stringify(response.data));
        window.location.href = "/";
    } catch (error) {
        dispatch({ type: "USER_LOGIN_FAIL", payload: error });
    }
};

export const logoutUser = () => dispatch => {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
}

export const getAllUsers = () => async (dispatch) => {
    dispatch({ type: "GET_USERS_REQUEST" });
    try {
        const res = await axios.get("/api/users/getallusers");
        console.log(res);
        dispatch({ type: "GET_USERS_SUCCESS", payload: res.data });
    } catch (err) {
        dispatch({ type: "GET_USERS_FAIL", payload: err });
    }
};

export const deleteUser = (userid) => async dispatch => {
    try {
        const res = await axios.post("/api/users/deleteuser", { userid });
        Swal.fire({
            icon: 'success',
            text: 'User deleted successfully!'
        });
        window.location.reload();
        console.log(res);
    } catch (error) {
        Swal.fire({
            icon: 'warning',
            text: 'Error while deleting User!'
        });
    }
};

export const makeAdmin = (userid) => async (dispatch, getState) => {
    dispatch({
        type: "USER_ADMIN_REQUEST",
    });
    try {
        await axios.post("/api/users/makeadmin", { userid });
        alert('This user is Sucessfully Admin now !!');
        const users = await axios.get("/api/users/getallusers");
        dispatch({
            type: "USER_ADMIN_SUCCESS",
            payload: users.data
        });
        window.location.href = "/admin/userlist";
    } catch (error) {
        dispatch({
            type: "USER_ADMIN_FAIL",
            payload: error
        });
    }
};