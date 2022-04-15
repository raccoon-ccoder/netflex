import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 300vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const x = useMotionValue(0);
  const rotateZ = useTransform(x, [-800, 800], [-360, 360]);
  const gradient = useTransform(
    x,
    [-800, 800],
    [
      `linear-gradient(135deg, rgb(71, 0, 238), rgb(0, 182, 238))`,
      `linear-gradient(135deg, rgb(46, 140, 15), rgb(12, 238, 0))`,
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [0.1, 1]);
  // useEffect(() => {
  //   scrollY.onChange(() => {
  //     console.log(scrollY.get(), scrollYProgress.get());
  //   });
  // }, [scrollY, scrollYProgress]);
  // useEffect(() => {
  //   // x.onChange(() => console.log(x.get()));
  //   x.onChange(() => console.log(rotate.get()));
  // }, [x]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box style={{ x, rotateZ, scale }} drag="x" dragSnapToOrigin />
    </Wrapper>
  );
}

// useMotionValue
// motionValue 업데이트시 리액트 렌더링 사이클을 발동시키지 않음
// 즉, state가 아니라는 뜻 => 리렌더링되지 않음

// MotionValue

// MotionValues는 애니메이션 값의 상태(state)와 속도(velocity)를 추적합니다. 모든 모션 컴포넌트는 내부적으로 MotionValues를 사용하여 애니메이션 값의 상태와 속도를 추적합니다. 일반적으로 이들은 자동으로 생성됩니다. (MotionValue는 React State가 아니기 때문에 Motion Value값이 바뀌어도 리랜더링이 일어나지 않는다.)
// ```
// import { motion, useMotionValue } from "framer-motion"

// export function MyComponent() {
// const x = useMotionValue(0)
// return < motion.div style={{ x }} />
// }
// ```
// const x = useMotionValue(0)
// useMotionValue 후크로 MotionValues를 생성할 수 있습니다. useMotionValue에 전달된 값은 MotionValue의 초기 상태로 작동합니다.

// x.set(100)
// set 메서드로 업데이트할 수 있습니다.
// 이것은 React 리렌더링을 트리거하지 않습니다.

// x.get() // 100
// MotionValue는 문자열이나 숫자가 될 수 있습니다.
// get 메소드로 값을 읽을 수 있습니다.
// https://www.framer.com/docs/motionvalue/

// useTransform(기준값, 기준값의 범위, 출력할 값의 범위)
// useTransform 훅을 통해 MotionValues를 연결합니다.
// useTransform()는 한 값 범위에서 다른 값 범위로 매핑하여 다른 MotionValue의 output을 변환하는 MotionValue를 만듭니다.

// scrollY, scrollYProgress
// scrollY : 내가 스크롤한 픽셀
// scrollYProgress: 0~1 기준으로 내가 스크롤한 퍼센테이지

// useViewportScroll(): ScrollMotionValues
// 뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴합니다.
// 아래 값들은 모두 MotionValue< number >를 넘겨줍니다.
// scrollX: 실제 수평 스크롤 픽셀 ex) 500px
// scrollY: 실제 수직 스크롤 픽셀 ex) 500px
// scrollXProgress : 0 ~ 1 사이의 수평 스크롤
// scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)
// ```
// export const MyComponent = () => {
// const { scrollYProgress } = useViewportScroll()
// return < motion.div style={{ scaleX: scrollYProgress }} />
// }
