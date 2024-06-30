import React, { useState } from 'react';
import axios from 'axios';
import './buttoncomm.css'
require('dotenv').config();

function EditFeedModal({ feedItem, onClose }) {
  const [editedHeading, setEditedHeading] = useState(feedItem.heading);
  const [editedDescription, setEditedDescription] = useState(feedItem.description);

  const handleSave = async () => {
    try {
      await axios.put(`${process.env.SERVER_URL}/feed/${feedItem._id}`, {
        heading: editedHeading,
        description: editedDescription,
      });
      onClose(); 
    } catch (error) {
      console.error('Error editing feed item:', error);
    }
  };

  const handleCancel = () => {
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleCancel}>&times;</span>
        <h2>Update Feed</h2>
        <form>
          
          <input className='inputbox' placeholder='Enter News Heading' type="text" value={editedHeading} onChange={(e) => setEditedHeading(e.target.value)} /> <br />
          <textarea className='inputbox' placeholder='Enter Description' value={editedDescription} onChange={(e) => setEditedDescription(e.target.value)}></textarea> <br />
          <button className='btn-common' type="button" onClick={handleSave}>Save</button>
          <button className='btn-common' type="button" onClick={handleCancel}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default EditFeedModal;
