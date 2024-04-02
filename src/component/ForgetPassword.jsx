import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {LoginUser,reset } from "../features/authSlice"
import { useAuth } from "../Context/AuthProvider";
import axios from 'axios';


const ForgetPassword = () => {
  const [email,setEmail] = useState("");
  const [msg,setMsg] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();
    

    const handleForgetpassword = async (e) =>{
      e.preventDefault();
      // if (email !== "") {
      //   //dispatch action from hooks
      //   auth.ForgetPassword(email);
      //   return;
      // }
      // alert("please provide a valid input");
      try {
        const formData = new FormData();
        formData.append('email', email);
      
       
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        };
  
        const response = await axios.post("https://api.bimbel-sinteta.id/api/v1/auth/forgot-password", formData, config);
        auth.setToken(response.data.token)
        navigate('/confirm-password');
       
        
        // if (response.status !== 200 || response.status !== 201) {
        //   throw new Error('Failed to add class');
        // }
       
       
  
        
      } catch (error) {
        setMsg(error.message);
      }
  

    }

  return (
    <section className="hero has-background-grey is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-4">
              <form className='box' onSubmit={handleForgetpassword}>
                {/* {isError && <p className='has-text-centered'>{message}</p>} */}
              <h1 className='title is-2 has-text-centered'>Sign In</h1>
                <div className="field">
                  <label  className="label">Email</label>
                  <div className="control">
                    <input type="text" className="input" name='email'  onChange={(e)=>setEmail(e.target.value)} placeholder='email'/>
                  </div>
                </div>
              
                <Link to='/'>
                  login
                </Link>
                <div className="field mt-5">
                  <button className='button is-succes is-fullwidth' type='submit'>
                   {/* {isLoading? "loading...": "Login"} */} forget password
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

export default ForgetPassword