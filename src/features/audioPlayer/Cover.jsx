import styled from "styled-components";

const StyledCoverContainer = styled.div`
  width: 400px;
  height: 400px;
  background-color: #ffffff;
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid #333333;
  -moz-box-shadow: 1px 2px 7px #333333;
  -webkit-box-shadow: 1px 2px 7px #333333;
  box-shadow: 1px 2px 7px #333333;

  & img {
    width: 100%;
    min-height: 100%;
  }
`;

function Cover({ cover }) {
  return (
    <StyledCoverContainer>
      <img src={cover || "/logo.png"} alt="" />
    </StyledCoverContainer>
  );
}

export default Cover;
