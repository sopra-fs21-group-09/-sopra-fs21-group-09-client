import styled from "styled-components";
import { Colors } from "./design/Colors"
import React, {Component} from "react";
import "./design/StyleSheet.css"

//use styled.HTMLelement
//use $ to add javascript code

export const CircleButton = styled.button` 
  &:hover {
    transform: translateY(-2px);
  }
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  position: fixed;
  margin-top: 0.7%;
  margin-left: -1%;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  padding-top: 7.5px;
  z-index: 1000; 
`;

export const SmallCircleButton = styled.button` 
  &:hover {
    transform: translateY(-2px);
    background: ${Colors.BUTTON};
  }
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  place-self: center;
  margin-top: 10%;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  transition: all 0.3s ease;
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid black;
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
  width: 100%;
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


