import {useState} from "react"
import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'; 
import Button from '@mui/material/Button';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../redux/slices/userSlice';
import { useDispatch, useSelector} from 'react-redux';
import { RootState } from '../../redux/store';
import "./LogInForm.css"

YupPassword(Yup);
const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Please provide a valid password")
      .min(
        6,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
        )
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character') 
 });

 type InitialValues={
    email: string,
    password: string
 }
 export default function UserLogIn() {
  
  const url = `http://localhost:8004/users/login`;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state: RootState)=> state.users.incorrectMessage)
  const [showPassword, setShowPassword] = useState(false);

  const initialValues:InitialValues= {
        password: '',
        email: '',
  }
  function handleClickShowPassword(){
    setShowPassword(!showPassword);
  }
  function onSignUpHandler(){
    navigate("/register")
  }
    return (   
     <div className='form-container'>
     <Formik
       initialValues={initialValues}
       validationSchema={SignupSchema}
       onSubmit={(values, {resetForm}) => {
        axios.post(url, values).then((response)=>{
          const user = response.data;
          const token= user.token;
          localStorage.setItem("user",JSON.stringify(user))

          const now = new Date().getTime().toString();
          localStorage.setItem('setupTime', now)
          
          if (token){
            navigate("/profile");
            dispatch(userActions.getLogInfo(true))
            return;
          }
          const message = user.message;
          dispatch(userActions.getMessage(message))
          resetForm({values: initialValues})
        });
       }}
     >
       {({ errors, touched, handleChange}) => (
            <Form>
            {message?  <div className='error-message'>{message}</div>  : null}
            <div className="form-field">
            <InputLabel htmlFor="standard-adornment-password">
                  Enter your Email
            </InputLabel>
            <Input name="email" type="email" onChange={handleChange} />
                {errors.email && touched.email ? <div className='error-message'>{errors.email}</div> : null}
            </div>
            <div className="form-field">
            <InputLabel htmlFor="standard-adornment-password">
                  Enter your Password
            </InputLabel>
            <Input name="password" type={showPassword? "text": "password"} onChange={handleChange} className="form-field" endAdornment={
              <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
            }/>
              {errors.password && touched.password ? <div className='error-message'>{errors.password}</div> : null}
            </div>
           <Button type="submit">LogIn</Button>
           <span>Do'nt have account? <Button onClick={onSignUpHandler}>SignUp</Button></span>
         </Form> 
       )}
     </Formik>
      
     </div>
    );
 }
