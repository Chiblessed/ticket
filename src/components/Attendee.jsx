import React, { useState } from 'react';

function Attendee({ formData, setFormData }) {
  const handleUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', import.meta.env.VITE_CLOUDINARY_KEY); 

    const getImage = await fetch(import.meta.env.VITE_CLOUDINARY_URL, { 
       method: 'POST',
      body: data,
    });
    const getUploadedImage = await getImage.json();
    const imageUploaded = getUploadedImage.url;
    console.log(getUploadedImage);
    console.log(imageUploaded);

    setFormData({ ...formData, image: imageUploaded });
  };

  return (
    <>
      <form className='attendee-form'>
        <div className="upload-profile-box">
          <label htmlFor="profile-pictrue" className="upload-label">
            Upload Profile Photo
            <div className='upload-container'>
              {formData.image && (
                <div className="upload-image" role="img" aria-label="Uploaded Profile Image">
                  <img 
                    src={formData.image} 
                    alt="Uploaded profile image"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }} 
                    aria-live="polite" 
                  />
                </div>
              )}
              <input 
                type='file' 
                id="profile-pictrue" 
                onChange={handleUploadImage}
                aria-label="Upload a profile picture"
                accept="image/*"
                aria-describedby="file-upload-instructions"
              />
            </div>
            <span id="file-upload-instructions" className="sr-only">
              Please select an image to upload as your profile picture.
            </span>
          </label>
        </div>

        <hr />
        
        <label htmlFor="name-input">
          Enter your name
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

        <label htmlFor='email-address'>
          Enter your email
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

        <label htmlFor='special-request'>
          Special Request
          <textarea
            id='special-request'
            value={formData.request}
            onChange={(e) => setFormData({ ...formData, request: e.target.value })}
            placeholder='Got any request for us'
            aria-label="Special Request"
            aria-required="true"
            rows="4"
          ></textarea>
        </label>
      </form>
    </>
  );
}

export default Attendee;
