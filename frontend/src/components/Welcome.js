import React from 'react';
import { Jumbotron, Button } from 'react-bootstrap';
const Welcome = () => {
  return (
    <Jumbotron>
      <h1>Images Gallery</h1>
      <p>
        This is simple application that retrieves photos using Unplash API. In
        order to start enter any search term in the imput field.
      </p>
      <p>
        <Button variant="primary" href="https://unsplash.com" target="_blank">
          Learn more
        </Button>
      </p>
    </Jumbotron>
  );
};

export default Welcome;
