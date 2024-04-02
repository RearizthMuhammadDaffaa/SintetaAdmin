import React from 'react'
import { NavLink } from 'react-router-dom';
import {IoPerson,IoPricetag,IoHome,IoLogOut} from 'react-icons/io5'
import { useAuth } from '../Context/AuthProvider';

const Sidebar = () => {
  const auth = useAuth();
  return (
    <div>
      <aside className="menu has-shadow pl-2">
  <p className="menu-label">
    General
  </p>
  <ul className="menu-list">
    <li><NavLink to={"/dashboard"}><IoHome /> Dashboard</NavLink></li>
    <li><NavLink to={"/class"}><IoPricetag /> Kelas</NavLink></li>
    <li><NavLink to={"/facility"}><IoPricetag /> Fasilitas</NavLink></li>
    {/* <li><NavLink to={"/program"}><IoPricetag /> Program</NavLink></li> */}
    <li><NavLink to={"/kelolosan"}><IoPricetag /> Kelolosan</NavLink></li>
    <li><NavLink to={"/office"}><IoPricetag /> Cabang</NavLink></li>
    <li><NavLink to={"/buletin"}><IoPricetag /> Artikel</NavLink></li>
    <li><NavLink to={"/testimonial"}><IoPricetag /> Testimoni</NavLink></li>
    <li><NavLink to={"/congratulations"}><IoPricetag />Card Kelolosan</NavLink></li>
  </ul>
  <p className="menu-label">
    Admin
  </p>
  <ul className="menu-list">
    <li><NavLink to={"./users"}><IoPerson /> Users</NavLink></li>
   
  </ul>
  <p className="menu-label">
    Settings
  </p>
  <ul className="menu-list">
    <li><button className='button is-white' onClick={()=>auth.logOut()}><IoLogOut /> Logout</button></li>
   
  </ul>
</aside>
    </div>
  )
}

export default Sidebar