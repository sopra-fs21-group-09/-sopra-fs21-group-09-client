import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import BrolatLogo from "../../views/design/logo/BrolatLogo.png";
import { LogoContainer} from "../../views/design/logo/Logo";
import {LoginMainContainer} from "../../views/Layout";
import { RectButton } from '../../views/Button';
import User from "../profile/User";
import {Colors} from "../../views/design/Colors";

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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;


class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            token: null
        };
    }

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async registration() {
        try {
            const requestBody = JSON.stringify({
                name: this.state.name,
                username: this.state.username,
                password: this.state.password
            });
            const response = await api.post('/users', requestBody);
            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            console.log(localStorage);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            this.props.history.push(`/home`);
        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR13;
    }

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
                    <Label>Name:</Label>
                    <InputField
                        placeholder="Enter your name here..."
                        onChange={e => {
                            this.handleInputChange('name', e.target.value);
                        }}
                    />
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
                            Create Account!
                        </RectButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RectButton
                            width="60%"
                            onClick={() => {
                                this.props.history.push(`/login`);
                            }}
                        >
                            Already have an account? Login here!
                        </RectButton>
                    </ButtonContainer>
                </LoginMainContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Registration);