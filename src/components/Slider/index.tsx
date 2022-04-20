import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { IGetMoviesResult, IGetUpcomingMovies } from "../../api/api";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../util/utils";
import * as S from "./style";

const offset = 6; // 한번에 보여주고 싶은 영화 수

function Slider(data: IGetMoviesResult) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  // 클릭하면 이전 row가 사라지기 전에 다음 row가 사라지려고 하기에 gap이 커짐
  // 따라서 버튼 클릭시 한 슬라이더가 사라지고 다 사라졌는지 여부를 leaving
  // 다 사라졌을 경우 AnimatePresence onExitComplete={toggleLeaving}으로 설정
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    const totalMovies = data?.results.length;
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  // 영화 클릭시 팝업창 생성
  // useHistory() :  URL을 왔다갔다 할 수 있음 (여러 router 이동 가능)
  const navigate = useNavigate();
  const homeMovieMathch: PathMatch<string> | null =
    useMatch("/movies/:movieId");

  const onClicked = (movieId: number) => {
    navigate(`/movies/${movieId}`);
  };

  // 특정 영화 클릭한 상태에서 영화가 아닌 바깥 부분 클릭할 경우 팝업창 닫히게 함
  const onOverlayClick = () => navigate("/");

  // 사용자가 어떤 위치의 스크롤에 있어도 팝업창은 항상 화면 가운데에 나타나야 함
  const { scrollY } = useViewportScroll();

  // 클릭한 영화 정보(사진) 가져오기
  // 영화 클릭시 id params로 api를 통해 가져와도 되지만 시간이 걸리기에
  // 그동안 먼저 가져온 영화 목록들 중에서 현재 id parmas와 매치되는 영화 정보를 탐색해
  // 간략한 정보를 먼저 사용
  const clikedMovie =
    homeMovieMathch?.params.movieId &&
    data?.results.find(
      (movie: any) => movie.id + "" === homeMovieMathch?.params.movieId
    );

  return (
    <>
      <S.Sliders>
        <S.SliderTitle>
          <Link to="/">
            <div>신규 콘텐츠</div>
          </Link>
        </S.SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <button onClick={increaseIndex}>click</button>
          <S.Row
            key={index}
            variants={S.rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {data.results
              .slice(offset * index, offset * index + offset)
              .map((item) => (
                <S.RowItem
                  layoutId={item.id + ""}
                  key={item.id}
                  variants={S.boxVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  onClick={() => onClicked(item.id)}
                >
                  <S.Box bgphoto={makeImagePath(item.backdrop_path)}>
                    <S.BoxInner>
                      <S.Info variants={S.infoVariants}>
                        <h4>{item.title}</h4>
                      </S.Info>
                    </S.BoxInner>
                  </S.Box>
                </S.RowItem>
              ))}
          </S.Row>
        </AnimatePresence>
      </S.Sliders>
      <AnimatePresence>
        {homeMovieMathch && (
          <>
            <S.Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></S.Overlay>
            <S.BigMovie
              layoutId={homeMovieMathch.params.movieId}
              style={{
                top: scrollY.get() + 100,
              }}
            >
              {clikedMovie && (
                <>
                  <S.BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                        clikedMovie.backdrop_path,
                        "w500"
                      )})`,
                    }}
                  />
                  <S.BigTitle>{clikedMovie.title}</S.BigTitle>
                  <S.BigOverview>{clikedMovie.overview}</S.BigOverview>
                </>
              )}
            </S.BigMovie>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default Slider;
