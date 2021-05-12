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
  width: 55%;
  padding-left: 15px;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
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
  margin-left: 0%;
  margin-top: 30px;
  margin-bottom: -5%;
`;

const ColorSquare = styled.div`
  height: 25px;
  width: 25px;
  background-color: green;
  margin-left: 25%;
  margin-top: -5.5%;
  border-radius: 20%;
  border: black;
`;

const Profile = () => {
    const [user, setUser] = useState({username: ''});
    const history = useHistory()


    async function checkMatrikelNr(response) {
        if (response.data.matrikel_nr == null){
            response.data.matrikel_nr = "Matrikelnumber not defined yet";
        }
        return response.data
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the user info is shown
     */
    async function getProfileInfo() {
        try {
            const response = await api.get(`/users/${localStorage.getItem('id')}`);

            await checkMatrikelNr(response);

            setUser(response.data);

            console.log(response.data);
            console.log(response.data.matrikel_nr);
            console.log("Hello");
        } catch (error) {
            alert(`Something went wrong while fetching the user info: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        // display User info
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
                    <h1>Name</h1>
                    <Label>Name</Label>
                    <InfoField>{user.name}</InfoField><br />
                    <Label>Username</Label>
                    <InfoField>{user.username}</InfoField><br />
                    <Label>Matrikelnumber</Label>
                    <InfoField>{user.matrikel_nr}</InfoField><br />
                    <h1>Colors</h1>
                    <Label2>Lectures</Label2>
                    <ColorSquare style={{
                        backgroundColor: Colors.LECTURES,
                        }}></ColorSquare><br />
                    <Label2>Exercises</Label2>
                    <ColorSquare style={{
                        backgroundColor: Colors.EXERCISES,
                    }}></ColorSquare><br />
                    <Label2>Deadlines</Label2>
                    <ColorSquare style={{
                        backgroundColor: Colors.DEADLINES,
                    }}></ColorSquare><br />
                    <Label2>Meetings</Label2>
                    <ColorSquare style={{
                        backgroundColor: Colors.MEETING,
                    }}></ColorSquare>
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
                </BigContainer>
            </BaseContainer>
        )

}

export default withRouter(Profile);