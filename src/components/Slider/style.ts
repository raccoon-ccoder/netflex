import styled from "styled-components";
import { motion } from "framer-motion";

export const Sliders = styled.div`
  margin: 3vw 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 4%;
  box-sizing: border-box;
`;

export const SliderTitle = styled.h2`
  line-height: 1.5;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  a {
    font-size: 1.6vw;
    color: #e5e5e5;
    font-weight: 700;
    margin: 0 0 0.5em 0;
    text-decoration: none;
    display: inline-block;
    min-width: 6em;
    div {
      display: table-cell;
      vertical-align: bottom;
      line-height: 1.25vw;
      font-size: 1.6vw;
    }
  }
`;

export const ArrowBox = styled.div``;

export const Arrow = styled.svg`
  width: 2vw;
  height: 2vw;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  path {
    fill: white;
  }
`;

export const Slider = styled.div`
  position: relative;
  @media screen and (min-width: 500px) and (max-width: 799px) {
    height: 14vw;
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    height: 12vw;
  }
  @media screen and (min-width: 1100px) {
    height: 11vw;
  }
`;

export const Row = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: absolute;
`;

export const rowVariants = {
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

export const RowItem = styled(motion.div)`
  padding: 0 0.2vw;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 0.5vw;
  overflow: hidden;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
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
`;

export const BoxInner = styled.div`
  width: 100%;
  padding: 28.125% 0;
  box-sizing: border-box;
  position: relative;
`;

export const boxVariants = {
  normal: { scale: 1 },
  hover: {
    scaleX: 1.2,
    scaleY: 1.8,
    y: -20,
    zIndex: 2,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Img = styled(motion.div)<{ bgphoto: string }>`
  background-image: url(${(props) => props.bgphoto});
  background-size: 100% 100%;
  background-position: center center;
  position: absolute;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 70%;
`;

export const Info = styled(motion.div)`
  width: 100%;
  height: 30%;
  padding: 15px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

export const infoVariants = {
  hover: {
    opacity: 1,
    zIndex: 4,
    fontSize: 1,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const Title = styled.span`
  font-size: 0.5rem;
  transform: scaleX(1.1) scaleY(1);
`;

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
  max-width: 850px;
  width: calc(100% * 10 / 11);
  height: 800px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
  @media screen and (min-width: 500px) and (max-width: 799px) {
    top: -200px;
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    top: -310px;
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    top: -450px;
  }
  @media screen and (min-width: 1400px) {
    top: -500px;
  }
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
