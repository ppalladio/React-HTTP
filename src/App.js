import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMoviesHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('https://swapi.dev/api/films/');
            if (!res.ok) {
                throw new Error('Fetching movies failed');
            }
            const data = await res.json();
            const transMovies = data.results.map((movie) => {
                return {
                    id: movie.episode_id,
                    title: movie.title,
                    openingText: movie.opening_crawl,
                    releaseDate: movie.release_date,
                };
            });
            setMovie(transMovies);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p>No movies found</p>;
    if (movie.length > 0) {
        content = <MoviesList movies={movie} />;
    }
    if (error) {
        content = <p>{error}</p>;
    }
    if (isLoading) {
        content = <p>Loading...</p>;
    }

    return (
        <>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>{content}</section>
        </>
    );
}

export default App;
