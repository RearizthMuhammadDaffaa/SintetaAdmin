import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const KelolosanList = () => {

  const [kelas, setKelas] = useState([]);
  const[loading,setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredKelas, setFilteredKelas] = useState([]);
  const [sortedByYear, setSortedByYear] = useState(false);
  const [yearFilter, setYearFilter] = useState('');
  const [years, setYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(100);


  useEffect(() => {
    getKelas();
  }, []);

  useEffect(() => {
    const filtered = kelas.filter(item => {
      return item.yearAccepted.includes(yearFilter);
    });
    setFilteredKelas(filtered);
  }, [kelas, yearFilter]);


  const getKelas = async () => {
    try {
      const response = await axios.get("https://api.bimbel-sinteta.id/api/v1/acceptedUniversity");
      const data = response.data.data;

      const uniqueYears = [...new Set(data.map(item => item.year))];
      setYears(uniqueYears);

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
    await axios.delete(`https://api.bimbel-sinteta.id/api/v1/acceptedUniversity/delete-acceptedUniversity/${kelasID}`);
    getKelas();
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };

  const handleYearFilter = (year) => {
    setYearFilter(year);
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKelas.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);



  return (
    <div>
      <h1 className='title'>Bukti Kelolosan</h1>
      <h2 className='subtitle'>List of Bukti Kelolosan</h2>
      <Link to="/kelolosan/add" className='button is-primary mb-2'>Add New</Link>
      <div className="field is-grouped">
        <p className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </p>
        <div className="control">
          <div className="select">
            <select onChange={(e) => handleYearFilter(e.target.value)}>
              <option value="">Filter by Year</option>
              
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
              
            </select>
          </div>
        </div>
      </div>
      <table className='table is-striped is-fullwidth'>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama </th>
            <th>Asal Sekolah</th>
            <th>Diterima di</th>
            <th>Jurusan</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {currentItems.filter((item) => {
            if (searchTerm === '') {
              return item;
            } else if (item.name.toLowerCase().includes(searchTerm.toLowerCase())) {
              return item;
            }
          }).map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.graduatedFrom}</td>
              <td>{item.acceptedSchool}</td>
              <td>{item.major}</td>
              <td><img src={item.image} alt="" height='auto' width="50px" /></td>
              <td>
                <Link to={`/kelolosan/edit/${item.uuid}`} className='button is-small is-info'>Edit</Link>
                <button onClick={() => deleteKelas(item.uuid)} className='button is-small is-danger'>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        <ul className="pagination-list">
          {Array.from({ length: Math.ceil(filteredKelas.length / itemsPerPage) }, (_, i) => (
            <li key={i}>
              <button
                className={`pagination-link ${currentPage === i + 1 ? 'is-current' : ''}`}
                aria-label={`Goto page ${i + 1}`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default KelolosanList