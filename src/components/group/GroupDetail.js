import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import { BaseContainer } from '../../views/Layout';
import {useHistory, withRouter, useLocation} from "react-router-dom";
import { Colors } from "../../views/design/Colors";
import {NavBar} from "../navigation/navBar";
import {InputField, PageTitle} from "../../views/Labels";
import Rodal from "rodal";
import {RectButton} from "../../views/Button";
import {GroupTaskList} from "./GroupTasks";
import {api, handleError} from "../../helpers/api";
import { AddButton} from "../task/Tasks";

//Constants we need for this page
const BigContainer = styled.div`
  width: 100%;
  background: green;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const LeftContainer = styled.div`
  width: 100%;
  padding-left: 5%;
  background: orange;
`;

const RightContainer = styled.div`
  width: 100%;
  padding-left: 5%;
  background: blue;
`;

const Label = styled.label`
  text-transform: uppercase;
  margin-left: 2%;
  color: orange;
  font-size: 25px;
`;

export const GroupDetail = () => {

    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [tasks, setTasks] = useState([])
    const history = useHistory()
    const location = useLocation();

    async function getGroupTasks(){
        try {
            /*
            const response = await api.get('/users/'+ localStorage.getItem('id')+'/tasks')


            const array = []
            var i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            setTasks(array)
*/
        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    function postGroupTask(){
        try {
            /*
            const requestBody = JSON.stringify({
                name: taskName,
                description: "bla",
                deadline: {
                    time: taskDate,
                    visible: "true"
                }
            });

            const response = api.post('/users/'+ localStorage.getItem('id')+'/tasks', requestBody)

            console.log('posted!!!!')
            console.log(taskDate)
            const print = new Date(taskDate)
            var dateString = new Date(taskDate).toISOString().substring(0,10);
            var dateString = new Date(taskDate).toISOString().split("T")[0];
            console.log('dateString'+dateString)

            document.getElementById("input").value = null;
*/
        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        //Change the whole background for just this file
        document.body.style.backgroundColor = Colors.COLOR11;

        console.log('Runs only when initialized')
        getGroupTasks()
    }, [location]);

    // this will run only when TaskDate
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getGroupTasks()
        console.log('Runs only when tasks are added')
        console.log(document.getElementById("input").value)

    }, [visible]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log('runs every other time')
    })

    // this will run when the component mounts and anytime the stateful data changes
    useEffect(() => {
    });

    return (
        <BaseContainer>
            <NavBar/>
            <PageTitle>Group Details</PageTitle>
            <BigContainer>
                <LeftContainer>
                    <div style={{padding: '0px'}}>
                        <AddButton
                            onClick={() => setVisible(true)}>
                            <i className="fas fa-plus fa-2x"/>
                        </AddButton>
                        <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                            <Label style={{color: 'black'}}>NEW TASK</Label>
                            <div>Title:
                                <InputField id='input'
                                            onChange={e => {
                                                setTaskName(e.target.value);
                                            }}
                                            placeholder='Enter title here'></InputField></div>
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
                                    //disabled={taskName  || taskDate}
                                    onClick={() => {
                                        postGroupTask();
                                        setVisible(false);
                                        getGroupTasks();
                                    }}>
                                    Submit</RectButton>
                            </div>
                        </Rodal>
                        <GroupTaskList tasks={tasks}/>
                    </div>
                </LeftContainer>
                <RightContainer>Right</RightContainer>
            </BigContainer>
        </BaseContainer>
    )
}

export default withRouter(GroupDetail);