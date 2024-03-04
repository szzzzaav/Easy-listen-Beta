import styled from "styled-components";
import { HiMiniSpeakerWave, HiMiniSpeakerXMark } from "react-icons/hi2";
import { useState } from "react";

const StyledRange = styled.input`
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
  outline: 0;
  background-color: transparent;

  &::-webkit-slider-runnable-track {
    background-color: transparent;
  }

  &::-webkit-slider-container {
    background-color: transparent;
  }

  &::-webkit-slider-thumb {
    appearance: none;
    -webkit-appearance: none;
    z-index: 2;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #ffffff;
    border: 1px solid #e3e3e3;
    cursor: pointer;
  }
`;

const StyledVolume = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  width: 400px;
  height: 20px;

  & svg {
    width: 20px;
    height: 20px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
  }
`;

const StyledWrapper = styled.div`
  width: 100%;
`;

const StyledContainer = styled.div`
  position: relative;
  width: 375px;
  height: 20px;
`;

const StyledBgWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
`;

const StyledTrack = styled.div`
  position: relative;
  z-index: 2;
  height: 2.5px;
  background-color: #fff;
  border-radius: 2px;
`;

const StyledFake = styled.div`
  position: absolute;
  height: 2.5px;
  width: 100%;
  top: calc(50% - 1.25px);
  right: 0;
  background-color: #e3e3e3;
  border-radius: 2px;
`;

function Volumn() {
  const [mute, setMute] = useState(false);
  const [volumn, setVolumn] = useState(30);
  let width = (volumn / 100) * 375;
  return (
    <StyledVolume>
      {!mute && (
        <HiMiniSpeakerWave
          onClick={() => {
            setMute(true);
          }}
        />
      )}
      {mute && (
        <HiMiniSpeakerXMark
          onClick={() => {
            setMute(false);
          }}
        />
      )}
      <StyledWrapper>
        <StyledContainer>
          <StyledBgWrapper>
            <StyledFake />
            <StyledTrack style={{ width: `${width}px` }} />
          </StyledBgWrapper>
          <StyledRange
            type="range"
            max={100}
            min={0}
            value={mute ? 0 : volumn}
            onChange={(e) => {
              if (mute) {
                setMute(false);
              }
              setVolumn(e.target.value);
              if (Number(e.target.value) === 0) {
                setMute(true);
              }
            }}
          />
        </StyledContainer>
      </StyledWrapper>
    </StyledVolume>
  );
}

export default Volumn;

export {
  StyledVolume,
  StyledWrapper,
  StyledContainer,
  StyledBgWrapper,
  StyledFake,
  StyledRange,
  StyledTrack,
};
