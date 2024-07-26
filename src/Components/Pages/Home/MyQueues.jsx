import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useNavigate } from 'react-router';
import { useDeleteQueue } from '../../../store/asyncActions';
import { selectQueues } from '../../../store/queues';
// import { useDispatch, useSelector } from 'react-redux';
import styles from './Home.module.scss';

import { queues as Qs } from '../../../__mocks__/data'
const queues = Qs.queues;

function MyQueues() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const queues = useSelector(selectQueues);
  // const deleteQueue = useDeleteQueue();

  const handleDelete = (e, queue) => {
    // Don't trigger parent's onClick
    e.stopPropagation();
    // dispatch(deleteQueue({ queueId: queue.queueId, goHome: false }));
  };

  const handler = (queueId) => navigate(`/queue/${queueId}`);

  return (
    <div className={styles['my-queue']}>
      <p>
        {queues.length === 0
          ? "Looks like you don't have any active queues. Start by creating one..."
          : 'What would you like to do today? Here are your active queues:'}
      </p>
      <Form.Label htmlFor="queueName">Event</Form.Label>
      <Form.Select id='queueName'>
        <option disabled='true' selected>Select event name select</option>
        {queues.map((queue) => {(
            <div
              key={queue.queueId}
              tabIndex="0"
              role="button"
              onKeyDown={handler(queue.queueId)}
              onClick={handler(queue.queueId)}
              className={styles['my-queue-item']}
            >
              <div>{queue.queueName}</div>
              {/* <IconButton onClick={(e) => handleDelete(e, queue)}>
              <DeleteIcon />
            </IconButton> */}
            </div>
          );
        })}
      </Form.Select>
    </div>
  );
};
export default MyQueues;