import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    async function fetchMoviesHandler() {
        setIsLoading(true);
        const res = await fetch('https://swapi.dev/api/films/');
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
        setIsLoading(false);
    }

    return (
        <>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && MoviesList.length > 0 && (
                    <MoviesList movies={movie} />
                )}
                {!isLoading && MoviesList.length === 0 && (
                    <p>No movies found</p>
                )}
                {isLoading && <p>Loading</p>}
            </section>
        </>
    );
}

export default App;
