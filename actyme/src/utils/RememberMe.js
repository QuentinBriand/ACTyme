import styled from 'styled-components';

const RememberContainer = styled.div`
label {
  cursor: pointer;
  color: black;
}
.unselectable {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
svg {
  translate: 0.5rem 0.3rem;
  border: 0.1rem solid #2C70D4;
  border-radius: 0.2rem;
  fill: none;
  stroke: white;
  stroke-width: 0.2rem;
  stroke-linecap: round;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
  background: rgba(0, 0, 0, 0.0);
  transition: background 0.2s, stroke-dashoffset 0.3s;
}
svg:hover {
  background: #2C70D4;
}
input:checked + svg {
  stroke-dashoffset: 0;
  background: #2C70D4;
}
input {
  width: 0;
  height: 0rem;
  opacity: 0;
  cursor: pointer;
}
`;

export default RememberContainer;
