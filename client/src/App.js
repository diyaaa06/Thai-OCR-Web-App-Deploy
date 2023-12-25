import React, { useState } from 'react';
import { ImageUpload } from './pages/ImageUpload';
import { Analysis1 } from './pages/analysis1';
import { EntriesPage } from './pages/displayEntries';
import './styles/appp.css'


function App() {
  const [file, setFile] = useState(null);

  const handleImageUpload = (selectedFile) => {
    setFile(selectedFile);
  };

  return (
    <div className="App">
      <div className="center-content">
        <h1>Thai ID OCR Recognition</h1>
        <div style={{paddingLeft:'40%',paddingRight:'50%'}}>
        <ImageUpload handleImageUpload={handleImageUpload} />
        </div>
        {file && <Analysis1 file={file} />}
        <EntriesPage />
      </div>
    </div>
  );
}

export default App;
