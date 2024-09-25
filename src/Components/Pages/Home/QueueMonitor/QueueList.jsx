import React, { useEffect, useState } from 'react';
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap/esm';
import { ref, child, get } from "firebase/database";
import { db, dbQueues } from '../../../../FirebaseConfig';
import styles from './QueueList.module.scss'
import Ribbon from '../../../common/Toast';
// import { queues as Qs } from '../../../__mocks__/data'

function QueueList({ onChange }) {

  const [queues, setQueues] = useState([])
  const hostId = localStorage.getItem("hostId")

  useEffect(() => {
    if (hostId) {
      get(ref(db, `/queues`))
        .then(snapshot => {
          if (snapshot.exists()) {
            const activeQueues = Object.values(snapshot.val()).filter(value => value.hostId === hostId && value.status !== 'Inactive');
            setQueues(activeQueues);
            // return (snapshot.val().name);
          }
        })
        .catch(error => {
          console.log("\tError in geting quueue list: ", (error.message));
        });
    }

  }, [hostId]);


  const handleChange = (e) => {
    // const queueId = e.target.value;
    // navigate(`/queue/${queueId}`)
    onChange(e.target.value)
  };

  const queueLink = (id) => {
    return `/dashboard/queue/` + id;
  }

  if (hostId === null)
    return (
      <Ribbon
        title="Temporary warning!"
        subTitle="Please sign up to work on this page."
      />
    )
  else if (queues.length === 0)
    return (
      <div className={"position-absolute top-50 start-50 translate-middle"}>
        <h4 className={"pb-3"}> Hi, looks like you don't have any active queues.</h4>
        <p>Following these step below to make your work run smoothly :     </p>
        <p> ✏️ Create some actives queues for your events</p>
        <p> ✏️ Access the queue codes of your events or save the QR codes by open the Queue Information in the Queue Monitor section </p>
        <p> ✏️ Share your queue codes or QR code images to your customers </p>
        <p> ....Then wait for serving</p>

        <p> 💹 Happy business!!!</p>
      </div>
    )

  return (
    <FloatingLabel column xs={5} controlId="floatingInputGrid" label="Choose Event">
      < Form.Select id='queueName' onChange={handleChange} >
        <option disabled={true} selected>Select queue name </option>
        {
          queues.map((queue) => (
            <option
              key={queue.id}
              value={queue.id}
              tabIndex="0"
              className={styles['my-queue-item']}
            >
              {queue.name}
            </option>
          )
          )
        }
      </Form.Select >
    </FloatingLabel >
  )

};
export default QueueList;