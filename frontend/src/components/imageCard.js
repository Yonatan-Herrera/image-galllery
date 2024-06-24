import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const ImageCard = ({ image, deleteImage, saveImage }) => {
  const authorPorfolio = image.user?.portfolio_url;
  const authorName = image.user?.name || 'No author name';
  return (
    <Card className="mt-4" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        <Button variant="primary" onClick={() => deleteImage(image.id)}>
          Delete
        </Button>
        {'   '}
        {!image.saved && (
          <Button
            variant="secondary"
            onClick={() => {
              saveImage(image.id);
            }}
          >
            Save
          </Button>
        )}
        <Card.Footer className="bg-white text-center text-muted">
          {authorPorfolio && (
            <Nav.Link href={authorPorfolio} target="_blank">
              {authorName}
            </Nav.Link>
          )}
          {!authorPorfolio && authorName}
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
export default ImageCard;
