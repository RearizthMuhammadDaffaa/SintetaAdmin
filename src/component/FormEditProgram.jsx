import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditProgram = () => {
  const [name,setName] = useState('');
  const [subName,setSubname] = useState('');
  const [about,setAbout] = useState('');
  const [desc,setDesc] = useState('');
  const [img,setImg] = useState(null);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();
  const {id} = useParams();
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      // Jika tidak ada file yang dipilih, tidak ada yang perlu dilakukan
      return;
    }
    setImg(file);  
   
  }

  const updateFacility = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('subName', subName);
      formData.append('about', about);
      formData.append('description', desc);
     
        formData.append('image', img);
      

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.put(`https://api.bimbel-sinteta.id/api/v1/program/update-program/${id}`, formData, config);
      if (response.status !== 200) {
        throw new Error('Failed to add class');
      }
      navigate('/program');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  
  }

  

  const getFacilityById = async() => {
    const response = await axios.get(`https://api.bimbel-sinteta.id/api/v1/program/${id}`)
    setName(response.data.data.name)
    setSubname(response.data.data.subName)
    setAbout(response.data.data.about)
    setDesc(response.data.data.description)
  
    setImg(response.data.data.picture)
  }

  useEffect(()=>{
    getFacilityById();
 
  },[])


  return (
    <div>
    <h1 className='title'>Program</h1>
   <h2 className='subtitle'>Edit Program</h2>
   <div className="card is-shadowless">
     <div className="card-content">
       <div className="content">
       <form onSubmit={updateFacility}>
         <p className='has-text-centered'>{msg}</p>
       <div className="field">
               <label  className="label">Name</label>
               <div className="control">
                 <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Program'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">SubName</label>
               <div className="control">
                 <input type="text" className="input" value={subName} onChange={(e)=>setSubname(e.target.value)} placeholder='Program'/>
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
               <label  className="label">Gambar</label>
               <div className="control">
                 <input type="file"  className="input" onChange={handleFileChange} placeholder='Grade'/>
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

export default FormEditProgram