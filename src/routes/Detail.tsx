import { sendGAEvent } from "../utils/ga";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

type DetailMovie = {
  id: number;
  medium_cover_image: string;
  title: string;
  year: number;
  rating: number;
  description_intro: string;
  genres: string[];
};

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<DetailMovie | null>(
    null,
  ); /* DetailMovie 타입의 데이터가 들어오거나 초기에 null 값이 들어올 수도 있다(무조건 DetailMovie 가 바로 들어오지는 않는다), 초기값은 null, API 응답 후 DetailMovie 객체로 변경된다. */

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

  /* GA 태깅 */
  useEffect(() => {
    if (movie === null)
      return; /* 이거 없으면 새로고침시 무조건 에러남 movie 가 아직 로딩이 안되었는데 movie 객체에 접근하기 때문 */

    sendGAEvent("view_movie_detail", {
      movie_id: movie.id,
      movie_title: movie.title,
      movie_year: movie.year,
      movie_rating: movie.rating,
    });
  }, [movie]);

  const handleBackClick = () => {
    if (movie === null) return;

    sendGAEvent("click_back_button", {
      page_name: "movie_detail",
      movie_id: movie.id,
      movie_title: movie.title,
    });

    navigate(-1);
  };
  /* /GA 태깅 */

  return (
    <div>
      {loading || movie === null ? (
        <div className="w-100 h-dvh flex justify-center items-center">
          <span>Loading...</span>
        </div>
      ) : (
        <div className="flex max-w-[1200px] mx-auto px-4 mt-20 gap-10 relative">
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
            <button
              className="absolute top-0 right-0 hover:underline"
              type="button"
              onClick={handleBackClick}
            >
              뒤로가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
