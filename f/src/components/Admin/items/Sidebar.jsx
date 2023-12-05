import React from 'react'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
 import {FaHistory,} from "react-icons/fa"
 import {AiFillCaretRight} from "react-icons/ai"
import { useNavigate, Outlet,Link } from "react-router-dom";

import nielit from '../../../assets/images/nielit.png'

 
function Sidebar({openSidebarToggle, OpenSidebar,history}) {
  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
    
        <div className='sidebar-title'>
            <div className='sidebar-brand text-light'>
            <figure>
                <img src={nielit} alt="nielit" style={{width:'10rem'}} />
            </figure>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>X</span>
        </div>

        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
            <Link to="/admin" style={{textDecoration:'none',color:'white'}}>
                    <BsGrid1X2Fill className='icon'/>Dashboard
                    </Link> 
            </li>
            <li className='sidebar-list-item'>
            <Link to="/admin/courses" style={{textDecoration:'none',color:'white'}}>
                    <AiFillCaretRight className='icon'/>Courses
                    </Link> 
            </li>
            <li className='sidebar-list-item'>
            <Link to="/admin/batches" style={{textDecoration:'none',color:'white'}}>
                    <AiFillCaretRight className='icon'/>Batches
                    </Link> 
            </li>
       


           
        </ul>

    </aside>
  )
}

export default Sidebar