import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.bz/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex max-w-[1200px] mx-auto px-4 mt-20 gap-10">
          <img
            className="w-100 rounded-xl self-start "
            src={movie.medium_cover_image}
            alt={movie.title}
          />
          <div className="flex flex-col gap-[10px]">
            <h1 className="text-2xl font-bold">제목 : {movie.title}</h1>
            <span>출시연도 : {movie.year}</span>
            <span>평점 : {movie.rating} / 10</span>
            <p className="w-">줄거리 : {movie.description_intro}</p>
            <ul className="flex">
              {movie.genres.map((g) => (
                <li
                  className="px-[10px] py-[4px] text-[#fff] rounded-xl mr-[5px] bg-[#50d71e]"
                  key={g}
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
