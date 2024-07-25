import React from 'react';
import TextField from '@material-ui/core/TextField';
import { StylesProvider } from '@material-ui/core/styles';

// StylesProvider added to enable CSS use through className prop
function InputField(props){
  return (
  /* eslint-disable react/jsx-props-no-spreading */
  <StylesProvider injectFirst>
    <TextField placeholder={props.placeholder} fullWidth required variant="outlined" {...props} />
  </StylesProvider>
)};


export default InputField;