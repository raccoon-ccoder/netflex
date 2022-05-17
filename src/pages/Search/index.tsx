import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { getResultByKeyword, IGetMoviesResult } from "../../api/api";
import { contentAtom } from "../../atom/atoms";
import Modal from "../../components/Modal";
import { makeImagePath } from "../../util/utils";
import * as S from "./style";

function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["search", keyword],
    () => getResultByKeyword(keyword)
  );

  const [bigMovie, setBigMovie] = useRecoilState(contentAtom);

  const onClicked = (contentId: number, contentType: string) => {
    setBigMovie([contentId, contentType]);
  };

  const clikedMovie = data?.results.find(
    (content: any) => content.id === Number(bigMovie[0])
  );
  console.log(data);
  const onOverlayClick = () => setBigMovie([0, ""]);

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
  const { scrollY } = useViewportScroll();

  useEffect(() => {
    window.addEventListener("resize", changeOffset);
    return () => {
      window.removeEventListener("resize", changeOffset);
    };
  }, []);

  return (
    <S.Wrapper>
      {isLoading ? (
        <S.Loader>Loading</S.Loader>
      ) : (
        <S.Main>
          <S.Sliders>
            <S.SliderTitle>{keyword}로 검색한 결과입니다.</S.SliderTitle>
            <S.Row>
              {data?.results.map(
                (content) =>
                  content.media_type !== "person" &&
                  content.backdrop_path !== null && (
                    <S.RowItem
                      layoutId={content.id + ""}
                      key={content.id}
                      variants={S.boxVariants}
                      initial="normal"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                      onClick={() =>
                        onClicked(content.id, content?.media_type + "")
                      }
                    >
                      <S.Box bgphoto={makeImagePath(content.backdrop_path)}>
                        <S.BoxInner>
                          <S.Img
                            variants={S.infoVariants}
                            bgphoto={makeImagePath(content.backdrop_path)}
                          />
                          <S.Info variants={S.infoVariants}>
                            <S.Title>{content.title || content.name}</S.Title>
                          </S.Info>
                        </S.BoxInner>
                      </S.Box>
                    </S.RowItem>
                  )
              )}
            </S.Row>
          </S.Sliders>
        </S.Main>
      )}
      <AnimatePresence>
        {clikedMovie && (
          <>
            <S.Overlay
              onClick={onOverlayClick}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            ></S.Overlay>
            <S.BigMovie
              layoutId={clikedMovie.id + ""}
              // style={{
              //   top: scrollY.get() - 400,
              // }}
            >
              {clikedMovie && (
                <>
                  <S.BigCover
                    style={{
                      backgroundImage: `linear-gradient(to top, #181818, transparent), url(${makeImagePath(
                        clikedMovie.backdrop_path
                      )})`,
                    }}
                  />
                  <S.BigInfo>
                    <S.BigTitle>
                      {clikedMovie.title || clikedMovie.name}
                    </S.BigTitle>
                    <S.BigDesc>
                      <S.BigOverview>
                        <S.BigOverviewText>
                          {clikedMovie.overview}
                        </S.BigOverviewText>
                      </S.BigOverview>

                      <Modal />
                    </S.BigDesc>
                  </S.BigInfo>
                </>
              )}
            </S.BigMovie>
          </>
        )}
      </AnimatePresence>
    </S.Wrapper>
  );
}

export default Search;
