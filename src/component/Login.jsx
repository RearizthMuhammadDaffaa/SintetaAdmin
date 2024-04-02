import React from 'react'
import { useState,useEffect } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {LoginUser,reset } from "../features/authSlice"
import { useAuth } from "../Context/AuthProvider";

const Login = () => {
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const {user,isError,isSucces,isLoading ,message} = useSelector((state)=>state.auth); 
 
  // useEffect(()=>{
  //   if(user || isSucces){
  //     navigate("/dashboard");
  //   }
  //   dispatch(reset());
  // },[user,isSucces,dispatch,navigate])

  // const Auth = (e) =>{
  //   e.preventDefault();
  //   dispatch(LoginUser({email,password}));
  // }


    const [input, setInput] = useState({
      email: "",
      password: "",
    });
    const auth = useAuth();
  
    const handleSubmitEvent = (e) => {
      e.preventDefault();
      if (input.email !== "" && input.password !== "") {
        //dispatch action from hooks
        auth.loginAction(input);
        return;
      }
      alert("please provide a valid input");
    };
  
    const handleInput = (e) => {
      const { name, value } = e.target;
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    
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
                  <label  className="label">Email</label>
                  <div className="control">
                    <input type="text" className="input" name='email'  onChange={handleInput} placeholder='email'/>
                  </div>
                </div>
                <div className="field">
                  <label  className="label">Password</label>
                  <div className="control">
                    <input type="password" className="input" name='password'  onChange={handleInput}   placeholder='******'/>
                  </div>
                </div>
                <Link to='/forget-password'>
                  Forget Password
                </Link>
                <div className="field mt-5">
                  <button className='button is-succes is-fullwidth' type='submit'>
                   {/* {isLoading? "loading...": "Login"} */} Login
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

export default Login