import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const FormAddUser = () => {
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();
  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
    
     
      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };
      const response = await axios.post("https://api.bimbel-sinteta.id/api/v1/user/add-user", formData, config);
      // if (response.status !== 200 || response.status !== 201) {
      //   throw new Error('Failed to add class');
    
      // }
      navigate('/users');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <div>
       <h1 className='title'>Users</h1>
      <h2 className='subtitle'>Add New Users</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
          <form onSubmit={handleSubmitEvent}>
          <div className="field">
                  <label  className="label">Username</label>
                  <div className="control">
                    <input type="text" className="input" placeholder='username'  value={username} onChange={(e) => setUsername(e.target.value)}/>
                  </div>
                </div>

                <div className="field">
                  <label  className="label">Email</label>
                  <div className="control">
                    <input type="text" className="input" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                  </div>
                </div>
                <div className="field">
                  <label  className="label">Password</label>
                  <div className="control">
                    <input type="password" className="input" placeholder='******'  value={password} onChange={(e) => setPassword(e.target.value)}/>
                  </div>
                </div>
                {/* <div className="field">
                  <label  className="label">Confirm Password</label>
                  <div className="control">
                    <input type="password" className="input" placeholder='******'/>
                  </div>
                </div> */}
                {/* <div className="field">
                  <label  className="label">Role</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                <div className="field ">
                  <div className="control">

                  <button className='button is-succes ' type='submit'>Save</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddUser