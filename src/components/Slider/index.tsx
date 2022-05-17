import { useEffect, useState } from "react";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import { getMovie, IGetMovie, IGetMoviesResult } from "../../api/api";
import { Link, PathMatch, useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../../util/utils";
import * as S from "./style";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";
import { contentAtom } from "../../atom/atoms";
import Modal from "../Modal";

interface IMoviesProps {
  data: IGetMoviesResult;
  title: string;
  content: string;
  keyword: string;
}

function Slider({ data, title, content, keyword }: IMoviesProps) {
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);

  // 클릭하면 이전 row가 사라지기 전에 다음 row가 사라지려고 하기에 gap이 커짐
  // 따라서 버튼 클릭시 한 슬라이더가 사라지고 다 사라졌는지 여부를 leaving
  // 다 사라졌을 경우 AnimatePresence onExitComplete={toggleLeaving}으로 설정
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setBack(false);
    const totalContents = data?.results.length;
    const maxIndex = Math.floor(totalContents / offset);
    setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
  };

  const decreaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setBack(true);
    const totalContents = data?.results.length;
    const maxIndex = Math.floor(totalContents / offset);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  // 영화 클릭시 팝업창 생성
  // useHistory() :  URL을 왔다갔다 할 수 있음 (여러 router 이동 가능)
  const navigate = useNavigate();
  const homeMovieMathch: PathMatch<string> | null =
    useMatch("/movies/:movieId");

  const homeTvMatch: PathMatch<string> | null = useMatch("/tv/:contentId");

  const [getContent, setBigMovie] = useRecoilState(contentAtom);

  const onClicked = (contentId: number) => {
    content === "movie"
      ? navigate(`/movies/${contentId}`)
      : navigate(`/tv/${contentId}`);
    setBigMovie([contentId, content, keyword]);
  };

  // 특정 영화 클릭한 상태에서 영화가 아닌 바깥 부분 클릭할 경우 팝업창 닫히게 함
  const onOverlayClick = () =>
    content === "movie" ? navigate("/") : navigate("/tv");

  // 사용자가 어떤 위치의 스크롤에 있어도 팝업창은 항상 화면 가운데에 나타나야 함
  const { scrollY } = useViewportScroll();

  const clikedContent = data?.results.find((movie: any) =>
    keyword === getContent[2] && content === "movie"
      ? movie.id + "" === homeMovieMathch?.params.movieId
      : movie.id + "" === homeTvMatch?.params.contentId
  );

  const [offset, setOffset] = useState(5);
  const changeOffset = () => {
    if (500 <= window.innerWidth && window.innerWidth <= 799) {
      setOffset(3);
    } else if (800 <= window.innerWidth && window.innerWidth <= 1099) {
      setOffset(4);
    } else if (1100 <= window.innerWidth && window.innerWidth <= 1399) {
      setOffset(5);
    } else if (1400 <= window.innerWidth) {
      setOffset(6);
    }
  };
  useEffect(() => {
    window.addEventListener("resize", changeOffset);
    return () => {
      window.removeEventListener("resize", changeOffset);
    };
  }, []);

  return (
    <>
      <S.Sliders>
        <S.SliderTitle>
          <Link to="/">
            <div>{title}</div>
          </Link>
          <S.ArrowBox>
            <S.Arrow
              onClick={decreaseIndex}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z" />
            </S.Arrow>
            <S.Arrow
              onClick={increaseIndex}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z" />{" "}
            </S.Arrow>
          </S.ArrowBox>
        </S.SliderTitle>
        <S.Slider>
          <AnimatePresence
            initial={false}
            onExitComplete={toggleLeaving}
            custom={back}
          >
            <S.Row
              custom={back}
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
                    layoutId={keyword + item.id}
                    key={item.id}
                    variants={S.boxVariants}
                    initial="normal"
                    whileHover="hover"
                    transition={{ type: "tween", duration: 0.4 }}
                    onClick={() => onClicked(item.id)}
                  >
                    <S.Box
                      bgphoto={makeImagePath(
                        item.backdrop_path || item.poster_path
                      )}
                    >
                      <S.BoxInner>
                        <S.Img
                          variants={S.infoVariants}
                          bgphoto={makeImagePath(
                            item.backdrop_path || item.poster_path
                          )}
                        />
                        <S.Info variants={S.infoVariants}>
                          <S.Title>{item.title || item.name}</S.Title>
                        </S.Info>
                      </S.BoxInner>
                    </S.Box>
                  </S.RowItem>
                ))}
            </S.Row>
          </AnimatePresence>
        </S.Slider>
      </S.Sliders>
      <AnimatePresence>
        {clikedContent && (
          <>
            <S.Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></S.Overlay>
            <S.BigContent
              layoutId={getContent[2] + "" + getContent[0]}
              style={{
                top: scrollY.get() - 200,
              }}
            >
              {clikedContent && (
                <>
                  <S.BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, #181818, transparent), url(${makeImagePath(
                        clikedContent.backdrop_path || clikedContent.poster_path
                      )})`,
                    }}
                  />
                  <S.BigInfo>
                    <S.BigTitle>
                      {clikedContent.title || clikedContent.name}
                    </S.BigTitle>
                    <S.BigDesc>
                      <S.BigOverview>{clikedContent.overview}</S.BigOverview>
                      <Modal />
                    </S.BigDesc>
                  </S.BigInfo>
                </>
              )}
            </S.BigContent>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
export default Slider;
