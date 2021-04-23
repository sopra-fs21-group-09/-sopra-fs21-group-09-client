import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {CircleButton, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  padding-left: 15px;
  margin-left: 3%;
  margin-right: 7%;
  border: none;
  margin-bottom: 20px;
`;

const Label = styled.label`
  margin-top: 2%;
  margin-bottom: 2%;
  margin-left: 16%;
  margin-right: 8%;
  text-transform: uppercase;
  line-height:320%;
  color: orange;
  font-size: 25px;
`;

const ModuleBox = styled.div`
  height: 60px;
  width: 100%;
  columns: 2;
  padding-top: 10px;
  margin-left: 0%;
  margin-right: 7%;
  margin-top: 1%;
  margin-bottom: 1%;
  border: 1px solid black;
  background: white;
  border-radius: 10px;
`;

const InboxLabel = styled.div`
  color: black;
  font-size: 25px;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Scrollbar = styled.div`
    overflow: auto;
    height: 450px;
    width: 100%;
`;

class Module extends React.Component {
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
                <CircleButton></CircleButton>
                <PageTitle>My Modules</PageTitle>
                <BigContainer>
                    <Label>Module Name</Label>
                    <Label>Certificate of Achievement</Label>
                    <Scrollbar>
                        <ModuleBox>
                                <InboxLabel>Beispiel</InboxLabel>
                                <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                        <ModuleBox>
                            <InboxLabel>Beispiel</InboxLabel>
                            <InboxLabel>Pass/Fail</InboxLabel>
                        </ModuleBox>
                    </Scrollbar>
                    <ButtonContainer>
                        <RectButtonBig
                            width="100%"
                            onClick={() => {
                                this.props.history.push('/joinModule');
                            }}
                        >
                            Join a Module!
                        </RectButtonBig>
                    </ButtonContainer>
                </BigContainer>
            </BaseContainer>
        )
    }
}

export default withRouter(Module);