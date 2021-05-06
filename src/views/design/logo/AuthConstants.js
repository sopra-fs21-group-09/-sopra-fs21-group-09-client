import styled from "styled-components";
import {Colors} from "../Colors";

// Contains the Logo in the registration and login page
export const LogoContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1%;
  margin-left: 10%;
`;

// Main light grey container for the login and registration page
export const LoginMainContainer = styled.div`
  height: ${props => props.height}px;
  background: ${props => props.background};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 2%;
  margin-bottom: 4%;
  background: #E5E5E5;
  margin-left: 31.5%;
  padding-left: 15px;
  margin-right: 28.5%;
  padding-right: 15px;
  border-radius: 20px;
`;

export const Label = styled.label`
  color: black;
  margin-top: 3%;
  margin-bottom: 2%;
  margin-left: 7%;
  margin-right: 7%;
  text-transform: uppercase;
`;

export const GenderButton = styled.button`
  background: ${Colors.COLOR13};
  width: 50px;
  height: 50px;
  margin-left: 4%;
`;

export const GenderLabel = styled.label`
  color: black;
  margin-top: 3%;
  margin-bottom: 2%;
  margin-left: 7%;
  margin-right: 7%;
  font-family: Papyrus;
  display: flex;
  justify-content: center;
  text-transform: uppercase;
`;

export const InputField = styled.input`
  &::placeholder {
    color: #4F4F4F;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
  background: white;
  border-radius: 20px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;