import React from 'react';
import { Spinner } from 'react-bootstrap';
const spinnerStyle = {
  postition: 'relative',
  width: '8rem',
  height: '8rem',
};
const centerDiv = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '200px',
};
const Loader = () => {
  return (
    <div style={centerDiv}>
      <Spinner animation="border" variant="primary" style={spinnerStyle} />
    </div>
  );
};
export default Loader;
