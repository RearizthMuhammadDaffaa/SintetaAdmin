import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {LoginUser,reset } from "../features/authSlice"
import { useAuth } from "../Context/AuthProvider";
import axios from 'axios';

const ConfirmPassword = () => {
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [verficationCode,setVerificationCode] = useState("");
  const [msg,setMsg] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
 
 


  
    const handleSubmitEvent = async (e) => {
      e.preventDefault();
      try {
        const formData = new FormData();
        formData.append('new_password', password);
        formData.append('confirm_password', confirmPassword);
        formData.append('verificationToken', verficationCode);
      
       
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${auth.token}`,
          }
        };
  
        const response = await axios.post("https://api.bimbel-sinteta.id/api/v1/auth/confirm-password", formData, config);
        // if (response.status !== 200 || response.status !== 201) {
        //   throw new Error('Failed to add class');
      
        // }
        navigate('/');
       
  
        
      } catch (error) {
        setMsg(error.message);
      }
    };
  
   

  return (
    <section className="hero has-background-grey is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className='box' onSubmit={handleSubmitEvent}>
                {/* {isError && <p className='has-text-centered'>{message}</p>} */}
              <h1 className='title is-2 has-text-centered'>Sign In</h1>
                <div className="field">
                  <label  className="label">New password</label>
                  <div className="control">
                    <input type="password" className="input" name='password'  onChange={(e)=>setPassword(e.target.value)} placeholder=' new password'/>
                  </div>
                </div>
                <div className="field">
                  <label  className="label">Confirm Password</label>
                  <div className="control">
                    <input type="password" className="input" name='confirm-password'  onChange={(e)=> setConfirmPassword(e.target.value)}   placeholder='confirm password'/>
                  </div>
                </div>

                <div className="field">
                  <label  className="label">Verification Code</label>
                  <div className="control">
                    <input type="text" className="input" name='verification'  onChange={(e)=> setVerificationCode(e.target.value)}   placeholder='code verification'/>
                  </div>
                </div>
                <div className="field mt-5">
                  <button className='button is-succes is-fullwidth' type='submit'>
                   {/* {isLoading? "loading...": "Login"} */} Confirm
                  </button>
                </div>
              </form>
               
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ConfirmPassword