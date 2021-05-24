import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {useHistory, withRouter} from "react-router-dom";
import {RectButton} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar.jsx"

//Constants we need for this page
const BigContainer = styled.div`
  height: 50%;
  width: 100%;
  padding-left: 15px;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  width: 100%;
  padding-left: 20%;
`;

const Label = styled.label`
  color: orange;
  margin-top: 4%;
  margin-bottom: 4%;
  text-transform: uppercase;
  line-height:400%;
`;

const Label2 = styled.label`
  color: orange;
  margin-top: 1%;
  margin-bottom: 1%;
  text-transform: uppercase;
  line-height:200%;
`;

const InfoField = styled.div`
  height: 35px;
  width: 270px;
  display: flex;
  justify-content: center;
  padding-top: 1%;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 2.5%;
  background: ${Colors[12]};
  border-radius: 20px;
  float: right;
  border: 1px solid black;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-left: 0%;
  margin-top: 30px;
`;

const ColorSquare = styled.div`
  height: 25px;
  width: 25px;
  margin-left: 25%;
  margin-top: -7%;
  border-radius: 20%;
  border: black;
`;

const Profile = () => {
    const [user, setUser] = useState({username: ''});
    const history = useHistory()

    /**
     * Checks if matrikel number has been set yet.
     * If not: display "Matrikelnumber not defined yet".
     */
    async function checkMatrikelNrExists(response) {
        if (response.data.matrikelNr == null){
            response.data.matrikelNr = "Matrikelnumber not defined yet";
        }
        return response.data
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the user info is shown
     */
    async function getProfileInfo() {
        try {
            const response = await api.get(`/users/${sessionStorage.getItem('id')}`);

            // Check if matrikel number exists
            await checkMatrikelNrExists(response);

            setUser(response.data);

        } catch (error) {
            alert(`Something went wrong while fetching the user info: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        // display user info
        getProfileInfo();

    }, []);

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>Brofile</PageTitle>
                <BigContainer>
                    <LeftContainer>
                        <h1>Info</h1>
                        <Label>Name</Label>
                        <InfoField>{user.name}</InfoField><br />
                        <Label>Username</Label>
                        <InfoField>{user.username}</InfoField><br />
                        <Label>Matrikelnumber</Label>
                        <InfoField>{user.matrikelNr}</InfoField><br />
                        <ButtonContainer>
                            <RectButton
                                width="60%"
                                onClick={() => {
                                    history.push(`/edit`);
                                }}
                            >
                                Edit your Brofile here!
                            </RectButton>
                        </ButtonContainer>
                    </LeftContainer>
                    <RightContainer>
                        <h1>Calender Colors</h1>
                        <Label2>Lectures</Label2>
                        <ColorSquare style={{
                            backgroundColor: Colors.LECTURES,
                            }}/><br />
                        <Label2>Exercises</Label2>
                        <ColorSquare style={{
                            backgroundColor: Colors.EXERCISES,
                        }}/><br />
                        <Label2>Deadlines</Label2>
                        <ColorSquare style={{
                            backgroundColor: Colors.DEADLINES,
                        }}/><br />
                        <Label2>Meetings</Label2>
                        <ColorSquare style={{
                            backgroundColor: Colors.MEETING,
                        }}/>
                    </RightContainer>
                </BigContainer>
            </BaseContainer>
        )

}

export default withRouter(Profile);