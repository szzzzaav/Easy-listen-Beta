import { useState } from "react";
import styled from "styled-components";
import { IoIosColorPalette } from "react-icons/io";

const ColorContainer = styled.div`
  position: absolute;
  display: flex;
  width: 100px;
  height: 30px;
  left: 40px;
  top: calc(50% - 15px);
  align-items: center;
  justify-content: space-around;
  background-color: rgba(0, 0, 0, 0.418);
  border-radius: 5px;
  & div {
    width: 18px;
    height: 18px;
    border-radius: 5px;
    cursor: pointer;
  }
  & .selected {
    border: 2px solid white;
  }
  #blue {
    background: linear-gradient(45deg, #183e6c, #313d43) !important;
  }

  #pink {
    background: linear-gradient(45deg, #f875aa, #8fc3e3) !important;
  }

  #orange {
    background: linear-gradient(45deg, #bc3e08, #7e1b0c) !important;
  }
  #purple {
    background: linear-gradient(
      45deg,
      var(--color-blue-10),
      var(--color-purple)
    ) !important;
  }
`;

function Color() {
  const [close, setClose] = useState(true);
  const [color, setColor] = useState({ $blue: 1 });
  return (
    <div style={{ position: "relative" }}>
      <IoIosColorPalette onClick={() => setClose((c) => !c)} />
      {!close && (
        <ColorContainer>
          <div
            id="blue"
            key={"blue"}
            onClick={() => setColor({ $blue: 1 })}
            className={color.$blue && "selected"}
          ></div>
          <div
            id="pink"
            key={"pink"}
            onClick={() => setColor({ $pink: 1 })}
            className={color.$pink && "selected"}
          ></div>
          <div
            id="orange"
            key={"orange"}
            onClick={() => setColor({ $orange: 1 })}
            className={color.$orange && "selected"}
          ></div>
          <div
            id="purple"
            key={"purple"}
            onClick={() => setColor({ $purple: 1 })}
            className={color.$purple && "selected"}
          ></div>
        </ColorContainer>
      )}
    </div>
  );
}

export default Color;
