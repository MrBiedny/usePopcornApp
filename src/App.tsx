import { useState } from "react";
import { useMovies } from "./helpers/useMovies";
import { useLocalStorageState } from "./helpers/useLocalStorageState";
import Loader from "./helpers/loader/Loader";
import ErrorMessage from "./helpers/errorMessage/ErrorMessage";
import Navbar from "./components/navbar/Navbar";
import Search from "./components/search/Search";
import Numresults from "./components/numResults/Numresults";
import Main from "./components/main/Main";
import Box from "./components/box/Box";
import MovieList from "./components/movieList/MovieList";
import MovieDetails from "./components/movieDetails/MovieDetails";
import WatchedSummary from "./components/watchedSummary/WatchedSummary";
import WatchedMoviesList from "./components/watchedMoviesList/WatchedMoviesList";

export default function App() {
  const [query, setQuery] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
