import React, { useState, useEffect } from 'react';
import Signup from './Ticket-Selection';
import Personal from './Attendee';
import Ready from './Ready';
import html2canvas from 'html2canvas';

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

  // download ticket function
  const downloadTicket = () => {
    const element = document.getElementById("ticket");
    html2canvas(element).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = "ticket.png";
      link.click();
    });
  };

  // handle next button
  function nextBtn() {
    if (page === 0) {
      if (!formData.ticketno) {
        setErrorMsg('Please select a number of tickets.');
        return;
      }
    } else if (page === 1) {
      if (!formData.name || !formData.email || !formData.request) {
        setErrorMsg('Please fill out all required fields (Name, Email, and Request).');
        return;
      }
      if (!formData.uploadedImg) {
        setErrorMsg('Please upload your profile image.');
        return;
      }
    } else if (page === 2) {
      downloadTicket();
    }

    setErrorMsg('');
    setPage((currentPage) => currentPage + 1);
    localStorage.setItem('ticketData', JSON.stringify(formData));
  }

  // handle previous button
  function prevBtn() {
    if (page === 2) {
      // Reset form when going back to page 0
      setFormData({
        name: '',
        tickettype: '',
        ticketno: '',
        email: '',
        request: '',
        uploadedImg: null
      });
      localStorage.removeItem('ticketData');
    }
    setPage((currentPage) => currentPage - 1);
  }

  // store user's inputs in localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('ticketData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // display current page content
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

  return (
    <>
      <div className='form'>
        <div className="header">
          <h2 id="form-title">{titles[page]}</h2>
          <p>
            Step {page === 0 ? '1' : page === 1 ? '2' : '3'} / 3
          </p>
        </div>

        <div className="progressbar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={page === 0 ? '33' : page === 1 ? '66' : '100'}>
          <div style={{ width: page === 0 ? '33.3%' : page === 1 ? '66.6%' : '100%' }}></div>
        </div>

        <div className="form-container">
          <div className="body">
            {PageDisplay()}
            {errorMsg && <div role="alert" className="error-msg">{errorMsg}</div>}
          </div>

          <div className="button">
            <button
              className='prev'
              disabled={page === 0}
              onClick={prevBtn}
              aria-label="Go to previous step"
              tabIndex="0"
            >
              {page === 1 ? 'Back' : page === 2 ? 'Book Another Ticket' : 'Cancel'}
            </button>
            <button
              className='nextbtn'
              disabled={page === titles.length - 1}
              onClick={nextBtn}
              aria-label="Go to next step"
              tabIndex="0"
            >
              {page === 1 ? 'Get My Free Ticket' : page === 2 ? 'Download Ticket' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
