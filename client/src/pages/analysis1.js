import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../styles/analysis.css'

export const Analysis1 = ({ file }) => {
  const [response, setResponse] = useState(null);
  const [getdatabutton,setgetdatabutton]=useState(true);
  const apiKey1 = 'pGyPys7zJM1yptg6XpiZn4Ds1n72sk15'; 
  const apiKey2 = 'Ro1SJ4DzqUIlV4LkziuQEV935bIMce14';
  const apikey3 = '9UuDugYjKeF4Ff2uYDtbr6etlLjRP3LQ';
  const apiUrl = 'https://api.iapp.co.th/thai-national-id-card/v3.5/front';
  const [status,setStatus]=useState('success');

  const handleUpload = async () => {
    const formData = new FormData();
    setgetdatabutton(false);
    formData.append('file', file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'apikey': apikey3,
        },
        params: {
          fields: 'id_number,en_name,en_lname,en_dob,en_issue,en_expire',
          options: 'not_crop_card,not_rotate_card,get_bbox,get_image,get_original',
        },
      });
      setResponse(response.data);
      // console.log('API Response:', response.data);
    } catch (error) {
      // console.error('Error uploading file:', error);
      setResponse({
        error_message: "An error occurred while processing the request."
      });
      setStatus('failure');
    }
  };
  useEffect(() => {
    if (response && status === 'success') {
      const entryData = {
        id_number: response.id_number,
        name: `${response.en_init} ${response.en_fname}`,
        last_name: response.en_lname,
        dob: convertToDate(response.en_dob),
        dateOfIssue: convertToDate(response.en_issue),
        dateOfExpiry: convertToDate(response.en_expire),
        status: 'Success',
        error_msg: response.error_message || 'No errors',
        timeStamp:new Date().toUTCString()
      };
      insertDataIntoDB(entryData);
    } else if (response) {
      const entryData = {
        status: 'failure',
        error_msg: response.error_message || 'No errors'
      };
      insertDataIntoDB(entryData);
    }
  }, [response, status]);

  const insertDataIntoDB = async (data) => {
    // console.log(data);
    try {
      //const res = await axios.post("http://localhost:3001/insert", data);
      const res = await axios.post("/insert", data);
      if (res.status === 200) {
        alert("Entry already Exists! Data updated");
      } else if (res.status === 201) {
        alert("New entry created");
      } else {
        alert("ERR");
      }
    } catch (err) {
      // console.log(err);
      alert("ERR");
    }
  };
  

  const handleInsertData = () => {
    if (response && status=='success') {
      const entryData = {
        id_number: response.id_number,
        name: response.en_init + ' ' + response.en_fname,
        last_name: response.en_lname,
        dob: convertToDate(response.en_dob),
        dateOfIssue: convertToDate(response.en_issue),
        dateOfExpiry: convertToDate(response.en_expire),
        status: 'Success', // Set the status as needed
        error_msg: response.error_message || 'No errors',
        // Add other necessary fields as per your entryModel schema
      };
      entryData.timeStamp=new Date().toUTCString();
      insertDataIntoDB(entryData);
    }else{
      const entryData={
        status:'failure',
        error_msg: response.error_message || 'No errors'
      }
      insertDataIntoDB(entryData);
    }
  };

  const convertToDate = (dateString) => {
    const months = {
      Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
      Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
    };
  
    const [day, month, year] = dateString.split(' ');
    const monthInNumber = months[month];
    const isoDateString = `${year}-${monthInNumber}-${day}`;
    return new Date(isoDateString);
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  
  return (
    
    <div className="text-box">
      {getdatabutton && <button class="get-data-button" onClick={handleUpload}>Get Data</button>}
      {response && (

        <div className="entry-caard">
          {response.error_message === "NO_ID_CARD_FOUND" && (
            <p>The image file is not the ID card..</p>
          )}
          {response.error_message === "IMAGE_ERROR_UNSUPPORTED_FORMAT" && (
            <p>The image can not be resolved. The file format may not be supported or the file is damaged.</p>
          )}
          {response.error_message === "INVALID_IMAGE_SIZE" && (
            <p>The size of the uploaded image does not meet the requirement as above.</p>
          )}
          {response.error_message === "PLEASE_VERIFY_ID_CARD_NUMBER" && (
            <p>The National ID Number has 13 digits but incorrect. Response code: 424 will show when used id_check in options if not used id_check. response code is 200, You should check in error_message.</p>
          )}
          {response.error_message === "IMAGE_ERROR_UNSUPPORTED_FORMAT" && (
            <p>The image can not be resolved. The file format may not be supported or the file is damaged.</p>
          )}
          {response.error_message === "CANNOT_READ_ID_CARD_NUMBER_CLEARLY" && (
            <p>The National ID Number has less 13 digits. Response code: 425 will show when used id_check in options if not used id_check. response code is 200, You should check in error_message.</p>
          )}
          {response.error_message === "IMAGE_ERROR_UNSUPPORTED_BLACK_WHITE_IMAGE" && (
            <p>Used gray_check in options for check image black-white and gray image.</p>
          )}
          <h3>API Response:</h3>
          <p>ID Number: {response.id_number}</p>
          <p>Name: {response.en_init}{" "}{response.en_fname}</p>
          <p>Last Name: {response.en_lname}</p>
          <p>Date of Birth: {response.en_dob}</p>
          <p>Issue Date: {response.en_issue}</p>
          <p>Expiration Date: {response.en_expire}</p>
          {/* <button className="insert-button" onClick={handleInsertData}>Insert Data</button> */}
          <button className="insert-button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )}
    </div>
  );
};
