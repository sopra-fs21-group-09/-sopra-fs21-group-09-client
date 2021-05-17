import React, {useEffect, useState} from "react";
import {Colors} from "../../views/design/Colors";
import {TaskList} from "./Task"
import styled from "styled-components";
import "./Task.css"
import {InputField, Label} from "../../views/Labels";
import Header from "../../views/design/Header";
import {CircleButton, RectButton} from "../../views/Button";
import Rodal from "rodal";
import {api, handleError} from '../../helpers/api';

//Constants we need for this page
export const AddButton = styled(CircleButton)`
    position: 'absolute';
    top: 22px;
    right: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

export function Tasks(){
    const [visible, setVisible] = useState(false)
    const [taskName, setTaskName] = useState()
    const [taskDate, setTaskDate] = useState()
    const [tasks, setTasks] = useState([])

    async function getTasks(){
        try {
            const response = await api.get('/users/'+ localStorage.getItem('id')+'/tasks')

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

    async function postTask(){
        try {
            const requestBody = JSON.stringify({
                name: taskName,
                description: "bla",
                deadline: {
                    time: taskDate,
                    visible: "true"
                }
            });

            await api.post('/users/'+ localStorage.getItem('id')+'/tasks', requestBody)

            document.getElementById("input").value = null;

            getTasks();

        } catch (error) {
            alert(`Something went wrong during postTasks: \n${handleError(error)}`);
        }
    }



    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        console.log('Runs only when initialized')
        getTasks()

    }, []);

    // this will run only when TaskDate
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getTasks()
        console.log('Runs only when tasks are added')
        console.log(document.getElementById("input").value)

    }, [visible]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
        console.log('runs every other time')
    })

    return (
        <div style={{padding: '0px'}}>
            <AddButton
                onClick={() => setVisible(true)}>
                <i className="fas fa-plus fa-2x"/>
            </AddButton>

                <Rodal height='300' customStyles={{borderRadius: '20px'}} visible={visible} border-radius='20px' closeOnEsc='true' onClose={() => setVisible(false)}>
                    <Label style={{color: 'black'}}>NEW TASK</Label>
                    <div>Title:
                        <InputField id='input'
                                    width='75%'
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
                            postTask();
                            setVisible(false);
                        }}>
                        Submit</RectButton>
                    </div>
                </Rodal>

            <Header title='MY TASKS'>
            </Header>
            <TaskList tasks={tasks}/>
        </div>
    )
}