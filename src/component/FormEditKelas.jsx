import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const FormEditKelas = () => {

  const [name,setName] = useState('');
  const [about,setAbout] = useState('');
  const [desc,setDesc] = useState('');
  const [grade,setGrade] = useState('');
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
      formData.append('grade', grade);
        formData.append('image', img);
      

      const token = localStorage.getItem('site');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      };

      const response = await axios.put(`https://api.bimbel-sinteta.id/api/v1/class/update-class/${id}`, formData, config);
      if (response.status !== 200) {
        throw new Error('Failed to add class');
      }
      navigate('/class');
     

      
    } catch (error) {
      setMsg(error.message);
    }
  
  }

  const getBinaryString = async () => {
    if (!img) {
      return null;
    }
  
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const binaryString = event.target.result;
        resolve(binaryString);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsBinaryString(img);
    });
  }

  const getKelasById = async() => {
    const response = await axios.get(`https://api.bimbel-sinteta.id/api/v1/class/${id}`)
    setName(response.data.data.name)
    setAbout(response.data.data.about)
    setDesc(response.data.data.description)
    setGrade(response.data.data.grade)
    setImg(response.data.data.picture)
  }

  useEffect(()=>{
    getKelasById();
    console.log(img);
  },[])


  return (
    <div>
    <h1 className='title'>Product</h1>
   <h2 className='subtitle'>Add New Product</h2>
   <div className="card is-shadowless">
     <div className="card-content">
       <div className="content">
       <form onSubmit={updatekelas}>
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
                 {/* <input type="text" className="input" value={grade} onChange={(e)=>setGrade(e.target.value)} placeholder='Grade'/> */}
                 <div className="select">
                    <select name="grade" id="" onChange={(e)=>setGrade(e.target.value)}>
                      <option value={grade} selected>{grade}</option>
                        <option value="sma" >sma</option>
                        <option value="smp" >smp</option>
                        <option value="sd" >sd</option>
                    </select>
                    </div>      
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

export default FormEditKelas