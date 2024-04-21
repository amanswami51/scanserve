import React from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { SiAddthis } from "react-icons/si";
import {Link} from 'react-router-dom';
import { MdOutlineQrCodeScanner } from "react-icons/md";



const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to="/admin/dashboard"><PiSquaresFourFill/></Link>
        <Link to="/admin/addmenu"><SiAddthis/></Link>
        <Link to="/admin/manageQRCode"><MdOutlineQrCodeScanner/></Link>
    </div>
  )
}

export default Sidebar