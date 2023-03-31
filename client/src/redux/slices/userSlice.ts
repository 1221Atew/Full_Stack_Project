import { createSlice } from "@reduxjs/toolkit";

import { Users} from "../../types/types";

type InitialState ={
    user: Users,
    isLoggedIn: boolean,
    incorrectMessage: string,
}
const initialState: InitialState = {
    user: {
        firstName: '',
        lastName: '',
        age: 0,
        postCode: '',
        address: '',
        email:'',
        password:''
    },
    isLoggedIn: false,
    incorrectMessage: ''
}
const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        getUserData: (state, action) =>{
            state.user = action.payload;
        },
        getLogInfo: (state, action)=>{
            state.isLoggedIn = action.payload;
            localStorage.setItem("LoginInfo", JSON.stringify(state.isLoggedIn))
        },
        getMessage: (state, action)=>{
            state.incorrectMessage= action.payload;
        }
    }
})
export const userActions = usersSlice.actions;
const userReducer = usersSlice.reducer;
export default userReducer;