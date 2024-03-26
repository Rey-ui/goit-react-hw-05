import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader.jsx";
import ErrorMessage from "./ErrorMessage.jsx";
import css from "./MovieReviews.module.css";
import { fetchArticlesReviews } from "../Api.js";
const MovieReviews = () => {
  const { movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        if (movieId !== undefined) {
          setIsLoading(true);
          const data = await fetchArticlesReviews(movieId);
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
  return (
    <>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {movieData !== null ? (
        <div className={css.MovieReviewsContainer}>
          {movieData.length > 0 ? (
            <ul className={css.MovieReviewsList}>
              {movieData.map((review) => (
                <li className={css.MovieReviewsItem} key={review.id}>
                  <p className={css.MovieReviewsAuthor}>{review.author}</p>
                  <p className={css.MovieReviewsContent}>{review.content}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div>No Reviews</div>
          )}
        </div>
      ) : (
        <div>No Reviews</div>
      )}
    </>
  );
};

export default MovieReviews;
