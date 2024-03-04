import styled from "styled-components";

const StyledTime = styled.div`
  position: relative;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 400px;
  color: #cdcdcd;
  font-size: 11px;
`;

function Time() {
  return (
    <StyledTime>
      <span>00:00</span>
      <span>11:11</span>
    </StyledTime>
  );
}

export default Time;
