import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditPromo = () => {
  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [desc,setDesc] = useState('');
  const [grade,setGrade] = useState('');
  const [year,setYear] = useState('');
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

  const updatekelas = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('about', about);
      formData.append('description', desc);
      formData.append('expired', grade);
        formData.append('image', img);
      

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.put(`https://api.bimbel-sinteta.id/api/v1/promo/update-promo/${id}`, formData, config);
      if (response.status !== 200) {
        throw new Error('Failed to add class');
      }
      navigate('/promo');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  
  }

  const getKelasById = async() => {
    const response = await axios.get(`https://api.bimbel-sinteta.id/api/v1/promo/${id}`)
    setName(response.data.data.name)
    setAbout(response.data.data.about)
    setDesc(response.data.data.description)
    const date = new Date(response.data.data.expired);
    const formattedDate = date.toISOString().split('T')[0];
    setGrade(formattedDate)
    setImg(response.data.data.picture)
  }

  useEffect(()=>{
    getKelasById();
  },[])


  return (
    <div>
    <h1 className='title'>Promo</h1>
   <h2 className='subtitle'>Edit Promo</h2>
   <div className="card is-shadowless">
     <div className="card-content">
       <div className="content">
       <form onSubmit={updatekelas}>
         <p className='has-text-centered'>{msg}</p>
       <div className="field">
               <label  className="label">Name</label>
               <div className="control">
                 <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='nama'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">About</label>
               <div className="control">
                 <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input" placeholder='asal sekolah'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Description</label>
               <div className="control">
                 <input type="text" className="input" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Diterima di'/>
               </div>
             </div>

             

             <div className="field">
               <label  className="label">Expired</label>
               <div className="control">
                 <input type="date" className="input" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder='Jurusan'/>
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

export default FormEditPromo