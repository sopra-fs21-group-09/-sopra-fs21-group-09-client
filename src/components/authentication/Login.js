import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import BrolatLogo from "../../views/design/BrolatLogo.png";
import { LogoContainer, LoginMainContainer} from "../../views/Container";
import { RectButton } from '../../views/Button';
import User from "../profile/User";
import {COLOR10, COLOR13} from "../../views/design/colors";

//Change the whole background for just this file
document.body.style.backgroundColor = COLOR13;

//Constants we need for this page
const Label = styled.label`
  color: black;
  margin-top: 3%;
  margin-bottom: 2%;
  margin-left: 7%;
  margin-right: 7%;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: ${COLOR10};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Login extends React.Component {
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
    async login() {
        try {
            const requestBody = JSON.stringify({
                username: this.state.username,
                password: this.state.password
            });

            const response = await api.post('/loginForUsers', requestBody);

            const user = new User(response.data);

            localStorage.setItem('token', user.token);

            console.log(response.data);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/home`);

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    componentDidMount() {}

    /**
     *  Every time the user enters something in the input field, the state gets updated.
     * @param key (the key of the state for identifying the field that needs to be updated)
     * @param value (the value that gets assigned to the identified state key)
     */
    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <LogoContainer>
                    <img src={BrolatLogo} height='200px' width='430px'  alt={"example"}/>
                </LogoContainer>
                <LoginMainContainer>
                    <Label>Username:</Label>
                    <InputField
                        placeholder="Enter your username here..."
                        onChange={e => {
                            this.handleInputChange('username', e.target.value);
                        }}
                    />
                    <Label>Password:</Label>
                    <InputField
                        placeholder="Enter your password here..."
                        onChange={e => {
                            this.handleInputChange('password', e.target.value);
                        }}
                    />
                    <ButtonContainer>
                        <RectButton
                            disabled={!this.state.name || !this.state.username || !this.state.password}
                            width="60%"
                            onClick={() => {
                                this.registration();
                            }}
                        >
                            Log into Account!
                        </RectButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RectButton
                            width="60%"
                            onClick={() => {
                                this.props.history.push(`/registration`);
                            }}
                        >
                            Don't have an account? Registrate here!
                        </RectButton>
                    </ButtonContainer>
                </LoginMainContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Login);