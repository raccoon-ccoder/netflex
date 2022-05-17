import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { contentAtom } from "../../atom/atoms";
import { getMovie, getTv, IGetMovie } from "../../api/api";
import * as S from "./style";

function Modal() {
  const [contentId, contentName, keyword] = useRecoilValue(contentAtom);
  const { isLoading, data } = useQuery<IGetMovie>(["movie", "test"], () =>
    contentName === "movie"
      ? getMovie(Number(contentId))
      : getTv(Number(contentId))
  );

  return isLoading ? null : (
    <S.BigDetails>
      <S.BigGenres>
        <span>genre:</span>
        {data?.genres.map((i) => i.name).join(", ")}
      </S.BigGenres>
      <S.BigGenres>
        <span>popularity:</span>
        {data?.popularity.toFixed(1)}
      </S.BigGenres>
      <S.BigDate>
        <span>relase date:</span>
        {data?.release_date || data?.first_air_date}
      </S.BigDate>
    </S.BigDetails>
  );
}

export default Modal;
