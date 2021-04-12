import styled from "styled-components";
import {COLOR8} from "../views/design/colors";
import React, {Component} from "react";
import "./design/styleSheet.css"

//use styled.HTMLelement
//use $ to add javascript code

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
  left: 1.8%;
  right: 92.2%;
  top: 2.1%;
  bottom: 93.9%;
  background: #FFFFFF;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #E5E5E5;
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
  background: ${COLOR8};
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


