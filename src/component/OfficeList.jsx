import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

const OfficeList = () => {
  const [loading, setLoading] = useState(true);
  // const imgURL = 'https://api.bimbel-sinteta.id/images/dT1RnoJM.png'
  const fetchImage = async (imageUrl) => {
    try {
      const res = await fetch(imageUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      return imageObjectURL;
    } catch (error) {
      console.error("Error fetching image:", error);
      return null;
    }
  };

  const [program,setProgram] = useState([]);
  useEffect(()=>{
    getProgram();
    fetchImage()
  },[])

  const getProgram = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/office");
      const data = response.data.data;

      // Fetch images for all facilities
      const updatedFacility = await Promise.all(
        data.map(async (item) => {
          const imageUrl = item.picture;
          const image = await fetchImage(imageUrl);
          return { ...item, image };
        })
      );

      setProgram(updatedFacility);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const deleteProgram = async (facilityID) => {
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/office/delete-office/${facilityID}`)
    getProgram();
  }

  return (
    <div>
    <h1 className='title'>Cabang</h1>
  <h2 className='subtitle'>List of Cabang</h2>
  <Link to="/office/add" className='button is-primary mb-2'>Add New</Link>
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Cabang</th>
        <th>About</th>
        <th>Description</th>
        <th>Lokasi</th>
        <th>contact</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { program.map((item,i)=>(
          <tr key={item.id}>
          <td>{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.about}</td>
          <td>{item.description}</td>
          <td><a href={`${item.location}`} target='_blank'>Lokasi</a></td>
          <td>{item.contact}</td>
          <td><img  src={item.image} alt=""  height='auto' width="50px"/></td>
          <td>
            <Link to={`/office/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
            <button onClick={()=>deleteProgram(item.uuid)} className='button is-small is-danger'>Hapus</button>
          </td>
        </tr>
      ))}
      
    </tbody>
  </table>
</div>
  )
}

export default OfficeList