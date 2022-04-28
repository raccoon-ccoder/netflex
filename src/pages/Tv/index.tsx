import { useQuery } from "react-query";
import { getPopularTvShows } from "../../api/api";
import { makeImagePath } from "../../util/utils";
import Slider from "../../components/Slider";
import * as S from "./style";
function Tv() {
  const popularTvQuery = useQuery(["shows", "popular"], getPopularTvShows);
  return (
    <S.Wrapper>
      {popularTvQuery.isLoading ? (
        <S.Loader>Loading</S.Loader>
      ) : (
        <S.Banner
          bgPhoto={makeImagePath(
            popularTvQuery.data?.results[1].backdrop_path || ""
          )}
        >
          <S.Title>{popularTvQuery.data?.results[0].title}</S.Title>
          <S.Overview>{popularTvQuery.data?.results[0].overview}</S.Overview>
        </S.Banner>
      )}

      <S.Main>
        {popularTvQuery.isLoading ? (
          <S.Loader>Loading</S.Loader>
        ) : (
          <>
            <Slider
              data={popularTvQuery.data}
              title="인기 콘텐츠"
              content="tv"
            />
          </>
        )}
      </S.Main>
    </S.Wrapper>
  );
}

export default Tv;
