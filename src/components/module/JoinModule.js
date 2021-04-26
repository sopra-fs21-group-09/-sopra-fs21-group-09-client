import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButtonSmall, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {NavBar} from "../navigation/navBar";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Line = styled.div`
  display grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  width: 100%;
  height: 70px;
`;

const Label = styled.label`
  place-self: center;
  text-transform: uppercase;
  color: orange;
  font-size: 25px;
`;

//This is the div that will be generated with each new group (of course with other divs inside)
const ModuleBox = styled.div`
  height: 60px;
  width: 100%;
  display grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

const InboxLabel = styled.div`
  color: black;
  font-size: 25px;
  place-self: center;
`;

const InboxButtonContainer = styled.div`
  place-self: center;
  width: 60%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2%;
  width: 100%;
`;

class JoinModule extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async joinModule() {
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
                <PageTitle>All Modules</PageTitle>
                <BigContainer>
                    <Line>
                        <Label>Module Name</Label>
                    </Line>
                    <ShadowScrollbars style={{height: 430}}>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                        this.props.history.push('/moduleDetail');
                                    }}
                                >
                                    Info
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                    </ShadowScrollbars>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.props.history.push('/module');
                            }}
                        >
                            See your modules
                        </RectButtonBig>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(JoinModule);