import React from 'react';
import { nanoid } from 'nanoid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImg } from './Service/FetchImages';
import { Searchbar } from './SearchBar/SearchBar';
import { useState, useEffect, useRef } from 'react';

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

        const parsQuery = query.slice(query.indexOf('/' + 1));
        const resp = await fetchImg(parsQuery, page);
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
        toast.error(
          'Упс, щось пішло не так, спробуйте перезавантажити сторінку! 🙄'
        );
      } finally {
        setIsLoading(false);
      }
    }
    fetchImgage();
  }, [page, query, totalImgs, error]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const { value } = event.target.elements.query;
    setImages([]);
    setTotalImgs(0);
    setPage(1);

    if (value.trim() === '') {
      return toast(
        'Оууу, поле пошуку пусте! Введіть якесь значення для пошуку зображення !'
      );
    } else {
      setQuery(`${nanoid()}/${value}`);
      console.log(`${nanoid()}/${value}`);
      resetQuery(event);
    }
  };

  // Скидаємо значення поля ввода на порожню строку ''
  const resetQuery = event => (event.target.elements.query.value = '');

  const showButtonLoadMore = () => {
    return !isLoading && images !== 0 && images.length < totalImgs;
  };
  const showButtonScrollToForm = () => {
    return !isLoading && page >= 2;
  };
  const formRef = useRef();

  const handleScrollToForm = () => {
    console.log(formRef);
    const dims = formRef.current.getBoundingClientRect();
    window.scrollTo({ top: dims.top, behavior: 'smooth' });
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
      <Searchbar onSubmit={handleSubmit} formRef={formRef} />
      <ImageGallery images={images} />
      {isLoading && <Loader />}
      {showButtonLoadMore() && (
        <Button onClick={handleLoadMore} children={'Load More '} />
      )}
      {showButtonScrollToForm() && (
        <Button
          onClick={handleScrollToForm}
          children={'Scroll to form search'}
        />
      )}
    </div>
  );
};
