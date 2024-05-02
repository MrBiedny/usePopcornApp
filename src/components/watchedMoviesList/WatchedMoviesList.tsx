import WatchedMovie from "../watchedMovie/WatchedMovie";

interface WatchedMovieList {
  imdbID: string;
  title: string;
  poster: string;
  imdbRating: number;
  userRating: number;
  runtime: number;
}

interface WatchedMovieListProps {
  watched: WatchedMovieList[];
  onDeleteWatched: (imdbID: string) => void;
}

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: WatchedMovieListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
