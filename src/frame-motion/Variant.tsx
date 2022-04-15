import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// variants 예시
// 애니메이션 설정을 오브젝트로 분리함 (variants 사용) -> 코드가 좀 더 깨끗해짐
// // <Box variants={myVars} initial="start" animate="end" />

// const Box = styled(motion.div)`
//   width: 200px;
//   height: 200px;
//   background-color: rgba(255, 255, 255, 0.1);
//   border-radius: 10px;
//   box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
// `;

// const myVars = {
//   start: { scale: 0 },
//   end: {
//     rotate: 180,
//     scale: 1,
//     transition: { type: "spring", stiffness: 260, damping: 20 },
//   },
// };

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5, // 자식 variant들 딜레이시킴 (현재로는 circleVariants)
      staggerChildren: 0.3, // 하위 컴포넌트의 애니메이션에 지속시간만큼 시차를 둘 수 있음
    },
  },
};

// 기본적으로 자식 컴포넌트에 variant 요소 없고 부모에게만 있다면 자동으로 상속받게 됨

const Circle = styled(motion.div)`
  background-color: white;
  place-self: center;
  height: 70px;
  width: 70px;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const circleVariants = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
};
// 기본적으로 자식 컴포넌트에 variant 요소 없고 부모에게만 있다면 자동으로 상속받게 됨
// 부모 varinats도 start, end기에 같은 이름 사용함

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}

// export default App;
