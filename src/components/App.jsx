import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImg } from './Service/FetchImages';
import { Searchbar } from './SearchBar/SearchBar';
import { useState, useEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalImgs, setTotalImgs] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    async function fetchImgage() {
      try {
        setIsLoading(true);
        setError(null);

        const resp = await fetchImg(query, page);
        setTotalImgs(resp.totalHits);

        if (resp.totalHits === 0) {
          toast.warn(
            'На даний запит в нас немає зображень 🙄 спробуйте пошукати щось подібне!'
          );
          setIsLoading(false);
          return;
        } else {
          setImages(images => {
            if (page === 1) {
              return [...resp.hits];
            } else {
              return [...images, ...resp.hits];
            }
          });
        }
      } catch (error) {
        toString(
          'Упс, щось пішло не так, спробуйте перезавантажити сторінку! 🙄'
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchImgage();
  }, [page, query, totalImgs, error]);

  const handleLoadMore = () => {
    setPage(page => page + 1);
    setIsLoading(true);
  };

  // const handleSubmit = query => {
  //   setQuery(query);
  //   setIsLoading(true);
  // };

  const handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target.elements.query;
    if (value.trim() === '') {
      setImages([]);
      setTotalImgs(0);
      return toast(
        'Оууу, поле пошуку пусте! Введіть якесь значення для пошуку зображення !'
      );
    } else {
      setQuery(value);
    }
  };

  const renderButtonOnLoader = () => {
    return isLoading ? (
      <Loader />
    ) : (
      images !== 0 && images.length < totalImgs && (
        <Button onClick={handleLoadMore} />
      )
    );
  };

  return (
    <div
      style={{
        padding: 20,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        color: 'grey',
        backgroundColor: '#2a416f',
        alignItems: 'center',
      }}
    >
      <ToastContainer />
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOnLoader()}
    </div>
  );
};
