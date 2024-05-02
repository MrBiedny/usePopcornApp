interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface NumResultsProps {
  movies: Movie[];
}

export default function Numresults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}
