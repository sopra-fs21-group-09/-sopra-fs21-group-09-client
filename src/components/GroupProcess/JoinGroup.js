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
  padding-left: 10px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Line = styled.div`
  display grid;
  grid-template-columns: 25% 30% 15% 10% 15%;
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
  grid-template-columns: 25% 30% 15% 10% 15%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  margin-left: 0%;
  margin-right: 7%;
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
  margin-top: 2%;
  width: 100%;
`;

class JoinGroup extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async module() {
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
                <PageTitle>"Module Name" Groups</PageTitle>
                <BigContainer>
                    <Line>
                        <Label>Group Name</Label>
                        <Label>Creator</Label>
                        <Label>Settings</Label>
                        <Label>Enroll</Label>
                    </Line>
                    <ShadowScrollbars style={{height: 430}}>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Group 1</InboxLabel>
                            <InboxLabelName>Samuele Walzer</InboxLabelName>
                            <InboxLabel>Private</InboxLabel>
                            <InboxLabel>4/6</InboxLabel>
                            <InboxButtonContainer>
                                <RectButtonSmall
                                    width="100%"
                                    onClick={() => {
                                    }}
                                >
                                    Join
                                </RectButtonSmall>
                            </InboxButtonContainer>
                        </ModuleBox>
                    </ShadowScrollbars>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {

                            }}
                        >
                            Create your own group!
                        </RectButtonBig>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(JoinGroup);