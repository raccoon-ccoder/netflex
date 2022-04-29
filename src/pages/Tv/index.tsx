import { useQuery } from "react-query";
import {
  getAiringTodayTvShows,
  getOnTheAirTvShows,
  getPopularTvShows,
  getTopRatedTvShows,
} from "../../api/api";
import { makeImagePath } from "../../util/utils";
import Slider from "../../components/Slider";
import * as S from "./style";
function Tv() {
  const popularTvQuery = useQuery(["shows", "popular"], getPopularTvShows);
  const airingTodayTvQuery = useQuery(
    ["shows", "airing_today"],
    getAiringTodayTvShows
  );
  const topRatedTvQuery = useQuery(["shows", "top_rated"], getTopRatedTvShows);
  const onTheAirTvQuery = useQuery(["shows", "on_the_air"], getOnTheAirTvShows);
  return (
    <S.Wrapper>
      {popularTvQuery.isLoading ? (
        <S.Loader>Loading</S.Loader>
      ) : (
        <S.Banner
          bgPhoto={makeImagePath(
            popularTvQuery.data?.results[0].backdrop_path || ""
          )}
        >
          <S.Title>{popularTvQuery.data?.results[0].title}</S.Title>
          <S.Overview>{popularTvQuery.data?.results[0].overview}</S.Overview>
        </S.Banner>
      )}

      <S.Main>
        {popularTvQuery.isLoading ||
        airingTodayTvQuery.isLoading ||
        topRatedTvQuery.isLoading ||
        onTheAirTvQuery.isLoading ? (
          <S.Loader>Loading</S.Loader>
        ) : (
          <>
            <Slider
              data={popularTvQuery.data}
              title="현재 인기 콘텐츠"
              content="tv"
            />
            <Slider
              data={airingTodayTvQuery.data}
              title="따끈따끈한 신작 콘텐츠"
              content="tv"
            />
            <Slider
              data={topRatedTvQuery.data}
              title="찬사를 받은 콘텐츠"
              content="tv"
            />
            <Slider
              data={onTheAirTvQuery.data}
              title="현재 방영중인 콘텐츠"
              content="tv"
            />
          </>
        )}
      </S.Main>
    </S.Wrapper>
  );
}

export default Tv;
