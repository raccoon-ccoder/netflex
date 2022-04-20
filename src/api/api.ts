const API_KEY = "f2e4123fa21aa590fe3fd4bc4477dd8c";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
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

export interface IGetTopRatedMovies {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getTopRatedMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}

export interface IGetUpcomingMovies {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export async function getUpcomingMovies() {
  return (
    await fetch(
      `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=kr`
    )
  ).json();
}
