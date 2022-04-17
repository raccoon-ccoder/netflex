import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api/api";
import { makeImagePath } from "../util/utils";
import {
  motion,
  MotionValue,
  AnimatePresence,
  useViewportScroll,
} from "framer-motion";
import { useState } from "react";
import { Navigate, PathMatch, useMatch, useNavigate } from "react-router-dom";
const Wrapper = styled.div`
  background: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 56.25vw;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;

const Title = styled.h2`
  font-size: 7vw;
  margin-bottom: 15px;
`;

const Overview = styled.p`
  font-size: 1.8vw;
  width: 50%;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  height: 200px;
  cursor: pointer;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  /* @media screen and (min-width: 500px) and (max-width: 799px) {
    width: 33.3%;
    height: 200px;
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    width: 25%;
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    width: 20%;
  }
  @media screen and (min-width: 1400px) {
    width: 16.66666667%;
  } */
`;

const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -15,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const Info = styled(motion.div)`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

const offset = 6; // 한번에 보여주고 싶은 영화 수

function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getMovies
  );

  const [index, setIndex] = useState(0);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const totalMovies = data?.results.length;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const [leaving, setLeaving] = useState(false);
  // 클릭하면 이전 row가 사라지기 전에 다음 row가 사라지려고 하기에 gap이 커짐
  // 따라서 버튼 클릭시 한 슬라이더가 사라지고 다 사라졌는지 여부를 leaving
  // 다 사라졌을 경우 AnimatePresence onExitComplete={toggleLeaving}으로 설정
  const toggleLeaving = () => setLeaving((prev) => !prev);

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
      (movie) => movie.id + "" === homeMovieMathch?.params.movieId
    );
  console.log(clikedMovie);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Banner
            onClick={increaseIndex}
            bgPhoto={makeImagePath(data?.results[1].backdrop_path)}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((item) => (
                    <Box
                      layoutId={item.id + ""}
                      key={item.id}
                      bgphoto={makeImagePath(item.backdrop_path)}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() => onClicked(item.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{item.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {homeMovieMathch && (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovie
                  layoutId={homeMovieMathch.params.movieId}
                  style={{
                    top: scrollY.get() + 100,
                  }}
                ></BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Home;
