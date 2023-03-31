import axios from "axios"

import { userActions } from '../slices/userSlice';
import { AppDispatch } from "../store";

export default function fetchUsersData(){
    const users = JSON.parse(localStorage.getItem("user")!);
    const userId= users.userData._id
    const accessToken = users.token
    const url = `http://localhost:8004/users/${userId}`;
    return (dispatch: AppDispatch) => {
        axios.get(url, {headers: {Authorization: `Bearer ${accessToken}`}})
        .then((res)=> res.data)
        .then((data)=> dispatch(userActions.getUserData(data)));
    }
}
