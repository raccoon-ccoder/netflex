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
  height: 400px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: #00a5ff;
  width: 100px;
  height: 100px;
  border-radius: 50px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {!clicked ? <Circle layoutId="1" style={{ borderRadius: 50 }} /> : null}
      </Box>
      <Box>
        {clicked ? (
          <Circle layoutId="1" style={{ borderRadius: 0, scale: 1.5 }} />
        ) : null}
      </Box>
    </Wrapper>
  );
}

// layout props : 엘리먼트의 레이아웃이 바뀔때마다 animate됨
// 왜냐면 frame motion은 무언가 외부의 힘에 의해 바뀐 것을 감지함

// layoutId : 다른 컴포넌트를 연결하여 같은 컴포넌트라고 만든다

// Layout animation
// layout: boolean | "position" | "size"
// true인 경우 이 컴포넌트는 레이아웃이 변경될 때 새 위치에 자동으로 애니메이션을 적용합니다. 크기나 위치가 변경될 때 모션 컴포넌트의 레이아웃에 자동으로 애니메이션을 적용하려면 레이아웃 prop을 제공합니다. 부모 플렉스박스 방향, 너비, 상단/오른쪽 등 레이아웃 변경의 원인이 무엇이든 상관없이 애니메이션 자체는 최대 성능을 위해 변환으로 수행됩니다.
// ex) < motion.div layout>< /motion.div>

// Syncing layout animations
// 모션 컴포넌트의 layout prop은 레이아웃이 변할 때마다, 자동으로 애니메이션을 적용합니다.
// https://www.framer.com/docs/animate-shared-layout/#syncing-layout-animations

// Animate between components
// AnimateSharedLayout은 동일한 layoutId prop을 가진 모션 컴포넌트들 간에 애니메이션을 적용할 수 있습니다. layoutId가 있는 새 컴포넌트가 추가되고 다른 컴포넌트가 제거되면 이전 컴포넌트에서 새 컴포넌트로 레이아웃 애니메이션을 수행합니다. 새 컴포넌트는 이전 컴포넌트의 애니메이션 값도 초기 상태로 상속합니다. 따라서 시각적으로 하나의 연속 컴포넌트로 처리됩니다.
// ex) isSelected && < motion.div layoutId="underline" />
// https://www.framer.com/docs/animate-shared-layout/#animate-between-components
