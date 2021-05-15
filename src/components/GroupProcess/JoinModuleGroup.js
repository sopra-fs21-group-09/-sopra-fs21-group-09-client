import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import { api, handleError } from '../../helpers/api';
import {useHistory, useLocation, withRouter} from "react-router-dom";
import {CircleButton, RectButtonBig, RectButtonSmall} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import { Colors } from "../../views/design/Colors";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {NavBar} from "../navigation/navBar";
import AllAppGroups from "../group/AllAppGroups";

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

export function JoinModuleGroup (props) {
    const location = useLocation();
    const [moduleId, setModuleId] = useState('')
    const [moduleName, setModuleName] = useState('')
    const [groups, setGroups] = useState([])
    const history = useHistory()


    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     *
     * POST:
     * const response = await api.post('modules/'+moduleId+'/users/'+localStorage.getItem('id')+'/groups')
     * modules/{moduleId}/users/{userId}/groups
     */
    async function getModuleGroups() {
        try {
            if (moduleId){
                const response = await api.get('/modules/'+moduleId)
                //localhost:8080/modules/1/users/1/groups
                console.log('MODULE GROUPS ')
                console.log(response.data.groups)

                // Delete all groups which are full
                for (let z = 0; z < response.data.groups.length; z++){
                    if (response.data.groups[z] !== undefined && response.data.groups[z].memberLimit !== 0){
                        if (response.data.groups[z].memberCount >= response.data.groups[z].memberLimit){
                            delete response.data.groups[z];
                        }
                    }
                }

                setGroups(response.data.groups)
            }
            else {
                console.log('MODULE ID NOT SET YET, CANNOT GET MODULES GROUPS')
            }
        } catch (error) {
            alert(`Something went wrong while getting the Groups of a Module: \n${handleError(error)}`);
        }
    }

    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        setModuleId(location.moduleId)
        console.log(moduleId);
        setModuleName(location.moduleName)
    }, []);

    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log("Hello")
        console.log(moduleId)
        getModuleGroups();
    }, [moduleId]);


    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>{moduleName? moduleName : 'Loading'} Groups</PageTitle>
            <BigContainer>
                <Line>
                    <Label>Group Name</Label>
                    <Label>Creator</Label>
                    <Label>Settings</Label>
                    <Label>Enroll</Label>
                </Line>
                <ShadowScrollbars style={{height: 430}}>
                    {}
                        {groups.map(group => {
                            return (
                                <AllAppGroups group={group}/>
                            );
                        })}
                </ShadowScrollbars>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            history.push({
                                pathname: '/createGroup',
                                moduleId: moduleId
                        })}}
                    >
                        Create your own group
                    </RectButtonBig>
                </ButtonContainer>
                <ButtonContainer>
                    {/*<RectButtonBig
                        width="100%"
                        onClick={() => {
                            history.push({
                                pathname: '/moduleDetail',
                                moduleId: moduleId
                            });
                        }}
                    >
                        Back to module details
                    </RectButtonBig>*/}
                </ButtonContainer>
            </BigContainer>
        </BaseContainer>
    )


}

