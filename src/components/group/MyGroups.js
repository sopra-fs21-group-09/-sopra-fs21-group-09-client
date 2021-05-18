import React, {useEffect, useState} from "react";
import {SmallCircleButton} from "../../views/Button";
import ShadowScrollbars from "../../views/design/Scrollbars";
import styled from "styled-components";
import {Colors, getNewRandomColor} from "../../views/design/Colors";
import {BaseContainer} from "../../views/Layout";
import {NavBar} from "../navigation/navBar";
import {PageTitle} from "../../views/Labels";
import {api, handleError} from "../../helpers/api";
import {Spinner} from "../../views/design/Spinner";
import UserGroups from "./UserGroups";
import {useHistory, withRouter} from "react-router-dom";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  border: none;
  width: 100%;
`;

const ScrollContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(auto-fill, 150px);
  grid-row-gap: 1em;
  grid-column-gap: 1em;
  width: 100%;
  border: none;
`;


export const MyGroups = () => {
    const [groups, setGroups] = useState(null);
    const history = useHistory();

    // Load all groups the user is currently a part of
    async function getUserGroups(){
        try {
            let usersGroups = await api.get(`/users/${localStorage.getItem('id')}/groups`);

            setGroups(usersGroups.data)

        } catch (error) {
            alert(`Something went wrong while getting your groups: \n${handleError(error)}`);
        }

        // Assign random colors to the GroupContainers
        getNewRandomColor();

    }

    // this will run, when the component is first initialized
    useEffect(() => {
        // Load all the groups
        getUserGroups();
    }, []);


    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
    });

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>My GROUPS</PageTitle>
            {!groups ? (
                <Spinner />
            ) : (
                <BigContainer>
                    <ShadowScrollbars style={{height: 500}}>
                        <ScrollContainer>
                            {groups.map(group => {
                                return (
                                    <UserGroups userGroup={group}/>
                                );
                            })}
                            <SmallCircleButton
                                onClick={() => {
                                    history.push('/joinAppGroup');
                                }}>
                                <span style={{fontSize: 25}}>
                                    <i className="fas fa-plus"/>
                                </span>
                            </SmallCircleButton>
                        </ScrollContainer>
                    </ShadowScrollbars>
                </BigContainer>
            )}
        </BaseContainer>
    )

}

export default withRouter(MyGroups);