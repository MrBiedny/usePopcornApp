import { useEffect, useState } from "react";
import { KEY } from "../data/ConstData";

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface MoviesResponse {
  Response: string;
  Search: Movie[];
  totalResults: string;
  Error?: string;
}

interface MoviesHook {
  movies: Movie[];
  isLoading: boolean;
  error: string;
}

export function useMovies(query: string): MoviesHook {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");

        const data: MoviesResponse = await res.json();
        if (data.Response === "False") throw new Error(data.Error);

        setMovies(data.Search);
        setError("");
      } catch (err: unknown) {
        if (err instanceof Error) {
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }

    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
