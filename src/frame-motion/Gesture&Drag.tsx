import React, { useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

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
  background-color: white;
  border-radius: 30px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// Gestures
const boxVariants = {
  hover: { scale: 1.5, rotateZ: 90 },
  click: { scale: 1, borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46,104, 144)" },
};
// <Box variants={boxVariants} whileHover="hover" whileTap="click" />

// Drag

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <BiggerBox ref={biggerBoxRef}>
        <Box
          drag
          dragSnapToOrigin
          dragElastic={0.5}
          dragConstraints={biggerBoxRef}
          whileDrag="drag"
          variants={boxVariants}
          whileHover="hover"
          whileTap="click"
        />
      </BiggerBox>
    </Wrapper>
  );
}

// dragConstraints : box만 가능하며 드래그를 하는데 제약을 두는 box를 설정

// dragConstraints
// 허용된 드래그 가능 영역에 제약 조건을 적용합니다.
// dragConstraints 에는 드래그 가능한 컴포넌트의 가장자리 거리를 정의합니다. (드래그 가능한 영역에 가장자리에서 얼마만큼까지 허용할 것인지 지정)
// ```
// // 픽셀 이용
// < motion.div drag="x" dragConstraints={{ left: 0, right: 300 }}/ >

// // ref이용
// const MyComponent = () => {
// const constraintsRef = useRef(null)

// return (
// < motion.div ref={constraintsRef}>
// < motion.div drag dragConstraints={constraintsRef} />
// < /motion.div>
// )
// }
// ```

// dragSnapToOrigin: boolean
// true인 경우 드래그 가능한 요소는 드래그를 놓을 때, 원점으로 다시 애니메이션됩니다.
// dragSnapToOrigin={true}

// dragElastic: DragElastic
// 외부 제약 조건에서 허용되는 이동 정도. 0 = 움직임 없음, 1 = 전체 움직임. 기본적으로 0.5로 설정됩니다. 움직임을 비활성화하기 위해 false로 설정할 수도 있습니다.
// dragElastic={0.2}

// https://www.framer.com/docs/gestures/#drag
