import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const FormEditTestimonial = () => {
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
      formData.append('grade', year);
      formData.append('description', grade);
        formData.append('image', img);
      

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.put(`https://api.bimbel-sinteta.id/api/v1/testimonial/update-testimonial/${id}`, formData, config);
      if (response.status !== 200) {
        throw new Error('Failed to add class');
      }
      navigate('/testimonial');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  
  }

  const getKelasById = async() => {
    const response = await axios.get(`https://api.bimbel-sinteta.id/api/v1/testimonial/${id}`)
    setName(response.data.data.name)
    setAbout(response.data.data.graduatedFrom)
    setDesc(response.data.data.acceptedSchool)
    setYear(response.data.data.grade)
    setGrade(response.data.data.description)
    setImg(response.data.data.picture)
    console.log(response.data.data);
  }

  useEffect(()=>{
    getKelasById();
    console.log(img);
  },[])


  return (
    <div>
    <h1 className='title'>Testimoni</h1>
   <h2 className='subtitle'>Edit Testimoni</h2>
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
               <label  className="label">Grade</label>
               <div className="control">
               <div class="select">
                  <select value={year} onChange={(e)=>setYear(e.target.value)}>
                    <option>{year}</option>
                    <option value='sd'>SD</option>
                    <option value='smp'>SMP</option>
                    <option value='sma'>SMA</option>
                  </select>
                </div>
                
               </div>
             </div>

             <div className="field">
               <label  className="label">Description</label>
               <div className="control">
                 {/* <input type="text" className="input" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder='Jurusan'/> */}
                 <textarea name="" id="" value={grade} onChange={(e)=>setGrade(e.target.value)} className='textarea' placeholder='descripsi'>{grade}</textarea>
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

export default FormEditTestimonial