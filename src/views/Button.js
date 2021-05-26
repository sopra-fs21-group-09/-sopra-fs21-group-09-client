import styled from "styled-components";
import { Colors } from "./design/Colors"
import React, {Component} from "react";
import "./design/StyleSheet.css";

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


export const InfoButton = styled.button` 
  &:hover {
    transform: translateY(-2px);
  }  
  cursor: pointer; 
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

export const AddDeadlineButton = styled(CircleButton)`
    width: 40px;
    height: 40px;
    position: absolute; 
    top: 0px;
    right: 0px; 
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 1; 
    padding-bottom: 5px;
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
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
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
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const RectButtonSmall = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
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
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  bottom: 0px;
  position; absolute;
`;

export const DeleteButton = styled.button`
  &:hover {
    transform: translateY(-2px);
    background: red;
    color: white;
  }
  padding: 6px;
  margin-left: 3px;
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
  background: white;
  border-radius: 10px;
  color: red;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const RectButtonPopUp = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 18px;
  width: 80%;
  margin-left: 40px;
  margin-top: 40px;
  height: 40px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${Colors.BUTTON};
  border-radius: 10px;
  color: white;
  border: 1px solid #11244E;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const RectButtonEdit = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  width: 60px;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${Colors.BUTTON};
  border-radius: 20px;
  color: white;
  border: 1px solid #11244E;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-left: 5%;
`;

export const RectButtonInfo = styled.button`
  &:hover {
    transform: translateY(-2px);
  }
  width: 100px;
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  transition: all 0.3s ease;
  background: ${Colors.BUTTON};
  border-radius: 20px;
  color: white;
  border: 1px solid #11244E;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-top: 10%;
  margin-left: -20%;
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


