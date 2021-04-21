import styled from "styled-components";
import { COLORS } from "../views/design/colors"
import React, {Component} from "react";
import "./design/styleSheet.css"

//use styled.HTMLelement
//use $ to add javascript code

export const CircleButton = styled.button` 
  &:hover {
    transform: translateY(-2px);
    background: ${COLORS.BUTTONS};
    color: white;
  }
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  position: fixed;
  top: 5%;
  left: 2%;
  background: white;
  width: 55px;
  height: 55px;
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
  align-items: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${COLORS.BUTTON};
  border-radius: 20px;
  color: white;
  margin-bottom: 4%;
  border: 1px solid #11244E;
`;

export const RectButtonBig = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 18px;
  width: 30%;
  height: 45px;
  text-align: center;
  align-items: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${COLORS.BUTTON};
  border-radius: 20px;
  color: white;
  margin-bottom: 4%;
  border: 1px solid #11244E;
`;

export class RoundButton extends Component {
    render(){
        return<div className="roundButton" />;
    }
}

export class RectangleButton extends Component {
    render(){
        return<div className="rectangleButton" />;
    }
}

export class RectangleButtonBig extends Component {
    render(){
        return<div className="rectangleButtonBig" />;
    }
}


