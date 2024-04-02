import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const TestimonialList = () => {

  const [kelas, setKelas] = useState([]);
  const[loading,setLoading] = useState(true)

  useEffect(() => {
    getKelas();
  }, []);

  const getKelas = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/testimonial");
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
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/testimonial/delete-testimonial/${kelasID}`);
    getKelas();
  };


  return (
    <div>
      <h1 className='title'>Testimoni</h1>
      <h2 className='subtitle'>List of Testimoni</h2>
      <Link to="/testimonial/add" className='button is-primary mb-2'>Add New</Link>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama </th>
            <th>Asal Sekolah</th>
            <th>Diterima di</th>
            <th>Grade</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {kelas.map((item, i) => (
            <tr key={item.id}>
              <td>{i + 1}</td>
              <td>{item.name}</td>
              <td>{item.graduatedFrom}</td>
              <td>{item.acceptedSchool}</td>
              <td>{item.grade}</td>
              <td>{item.description}</td>
              <td><img src={item.image} alt="" height='auto' width="50px"/></td>
              <td>
                <Link to={`/testimonial/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
                <button onClick={() => deleteKelas(item.uuid)} className='button is-small is-danger'>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TestimonialList