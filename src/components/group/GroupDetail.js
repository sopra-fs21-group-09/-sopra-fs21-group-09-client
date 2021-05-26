import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router";
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import {withRouter} from "react-router-dom";
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {PageTitle} from "../../views/Labels";
import {CircleButton, DeleteButton, RectButton, RectButtonSmall} from "../../views/Button";
import {GroupTaskList} from "./GroupTaskList";
import {api, handleError} from "../../helpers/api";
import {ButtonContainer} from "../../views/design/logo/AuthConstants";
import {TaskOverlay} from "../task/TaskOverlay";
import {TextEditor} from "../textEditor/TextEditorV2";
import Rodal from "rodal";
import {DoubleButton} from "../home/NpmCal";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftContainer = styled.div`
  width: 100%;
`;

const RightContainer = styled.div`
  width: 116%;
  background: yellow;
  border: 1px solid orange;
  margin-bottom: 5%;
`;

const LeaveButton = styled(CircleButton)`
    position: absolute;
    top: 35px;
    right: 45px;
    padding-top: 1px;
    width: 95px;
    height: 30px;
    border-radius: 20px;
    background: ${Colors.BUTTON};
    color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 1000; 
`;

export const GroupDetail = () => {
    const [displayRodal, setDisplayRodal] = useState(false)
    const [displayWarningRodal, setDisplayWarningRodal] = useState(false)
    const [tasks, setTasks] = useState([])
    const [group, setGroup] = useState();
    const history = useHistory();

    async function getGroupInfo(){
        let groupInfo = await api.get(`/groups/${sessionStorage.getItem('groupId')}`);

        setGroup(groupInfo.data)

    }

    async function getGroupTasks(){
        try {
            const response = await api.get(`/groups/${sessionStorage.getItem('groupId')}/tasks`);

            const array = []
            let i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            setTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    async function leaveGroup(){
        try {
            await api.delete(`/users/${sessionStorage.getItem('id')}/groups/${sessionStorage.getItem('groupId')}`)
            history.push(`/myGroups`);
        } catch (error) {
            alert(`Something went wrong while leaving the group: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        getGroupInfo();

        getGroupTasks();
    }, [group]);

    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
        getGroupTasks()
    }, [group])

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>{ group ? group.name : ''} Details</PageTitle>
            <LeaveButton onClick={() => {
                setDisplayWarningRodal(true)
            }}>
                Leave Group
            </LeaveButton>
            {/*Overlay for leaving group*/}
            <Rodal height={220} width={200} customStyles={{borderRadius: '20px', padding:'20px'}} visible={displayWarningRodal} closeOnEsc={true} onClose={() => setDisplayWarningRodal(false)}>
                <i className="far fa-trash-alt fa-4x" aria-hidden="true" style={{color: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}/>
                <div style={{textAlign:'center', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis'}}>Are you sure you want to leave { group ? group.name : ''}?</div>
                <DoubleButton  style={{gridTemplateColumns: '40% 40%'}}>
                    <DeleteButton onClick={() => leaveGroup()}>YES</DeleteButton>
                    <RectButtonSmall style={{marginLeft: '12px'}} onClick={() => setDisplayWarningRodal(false)}>NO</RectButtonSmall>
                </DoubleButton>
            </Rodal>
            <BigContainer>
                <LeftContainer>
                    <div style={{padding: '0px'}}>
                        <TaskOverlay displayRodal={displayRodal} groupId={group ? group.id : ''} closeOnEsc={true} onClose={() => setDisplayRodal(false)}/>
                        <GroupTaskList tasks={tasks}/>
                        <ButtonContainer>
                            <RectButton
                                onClick={() => {
                                    setDisplayRodal(true)
                                }}>
                                Add Task
                            </RectButton>
                        </ButtonContainer>
                    </div>
                </LeftContainer>
                <RightContainer>
                    <TextEditor/>
                </RightContainer>
            </BigContainer>
        </BaseContainer>
    )
}

export default withRouter(GroupDetail);