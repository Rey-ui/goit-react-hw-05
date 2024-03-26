import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import css from "./MovieCast.module.css";
import ErrorMessage from "./ErrorMessage.jsx";
import { fetchArticlesCredits } from "../Api.js";
const MovieCast = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (movieId !== undefined) {
          setIsLoading(true);
          const data = await fetchArticlesCredits(movieId);
          setMovieData(data);
        }
      } catch (err) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [movieId]);
  const getImageUrl = (imagePath, size = "w200") => {
    return `https://image.tmdb.org/t/p/${size}/${imagePath}`;
  };
  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieData !== null && (
        <div className={css.MovieCastContainer}>
          <ul className={css.MovieCastList}>
            {movieData.map((actor) => (
              <li className={css.MovieCastItem} key={actor.id}>
                <img src={getImageUrl(actor.profile_path)} alt={actor.name} />
                <p className={css.MovieCastIyemText}>{actor.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
export default MovieCast;
