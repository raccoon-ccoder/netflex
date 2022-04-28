import { useQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { bigMovieAtom } from "../../atom/atoms";
import { getMovie, getTv, IGetMovie } from "../../api/api";
import * as S from "./style";

function Modal() {
  const content = useRecoilValue(bigMovieAtom);
  const { isLoading, data } = useQuery<IGetMovie>(["movie", "test"], () =>
    content[1] === "movie"
      ? getMovie(Number(content[0]))
      : getTv(Number(content[0]))
  );
  console.log(data);
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
        {data?.release_date}
      </S.BigDate>
    </S.BigDetails>
  );
}

export default Modal;
