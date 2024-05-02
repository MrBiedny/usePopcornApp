import Movie from "../movie/Movie";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MovieListProps {
  movies: Movie[];
  onSelectMovie: (imdbID: string) => void;
}

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}
