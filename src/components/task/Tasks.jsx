import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Colors} from "../../views/design/Colors";
import {TaskList} from "../task/Task"
import styled from "styled-components";
import "./Task.css"
import {Label} from "../../views/Labels";
import Header from "../../views/design/Header";
import {CircleButton, RectButton} from "../../views/Button";
import {api, handleError} from '../../helpers/api';
import {AddTaskRodal} from "./AddTaskRodal";
import {add} from "../home/Dates";


export const AddButton = styled(CircleButton)`
    position: 'absolute';
    top: 22px;
    right: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;


export function Tasks(){
    const [tasks, setTasks] = useState([])
    const [displayRodal, setDisplayRodal] = useState(false)


    async function getTasks(){
        try {
            const response = await api.get('/users/'+ localStorage.getItem('id')+'/tasks')


            const array = []
            var i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            setTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        console.log('Runed only when initialized')
        getTasks()
    }, []);



    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getTasks()
        console.log('displayRodal changed')
        console.log('displayRodal: '+displayRodal)
    }, [displayRodal]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
    })


    return (
        <div style={{padding: '0px'}}>
            <AddTaskRodal displayRodal={displayRodal}/>
            <AddButton
                onClick={() => {
                    setDisplayRodal(true)
                }}>
                <i className="fas fa-plus fa-2x"/>
            </AddButton>
            <Header title='MY TASKS'>
            </Header>
            <TaskList tasks={tasks}/>
        </div>
    )
}