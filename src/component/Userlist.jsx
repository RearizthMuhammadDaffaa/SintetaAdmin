import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Userlist = () => {

  const [image,setImage] = useState('');
  const [loading, setLoading] = useState(true);
  // const imgURL = 'https://api.bimbel-sinteta.id/images/dT1RnoJM.png'
 
  const [facility,setFacility] = useState([]);
  useEffect(()=>{
    getFacility();
 
  },[])

  const getFacility = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/user");
      const data = response.data.data;

      // Fetch images for all facilities
    

      setFacility(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const deleteFacility = async (facilityID) => {
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/user/delete-user/${facilityID}`)
    getFacility();
  }
  return (
    <div>
       <h1 className='title'>Users</h1>
      <h2 className='subtitle'>List of Users</h2>
      <Link to="/users/add" className='button is-primary mb-2'>Add New</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {facility.map((item,i)=>(
             <tr key={item.id}>
              <td>{i +1 }</td>
             <td>{item.email}</td>
             <td>{item.username}</td>
             <td>
                <Link to={`/users/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
                <button onClick={() => deleteKelas(item.uuid)} className='button is-small is-danger'>Hapus</button>
              </td>
           </tr>
          ))}
         
        </tbody>
      </table>
    </div>
  )
}

export default Userlist