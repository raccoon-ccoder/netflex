const API_KEY = "f2e4123fa21aa590fe3fd4bc4477dd8c";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title?: string;
  name?: string;
  video?: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export async function getTopRatedMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export async function getUpcomingMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export async function getPopularMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

interface genre {
  id: number;
  name: string;
}

export interface IGetMovie {
  genres: genre[];
  popularity: number;
  release_date: string;
  runtime: number;
}

export async function getMovie(movieId: number | undefined) {
  return (
    await fetch(
      `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=en-US&region=kr`
    )
  ).json();
}

export interface IGetMovieTrailer {
  key: string;
}

export async function getMovieTrailer(movieId: number) {
  return (
    await fetch(
      `${BASE_PATH}/movie/${movieId}/video?api_key=${API_KEY}&language=en-US&region=kr`
    )
  ).json();
}

export async function getPopularTvShows() {
  return (
    await fetch(
      `${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export async function getTv(tvId: number | undefined) {
  return (
    await fetch(
      `${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}&language=en-US&region=kr`
    )
  ).json();
}
