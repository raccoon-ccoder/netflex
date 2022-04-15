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
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Box = styled(motion.div)`
  width: 400px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  position: absolute;
  top: 100px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start: {
    opacity: 0,
    scale: 0,
  },
  living: {
    opacity: 0,
    scale: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateZ: 360,
  },
};

function App() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => {
    setShowing((prev) => !prev);
  };
  return (
    <Wrapper>
      <button onClick={toggleShowing}>click</button>
      <AnimatePresence>
        {showing ? (
          <Box
            variants={boxVariants}
            initial="start"
            animate="visible"
            exit="living"
          />
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

// AnimatePresence
// 엘리먼트가 사라지는 것을 애니메이트할 수 있음
// 조건 1. AnimatePresence는 항상 visible 상태여야함
// 2. AnimatePresence 내부에는 조건문이 있어야 함

// AnimatePresence를 사용하면 React 트리에서 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있습니다. React에는 다음과 같은 수명 주기 메서드가 없기 때문에 종료 애니메이션을 활성화해야 합니다.

// exit
// 이 컴포넌트가 트리에서 제거될 때 애니메이션할 대상입니다.
// ```
// import { motion, AnimatePresence } from "framer-motion"

// export const MyComponent = ({ isVisible }) => (
// < AnimatePresence>
// {isVisible && (
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0 }}
// />
// )}
// < /AnimatePresence>
// )
// ```
// https://www.framer.com/docs/animate-presence/
