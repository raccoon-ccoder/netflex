import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 100px;
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  entry: (back: boolean) => {
    return {
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: (back: boolean) => {
    return {
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.5,
      },
    };
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 1 : prev + 1));
  };
  const previousPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 10 : prev - 1));
  };
  return (
    <Wrapper>
      <AnimatePresence exitBeforeEnter custom={back}>
        <Box
          custom={back}
          key={visible}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={nextPlease}>next</button>
      <button onClick={previousPlease}>previous</button>
    </Wrapper>
  );
}

// exitBeforeEnter
// 원래는 버튼 클릭시 슬라이더가 사라짐 & 옆 슬라이더 불러옴 효과가 동시에 일어나는데
// 사라짐 (exit) 효과 실행 후 다 끝나면 슬라이더 불러온다는 뜻

// custom
// 각 애니메이션 컴포넌트에 대해 동적 variants를 다르게 적용할 때 사용할 수 있는 사용자 지정 데이터입니다.
// ```
// const variants = {
// visible: (custom) => ({
// opacity: 1,
// transition: { delay: custom * 0.2 }
// })
// }

// < motion.div custom={0} animate="visible" variants={variants} />
// < motion.div custom={1} animate="visible" variants={variants} />
// < motion.div custom={2} animate="visible" variants={variants} />
// ```
// https://www.framer.com/docs/component/###custom

// exitBeforeEnter
// true로 설정하면 AnimatePresence는 한 번에 하나의 컴포넌트만 랜더링합니다. exiting중인 컴포넌트는 entering하는 컴포넌트가 렌더링되기 전에 exit 애니메이션을 완료합니다.
// ```
// < AnimatePresence exitBeforeEnter>
// < motion.div key={currentItem} exit={{ opacity: 0 }} />
// < /AnimatePresence>
// ```
// https://www.framer.com/docs/animate-presence/###exitbeforeenter
