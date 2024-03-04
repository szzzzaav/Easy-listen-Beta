import styled, { css } from "styled-components";
import { FaPlay } from "react-icons/fa";
const Wrapper = styled.div`
  position: relative;
`;

const Triangle = styled.div`
  & svg {
    position: absolute;
    text-align: center;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 1.2rem;
    color: #ffffff;
    top: calc(50% - 10px);
    left: calc(50% - 10px);

    ${(props) =>
      props.$first &&
      css`
        transform: translateX(-10px);
      `}
    ${(props) =>
      props.$pre &&
      css`
        transform: rotate(180deg);
      `}
    ${(props) =>
      props.$pre &&
      props.$first &&
      css`
        transform: rotate(180deg) translateX(-10px);
      `}
  }
`;

function Next() {
  return (
    <div>
      <Wrapper>
        <Triangle $first={1}>
          <FaPlay />
        </Triangle>
        <Triangle>
          <FaPlay />
        </Triangle>
      </Wrapper>
    </div>
  );
}

function Pre() {
  return (
    <div>
      <Wrapper>
        <Triangle $first={1} $pre={1}>
          <FaPlay />
        </Triangle>
        <Triangle $pre={1}>
          <FaPlay />
        </Triangle>
      </Wrapper>
    </div>
  );
}

export { Pre, Next };
