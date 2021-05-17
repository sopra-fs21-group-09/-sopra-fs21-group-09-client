import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import {useHistory, withRouter, useLocation} from "react-router-dom";
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {InputField, PageTitle} from "../../views/Labels";
import Rodal from "rodal";
import {CircleButton, RectButton} from "../../views/Button";
import {GroupTaskList} from "./GroupTaskList";
import {api, handleError} from "../../helpers/api";
import {ButtonContainer} from "../../views/design/logo/AuthConstants";

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
  width: 100%;
  padding-left: 5%;
  border: 1px solid #11244E;
`;

const Label = styled.label`
  text-transform: uppercase;
  margin-left: 2%;
  color: orange;
  font-size: 25px;
`;

const AddButton = styled(CircleButton)`
    position: 'absolute';
    display: flex;
    justify-content: center;
    top: 22px;
    width: 95px;
    height: 30px;
    right: 30px;
    border-radius: 20px;
    background: ${Colors.BUTTON};
    color: white;
    border: 1px solid #11244E;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export const GroupDetail = () => {

    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [tasks, setTasks] = useState([])
    const history = useHistory()
    const location = useLocation();

    async function getGroupTasks(id){
        try {
            console.log(id);
            const response = await api.get(`/groups/${id}/tasks`)

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

    async function postGroupTask(id){
        try {
            const requestBody = JSON.stringify({
                name: taskName,
                description: "bla",
                deadline: {
                    time: taskDate,
                    visible: "true"
                }
            });

            await api.post(`/groups/${id}/tasks`, requestBody)

            document.getElementById("input").value = null;

            getGroupTasks(location.state.detail.id);

        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        console.log(location.state.detail.name);
        getGroupTasks(location.state.detail.id)
    }, [location]);

    // this will run only when TaskDate
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getGroupTasks(location.state.detail.id)
    }, [visible]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
    })

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>{location.state.detail.name} Details</PageTitle>
            <BigContainer>
                <LeftContainer>
                    <div style={{padding: '0px'}}>
                        <AddButton>
                            Leave Group
                        </AddButton>
                        <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                            <Label style={{color: 'black'}}>NEW TASK</Label>
                            <div>Title:
                                <InputField id='input'
                                            onChange={e => {
                                                setTaskName(e.target.value);
                                            }}
                                            placeholder='Enter title here'
                                /></div>
                            <div>Date:
                                <InputField id='input'
                                            type="date"
                                            width='80%'
                                            onChange={e => {
                                                setTaskDate(e.target.value)
                                            }}
                                /></div>
                            <div style={{alignItems: 'center'}}>
                                <RectButton
                                    style={{
                                        position: 'absolute',
                                        bottom: '0'
                                    }}
                                    disabled={!taskName  || !taskDate}
                                    onClick={() => {
                                        postGroupTask(location.state.detail.id);
                                        setVisible(false);
                                    }}>
                                    Submit</RectButton>
                            </div>
                        </Rodal>
                        <GroupTaskList tasks={tasks}/>
                        <ButtonContainer>
                            <RectButton
                                onClick={() => setVisible(true)}>
                                Add Task
                            </RectButton>
                        </ButtonContainer>
                    </div>
                </LeftContainer>
                <RightContainer>Here will be the Chat/Whiteboard</RightContainer>
            </BigContainer>
        </BaseContainer>
    )
}

export default withRouter(GroupDetail);