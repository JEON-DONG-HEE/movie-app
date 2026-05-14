import { sendGAEvent } from "../utils/ga";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";

type MovieProps = {
  id: number;
  coverImg: string;
  title: string;
  year: number;
  summary: string;
  genre: string[];
};

function Movie({ id, coverImg, title, year, summary, genre }: MovieProps) {
  /* GA 태깅 */
  const handleMovieClick = () => {
    sendGAEvent("click_movie_card", {
      movie_id: id,
      movie_title: title,
    });
  };
  /* /GA 태깅 */

  return (
    <div className={styles.movie}>
      <div className={styles.img_sec}>
        <Link to={`/movie/${id}`} onClick={handleMovieClick}>
          <img src={coverImg} alt={title} className={styles.img_thumb} />
        </Link>
      </div>
      <Link to={`/movie/${id}`} onClick={handleMovieClick}>
        <div>
          <h2 className={styles.tit_movie}>{title}</h2>
          <h3 className={styles.year}>{year}</h3>
          <p>
            {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
          </p>
          <ul className={styles.genres}>
            {genre.map((genre) => (
              <li key={genre}>{genre}</li>
            ))}
          </ul>
        </div>
      </Link>
    </div>
  );
}

export default Movie;
