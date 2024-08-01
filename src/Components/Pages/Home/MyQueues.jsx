import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router';
import { useDeleteQueue } from '../../../store/asyncActions';
import { selectQueues } from '../../../store/queues';
// import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';
import Form from 'react-bootstrap/esm/Form';

import { queues as Qs } from '../../../__mocks__/data'

function MyQueues({isViewInfo=false}) {
  const navigate = useNavigate();

  function getActiveQueues({hostId}){

    //mockind data
    return queues = Qs.queues
  }

  const queues = getActiveQueues();

  const handleChange = (e) => {
    if(isViewInfo)
    {
      const queueId = e.target.value;
      navigate(`/queue/${queueId}`)
    }
  };

  return (
    <div className={styles['my-queue']}>
      <p>
        {queues.length === 0
          ? "Looks like you don't have any active queues. Start by creating one..."
          : 'What would you like to do today? Here are your active queues:'}
      </p>
      <Form.Label htmlFor="queueName">Event</Form.Label>
      <Form.Select id='queueName' onChange={handleChange}>
        <option disabled={true} selected>Select event name select</option>
        {queues.map((queue) => (
            <option
              value={queue.queueId}
              tabIndex="0"
              // role="button"
              className={styles['my-queue-item']}
            >
            {queue.queueName}
            </option>
            )
        )}
      </Form.Select>
    </div>
  );
};
export default MyQueues;