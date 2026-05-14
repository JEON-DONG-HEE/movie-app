import { useState, useEffect } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

type MovieType = {
  id: number;
  medium_cover_image: string;
  title: string;
  year: number;
  summary: string;
  genres: string[];
};

function Home() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState<MovieType[]>([]);
  const getMovies = async () => {
    const json = await (
      await fetch(
        `https://yts.bz/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`,
      )
    ).json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    getMovies();
  }, []);
  //   console.log(movies);
  return (
    <div>
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          <div>
            <div className={styles.movies}>
              {movies.map((movie) => (
                <div key={movie.id}>
                  <Movie
                    id={movie.id}
                    coverImg={movie.medium_cover_image}
                    title={movie.title}
                    year={movie.year}
                    summary={movie.summary}
                    genre={movie.genres}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
