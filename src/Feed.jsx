import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditFeedModal from './EditFeedModal';
import './buttoncomm.css'
import { FaRegEdit } from "react-icons/fa";
import './admindashboard.css';
import './Feed.css';
require('dotenv').config();

function Feed({ isAdminDashboard }) {
  const [feedItems, setFeedItems] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${process.env.SERVER_URL}/feed`);

      console.log('Feed items:', response.data.feedItems);
      setFeedItems(response.data.feedItems);
    } catch (error) {
      console.error('Error fetching feed:', error);
    }
  };

  console.log('Rendering Feed component with items:', feedItems);

  const handleRemoveFeed = async (id) => {
    try {
      await axios.delete(`${process.env.SERVER_URL}/feed/${id}`);
      fetchFeed();
    } catch (error) {
      console.error('Error removing feed:', error);
    }
  };

  const handleEditFeed = (feedItem) => {
    setSelectedFeed(feedItem);
  };

  const handleEditModalClose = () => {
    setSelectedFeed(null);
    fetchFeed();
  };

  return (
    <div className='feedlistbox'>
      <div className='feed-list'>
        {feedItems.map((item) => (
          <div key={item._id} className='feed-item'>
            <div style={{ marginLeft: '10px', display: 'grid' }}>
              <p style={{margin:'5px'}} ><b style={{ fontSize: '1.1em' }}>{item.heading}:</b><br />
              {item.description}</p>
             
            </div>

            <div style={{ marginRight: '10px', display: 'flex' , alignContent:'center', justifyContent:'center'}}>
              <div>{item.time} {item.date}</div>
              
              {isAdminDashboard && (
                <button className='btn-common' onClick={() => handleEditFeed(item)}><FaRegEdit />
                  Edit</button>
              )}
              {isAdminDashboard && (
                <button className='btn-common' onClick={() => handleRemoveFeed(item._id)}>Remove</button>
              )}
            </div>

          </div>
        ))}
      </div>
      {selectedFeed && (
        <EditFeedModal feedItem={selectedFeed} onClose={handleEditModalClose} />
      )}
    </div>
  );
}

export default Feed;