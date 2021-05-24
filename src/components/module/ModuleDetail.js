import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {BaseContainer, BigContainer, SmallContainer, InfoContainer} from '../../views/Layout';
import {api, handleError } from '../../helpers/api';
import {RectButton, RectButtonBig, InfoButton, AddDeadlineButton} from '../../views/Button';
import {PageTitle} from '../../views/Labels';
import {Colors} from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import ShadowScrollbars from "../../views/design/Scrollbars";
import {useHistory} from "react-router-dom";
import ModuleGroups from "./ModuleGroups";
import {DeadlinesForModule} from "../task/Task";
import {AddTaskRodal, ColumnDiv, InputField} from "../task/AddTaskRodal";
import Rodal from "rodal";
import {TextField1, BlueLabel, SmallLabel} from "../../views/Labels"

//Constants we need for this page
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

const DeadlineContainer = styled.div`
  position: absolute;
  width: 30%; 
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


export const Deadlines = (props) => {
    const [displayRodal, setDisplayRodal] = useState(false)
    const [changeOccurred, setChangeOccurred] = useState(false)

    useEffect(() => {
        setDisplayRodal(false)
    }, [props]);

    console.log('PROPS')
    console.log(props)

    return(
        <DeadlineContainer position={'absolute'}>
            <BlueLabel>Deadlines</BlueLabel><br />
            <DeadlinesForModule tasks={props ? props.tasks : []}/>
            <AddDeadlineButton
                onClick={() => {
                    setDisplayRodal(true)
                    setChangeOccurred(!changeOccurred)
                }}>
                <i className="fas fa-plus fa-2x"/>
            </AddDeadlineButton>
            <AddTaskRodal displayRodal={displayRodal} changeOccurred={changeOccurred} moduleId={sessionStorage.getItem('moduleInfo')}/>
        </DeadlineContainer>
    )
}

export const Info = (module) => {
    const [displayDescription, setDisplayDescription] = useState(false)
    console.log('YYYYYYYY')
    console.log(module)
    return(
        <InfoContainer>
            <BlueLabel>Info</BlueLabel>
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
                <InfoButton
                    onClick={() => {
                        setDisplayDescription(true)
                    }}
                >
                    <span style={{fontSize: 35}}>
                        <i className="fas fa-info"/>
                    </span>
                </InfoButton>
                <TextField1>{module["module"]? module["module"].description.slice(0,30)+'...' : 'Not Loaded Yet'}</TextField1><br />
            </Line>
            <Rodal height={350} customStyles={{borderRadius: '20px'}} visible={displayDescription} border-radius='20px' onClose={() => setDisplayDescription(false)}>
                <BlueLabel style={{color: 'black'}}>DESCRIPTION</BlueLabel>
                <p>{module["module"]? module["module"].description : 'Not Loaded Yet'}</p>
            </Rodal>
        </InfoContainer>
    )
}

export function ModuleDetail(props){

    const [module, setModule] = useState(null);
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
        const response = await api.get('/users/'+sessionStorage.getItem('id')+'/modules');

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
            const response = await api.get('modules/'+ sessionStorage.getItem('moduleInfo'))
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

                console.log('MODULE')
                console.log(joinableGroups.data)

                //get all groups in which the user is enrolled
                let usersGroups = await api.get(`/users/${sessionStorage.getItem('id')}/groups`);

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
        setModuleId(sessionStorage.getItem('moduleInfo'));
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
        console.log('MODULE IN SECOND')
        console.log(module)
    }, [moduleId, moduleJoined]);

    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;
        getModuleDetail()
    }, [props]);

        return (
            <BaseContainer>
                {console.log('RETURN')}
                {console.log(module)}
                <NavBar/>
                <PageTitle>{module ? module.name: ''}</PageTitle>
                <BigContainer>
                    <SmallContainer>
                        <Info module={module}/>
                        <Deadlines moduleId={moduleId} tasks={module ? module.tasks : []}/>
                    </SmallContainer>
                    <SmallContainer id="container">
                        <BlueLabel>Groups</BlueLabel>
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
                                    })
                                }}
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
