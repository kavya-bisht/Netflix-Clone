import React, { useEffect, useState } from "react";
import axios from './axios';
import requests from './requests';
import "./Banner.css"
function Banner() {
    const [movie, setMovie] = useState([]);       //to get random movie when we refresh the page

    useEffect(() =>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]);
                return request;
        }
        fetchData();
    }, []);

    console.log(movie);

    function truncateString(str, num) {
            return str?.length > num ? str.substr(0,num-1) + "...": str;
           }

    return (                      
        <header 
        className="banner" 
        style={{
            backgroundSize: "cover",
            backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
            )`,
            backgroundPosition: "center center",
            }} 
            >
        <div className="banner__contents">

            <h1 className="banner__title">
            {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <div className="banner__buttons">
            <button className="banner__button">Play</button>
            <button className="banner__button">My List</button>
            </div>
             <h1 className="banner__description">{truncateString(movie?.overview, 150)}</h1> 
            
            {/* title */}
            {/* div > 2 buttons */}
            {/* description */}
        </div>
        <div className="banner--fadeBottom"/>
        </header>
    );
}

export default Banner;

