import { useState } from "react";
import {
  StyledVolume,
  StyledWrapper,
  StyledBgWrapper,
  StyledFake,
  StyledRange,
  StyledTrack,
} from "./Volumn";
import styled from "styled-components";

const StyledWave = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 1;
  width: 400px;
  height: 3px;
  left: calc(50% - 200px);
  top: calc(50% - 1.5px);
  backdrop-filter: blur(1px);

  & > div {
    display: block;
    position: absolute;
    bottom: 0.8px;
    z-index: -1;
    width: 3px;
    height: 10px;
    border-radius: 2px;
    background-color: #cdcdcd;
    border: none;
    transform: scale(1.01);
  }
`;

const StyledContainer = styled.div`
  position: relative;
  width: 400px;
  height: 20px;
`;

function Progress() {
  const [progress, setProgress] = useState(30);
  let width = (progress / 100) * 400;

  const stageElGenerate = function (length, elLength, count) {
    const dis = (length - count * elLength) / (count - 1);
    return Array.from({ length: count }).map((_, i) => {
      return (
        <div
          className="stageEl"
          key={`stgeEl${i}`}
          style={{ left: `${i * elLength + i * dis}px` }}
        ></div>
      );
    });
  };

  return (
    <StyledVolume>
      <StyledWrapper>
        <StyledContainer>
          <StyledBgWrapper>
            <StyledWave>{stageElGenerate(400, 3, 50)}</StyledWave>
            <StyledFake />
            <StyledTrack style={{ width: `${width}px` }} />
          </StyledBgWrapper>
          <StyledRange
            type="range"
            max={100}
            min={0}
            value={progress}
            onChange={(e) => {
              setProgress(e.target.value);
            }}
          />
        </StyledContainer>
      </StyledWrapper>
    </StyledVolume>
  );
}

export default Progress;
