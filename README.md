## Netflix Clone
- 개요
  - 넷플릭스 클론 웹 어플리케이션
  - 노마드 코더의 리액트JS 강의를 기반으로 새로운 기능 추가
- 담당 구현 파트
  - react-query, TMDB(themoviedb) api를 통한 콘텐츠 정보 제공
  - framer motion library을 활용한 슬라이더 및 모달 구현
  - 선택한 콘텐츠에 대한 Recoil의 global state 저장 및 관리
  - 입력한 키워드에 따른 콘텐츠 결과 조회
- 사용 기술 & 라이브러리
    - HTML, CSS, TypeScript, React, React-Router, React-Hook-Form, React-Query, Recoil, Styled-Components, Framer-Motion

## 고민 & 구현 방법
1. 콘텐츠를 보여주는 슬라이더가 자연스럽게 넘어가는 애니메이션 구현하는 방법
- 고민 : 클릭한 화살표의 방향에 따라 현재 슬라이더가 해당 방향으로 자연스럽게 사라지고 새로운 슬라이더가 나타나는 효과를 어떻게 구현할 수 있을까?
- 해결 : 각각의 슬라이더인 Row 컴포넌트의 key를 나타내는 index, 슬라이더가 사라지고 있는지 여부에 대한 leaving, 슬라이더의 움직이는 방향에 대한 back, 총 3개의 state를 생성한 후 화살표 클릭시 3개의 state를 업데이트하였습니다. 또한 Row 컴포넌트의 자연스러운 애니메이션 효과를 주기위해 variants props를 설정하였습니다.

<br/>

```js
// Slider/index.tsx	
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  const toggleLeaving = () => setLeaving((prev) => !prev);

  const increaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setBack(false);
    const totalMovies = data?.results.length;
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
  };

  const decreaseIndex = () => {
    if (leaving) return;
    setLeaving(true);
    setBack(true);
    const totalMovies = data?.results.length;
    const maxIndex = Math.floor(totalMovies / offset);
    setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
... 중략
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
              ... 중략
            </S.Row>
</AnimatePresence>

// Slider/style.ts
const rowVariants = {
  hidden: (back: boolean) => {
    return { x: back ? -window.innerWidth : window.innerWidth };
  },
  visible: {
    x: 0,
  },
  exit: (back: boolean) => {
    return {
      x: back ? window.innerWidth : -window.innerWidth,
    };
  },
};
```
화살표 버튼 클릭시 작동하는 함수 increaseIndex, decreaseIndex는 버튼을 여러번 클릭할 시 슬라이더가 현재 움직이고 있다면 중복 애니메이션 효과를 방지하기 위해 leaving state가 false일 경우 실행되지 않게 하였으며 AnimatePresence의 onExitComplete prop을 이용해 Row 컴포넌트가 exit 되었을 때 leaving state를 업데이트(false)하였습니다.

또한 슬라이더의 움직임 방향을 나타내는 back state를 이용해 슬라이더가 숨겨졌을 때(hidden), 보여지고 있을 때(visible), 사라질 때(exit)의 애니메이션 효과를 주었습니다.

<br/>

2. 검색어 입력시 그에 따른 콘텐츠 정보를 바로 가져오는 방법
- 고민 : 검색어 입력 후 조회하면 매번 새로운 콘텐츠 데이터를 가져와야 하는데 어떻게 가져올 수 있을까?
- 해결 : react-query의 useQuery를 이용해  데이터를 가져오는데 react-query는 cache에 key를 이용해 접근하기에 query key에 사용자가 입력한 keyword로 설정하여 react-query가 트리거 되어 자동으로 refetching하도록 구현하였습니다.

<br/>

```js
function Search() {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");

  const { isLoading, data } = useQuery<IGetMoviesResult>(
    ["search", keyword],
    () => getResultByKeyword(keyword)
  );
... 중략
}
```
URL의 keyword 파라미터값을 useQuery의 key 값으로 설정하여 검색어 입력 후 페이지 이동시 검색어에 따른 다른 콘텐츠 데이터를 제공합니다.

<br/>

3. 원하는 콘텐츠의 상세 정보를 보여 주기 위해 모달 생성시 미디어 타입과 콘텐츠 id에 따라 다른 api를 사용하는 방법
- 고민 : 슬라이더에서 원하는 콘텐츠 클릭시 모달이 띄워지는데 이때 해당 콘텐츠의 미디어 타입과 id가 다 다른데 어떻게 구별해서 api를 사용할 수 있을까?
- 해결 : 콘텐츠 클릭시 Slider 컴포넌트에서 Modal 컴포넌트까지 [콘텐츠 id, 미디어타입]에 해당하는 데이터들을 일일이 전달하기 위해 반복적인 props를 사용하면 props drilling 현상이 일어날 수 있기에 Recoil을 이용하여 편리하고 재사용성 있는 global state로 관리합니다.

<br/>

```js
// Slider/index.tsx
function Slider({ data, title, content }: IMoviesProps) {
...중략 
const setBigMovie = useSetRecoilState(bigMovieAtom);

const onClicked = (contentId: number) => {
    content === "movie"
      ? navigate(`/movies/${contentId}`)
      : navigate(`/tv/${contentId}`);
    setBigMovie([contentId, content]);
  };

return (
	...중략
			<S.RowItem
           layoutId={item.id}
           key={item.id}
           variants={S.boxVariants}
          onClick={() => onClicked(item.id)}
       />
	);
}

// Modal/index.tsx
function Modal() {
  const [contentId, contentName] = useRecoilValue(bigMovieAtom);
  const { isLoading, data } = useQuery<IGetMovie>(["movie", "test"], () =>
    contentName === "movie"
      ? getMovie(Number(contentId))
      : getTv(Number(contentId))
  );
  ... 중략
}
```
Slider 컴포넌트에서는 useSetRecoilState를 이용해  [콘텐츠 id, 미디어 타입]이 저장되어 있는 bigMovieAtom 상태의 값을 업데이트하는 함수인 setBigMovie를 만듭니다. 슬라이더에서 원하는 콘텐츠 클릭시 onClicked 함수가 실행되고 setBigMovie를 이용해 atom state를 변경합니다.

Modal 컴포넌트에서는 useRecoilValue 함수를 이용해 클릭한 콘텐츠의 id, 미디어 타입을 읽고 useQuery를 이용해 외부 데이터를 가져올 때 미디어 타입에 따라 다른 fetch 함수를 사용합니다.

## 스크린샷
### 메인 화면
![main](https://user-images.githubusercontent.com/77538818/166197498-adfe99ce-e712-4522-86d4-669f22bf012a.gif)

### tv show 화면
![tv-show](https://user-images.githubusercontent.com/77538818/166197489-9fed9c14-421a-475d-9451-30bfe8b2ec96.gif)

### 콘텐츠 검색 화면
![search](https://user-images.githubusercontent.com/77538818/166197473-f04aa38f-5f36-4cf2-8256-8d867b1d7fb2.gif)

