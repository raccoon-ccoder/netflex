import { useQuery } from "react-query";
import { useEffect } from "react";
import {
  getMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  IGetMoviesResult,
  IGetTopRatedMovies,
  IGetUpcomingMovies,
} from "../../api/api";
import { makeImagePath } from "../../util/utils";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import Slider from "../../components/Slider";
import * as S from "./style";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";

function Home() {
  const nowMoviesQuery = useQuery(["movies", "nowPlaying"], getMovies);

  const topMoviesQuery = useQuery(["movies", "topRated"], getTopRatedMovies);

  const comingMoviesQuery = useQuery(["movies", "upComing"], getUpcomingMovies);
  return (
    <S.Wrapper>
      {nowMoviesQuery.isLoading ? (
        <S.Loader>Loading</S.Loader>
      ) : (
        <S.Banner
          bgPhoto={makeImagePath(
            nowMoviesQuery.data?.results[1].backdrop_path || ""
          )}
        >
          <S.Title>{nowMoviesQuery.data?.results[0].title}</S.Title>
          <S.Overview>{nowMoviesQuery.data?.results[0].overview}</S.Overview>
        </S.Banner>
      )}

      <S.Main>
        {nowMoviesQuery.isLoading ||
        topMoviesQuery.isLoading ||
        comingMoviesQuery.isLoading ? (
          <S.Loader>Loading</S.Loader>
        ) : (
          <>
            <Slider data={nowMoviesQuery.data} title="신규 콘텐츠" />
            <Slider data={topMoviesQuery.data} title="지금 뜨는 콘텐츠" />
            <Slider data={comingMoviesQuery.data} title="예정 콘텐츠" />
          </>
        )}
      </S.Main>
    </S.Wrapper>
  );
}

export default Home;
