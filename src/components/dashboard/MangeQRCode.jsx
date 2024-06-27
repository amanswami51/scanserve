import React, {useState } from 'react'
import Sidebar from './Sidebar'
import TopNavbar from './TopNavbar'
import jsPDF from 'jspdf';
import {hostname} from "../Admin";

const MangeQRCode = () =>{

    const [totalQrCode, setTotalQRCode] = useState(1);

    const [qrcodeImgLink, setQRcodeImgLink] = useState([]);
    const QRcodeApiCall = async()=>{
        const res = await fetch(`${hostname}/api/qrcode`, {
            method:"GET",
            headers:{
              'Content-Type':'application/json',
              'url':'https://scanserve-88.web.app/user/menufirstpage',
              'totalqrcode':totalQrCode,
              'token': localStorage.getItem('token')
            }
        })
        const json = await res.json();
        if(json.success){
            setQRcodeImgLink(json.qrCodeArr);
        }
    }

    //Download the qr code as a pdf
    const generatePDF = () =>{

      const pdf = new jsPDF();
      for(let i=0; i<qrcodeImgLink.length; i++){
        pdf.addImage(qrcodeImgLink[i], 'PNG', 30, 10, 100, 100)
        pdf.text(`Table No. ${i + 1}`, 60, 115);
        if(i!==qrcodeImgLink.length - 1){
          pdf.addPage();
        }
        if(i===qrcodeImgLink.length - 1){
          pdf.save('qrcode.pdf');
        }
      }

    };


  return (
    <div className='manageQRCode'>
      <Sidebar />
      <div className='manageQRCode__right'>
        <TopNavbar heading="QR-Code"/>
        <div className='manageQRCode__body'>
          <div className='form'>
            <input type="number" onChange={(e)=>{setTotalQRCode(e.target.value)}} placeholder='Enter how many table you have' />
            <button className='manageQRCode__buttons' onClick={QRcodeApiCall}>Get QR code</button>
          </div>
          <div className='qrimages'>
            {
              qrcodeImgLink.map((x, i)=>{
                return <img src={x} key={i} alt="loading..." />
              })
            }
          </div>
          <button onClick={generatePDF} className='manageQRCode__buttons'>Download QrCode Pdf</button>
        </div>
      </div>
    </div>
  )
}

export default MangeQRCode
