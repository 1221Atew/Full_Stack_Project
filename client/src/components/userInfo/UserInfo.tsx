import { Button } from "@mui/material";
import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'; 
import { TextField } from '@mui/material';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { AppDispatch, RootState } from "../../redux/store";
import fetchUsersData from "../../redux/thunks/userThunk";
import "../users/SignUpForm.css"
import { userActions } from "../../redux/slices/userSlice";
import "./UserInfo.css"

YupPassword(Yup);
const SignupSchema = Yup.object().shape({
    postCode: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!'),
    address: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!'),
    password: Yup.string()
      .min(
        6,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
        )
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character') 
 })
type InitialValues ={
  postCode: string,
  address: string,
  password: string
}
export default function UserInformation() {

  const user = useSelector((state:RootState)=> state.users.user)
  const isLoggedIn:boolean = JSON.parse(localStorage.getItem("LoginInfo")!)
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const normalDispatch = useDispatch()
  const navigate = useNavigate();
  
    useEffect(()=>{
      if (isLoggedIn){dispatch(fetchUsersData());}
    },[dispatch, isLoggedIn])
  
function UserUpdateForm() {
    const users = JSON.parse(localStorage.getItem("user")!);
    const userId= users.userData._id;
    const accessToken = users.token;
    const url = `http://localhost:8004/users/${userId}`;
    const initialValues: InitialValues= {postCode: '', password:'', address: ''}
    return (   
     <div className='form-container'>
     <Formik
       initialValues={initialValues}
       validationSchema={SignupSchema}
       onSubmit={values => {
        axios.put(url, values, {
          headers: {Authorization: `Bearer ${accessToken}`}
        });
        setIsUpdated(false);
       }}
     >
       {({ errors, touched, handleChange}) => (
            <Form>
            <div className="form-field">
            <TextField label="Enter post code" name="postCode" type="text" onChange={handleChange} />
                {errors.postCode && touched.postCode ? <div className='error-message'>{errors.postCode}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your address" name="address" type="text" onChange={handleChange} />
                {errors.address && touched.address ? <div className='error-message'>{errors.address}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your password" name="password" type="password" onChange={handleChange} className="form-field"/>
              {errors.password && touched.password ? <div className='error-message'>{errors.password}</div> : null}
            </div>
           <Button type="submit">Update</Button>
         </Form> 
       )}
     </Formik>
     </div>
    );
  }

  function onUpdateHandler(){
    setIsUpdated(true);
  }

  function logOutHandler(){
    const message= '';
    localStorage.removeItem("user")
    localStorage.removeItem('setupTime');
    normalDispatch(userActions.getLogInfo(false));
    navigate("/login");
    normalDispatch(userActions.getMessage(message));
  }

  return (
    <div className="profiles">
      {isLoggedIn? 
        <div className="my-profiles">
          <div className="profile-detail">
            <div className="profile-name"><i>Name:- </i> {user.firstName} {user.lastName}</div>
            <div className="profile-email"><i>Email:- </i>{user.email}</div>
            <div className="profile-detail-update"><Button onClick={onUpdateHandler}>update my information</Button></div>
            <div>{isUpdated? <UserUpdateForm/>: null}</div>   
          </div>
          <div className="profile-button">
            <div className=""><Button type="submit" onClick={()=>logOutHandler()}>Log Out</Button></div>
          </div>
        </div>
      :
      <div>
        <h1>You have no access! You must Login first! </h1>
        <h1><Link to='/login'>Go</Link> to login page</h1>
      </div>
      }
                
    </div>
  );
}
