import styled from "styled-components";
import { Next, Pre } from "./Toggle";

import { CiTextAlignCenter } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import Color from "./Color";

const StyledControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  & svg {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 1.2rem;
    color: #ffffff;
    cursor: pointer;
  }
`;

function Control() {
  return (
    <StyledControlBar>
      <CiTextAlignCenter />
      <Pre />
      <FaPlay />
      <Next />
      <Color />
    </StyledControlBar>
  );
}

export default Control;
