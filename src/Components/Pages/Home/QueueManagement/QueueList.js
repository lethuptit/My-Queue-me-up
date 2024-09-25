import React, { useState, useEffect } from 'react';
import { ref, onValue, update, remove } from 'firebase/database';
import { db, auth } from '../../../../FirebaseConfig';
import './QueueList.css';
import Toast from '../../../common/Toast';

const QueueList = () => {
  const [queues, setQueues] = useState([]);
  const [editQueueId, setEditQueueId] = useState(null);
  const [editedQueue, setEditedQueue] = useState({});
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [itemsPerPage] = useState(5); // Number of items to display per page

  useEffect(() => {
    // Listen to the authentication state
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
        console.log("Usrid", user.uid)
      } else {
        setUserId(null);
        setQueues([]); // Clear queues if not authenticated
      }
    });

    return () => unsubscribeAuth();
  }, []);


  useEffect(() => {
    if (userId) {
      const queuesRef = ref(db, 'queues/');

      const unsubscribe = onValue(
        queuesRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val()
            const queueArray = Object.keys(data)
              .map((key) => ({
                id: key,
                ...data[key],
              }))
              .filter((queue) => queue.userId === userId);
            setQueues(queueArray);
          } else {
            setError('No queues found');
          }
        },
        (errorObject) => {
          setError('Failed to fetch data: ' + errorObject.message);
        }
      );

      return () => unsubscribe();
    }
  }, [userId]);

  // Calculate the current queues to display based on the current page
  const indexOfLastQueue = currentPage * itemsPerPage;
  const indexOfFirstQueue = indexOfLastQueue - itemsPerPage;
  const currentQueues = queues.slice(indexOfFirstQueue, indexOfLastQueue);
  const totalPages = Math.ceil(queues.length / itemsPerPage);


  const handleEditClick = (queue) => {
    const today = new Date().toISOString().split('T')[0]; 
    setEditQueueId(queue.id);
    setEditedQueue({
      ...queue,
      createdOn: today, 
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedQueue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const queueRef = ref(db, `queues/${editQueueId}`);
    try {
      await update(queueRef, editedQueue);
      setEditQueueId(null);
    } catch (error) {
      setError('Failed to update queue: ' + error.message);
    }
  };

  const handleDeleteClick = async (queueId) => {
    const queueRef = ref(db, `queues/${queueId}`);
    try {
      await remove(queueRef);
      setQueues((prevQueues) => prevQueues.filter((queue) => queue.id !== queueId));
    } catch (error) {
      setError('Failed to delete queue: ' + error.message);
    }
  };


  // Pagination button handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const hostId = localStorage.getItem("hostId")

  return (
    <div className={"queue-list-container border"}>
      {!hostId ?
        <div>
          <Toast
            title="Temporary warning!"
            subTitle="Please sign up to work on this page."
          />
        </div>
        :
        error ? (
          <p> {error}</p>
        ) : currentQueues.length > 0 ? (
          <>
            <table className="queue-list-table">
              <thead>
                <tr>
                  <th>Queue Name</th>
                  <th>Description</th>
                  <th>Joining Id</th>
                  <th>Created On</th>
                  <th>Duration (Min)</th>
                  <th>Limit</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentQueues.map((queue) => (
                  <tr key={queue.id}>
                    {editQueueId === queue.id ? (
                      <>
                        <td><input type="text" name="name" value={editedQueue.name} onChange={handleInputChange} /></td>
                        <td>
                          <textarea
                            name="description"
                            value={editedQueue.description || ''}
                            onChange={handleInputChange}
                            rows="3"
                            cols="20"
                            placeholder="Enter description"
                          ></textarea>
                        </td>
                        <td>{queue.id}</td>
                        {/* <td><input type="date" name="createdOn" value={editedQueue.createdOn}

                    //onChange={handleInputChange}
                     readonly /></td> */}
                     <td>{queue.createdOn}</td>
                    <td><input type="number" name="limitedDuration" value={editedQueue.limitedDuration} onChange={handleInputChange} /></td>
                    <td><input type="number" name="limit" value={editedQueue.limit} onChange={handleInputChange} /></td>
                    <td>
                      <select name="status" value={editedQueue.status || ''} onChange={handleInputChange}>
                        <option value="" disabled>Select Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Paused">Paused</option>
                      </select>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={handleSaveClick}>Save</button>
                        <button onClick={() => setEditQueueId(null)}>Cancel</button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{queue.name}</td>
                    <td>{queue.description}</td>
                    <td>{queue.id}</td>
                    <td>{queue.createdOn}</td>
                    <td>{queue.limitedDuration}</td>
                    <td>{queue.limit}</td>
                    <td>{queue.status}</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEditClick(queue)}>Edit</button>
                        <button onClick={() => handleDeleteClick(queue.id)}>Delete</button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-controls">
          <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </>
    ) : (
      <p>No Queues in the list</p>
    )}
  </div>
);
};
export default QueueList;