import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FormAddFacility = () => {
  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [desc,setDesc] = useState('');
  const [img,setImg] = useState(null);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file)
  }

  const saveFacility = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('description', desc);
      formData.append('image',img)

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.post("https://api.bimbel-sinteta.id/api/v1/facility/add-facility", formData, config);
      // if (response.status !== 200 || response.status !== 201) {
      //   throw new Error('Failed to add class');
      // }
      navigate('/facility');
     

      
    } catch (error) {
      setMsg(error.message);
    }

  }
  return (
    <div>
       <h1 className='title'>Fasilitas</h1>
      <h2 className='subtitle'>Add New Fasilitas</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
          <form onSubmit={saveFacility}>
            <p className='has-text-centered'>{msg}</p>
          <div className="field">
                  <label  className="label">Name</label>
                  <div className="control">
                    <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='kelas'/>
                  </div>
                </div>

                <div className="field">
                  <label  className="label">About</label>
                  <div className="control">
                    <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input" placeholder='About'/>
                  </div>
                </div>

                <div className="field">
                  <label  className="label">Description</label>
                  <div className="control">
                    <input type="text" className="input" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Description'/>
                  </div>
                </div>

              

                <div className="field">
                  <label  className="label">Grade</label>
                  <div className="control">
                    <input type="file" className="input" onChange={handleFileChange} placeholder='Grade'/>
                  </div>
                </div>
                
               
                
                <div className="field ">
                  <div className="control">

                  <button className='button is-succes '>Save</button>
                  </div>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FormAddFacility