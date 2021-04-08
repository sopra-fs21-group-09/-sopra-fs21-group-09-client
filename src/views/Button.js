import styled from "styled-components";
import {COLOR5} from "../views/design/colors";
import "../views/design/styleSheet.css";


export const CircleButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 9px;
  text-align: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  position: absolute;
  left: 3.8%;
  right: 92.2%;
  top: 5.1%;
  bottom: 88.9%;
  background: #FFFFFF;
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

export const RectButton = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: #11244E;
  border-radius: 20px;
  color: white;
  margin-bottom: 4%;
`;
