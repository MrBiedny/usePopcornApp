import { useEffect, useRef } from "react";

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({ query, setQuery }: SearchProps) {
  const inputEl = useRef<HTMLInputElement>(null);

  useEffect(
    function () {
      function callback(e: KeyboardEvent) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter" && inputEl.current) {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.addEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
