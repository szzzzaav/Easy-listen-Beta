import styled from "styled-components";
import Bg from "./Bg";
import Cover from "./Cover";
import Detail from "./Detail";
import Volumn from "./Volumn";
import Control from "./Control";
import Progress from "./Progress";
import Time from "./Time";

const StageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 100%;
  height: 100vh;
  min-width: 1200px;
  min-height: 500px;
`;

const StyledStage = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  flex-shrink: 0;
`;

const StyledLeftStage = styled(StyledStage)`
  width: 40%;
  height: 100vh;
  min-width: 500px;
  min-height: 500px;
  justify-content: center;
`;

const StyledRightStage = styled(StyledStage)`
  width: 60%;
  height: 100vh;
  min-width: 700px;
  min-height: 500px;
`;

const StyledContainer = styled.div`
  display: flex;
  width: 400px;
  height: auto;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 15px 0;
`;

function AudioPlayer() {
  return (
    <StageContainer>
      <Bg color={{ $blue: 1 }} />
      <StyledLeftStage>
        <Cover />
        <StyledContainer>
          <Detail />
        </StyledContainer>

        <StyledContainer>
          <Volumn />
        </StyledContainer>

        <StyledContainer>
          <Control />
        </StyledContainer>

        <StyledContainer>
          <Progress />
        </StyledContainer>

        <Time />
      </StyledLeftStage>

      <StyledRightStage></StyledRightStage>
    </StageContainer>
  );
}

export default AudioPlayer;
