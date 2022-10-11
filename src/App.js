import React,{useState}from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movie, setMovie] = useState([])
    const fetchMoviesHandler = () => {
        fetch('https://swapi.dev/api/films/')
            .then((res) => {return res.json()})
            .then((data) =>{
              const transMovies = data.results.map(movie =>{
                return {
                  id: movie.episode_id,
                  title: movie.title,
                  openingText:movie.opening_crawl,
                  releaseDate:movie.release_date
                }
              })
              setMovie(transMovies)});
    };
  
    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movie} />
            </section>
        </React.Fragment>
    );
}

export default App;
