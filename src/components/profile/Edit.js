import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { api, handleError } from '../../helpers/api';
import { RectButton, RectButtonEdit } from '../../views/Button';
import {useHistory, withRouter} from 'react-router-dom';
import {Colors} from "../../views/design/Colors";

//Constants we need for this page
const EditMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
  margin-top: 10%;
  margin-bottom: 4%;
  background: ${Colors.COLOR13};
  margin-left: 30%;
  padding-left: 15px;
  margin-right: 30%;
  padding-right: 15px;
  border-radius: 20px;
`;

const Line = styled.div`
  margin-bottom: 3%;
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
     display: flex;
     justify-content: center;
     margin-top: 3%;
`;

const Title = styled.label`
  color: white;
  margin-bottom: 30px;
  text-transform: uppercase;
  text-align: center;
  margin: 3%;
  font-size: 30px;
`;

const Label = styled.label`
  color: white;
  margin-bottom: 15px;
  text-transform: uppercase;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 1.0);
  }
  height: 35px;
  width: 80%;
  padding-left: 15px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 20px;
`;

export const Edit = () => {
    const [username, setUsername] = useState(null);
    const [name, setName] = useState(null);
    const [matrikelNr, setMatrikelNr] = useState(null);

    // These constants are used to disable the edit button of each respective variable after hitting edit
    const [disableName, setDisableName] = useState(false);
    const [disableUsername, setDisableUsername] = useState(false);
    const [disableMatrikel, setDisableMatrikel] = useState(false);

    const history = useHistory()

    // Here we want to check if that the matrikel number has the format xx-xxx-xxx, otherwise give warning
    function CheckMatrikelNrFormat(){
        if (matrikelNr.length !== 10 || matrikelNr[2] !== "-" || matrikelNr[6] !== "-") {
            throw new Error("Matrikel Number does not have the correct format. " +
                "Please try the format 'xx-xxx-xxx'.")
        }
    }

    /**
     * HTTP PUT request is sent to the backend.
     * If the request is successful, the name of the user is updated and returned to the front-end.
     */
    async function editName() {
        try {
            // get Userinfo to fill out the missing variables in put requests
            const current = await api.get(`/users/${sessionStorage.getItem('id')}`);

            const requestBody = JSON.stringify({
                name: name,
                username: current.data.username,
                matrikelNr: current.data.matrikelNr
            });

            // Edit is sent to backend
            await api.put(`/users/${sessionStorage.getItem('id')}`, requestBody);

        } catch (error) {
            alert(`Something went wrong while editing the user: \n${handleError(error)}`);
        }
    }

    /**
     * HTTP PUT request is sent to the backend.
     * If the request is successful, the username of the user is updated and returned to the front-end.
     */
    async function editUsername() {
        try {
            // get Userinfo to fill out the missing variables in put requests
            const current = await api.get(`/users/${sessionStorage.getItem('id')}`);

            const requestBody = JSON.stringify({
                name: current.data.name,
                username: username,
                matrikelNr: current.data.matrikelNr
            });

            // Edit is sent to backend
            await api.put(`/users/${sessionStorage.getItem('id')}`, requestBody);

        } catch (error) {
            alert(`Something went wrong while editing the user: \n${handleError(error)}`);
        }
    }
    /**
     * HTTP PUT request is sent to the backend.
     * If the request is successful, the matrikel number of the user is updated
     * and returned to the front-end.
     */
    async function editMatrikel() {
        try {

            CheckMatrikelNrFormat();

            // get Userinfo to fill out the missing variables in put requests
            const current = await api.get(`/users/${sessionStorage.getItem('id')}`);

            const requestBody = JSON.stringify({
                name: current.data.name,
                username: current.data.username,
                matrikelNr: matrikelNr
            });

            // Edit is sent to backend
            await api.put(`/users/${sessionStorage.getItem('id')}`, requestBody);

        } catch (error) {
            alert(`Something went wrong while editing the user: \n${handleError(error)}`);
        }
    }

    function clearNameField(){
        document.getElementById("nameField").value = "";
    }

    function clearUsernameField(){
        document.getElementById("usernameField").value = "";
    }

    function clearMatrikelField(){
        document.getElementById("matrikelField").value = "";
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

    }, []);

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

    return (
        <EditMainContainer>
            <Title>Here you can edit your profile:</Title>
            <Label>Change Name:</Label>
            <Line>
                <InputField
                    placeholder="Change your new name here..."
                    id="nameField"
                    onChange={e => {
                        setName(e.target.value);
                        setDisableName(true);
                    }}
                />
                <RectButtonEdit
                    disabled={!disableName}
                    onClick={() => {
                        editName();
                        clearNameField();
                        setDisableName(false);
                    }}
                >
                    Edit!
                </RectButtonEdit>
            </Line>
            <Label>Change Username:</Label>
            <Line>
                <InputField
                    placeholder="Change your username here..."
                    id="usernameField"
                    onChange={e => {
                        setUsername(e.target.value);
                        setDisableUsername(true);
                    }}
                />
                <RectButtonEdit
                    disabled={!disableUsername}
                    onClick={() => {
                        editUsername();
                        clearUsernameField();
                        setDisableUsername(false);
                    }}
                >
                    Edit!
                </RectButtonEdit>
            </Line>
            <Label>Change Matrikelnumber:</Label>
            <Line>
                <InputField
                    placeholder="Enter your Matrikelnumber here..."
                    id="matrikelField"
                    onChange={e => {
                        setMatrikelNr(e.target.value);
                        setDisableMatrikel(true);
                    }}
                />
                <RectButtonEdit
                    disabled={!disableMatrikel}
                    onClick={() => {
                        editMatrikel();
                        clearMatrikelField();
                        setDisableMatrikel(false);
                    }}
                >
                    Edit!
                </RectButtonEdit>
            </Line>
            <ButtonContainer>
                <RectButton
                    width="100%"
                    onClick={() => {
                        history.push('/profile');
                    }}
                >
                    Back to Brofile
                </RectButton>
            </ButtonContainer>
        </EditMainContainer>
    );

}

export default withRouter(Edit);