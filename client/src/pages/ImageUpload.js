import React, { useState } from 'react';
import fakeThaiId from '../images/Sample_Thai.jpg'

export const ImageUpload = ({ handleImageUpload }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState(fakeThaiId);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setErrorMessage('File size should be less than 2MB');
      } else if (!['image/png', 'image/jpeg', 'image/jpg'].includes(selectedFile.type)) {
        setErrorMessage('Only PNG, JPG, and JPEG formats are allowed');
      } else {
        setErrorMessage('');
        handleImageUpload(selectedFile);
        const imageUrl = URL.createObjectURL(selectedFile);
        setSelectedImageUrl(imageUrl);
      }
    }
  };

  return (
    <div className="ImageUpload">
      <label htmlFor="fileInput">
      <img src={selectedImageUrl} alt="Thai ID Card" style={{ maxHeight: '100px', maxWidth: '200px' }} />
      </label>
      <input id="fileInput" type="file" accept=".png, .jpg, .jpeg" onChange={handleFileChange} />
      {errorMessage && (
        <p>{errorMessage}</p>
      )}
    </div>
  );
};
