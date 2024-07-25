import React from 'react';
import MuiAlert from '@mui/lab/Alert';

export default (props) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};
