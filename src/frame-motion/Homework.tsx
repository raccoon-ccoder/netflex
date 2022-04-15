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
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 50vw;
  gap: 10px;
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const boxVariants = {
  hover: {
    scale: 1.1,
    // x: -15,
    // y: -15,
  },
};

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
`;

const Btn = styled(motion.button)`
  font-size: 15px;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const btnVaraints = {
  inactive: { scale: 1, color: "blue" },
  active: { scale: 1.1, color: "orange" },
};

// hover시 gap이 겹치면 안됨

function App() {
  const [id, setId] = useState<null | string>(null);
  const [moved, setMoved] = useState(false);
  const toggleMoved = () => setMoved((prev) => !prev);
  return (
    <Wrapper>
      <Grid>
        <Box
          key="1"
          layoutId="1"
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("1")}
        />
        <Box
          key="2"
          layoutId="2"
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("2")}
        >
          {!moved ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          key="3"
          layoutId="3"
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("3")}
        >
          {moved ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          key="4"
          layoutId="4"
          variants={boxVariants}
          whileHover="hover"
          onClick={() => setId("4")}
        />
      </Grid>
      <Btn
        onClick={toggleMoved}
        variants={btnVaraints}
        animate={moved ? "active" : "inactive"}
      >
        Switch
      </Btn>
      <AnimatePresence>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0) " }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5) " }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0) " }}
          >
            <Box
              layoutId={id}
              style={{ width: 300, height: 200, backgroundColor: "white" }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}
