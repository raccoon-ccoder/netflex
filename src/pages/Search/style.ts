import styled from "styled-components";
import { motion } from "framer-motion";

export const Wrapper = styled.div`
  background: ${(props) => props.theme.black.darker};
  height: 100%;
  position: relative;
  top: 70px;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = styled.main`
  width: 100%;
  /* position: relative;
  top: -17vw; */
`;

// search motion

export const Sliders = styled.div`
  margin: 3vw 0;
  position: relative;
  box-sizing: border-box;
  padding: 0 4%;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export const SliderTitle = styled.h2`
  line-height: 1.3;
  margin-bottom: 20px;
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
  height: 100%;
  width: 100%;
`;

export const RowItem = styled(motion.div)`
  padding: 0.2vw;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 0.8vw;
  overflow: hidden;
  float: left;
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
  padding: 5px;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: center;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  transform: scaleX(1.2) scaleY(0.8);
  width: 80%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 5;
  @media screen and (min-width: 500px) and (max-width: 799px) {
    top: 1vw;
  }
  @media screen and (min-width: 800px) and (max-width: 1099px) {
    top: 1vw;
  }
  @media screen and (min-width: 1100px) and (max-width: 1399px) {
    top: 1vw;
  }
  @media screen and (min-width: 1400px) {
    top: 1vw;
  }
`;

export const BigCover = styled.div`
  width: 100%;
  height: 50vw; // 나중에 수정 (width를 기준으로 설정해야 할듯)
  max-height: 550px;
  background-size: 100% 100%;
  background-position: center center;
`;

export const BigInfo = styled.div`
  width: 100%;
  padding: 20px;
  background: ${(props) => props.theme.black.darker};
`;

export const BigTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  font-size: 30px;
  padding: 10px;
`;

export const BigDesc = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  column-gap: 2em;
  text-overflow: clip;
  padding: 10px;
`;

export const BigOverview = styled.p`
  display: block;
  color: ${(props) => props.theme.white.lighter};
  text-overflow: clip;
  overflow: hidden;
`;

export const BigOverviewText = styled.div``;
