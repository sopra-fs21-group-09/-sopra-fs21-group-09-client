import React from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {withRouter} from "react-router-dom";
import {RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {NavBar} from "../navigation/navBar";
import AllAppGroups from "../group/AllAppGroups";
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

    async componentDidMount() {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        // Get all the Groups
        try {
            let allGroups = null;
            let usersGroups = null;
            let groupsWithoutUser = null;

            //get groups 2 times; one for checking, one for deleting
            allGroups = await api.get(`/groups`);
            groupsWithoutUser = await api.get(`/groups`);

            usersGroups = await api.get(`/users/${localStorage.getItem('id')}/groups`);

            // Get all groups where the user is not in
            for (let i = 0; i < allGroups.data.length; i++){
                for (let z = 0; z < usersGroups.data.length; z++){
                    if (allGroups.data[i].id === usersGroups.data[z].id){
                        delete groupsWithoutUser.data[i];
                    }
                }
            }

            this.setState({
                groups: groupsWithoutUser.data,
                loading: false
            });

        } catch (error) {
            alert(`Something went wrong while getting the groups: \n${handleError(error)}`);
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
                                    <AllAppGroups group={group}/>
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