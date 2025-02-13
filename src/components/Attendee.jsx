import React, { useState } from 'react';

function Attendee({ formData, setFormData }) {
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'dgfhl5okg');

    const getImage = await fetch('https://api.cloudinary.com/v1_1/dgfhl5okg/image/upload', {
      method: 'POST',
      body: data,
    });
    const getUploadedImage = await getImage.json();
    const imageUploaded = getUploadedImage.url;
    console.log(getUploadedImage);
    console.log(imageUploaded);

    // Store the uploaded image URL in the formData
    setFormData({ ...formData, image: imageUploaded });
  };

  return (
    <>
      <form className='attendee-form'>
        <div className="upload-profile-box">
          <label htmlFor="profile-pictrue">Upload Profile Photo
            <div className='upload-container'>
              <input 
                type='file' 
                onChange={handleUploadImage}
              />
            </div>
          </label>
          {formData.image && (
          <div className="upload-container">
            <img 
              src={formData.image} 
              alt="Uploaded Profile" 
              style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
            />
          </div>
        )}
        </div>

      

        <hr />
        
        <label htmlFor="name-input">Enter your name
          <input 
            id="name-input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            type='text' 
            placeholder='Full Name'
            aria-label="Full Name"
            aria-required="true"
          />
        </label>

        <label htmlFor='email-address'>Enter your email
          <input 
            id='email-address'
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            type='email'
            placeholder='hello@welcome.io'
            aria-label="Email Address"
            aria-required="true"
          />
        </label>

        <label htmlFor='special-request'>Special Request
          <textarea
            id='special-request'
            value={formData.request}
            onChange={(e) => setFormData({ ...formData, request: e.target.value })}
            placeholder='Got any request for us'
            aria-label="Special Request"
            aria-required="true"
          ></textarea>
        </label>
      </form>
    </>
  );
}

export default Attendee;
