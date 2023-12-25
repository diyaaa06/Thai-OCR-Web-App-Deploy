import React, { useState } from 'react';

const apiKey = 'K89412201188957'; // Replace with your actual API key
const ocrEndpoint = 'https://api.ocr.space/parse/image';

export const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [ocrResult, setOcrResult] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [extractedData, setExtractedData] = useState({}); // State for extracted data

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        setErrorMessage('File size should be less than 2MB');
      } else if (
        !['image/png', 'image/jpeg', 'image/jpg'].includes(selectedFile.type)
      ) {
        setErrorMessage('Only PNG, JPG, and JPEG formats are allowed');
      } else {
        setFile(selectedFile);
        setErrorMessage('');
        setOcrResult('');
        setShowResults(false);
        setExtractedData({}); // Clear previous extracted data
      }
    }
  };

  const performOCR = async () => {
    if (!file) {
      setErrorMessage('Please select a file first');
      return;
    }

    const formData = new FormData();
    formData.append('apikey', apiKey);
    formData.append('language', 'eng');
    formData.append('isOverlayRequired', 'false');
    formData.append('file', file);

    try {
      const response = await fetch(ocrEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setOcrResult(JSON.stringify(data)); // Set OCR results in state
        setShowResults(true);

        // Extract data from OCR results
        extractDataFromOCR(data);
      } else {
        throw new Error('Failed to perform OCR');
      }
    } catch (error) {
      // console.error('Error during OCR:', error);
    }
  };

  const extractDataFromOCR = (ocrData) => {
    if (ocrData && ocrData.ParsedResults && ocrData.ParsedResults.length > 0) {
      const parsedText = ocrData.ParsedResults[0].ParsedText;

      // Extract information using regex patterns
      // Customize the regex patterns based on the structure of your OCR results
      const nameMatch = parsedText.match(/Name\s*(.*)\s*Last name/i);
      const lastNameMatch = parsedText.match(/Last name\s*(.*)\s*\d{2}\s/i);
      const idNumberMatch = parsedText.match(/\d{1,2}\s\d{4}\s\d{5}\s\d{2}\s\d/);
      const dateOfBirthMatch = parsedText.match(/Date of Birth\s*(.*)\s*\d{2}/i);
      const dateOfIssueMatch = parsedText.match(/(\d{1,2}\s+[A-Za-z]+\s+\d{4})\s*Date of Expiry/i);
      const dateOfExpiryMatch = parsedText.match(/Date of Expiry\s*(.*)/i);

      // Extracted information
      const name = nameMatch ? nameMatch[1].trim() : '';
      const lastName = lastNameMatch ? lastNameMatch[1].trim() : '';
      const idNumber = idNumberMatch ? idNumberMatch[0].trim() : '';
      const dateOfBirth = dateOfBirthMatch ? dateOfBirthMatch[1].trim() : '';
      const dateOfIssue = dateOfIssueMatch ? dateOfIssueMatch[1].trim() : '';
      const dateOfExpiry = dateOfExpiryMatch ? dateOfExpiryMatch[1].trim() : '';

      // Update extracted data state
      setExtractedData({
        name,
        lastName,
        idNumber,
        dateOfBirth,
        dateOfIssue,
        dateOfExpiry,
      });
    }
  };

  const handleViewResults = () => {
    // Handle view results action if needed
    // console.log('Extracted Data:', extractedData);
  };

  return (
    <div className="ImageUpload">
      <h1>Thai ID Card Image Uploader</h1>
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFileChange}
      />
      {errorMessage && (
        <p style={{ color: 'red' }}>{errorMessage}</p>
      )}
      {file && (
        <div>
          <p>File Name: {file.name}</p>
          <p>File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          <img src={URL.createObjectURL(file)} alt="Uploaded ID Card" />
        </div>
      )}
      <button onClick={performOCR}>Perform OCR Analysis</button>
      {showResults && (
        <button onClick={handleViewResults}>View Extracted Data</button>
      )}
      {extractedData && Object.keys(extractedData).length > 0 && (
        <div>
                    <h2>Extracted Data:</h2>
                    <p>parsedText</p>
                    <p>ParsedResults</p>
                    <p>ocrData</p>
          <ul>
            <li><strong>Name:</strong> {extractedData.name}</li>
            <li><strong>Last Name:</strong> {extractedData.lastName}</li>
            <li><strong>Identification Number:</strong> {extractedData.idNumber}</li>
            <li><strong>Date of Birth:</strong> {extractedData.dateOfBirth}</li>
            <li><strong>Date of Issue:</strong> {extractedData.dateOfIssue}</li>
            <li><strong>Date of Expiry:</strong> {extractedData.dateOfExpiry}</li>
          </ul>
        </div>
      )}

      {ocrResult && (
        <div>
          <h2>OCR Results:</h2>
          <pre>{ocrResult}</pre>
        </div>
      )}
    </div>
  );
};



