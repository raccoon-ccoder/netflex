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

  // const [index, setIndex] = useState(0);
  // const increaseIndex = () => {
  //   if (data) {
  //     if (leaving) return;
  //     setLeaving(true);
  //     const totalMovies = data?.results.length;
  //     const maxIndex = Math.floor(totalMovies / offset);
  //     setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  //   }
  // };
  // const [leaving, setLeaving] = useState(false);
  // // 클릭하면 이전 row가 사라지기 전에 다음 row가 사라지려고 하기에 gap이 커짐
  // // 따라서 버튼 클릭시 한 슬라이더가 사라지고 다 사라졌는지 여부를 leaving
  // // 다 사라졌을 경우 AnimatePresence onExitComplete={toggleLeaving}으로 설정
  // const toggleLeaving = () => setLeaving((prev) => !prev);

  // // 영화 클릭시 팝업창 생성
  // // useHistory() :  URL을 왔다갔다 할 수 있음 (여러 router 이동 가능)
  // const navigate = useNavigate();
  // const homeMovieMathch: PathMatch<string> | null =
  //   useMatch("/movies/:movieId");

  // const onClicked = (movieId: number) => {
  //   navigate(`/movies/${movieId}`);
  // };

  // // 특정 영화 클릭한 상태에서 영화가 아닌 바깥 부분 클릭할 경우 팝업창 닫히게 함
  // const onOverlayClick = () => navigate("/");

  // // 사용자가 어떤 위치의 스크롤에 있어도 팝업창은 항상 화면 가운데에 나타나야 함
  // const { scrollY, scrollX } = useViewportScroll();

  // // 클릭한 영화 정보(사진) 가져오기
  // // 영화 클릭시 id params로 api를 통해 가져와도 되지만 시간이 걸리기에
  // // 그동안 먼저 가져온 영화 목록들 중에서 현재 id parmas와 매치되는 영화 정보를 탐색해
  // // 간략한 정보를 먼저 사용
  // const clikedMovie =
  //   homeMovieMathch?.params.movieId &&
  //   data?.results.find(
  //     (movie) => movie.id + "" === homeMovieMathch?.params.movieId
  //   );

  // let offset = 6; // 한번에 보여주고 싶은 영화 수
  // useEffect(() => {
  //   scrollX.onChange(() => {
  //     if (500 <= scrollX.get() && scrollX.get() <= 799) {
  //       offset = 3;
  //     } else if (800 <= scrollX.get() && scrollX.get() <= 1099) {
  //       offset = 4;
  //     } else if (1100 <= scrollX.get() && scrollX.get() <= 1399) {
  //       offset = 5;
  //     }
  //   });
  // }, [scrollY]);
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
        {nowMoviesQuery.isLoading ? (
          <S.Loader>Loading</S.Loader>
        ) : (
          <S.Test>
            <Slider {...nowMoviesQuery.data} />
            <Slider {...topMoviesQuery.data} />
            <Slider {...comingMoviesQuery.data} />
          </S.Test>
        )}
      </S.Main>
    </S.Wrapper>
  );
}

export default Home;
