// import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { fetchImg } from './Service/FetchImages';
import { Searchbar } from './SearchBar/SearchBar';
import { useState, useEffect } from 'react';

export function App() {
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
        console.log(resp);

        setImages(images => {
          if (page === 1) {
            return [...resp.hits];
          } else {
            return [...images, ...resp.hits];
          }
        });
      } catch (error) {
        setError(
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

  const handleSubmit = query => {
    setQuery(query);
    setIsLoading(true);
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
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery images={images} />
      {renderButtonOnLoader()}
    </div>
  );
}
