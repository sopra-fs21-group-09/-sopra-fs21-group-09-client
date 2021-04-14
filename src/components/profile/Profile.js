import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import { CircleButton } from '../../views/Button';
import {PageTitle} from '../../views/Container';

//Change the whole background for just this file
document.body.style = 'background: #F5F5F5;';

//Constants we need for this page
const TopLeftContainer = styled.div`
  height: 50%;
  width: 55%;
  padding-left: 15px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: black;
  margin-top: 4%;
  margin-bottom: 4%;
  text-transform: uppercase;
  line-height:400%;
`;

const InputField = styled.input`
  &::placeholder {
    color: #4F4F4F;
    font-size: 0.9vw;
  }
  height: 35px;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 3%;
  border: none;
  background: #C4C4C4;
  border-radius: 20px;
  float: right;
`;

const ChangeButton = styled.button` 
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
  left: 3%;
  right: 92.2%;
  top: 5%;
  bottom: 93.9%;
  background: #FFFFFF;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 1px solid #E5E5E5;
`;

class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            token: null,
            date: null
        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the user gets logged in
     */
    async profile() {
        try {

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    componentDidMount() {}

    render() {
        return (
            <BaseContainer>
                <CircleButton></CircleButton>
                <PageTitle>Brofile</PageTitle>
                <TopLeftContainer>
                    <h1>Name</h1>
                    <Label>Username</Label>
                    <InputField
                        placeholder="Username displayed here"
                        onChange={e => {
                            this.handleInputChange('username', e.target.value);
                        }}
                    /><br />
                    <Label>Birthday</Label>
                    <InputField
                        placeholder="Birthday displayed here"
                        onChange={e => {
                            this.handleInputChange('username', e.target.value);
                        }}
                    /><br />
                    <Label>Matrikelnumber</Label>
                    <InputField
                        placeholder="Matrikelnumber displayed here"
                        onChange={e => {
                            this.handleInputChange('username', e.target.value);
                        }}
                    /><br />
                </TopLeftContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Profile);