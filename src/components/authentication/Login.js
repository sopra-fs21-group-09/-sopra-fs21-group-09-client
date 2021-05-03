import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter, useHistory} from "react-router-dom";
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

const GenderLabel = styled.label`
  color: white;
  font-size: 15px;
  display: flex;
  justify-content: center;
  font-family: Papyrus;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: ${Colors.COLOR13};
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


export const Login = () => {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [token, setToken] = useState(null)
    const [date, setDate] = useState(null)

    const history = useHistory()

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, the user gets logged in
     * and its token is stored in the localStorage.
     */
    async function login() {
        try {
            const requestBody = JSON.stringify({
                username: username,
                password: password
            });

            const response = await api.post('/login', requestBody);

            const user = new User(response.data);

            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);

            console.log(response.data);

            // Login successfully worked --> navigate to the route /home
            history.push('/home');

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
    }, []);


    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

        return (
            <BaseContainer>
                <LogoContainer>
                    <img src={BrolatLogo} height='200px' width='430px'  alt={"example"}/>
                </LogoContainer>
                <GenderLabel>Because "Bro is just everyone" -Np69, 2021</GenderLabel>
                <LoginMainContainer>
                    <Label>Username:</Label>
                    <InputField
                        placeholder="Enter your username here..."
                        onChange={e => {
                            setUsername(e.target.value);
                        }}
                    />
                    <Label>Password:</Label>
                    <InputField
                        placeholder="Enter your password here..."
                        type="password"
                        onChange={e => {
                            setPassword(e.target.value)
                        }}
                    />
                    <ButtonContainer>
                        <RectButton
                            disabled={!username || !password}
                            width="60%"
                            onClick={() => {
                                login();
                            }}
                        >
                            Log into Account!
                        </RectButton>
                    </ButtonContainer>
                    <ButtonContainer>
                        <RectButton
                            width="60%"
                            onClick={() => {
                                history.push('/registration')
                            }}
                        >
                            Don't have an account? Register here!
                        </RectButton>
                    </ButtonContainer>
                </LoginMainContainer>
            </BaseContainer>
        )
}

export default withRouter(Login);