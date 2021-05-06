import React, {useEffect, useState} from 'react';
import {BaseContainer} from '../../views/Layout';
import {api, handleError} from '../../helpers/api';
import {useHistory, withRouter} from "react-router-dom";
import BrolatLogo from "../../views/design/logo/BrolatLogo.png";
import {ButtonContainer, GenderButton, GenderLabel, InputField, Label, LoginMainContainer, LogoContainer} from "../../views/design/logo/AuthConstants";
import {RectButton} from '../../views/Button';
import User from "../profile/User";
import {Colors} from "../../views/design/Colors";
import Rodal from "rodal";

export const Registration = () => {
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [name, setName] = useState(null);
    const [visible, setVisible] = useState(false);

    const history = useHistory()

    /**
     * HTTP POST request is sent to the backend.
     * If the request is successful, a new user is returned to the front-end
     * and its token is stored in the localStorage.
     */
    async function registration() {
        try {
            const requestBody = JSON.stringify({
                name: name,
                username: username,
                password: password
            });

            const response = await api.post('/users', requestBody);

            // Get the returned user and update a new object.
            const user = new User(response.data);

            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('id', user.id);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/home`);

        } catch (error) {
            alert(`Something went wrong during the registration: \n${handleError(error)}`);
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
                <Label>Name:</Label>
                <InputField
                    placeholder="Enter your name here..."
                    onChange={e => {
                        setName(e.target.value);                        }}
                />
                <Label>Username:</Label>
                <InputField
                    placeholder="Enter your username here..."
                    onChange={e => {
                        setUsername(e.target.value);                        }}
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
                        disabled={!name || !username || !password}
                        width="60%"
                        onClick={() => {
                            registration();
                        }}
                    >
                        Create Account!
                    </RectButton>
                </ButtonContainer>
                <ButtonContainer>
                    <RectButton
                        width="60%"
                        onClick={() => {
                            history.push(`/login`);
                        }}
                    >
                        Already have an account? Login here!
                    </RectButton>
                </ButtonContainer>
            </LoginMainContainer>
        </BaseContainer>
    )

}

export default withRouter(Registration);