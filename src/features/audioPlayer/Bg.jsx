import styled, { css, keyframes } from "styled-components";

const bgRotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

const StyledBg = styled.div`
  position: fixed;
  z-index: -99;
  width: 3000px;
  height: 3000px;
  background: linear-gradient(45deg, #183e6c, #313d43);
  animation: ${bgRotate} 5s ease-in-out infinite;
  transition: all 0.3s ease-in-out;
  ${(props) =>
    props.$blue &&
    css`
      background: linear-gradient(45deg, #183e6c, #313d43);
    `}
  ${(props) =>
    props.$pink &&
    css`
      background: linear-gradient(45deg, #f875aa, #8fc3e3);
    `}
  ${(props) =>
    props.$orange &&
    css`
      background: linear-gradient(45deg, #bc3e08, #7e1b0c);
    `}
  ${(props) =>
    props.$purple &&
    css`
      background: linear-gradient(
        45deg,
        var(--color-blue-10),
        var(--color-purple)
      );
    `}
`;

const Shadow = styled.div`
  position: absolute;
  z-index: -5;
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 500px;
  backdrop-filter: blur(1.7px);
  background-color: rgba(255, 255, 255, 0.02);
`;

function Bg({ color }) {
  return (
    <>
      <StyledBg {...color} />
      <Shadow />
    </>
  );
}

export default Bg;
