import React, {useState, useEffect} from 'react';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter, useHistory} from "react-router-dom";
import BrolatLogo from "../../views/design/logo/BrolatLogo.png";
import {ButtonContainer, GenderButton, GenderLabel, InputField, Label, LoginMainContainer, LogoContainer} from "../../views/design/logo/AuthConstants";
import {RectButton} from '../../views/Button';
import User from "../profile/User";
import {Colors} from "../../views/design/Colors";
import Rodal from "rodal";

export const Login = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [visible, setVisible] = useState(false);

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

            // Login successfully worked --> navigate to the route /home
            history.push('/home');

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR13;
    }, []);


    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

        return (
            <BaseContainer>
                <LogoContainer>
                    <img src={BrolatLogo} height='200px' width='430px'  alt={"example"}/>
                    <GenderButton
                        onClick={() => {
                            setVisible(true);
                        }}
                    ></GenderButton>
                </LogoContainer>
                {/*Overlay for button */}
                <Rodal height='100' width='390' customStyles={{borderRadius: '20px'}} visible={visible} closeOnEsc='true' onClose={() => setVisible(false)}>
                    <div><GenderLabel>Because a "Bro is just everyone" - Np69, 2021</GenderLabel></div>
                </Rodal>
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