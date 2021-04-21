import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButton} from '../../views/Button';
import {PageTitle} from '../../views/Container';
import { COLORS } from "../../views/design/colors";

//Constants we need for this page
const BigContainer = styled.div`
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

const Label2 = styled.label`
  color: black;
  margin-top: 1%;
  margin-bottom: 1%;
  text-transform: uppercase;
  line-height:200%;
`;

const InputField = styled.input`
  &::placeholder {
    color: #4F4F4F;
    font-size: 1vw;
  }
  height: 35px;
  width: 250px;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 2.5%;
  border: none;
  background: ${COLORS[12]};
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

    componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = COLORS.COLOR11;
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <CircleButton></CircleButton>
                <PageTitle>Brofile</PageTitle>
                <BigContainer>
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
                            this.handleInputChange('birthday', e.target.value);
                        }}
                    /><br />
                    <Label>Matrikelnumber</Label>
                    <InputField
                        placeholder="Matrikelnumber displayed here"
                        onChange={e => {
                            this.handleInputChange('matrikelnumber', e.target.value);
                        }}
                    /><br />
                    <h1>Colors</h1>
                    <Label2>Lectures</Label2>
                    <ColorSquare style={{
                        backgroundColor: 'blue',
                        }}></ColorSquare><br />
                    <Label2>Exercises</Label2>
                    <ColorSquare style={{
                        backgroundColor: COLORS.COLOR10,
                    }}></ColorSquare><br />
                    <Label2>Deadlines</Label2>
                    <ColorSquare style={{
                        backgroundColor: 'blue',
                    }}></ColorSquare><br />
                    <Label2>Meetings</Label2>
                    <ColorSquare style={{
                        backgroundColor: 'yellow',
                    }}></ColorSquare><br />
                    <Label2>Events</Label2>
                    <ColorSquare style={{
                        backgroundColor: COLORS.EXERCISES,
                    }}></ColorSquare>
                    <ButtonContainer>
                        <RectButton
                            width="60%"
                            onClick={() => {
                                this.props.history.push(`/edit`);
                            }}
                        >
                            Edit your Brofile here!
                        </RectButton>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Profile);