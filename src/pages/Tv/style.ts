import styled from "styled-components";

export const Wrapper = styled.div`
  background: black;
  height: 100%;
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 56.25vw;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
`;

export const Title = styled.h2`
  font-size: 7vw;
  margin-bottom: 15px;
`;

export const Overview = styled.p`
  font-size: 1.8vw;
  width: 50%;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Main = styled.main`
  width: 100%;
  position: relative;
  top: -17vw;
`;
