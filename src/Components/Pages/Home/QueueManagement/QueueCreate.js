import React, { useState, useEffect } from 'react';
import { ref, onValue, push ,set} from 'firebase/database';
import { db,auth } from '../../../../FirebaseConfig';
import { nanoid } from 'nanoid'; 
import './QueueCreate.css';


const QueueCreate = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [createdOn, setCreatedOn] = useState('');
  const [limitedDuration, setLimitedDuration] = useState(0);
  const [limit, setLimit] = useState(0);
  const [value, setValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  
    useEffect(() => {
      const today = new Date().toISOString().split('T')[0]; 
      setCreatedOn(today); 
    }, []);

  const handleAddQueue = (e) => {
    e.preventDefault();
   
    if (limit <= 0 || limitedDuration <= 0) {
      alert('Queue limit and duration must be greater than zero.');
      return;
    }
    const queueId = nanoid(10); 
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const hostName = auth.currentUser ? auth.currentUser.email : ''; 
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; 
    set(ref(db, 'queues/' + queueId), {
      id: queueId,
      name: name,
      description: description,
      createdOn: formattedDate, 
      userId:userId,
      hostId:hostName,
      limitedDuration: Number(limitedDuration),
      limit: Number(limit),
      status: value,

    })
         .then(() => {
         
          setIsModalOpen(true);  

          setName('');
          setDescription('');
          setCreatedOn('');
          setLimitedDuration('');
          setLimit('');
          setValue('');
     })
     .catch(error => {
      console.error('Error creating queue: ', error);
      alert('Error creating queue. Please try again.');
   });
};
const handleCloseModal = () => {
  setIsModalOpen(false);  
};


return (
  <div className="queue-container">
    <form onSubmit={handleAddQueue}>
      <div className="input-container">
        <div>
          <label>Queue Name:-</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />
        </div>
        <div>
          <label>Queue Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
            rows="4"
            cols="54"
            required
          ></textarea>
        </div>
        <div>
          <label>CreatedOn:</label>
          <input
            type="text"
            value={createdOn}
           // onChange={(e) => setCreatedOn(e.target.value)}
            readonly
            required
          />
        </div>
        <div>
          <label>Duration(Min):</label>
          <input
            type="number"
            value={limitedDuration}
            onChange={(e) => setLimitedDuration(e.target.value)}
            placeholder="Enter Duration"
            min="1"
            required
          />
        </div>
        <div>
          <label>Queue Limit:</label>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            placeholder="Enter limit"
            min="1"
            required
          />
        </div>
        <div>
          <label>Queue Status:</label>
          <select
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className="button">Create Queue</button>
      </div>
    </form>
    
      
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Success</h2>
            <p>Queue created successfully!</p>
            <button onClick={handleCloseModal} className="button">OK</button>
          </div>
        </div>
      )}
    </div>
 

);
};

export default QueueCreate;