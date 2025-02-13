import React, { useState, useEffect } from 'react';
import Signup from './Ticket-Selection';
import Personal from './Attendee';
import Ready from './Ready';

function Form() {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    tickettype: '',
    ticketno: '',
    email: '',
    request: '',
    uploadedImg: null,
  });
  const [errorMsg, setErrorMsg] = useState('');

  const titles = ['Ticket Selection', 'Attendee Details', 'Ready'];

  // Handle Next and Submit btn
  function nextBtn() {
    if (page === 0) {
      if (!formData.ticketno) {
        setErrorMsg('Please select a number of tickets.');
        return;
      }
    } else if (page === 1) {
      if (!formData.name || !formData.email || !formData.request) {
        setErrorMsg('Please fill out all required fields (Name, Email and Request).');
        return;
      }
    } else if(page === 2) {
      downloadTicket(downloadHandler)
    }
    
    setErrorMsg('');
    setPage((currentPage) => currentPage + 1);
    localStorage.setItem('ticketData', JSON.stringify(formData));
  }

  // Handle Prev btn
  function prevBtn() {
    setPage((currentPage) => currentPage - 1);
    if (page === 2) {
      setFormData({
        name: '',
        tickettype: '',
        ticketno: '',
        email: '',
        request: '',
        uploadedImg: null
      });
    }
  }

  // Store in localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('ticketData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Display pages
  const PageDisplay = () => {
    switch (page) {
      case 0:
        return <Signup formData={formData} setFormData={setFormData} />;
      case 1:
        return <Personal formData={formData} setFormData={setFormData} />;
      case 2:
        return <Ready formData={formData} setFormData={setFormData} onDownload={downloadTicket} />;
      default:
        return null;
    }
  };

  const downloadTicket = (downloadHandler) => {
    downloadHandler();
  };

  return (
    <>
      <div className='form'>
        <div className="header">
          <h2>{titles[page]}</h2>
          <p>Step {page === 0 ? '1' : page === 1 ? '2' : '3'} / 3</p>
        </div>
        <div className="progressbar">
          <div style={{ width: page === 0 ? '33.3%' : page === 1 ? '66.6%' : '100%' }}></div>
        </div>
        <div className="form-container">
          <div className="body">
            {PageDisplay()}
            {errorMsg && <div className="error-msg">{errorMsg}</div>}
          </div>
          <div className="button">
            <button className='prev' disabled={page === 0} onClick={prevBtn}>
              {page === 1 ? 'Back' : page === 2 ? 'Book Another Ticket' : 'Cancel'}
            </button>
            <button className='nextbtn' disabled={page === titles.length - 1} onClick={nextBtn}>
              {page === 1 ? 'Get My Free Ticket' : page === 2 ? 'Download Ticket' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
