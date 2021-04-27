import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButtonBig, RectButtonSmall} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {NavBar} from "../navigation/navBar";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 550px;
  padding-left: 15px;
  border: none;
  margin-bottom: 20px;
  background: orange;
`;

const FirstLine = styled.div`
  margin-bottom: 2%;
  height: 20%;
  background: green;
  vertical-align: middle;
`;

const NextLine = styled.div`
  margin-bottom: 2%;
  height: 30%;
  background: green;
`;

const Label = styled.label`
  margin-top: 2%;
  margin-bottom: 2%;
  text-transform: uppercase;
  line-height:320%;
  color: ${Colors.COLOR14};
  font-size: 28px;
  background: blue;
`;

const InfoField = styled.input`
  &::placeholder {
    color: #4F4F4F;
    font-size: 1vw;
  }
  height: 35px;
  width: 250px;
  padding-left: 15px;
  margin-left: 7%;
  margin-right: 7%;
  margin-top: 2%;
  border: none;
  background: ${Colors[12]};
  border-radius: 20px;
  border: 1px solid black;
`;

//This is the div that will be generated with each new group (of course with other divs inside)
const ModuleBox = styled.div`
  height: 60px;
  width: 99%;
  display grid;
  grid-template-columns: 25% 30% 15% 10% 15%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

const InboxLabel = styled.div`
  place-self: center;
  color: black;
  font-size: 30px;
`;

const InboxLabelName = styled.div`
  place-self: center;
  color: black;
  font-size: 20px;
`;

const InboxButtonContainer = styled.div`
  place-self: center;
  width: 80%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -5%;
  margin-top: 2%;
  width: 100%;
`;

class CreateGroup extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async createGroup() {
        try {

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        this.setState({ [key]: value });
    }

    render() {
        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>Create a new group</PageTitle>
                <BigContainer>
                    <FirstLine>
                        <Label>Name:</Label>
                        <InfoField
                            placeholder="Username displayed here"
                            onChange={e => {
                                this.handleInputChange('username', e.target.value);
                            }}
                        />
                    </FirstLine>
                    <NextLine>Test</NextLine>
                    <NextLine>Test</NextLine>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.props.history.goBack();
                            }}
                        >
                            Back to module details
                        </RectButtonBig>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(CreateGroup);