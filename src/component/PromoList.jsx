import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const PromoList
 = () => {

  const [kelas, setKelas] = useState([]);
  const[loading,setLoading] = useState(true)

  useEffect(() => {
    getKelas();
  }, []);

  const getKelas = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/promo");
      const data = response.data.data;

      const updatedFacility = await Promise.all(
        data.map(async (item) => {
          const imageUrl = item.picture;
          const image = await fetchImage(imageUrl);
          return { ...item, image };
        })
      );

      setKelas(updatedFacility);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching facilities:", error);
    }
 

    
  };

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

  const deleteKelas = async (kelasID) => {
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/promo/delete-promo/${kelasID}`);
    getKelas();
  };


  return (
    <div>
      <h1 className='title'>Promo</h1>
      <h2 className='subtitle'>List of Promo</h2>
      <Link to="/promo/add" className='button is-primary mb-2'>Add New</Link>
      <div className='table-container is-scrollable'> 
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama </th>
            <th>About</th>
            <th>Description</th>
            <th>Expired</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.about}</td>
              <td>{item.description}</td>
              <td>{item.expired}</td>
              <td><img src={item.image} alt="" height='auto' width="50px"/></td>
              <td>
                <Link to={`/promo/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
                <button onClick={() => deleteKelas(item.uuid)} className='button is-small is-danger'>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default PromoList
