import React from 'react';
import { Spinner } from 'react-bootstrap';
import './LoadingOverlay.css';

const LoadingOverlay = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="loading-overlay">
      <Spinner animation="border" />
    </div>
  );
};

export default LoadingOverlay;
