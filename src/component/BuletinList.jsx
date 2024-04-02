import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
const BuletinList = () => {

  const [image,setImage] = useState('');
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

  const [facility,setFacility] = useState([]);
  useEffect(()=>{
    getFacility();
    fetchImage()
  },[])

  const getFacility = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/bulletin");
      const data = response.data.data;

      // Fetch images for all facilities
      const updatedFacility = await Promise.all(
        data.map(async (item) => {
          const imageUrl = item.picture;
          const image = await fetchImage(imageUrl);
          return { ...item, image };
        })
      );

      setFacility(updatedFacility);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
  };

  const deleteFacility = async (facilityID) => {
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/bulletin/delete-bulletin/${facilityID}`)
    getFacility();
  }

  // useEffect(() => {
  //   const fetchImagesForKelas = async () => {
  //     const updatedKelas = await Promise.all(
  //       facility.map(async (item) => {
  //         const imageUrl = item.picture;
  //         const image = await fetchImage(imageUrl);
  //         return { ...item, image }; 
  //       })
  //     );
  //     setFacility(updatedKelas);
  //     setLoading(false);
  //   };

  //   fetchImagesForKelas();
  // }, []); // Trigger when kelas state changes


  
  return (
    <div>
    <h1 className='title'>Artikel</h1>
  <h2 className='subtitle'>List of Artikel</h2>
  <Link to="/buletin/add" className='button is-primary mb-2'>Add New</Link>
  <table className='table is-striped is-fullwidth'>
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Artikel</th>
        <th>Description</th>
        <th>Image</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { facility.map((item,i)=>(
          <tr key={item.id}>
          <td>{i + 1}</td>
          <td>{item.name}</td>
          <td>{item.description}</td>
          <td><img  src={item.image} alt=""  height='auto' width="50px"/></td>
          <td>
            <Link to={`/buletin/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
            <button onClick={()=>deleteFacility(item.uuid)} className='button is-small is-danger'>Hapus</button>
          </td>
        </tr>
      ))}
      
    </tbody>
  </table>
</div>
  )
}

export default BuletinList