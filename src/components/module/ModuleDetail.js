import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BaseContainer} from '../../views/Layout';
import {api, handleError } from '../../helpers/api';
import {RectButton, RectButtonBig} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import {Colors} from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {useHistory} from "react-router-dom";
import ModuleGroups from "./ModuleGroups";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  height: 100%;
  border: none;
  margin-bottom: 20px;
  display grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
`;

const SmallContainer = styled.div`
  width: 100%;
  height: 50%;
  padding-left: 3.5%;
`;

const InfoContainer = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.label`
  margin-bottom: 2%;
  text-transform: uppercase;
  line-height:220%;
  color: ${Colors.COLOR14};
  font-size: 28px;
`;

const SmallLabel = styled.label`
  place-self: center;
  text-transform: uppercase;
  color: orange;
  font-size: 20px;
`;

const SmallLine = styled.div`
  display grid;
  grid-template-columns: 40% 25% 30%;
  grid-template-rows: 1;
  grid-column-gap: 1em;
  width: 99%;
  height: 30px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Line = styled.div`
  width: 50%;
  margin-bottom: 2%;
  columns: 2;
  height: 55px;
`;

const IconHolder = styled.div`
  font-weight: 700;
  font-size: 12px;
  text-align: center;
  background: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
`;

const TextField1 = styled.label`
  color: black;
  text-transform: uppercase;
  float: left;
  height: 55px;
  margin-left: -50%;
  display: flex;
  align-items: center;
`;

const TextField2 = styled.label`
  color: black;
  margin-top: 1%;
  margin-bottom: 1%;
  text-transform: uppercase;
  line-height:200%;
`;

export const Deadlines = () => {
    return(
        <div>
            <Label>Deadlines</Label><br />
            <TextField2>Quiz 3: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 4: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 5: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
            <TextField2>Quiz 6: Thursday, 24.04.2021, 14.00-16.00</TextField2><br />
        </div>
    )
}

export const Info = (module) => {
    return(
        <InfoContainer>
            <Label>Info</Label>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="far fa-user"/>
                    </span>
                </IconHolder>
                <TextField1>{module["module"] ? module["module"].prof_name : 'Not Loaded Yet'}</TextField1>
            </Line>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="far fa-calendar"/>
                    </span>
                </IconHolder>
                <TextField1>Monday, 14.00-16.00</TextField1><br />
            </Line>
            <Line>
                <IconHolder>
                    <span style={{fontSize: 35}}>
                        <i className="fas fa-video"/>
                    </span>
                </IconHolder>
                <TextField1>{module["module"] ? module["module"].zoom_link : 'Not Loaded Yet'}</TextField1><br />
            </Line>
        </InfoContainer>
    )
}

export function ModuleDetail(){

    const [module, setModule] = useState();
    const [moduleId, setModuleId] = useState('');
    const history = useHistory();
    const [joinableGroups, setJoinableGroups] = useState([]);
    let moduleJoined;


    /**
     * HTTP GET request is sent to the backend.
     * This method checks if a user is part of the module he is watching currently.
     * If yes, then he is enabled to join groups and create them.
     * If not, then the group section is not shown.
     */
    async function checkIfJoined(){

        // get all modules of user
        const response = await api.get('/users/'+localStorage.getItem('id')+'/modules');

        // Check if the user has joined the module he is looking at
        for (let i = 0; i < response.data.length; i++){
            if (response.data[i].id == moduleId){
                moduleJoined = true;
                document.getElementById("container").style.display = "block";
            }
        }

    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async function getModuleDetail() {
        try {

            const response = await api.get('modules/'+ moduleId)
            setModule(response.data)

        } catch (error) {
            alert(`Something went wrong during getting the moduleDetail: \n${handleError(error)}`);
        }
    }

    /**
     * HTTP GET request is sent to the backend.
     * If the request is successful, the modules are shown
     */
    async function getModuleGroups() {
        try {

            if (moduleId){
                //get groups 2 times; one for checking, one for deleting
                let allModuleGroups = await api.get('/modules/'+moduleId);
                let joinableGroups = await api.get('/modules/'+moduleId);

                //get all groups in which the user is enrolled
                let usersGroups = await api.get(`/users/${localStorage.getItem('id')}/groups`);

                // Get all groups where the user is not in
                for (let i = 0; i < allModuleGroups.data.groups.length; i++){
                    for (let z = 0; z < usersGroups.data.length; z++){
                        if (allModuleGroups.data.groups[i].id === usersGroups.data[z].id){
                            delete joinableGroups.data.groups[i];
                        }
                    }
                }

                setJoinableGroups(joinableGroups.data.groups);
            }
            else {
                console.log('MODULE ID NOT SET YET, CANNOT GET MODULES GROUPS')
            }

        } catch (error) {
            alert(`Something went wrong while getting the Groups of a Module: \n${handleError(error)}`);
        }
    }

    // gets executed first
    useEffect(() => {
        console.log("first")
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        setModuleId(localStorage.getItem('moduleInfo'));

    }, []);

    // gets executed second
    useEffect(() => {
        console.log("second")
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        if (moduleId !== undefined){
            console.log("moduleid defined")
            getModuleDetail();
            getModuleGroups();
            checkIfJoined();

            if (moduleJoined !== true){
                console.log(moduleJoined)
                document.getElementById("container").style.display = "none";
            }
        }
    }, [moduleId, moduleJoined]);

        return (
            <BaseContainer>
                <NavBar/>
                <PageTitle>{module ? module.name: ''}</PageTitle>
                <BigContainer>
                    <SmallContainer>
                        <Info module={module}/>
                        <Deadlines/>
                    </SmallContainer>
                    <SmallContainer id="container">
                        <Label>Groups</Label>
                        <SmallLine>
                            <SmallLabel>Name</SmallLabel>
                            <SmallLabel>Enroll</SmallLabel>
                        </SmallLine>
                        <ShadowScrollbars style={{height: 350}}>
                            {joinableGroups.map(group => {
                                return (
                                    <ModuleGroups group={group}/>
                                );
                            })}
                        </ShadowScrollbars>
                        <ButtonContainer>
                            <RectButton
                                width="100%"
                                onClick={() => {
                                    history.push({
                                        pathname: '/createGroup',
                                        moduleId: moduleId
                                    })}}
                            >
                                Create your own group
                            </RectButton>
                        </ButtonContainer>
                    </SmallContainer>
                </BigContainer>
                <ButtonContainer>
                    <RectButtonBig
                        width="100%"
                        onClick={() => {
                            history.push('/modules')
                        }}
                    >
                        Back to your Modules
                    </RectButtonBig>
                </ButtonContainer>
            </BaseContainer>
        )
}
