import logo from './logo.svg';
import './App.css';
import { useState,useEffect } from 'react';
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';

const API_URL="https://www.omdbapi.com?apikey=c9db6010";

const App=()=> {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
    console.log(movies);
    
  }, []);

  const load=async()=>{
    const val=await fetch(`${API_URL}`);
    const value=await val.json();
    setMovies(value.search);
  }
  // const searchMovies = async(title)=>{
  //   const response = await fetch(`${API_URL}&s=${title}`);
  //   const data = await response.json();

  //   setMovies(data.Search);
  // }
  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]); 
        console.error("API Error:", data.Error);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setMovies([]); 
    }
  };
  
  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input 
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder='search for movie'
        />
        <img 
        src={SearchIcon} 
        alt="search"
        onClick={()=>searchMovies(searchTerm)}
        />
      </div>
      {
        movies.length>0?(
          <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
        ):(
          <div className="empty">
          <h2>No movies found</h2>
        </div>
        )
      }
    </div>
  );
}

export default App;
