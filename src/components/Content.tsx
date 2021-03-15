import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';

interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
  imdbID: string;
}

interface ContentProps {
  genreId: number;
}

export function Content({ genreId }: ContentProps) {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenreTitle, setSelectedGenreTitle] = useState('');

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${genreId}`).then(response => {
      setMovies(response.data);
    });
    
    api.get(`genres/${genreId}`).then(response => {
      const { title } = response.data;
      setSelectedGenreTitle(title);
    });
  }, [genreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenreTitle}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}