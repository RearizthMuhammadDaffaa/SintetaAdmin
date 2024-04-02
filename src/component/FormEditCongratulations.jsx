import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditCongratulations = () => {
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
      formData.append('graduatedFrom', about);
      formData.append('acceptedSchool', desc);
      formData.append('yearAccepted', year);
      formData.append('major', grade);
        formData.append('image', img);
      

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.put(`https://api.bimbel-sinteta.id/api/v1/congratulation/update-congratulation/${id}`, formData, config);
      if (response.status !== 200) {
        throw new Error('Failed to add class');
      }
      navigate('/congratulations');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  
  }

  const getKelasById = async() => {
    const response = await axios.get(`https://api.bimbel-sinteta.id/api/v1/congratulation/${id}`)
    setName(response.data.data.name)
    setAbout(response.data.data.about)
    setDesc(response.data.data.description)
    setYear(response.data.data.yearAccepted)
    setGrade(response.data.data.grade)
    setImg(response.data.data.picture)
  }

  useEffect(()=>{
    getKelasById();
    console.log(img);
  },[])


  return (
    <div>
    <h1 className='title'>Kelolosan</h1>
   <h2 className='subtitle'>Edit Kelolosan</h2>
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
               <label  className="label">Asal Sekolah</label>
               <div className="control">
                 <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input" placeholder='asal sekolah'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Diterima di</label>
               <div className="control">
                 <input type="text" className="input" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Diterima di'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Tahun Diterima</label>
               <div className="control">
                 <input type="text" className="input" value={year} onChange={(e)=>setYear(e.target.value)} placeholder='Tahun Diterima'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Jurusan</label>
               <div className="control">
                 <input type="text" className="input" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder='Jurusan'/>
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

export default FormEditCongratulations