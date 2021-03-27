import { useEffect, useState } from 'react';

import { SideBar } from './SideBar';
import { Header } from './Header';
import { MovieCard } from './MovieCard';

import { MovieProps, GenreResponseProps } from './types';
import { api } from '../services/api';

import '../styles/global.scss';
import '../styles/content.scss';

export function Content() {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar 
        handleClickButton={ handleClickButton }
        selectedGenreId={ selectedGenreId }
      />
      <div className="container">
        <Header title={selectedGenre.title}/>

        <main>
          <div className="movies-list">
            {movies.map(movie => (
              <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}