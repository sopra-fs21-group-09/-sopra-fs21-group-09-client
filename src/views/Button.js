import styled from "styled-components";
import { Colors } from "./design/Colors"
import React, {Component} from "react";
import "./design/StyleSheet.css"

//use styled.HTMLelement
//use $ to add javascript code

export const CircleButton = styled.button` 
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.BUTTONS};
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
  top: 2%;
  left: 2%;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  padding-top: 7.5px;
  z-index: 1000; 
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
  background: ${Colors.BUTTON};
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
  background: ${Colors.BUTTON};
  border-radius: 20px;
  color: white;
  margin-bottom: 4%;
  border: 1px solid #11244E;
`;

export const RectButtonSmall = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 18px;
  width: 40%;
  height: 40px;
  text-align: center;
  align-items: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${Colors.BUTTON};
  border-radius: 10px;
  color: white;
  border: 1px solid #11244E;
  margin-right: -22%;
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


