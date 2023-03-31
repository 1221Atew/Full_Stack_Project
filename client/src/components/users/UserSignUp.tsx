import { Formik, Form} from 'formik';
import * as Yup from 'yup';
import YupPassword from 'yup-password'; 
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';
import {Snackbar, Alert} from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import "./SignUpForm.css"

YupPassword(Yup);
const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    lastName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    postCode: Yup.string()
      .min(3, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    address: Yup.string()
      .min(4, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    age: Yup.number()
      .min(18, 'Too Short!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required("Please provide a valid password")
      .min(
        6,'password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special'
        )
      .minLowercase(1, 'password must contain at least 1 lower case letter')
      .minUppercase(1, 'password must contain at least 1 upper case letter')
      .minNumbers(1, 'password must contain at least 1 number')
      .minSymbols(1, 'password must contain at least 1 special character'),
      confirmPassword: Yup.string().label('confirm password').required().oneOf([Yup.ref('password')], 'Passwords must match'),
  });

 export default function UserSignUp() {

  const url = `http://localhost:8004/users`;
  const navigate = useNavigate();
  const initialValues= {firstName: '',lastName: '',age: 0,postCode: '',address: '',password: '',confirmPassword: '',email: '',}
  const [open, setOpen] = useState(false);

  const handleClick = () => {setOpen(true)};
  const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
        ) => {
        if (reason === "clickaway") {
        return;
    }
        setOpen(false);
    };
    return (   
     <div className='form-container'>
     <Formik
       initialValues={initialValues}
       validationSchema={SignupSchema}
       onSubmit={(values, {resetForm}) => {
        axios.post(url, {
          firstName: values.firstName,
          lastName: values.lastName,
          age: values.age,
          postCode: values.postCode,
          address: values.address,
          email: values.email,
          password: values.password,
        });
        handleClick();
        navigate("/login");
        resetForm({values: initialValues})
       }}
     >
       {({ errors, touched, handleChange}) => (
            <Form>
            <div><h1>Registration Form</h1></div>
            <div className="form-field">
            <TextField label="Enter your First name" name="firstName" type="text" onChange={handleChange} />
                {errors.firstName && touched.firstName ? <div className='error-message'>{errors.firstName}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your Last name" name="lastName" type="text" onChange={handleChange} />
                {errors.lastName && touched.lastName ? <div className='error-message'>{errors.lastName}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your age" name="age" type="number" onChange={handleChange} />
                {errors.age && touched.age ? <div className='error-message'>{errors.age}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter post code" name="postCode" type="text" onChange={handleChange} />
                {errors.postCode && touched.postCode ? <div className='error-message'>{errors.postCode}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your address" name="address" type="text" onChange={handleChange} />
                {errors.address && touched.address ? <div className='error-message'>{errors.address}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your Email" name="email" type="email" onChange={handleChange} />
                {errors.email && touched.email ? <div className='error-message'>{errors.email}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your password" name="password" type="password" onChange={handleChange} className="form-field"/>
              {errors.password && touched.password ? <div className='error-message'>{errors.password}</div> : null}
            </div>
            <div className="form-field">
            <TextField label="Enter your password to confirm" name="confirmPassword" type="password" onChange={handleChange} className="form-field"/>
              {errors.confirmPassword && touched.confirmPassword ? <div className='error-message'>{errors.confirmPassword}</div> : null}
            </div>
           <Button type="submit">Sign Up</Button>
         </Form> 
       )}
    </Formik>
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
            Your are successfuly registered!
        </Alert>
    </Snackbar>
     </div>
    );
 }
