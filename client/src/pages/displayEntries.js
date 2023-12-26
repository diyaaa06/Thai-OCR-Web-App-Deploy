import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/displayEntries.css'

export const EntriesPage = () => {
  const [entries, setEntries] = useState([]);
  const [filteredEntries, setFilteredEntries] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [editableEntry, setEditableEntry] = useState(null);

  // Function to fetch entries
  const fetchEntries = async () => {
    try {
      //const response = await axios.get('http://localhost:3001/entries');
      const response = await axios.get('/entries');
      setEntries(response.data);
      setFilteredEntries(response.data);
    } catch (error) {
      // console.error(error);
    }
  };

  useEffect(() => {
    // Fetch entries on initial load
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/entries/${id}`);
      // Remove the deleted entry from the displayed list
      setEntries(entries.filter((entry) => entry._id !== id));
      setFilteredEntries(filteredEntries.filter((entry) => entry._id !== id));
    } catch (error) {
      // console.error(error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleStatusFilter = (status) => {
    if (status === 'all') {
      setFilterStatus('all');
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter((entry) => entry.status === status);
      setFilterStatus(status);
      setFilteredEntries(filtered);
    }
  };
  const insertDataIntoDB = async (data) => {
    // console.log(data);
    data.timeStamp=new Date().toUTCString();
    try {
      //const res = await axios.post("http://localhost:3001/insert", data);
      const res = await axios.post("/insert", data);
      if (res.status === 200) {
        alert("Data updated");
      } else if (res.status === 201) {
        alert("New entry created");
      } else {
        alert("ERR");
      }
      window.location.reload();
    } catch (err) {
      // console.log(err);
      alert("ERR");
      window.location.reload();
    }
  };
  const handleEdit = (id) => {
    // Find the entry to edit
    const entryToEdit = filteredEntries.find((entry) => entry._id === id);
    setEditableEntry({ ...entryToEdit,id_number:entryToEdit.id_number , _id: entryToEdit._id});
  };

  
  
return (
  <div>
    <h2 >All Entries</h2>
    <div className='Filter'>
        <label htmlFor="statusFilter">Filter by Status:{" "}</label>
        <select id="statusFilter" onChange={(e) => handleStatusFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="Success">Success</option>
          <option value="failure">Failure</option>
        </select>
      </div>
      <div className="entry-container">
        {filteredEntries.map((entry) => (
          <div key={entry._id} className={`entry-card ${entry.status === 'failure' ? 'failure' : 'success'}`}>
          {editableEntry && editableEntry._id === entry._id ? (
              <div>
                {/* Editable fields */}
                {/* Entry Identification */}
                <p>Entry Identification: {entry._id}</p>
                {/* Non-editable field */}
                <hr></hr>
                <p>ID: {entry.id_number || 'N/A'}</p>
                <hr></hr>
                {/* Editable fields */}
                <p>Name: </p><input value={editableEntry.name || ''} onChange={(e) => setEditableEntry({ ...editableEntry, name: e.target.value })} placeholder="Name" />
                <p>Last Name: </p><input value={editableEntry.last_name || ''} onChange={(e) => setEditableEntry({ ...editableEntry, last_name: e.target.value })} placeholder="Last Name" />
                <p>DOB: </p><input value={editableEntry.dob || ''} onChange={(e) => setEditableEntry({ ...editableEntry, dob: e.target.value })} placeholder="DOB" />
                <p>Date of Issue: </p><input value={editableEntry.dateOfIssue || ''} onChange={(e) => setEditableEntry({ ...editableEntry, dateOfIssue: e.target.value })} placeholder="Issue Date" />
                <p>Date of expiry: </p><input value={editableEntry.dateOfExpiry || ''} onChange={(e) => setEditableEntry({ ...editableEntry, dateOfExpiry: e.target.value })} placeholder="Expiry Date" />
                {/* Update button */}
                {/* Other editable fields (Last Name, DOB, Issue Date, Expiry Date) */}
                {/* ... */}
                <button className="edit-button" onClick={() => insertDataIntoDB(editableEntry)}>Update</button>
              </div>
            ) : (
              <div>
                <p>Entry Identification: {entry._id}</p>
                <hr></hr>
                <p>ID: {entry.id_number || 'N/A'}</p>
                <hr />
                <p>Name: {entry.name || 'N/A'}</p>
                <hr />
                <p>Last Name: {entry.last_name || 'N/A'}</p>
                <hr />
                <p>DOB: {formatDate(entry.dob) || 'N/A'}</p>
                <hr />
                <p>Date of Issue: {formatDate(entry.dateOfIssue) || 'N/A'}</p>
                <hr />
                <p>Date of Expiry: {formatDate(entry.dateOfExpiry) || 'N/A'}</p>
                <hr />
                <p>TimeStamp (UTC): {entry.timeStamp || 'N/A'}</p>
                <hr />
                <p>Status: {entry.status || 'N/A'}</p>
                <button className="edit-button" onClick={() => handleEdit(entry._id)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(entry._id)}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};