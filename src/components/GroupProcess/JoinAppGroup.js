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
import {ModuleBox, InboxLabelName, InboxLabel, InboxButtonContainer} from "../group/Group";
import Group from "../group/Group";
import {Spinner} from "../../views/design/Spinner";

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
  width: 99%;
  height: 70px;
`;

const Label = styled.label`
  place-self: center;
  text-transform: uppercase;
  color: orange;
  font-size: 25px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -5%;
  margin-top: 2%;
  width: 100%;
`;

class JoinAppGroup extends React.Component {
    constructor() {
        super();
        this.state = {
            groups: null,
        };
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the groups are shown
     */
    async joinAppGroup() {
        try {

        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        // Get all the Groups
        try {
            const response = await api.get(`/groups`);//TODO: get User by Token

            this.setState({
                groups: response.data,
                loading: false
            });
            // This is just some data for you to see what is available.
            // Feel free to remove it.
            console.log('request to:', response.request.responseURL);
            console.log('status code:', response.status);
            console.log('status text:', response.statusText);
            console.log('requested data:', response.data);

            // See here to get more data.
            console.log(response);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
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
                <PageTitle>Groups</PageTitle>
                {!this.state.groups ? (
                    <Spinner />
                ) : (
                    <BigContainer>
                        <Line>
                            <Label>Group Name</Label>
                            <Label>Creator</Label>
                            <Label>Settings</Label>
                            <Label>Enroll</Label>
                        </Line>
                        <ShadowScrollbars style={{height: 430}}>
                            {this.state.groups.map(group => {
                                return (
                                    <Group group={group}/>
                                );
                            })}
                        </ShadowScrollbars>
                        <ButtonContainer>
                            <RectButtonBig
                                width="100%"
                                onClick={() => {
                                    this.props.history.push('/createGroup');
                                }}
                            >
                                Create your own group
                            </RectButtonBig>
                        </ButtonContainer>
                        <ButtonContainer>
                            <RectButtonBig
                                width="100%"
                                onClick={() => {
                                    this.props.history.push('/myGroups');
                                }}
                            >
                                Back to your groups
                            </RectButtonBig>
                        </ButtonContainer>
                    </BigContainer>
                )}
            </BaseContainer>
        )
    }
}

export default withRouter(JoinAppGroup);