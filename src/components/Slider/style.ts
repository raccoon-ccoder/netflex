import styled from "styled-components";
import { motion } from "framer-motion";

export const Sliders = styled.div`
  margin: 3vw 0;
  position: relative;
`;

export const SliderTitle = styled.h2`
  line-height: 1.3;
  margin: 0;
  a {
    font-size: 1.4vw;
    color: #e5e5e5;
    font-weight: 700;
    margin: 0 4% 0.5em 4%;
    text-decoration: none;
    display: inline-block;
    min-width: 6em;
    div {
      display: table-cell;
      vertical-align: bottom;
      line-height: 1.25vw;
      font-size: 1.4vw;
    }
  }
`;

export const Row = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 4%;
  position: absolute;
`;

export const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

export const RowItem = styled(motion.div)`
  padding: 0 0.2vw;
  box-sizing: border-box;
  cursor: pointer;
  @media screen and (min-width: 500px) and (max-width: 799px) {
    width: 33.3%;
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    width: 25%;
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    width: 20%;
  }
  @media screen and (min-width: 1400px) {
    width: 16.66666667%;
  }
`;

export const Box = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  border-radius: 0.2vw;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

export const BoxInner = styled.div`
  width: 100%;
  padding: 28.125% 0;
`;

export const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scale: 1.3,
    y: -15,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Info = styled(motion.div)`
  width: 100%;
  padding: 15px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

export const BigCover = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center center;
`;

export const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 30px;
  position: relative;
  top: -50px;
  padding: 10px;
`;

export const BigOverview = styled.p`
  padding: 10px;
  position: relative;
  top: -50px;
  color: ${(props) => props.theme.white.lighter};
`;
