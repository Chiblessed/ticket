import React from 'react';
import Bgimage from '../assets/Subtract.png' ;
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';

function Ready({formData, setFormData, onDownload}) {
  const barcodeData = `${formData.name}-${formData.email}-${formData.tickettype}-${formData.ticketno}`;

  const downloadTicket = () => {
    const element = document.getElementById("ticket"); 
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL(); 
      link.download = "ticket.png"; 
      link.click(); 
    });
  };

  if (onDownload) {
    onDownload(downloadTicket); 
  }
  return (
    <>
    <h2 style={{marginTop: '30px', paddingBottom: '10px', textAlign: 'center'}}>Your Ticket is Booked!</h2>
    <p style={{marginBottom: '30px', textAlign: 'center'}}>
      Check your email for a copy or you can <a href='#'>download</a>
    </p>
    <div className='result-container'> 
      <div className="result-output">
      <div className="result-header">
      <h1>Techember Fest "25</h1>
    <p>📍 04 Rumens road, Ikoyi, Lagos</p>
    <p>📅 March 15, 2025 | 7:00 PM</p>
      </div>
    <div className="result-data">
    <div className='uploadedImg'>
      <img src={formData.uploadedImg} alt="" style={{ width: '200px', height: '200px', objectFit: 'cover' }} 
 />
    </div>
    <div className="tablecontaiers">
    <div className="table-container">
     <div className='table-content1'>
      <span>Enter your Name:</span>
      <p>{formData.name}</p>
     </div>
     <div className='table-content2'>
      <span>Enter your Email:</span>
      <p>{formData.email}</p>
     </div>
     <div className='table-content3'>
      <span>Ticket Type:</span>
      <p>{formData.tickettype}</p>
     </div>
     <div className='table-content4'>
      <span>Ticket No:</span>
      <p>{formData.ticketno}</p>
     </div>
     
    </div>
    <div className='table-content5'>
      <span>Special Request?</span>
      <p>{formData.request}</p>
     </div>
    </div>
   
    </div>
    
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <Barcode 
      value={barcodeData} />
            </div>

      </div>


    </>
  )
}

export default Ready