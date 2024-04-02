import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FormAddTestimonial = () => {

  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [desc,setDesc] = useState('');
  const [grade,setGrade] = useState('');
  const [year,setYear] = useState('');
  const [img,setImg] = useState(null);
  const [msg,setMsg] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file)
  }

  const saveKelas = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('acceptedSchool', about);
      formData.append('graduatedFrom', desc);
      formData.append('grade', grade);
      formData.append('description', year);
      formData.append('image',img)

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.post("https://api.bimbel-sinteta.id/api/v1/testimonial/add-testimonial", formData, config);
      // if (response.status !== 200 || response.status !== 201) {
      //   throw new Error('Failed to add class');
      // }
      navigate('/testimonial');
     

      
    } catch (error) {
      setMsg(error.message);
    }
    // try {
    //   const token = localStorage.getItem('site');
    //   const config = {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
       
    //     }
    //   };
    //   await axios.post('https://api.bimbel-sinteta.id/api/v1/class/add-class',
    //   {
    //     name:name,
    //     about:about,
    //     desciption:desc,
    //     grade:grade,
    //     image:img
    //   },{
    //     headers :{
    //       'Authorization': `Bearer ${token}`,
    //       'Content-Type':'application/json'
    //     }
    //   }
    //   );
    //   navigate('/class')
    // } catch (error) {
    //     if(error.response) {
    //       setMsg(error.response.data.msg)
    //     } 
    // }
  }

  return (
    <div>
    <h1 className='title'>Testimoni </h1>
   <h2 className='subtitle'>Add New Testimoni</h2>
   <div className="card is-shadowless">
     <div className="card-content">
       <div className="content">
       <form onSubmit={saveKelas}>
         <p className='has-text-centered'>{msg}</p>
       <div className="field">
               <label  className="label">Name</label>
               <div className="control">
                 <input type="text" className="input" value={name} onChange={(e)=>setName(e.target.value)} placeholder='kelas'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Asal Sekolah</label>
               <div className="control">
                 <input type="text" value={about} onChange={(e)=>setAbout(e.target.value)} className="input" placeholder='About'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Diterima di</label>
               <div className="control">
                 <input type="text" className="input" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Description'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Grade</label>
               <div className="control">
                 <input type="text" className="input" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder='Grade'/>
               </div>
             </div>

             <div className="field">
               <label  className="label">Description</label>
               <div className="control">
                 {/* <input type="text" className="input" value={year} onChange={(e)=>setYear(e.target.value)} placeholder='Grade'/> */}
                 <textarea name="description" id="" onChange={(e)=>setYear(e.target.value)}  cols="50" rows="50">

                 </textarea>
               </div>
             </div>

             <div className="field">
               <label  className="label">Image</label>
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

export default FormAddTestimonial