import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/imageCard';
import { Container, Row, Col } from 'react-bootstrap';
import Welcome from './components/Welcome';
import Loader from './components/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

function App() {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [Load, setLoad] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);
      setImages(res.data || []);
      setLoad(false);
      toast.success('Saved Images downloaded');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getSavedImages();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    console.log('sending fetch request');
    console.log(word);

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);
      toast.info(`New Image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord(' ');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);
      if (res.data?.deleted_id) {
        toast.warn(
          `Image ${images
            .find((i) => i.id === id)
            .title.toUpperCase()} was deleted`
        );
        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleSaveImage = async (id) => {
    const imageToBeSave = images.find((image) => image.id === id);
    imageToBeSave.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSave);
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );
        toast.info(`Image ${imageToBeSave.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="App">
      <Header title="Images Gallery" />
      {Load ? (
        <Loader />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container>
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      ;
      <ToastContainer position="bottom-right" />
    </div>
  );
}
//WATCHPACK_POLLING=true may need later
export default App;
