import React, {useEffect, useState} from "react";
import {Colors} from "../../views/design/Colors";
import {TaskList} from "./Task"
import {DoneTaskList} from "./DoneTasks";
import styled from "styled-components";
import "./Task.css"
import Header from "../../views/design/Header";
import {CircleButton} from "../../views/Button";
import {api, handleError} from '../../helpers/api';
import {TaskOverlay} from "./TaskOverlay";
import Rodal from "rodal";

//Constants we need for this page
export const AddButton = styled(CircleButton)`
    position: 'absolute';
    top: 22px;
    right: 30px;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`;

const DoneTaskButton = styled(CircleButton)`
    position: absolute;
    bottom: 35px;
    right: 30px;
    padding-top: 5px;
    width: 110px;
    height: 35px;
    border-radius: 20px;
    background: ${Colors.BUTTON};
    color: white;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    z-index: 1000;
`;

export function Tasks(props){
    const [tasks, setTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [displayRodal, setDisplayRodal] = useState(false);
    const [changeOccurred, setChangeOccurred] = useState(false);
    const [doneTaskRodal, setDoneTaskRodal] = useState(false);

    async function getTasks(){
        try {
            const response = await api.get('/users/'+ sessionStorage.getItem('id')+'/tasks?completed=false')


            const array = []
            let i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            console.log('TASKS')
            console.log(response.data)

            setTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    async function getDoneTasks(){
        try {
            const response = await api.get('/users/'+ sessionStorage.getItem('id')+'/tasks?completed=true')


            const array = []
            let i;
            for (i = 0; i < response.data.length; i++) {
                array.push(response.data[i]);
            }

            console.log('Done Tasks')
            console.log(response.data)

            setDoneTasks(array)

        } catch (error) {
            alert(`Something went wrong during get Tasks: \n${handleError(error)}`);
        }
    }

    // this will run, when the component is first initialized
    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        console.log('Runs only when initialized')
        getTasks()
        getDoneTasks()
        console.log('Display set tasks')
        console.log(tasks)
        console.log('Display done tasks')
        console.log(doneTasks)
    }, []);

    useEffect(() => {
        setDisplayRodal(false)
    }, [props]);


    useEffect(() => {
        document.body.style.backgroundColor = Colors.COLOR13;
        getTasks()
        getDoneTasks()
    }, [displayRodal]);


    useEffect(()=>{
        document.body.style.backgroundColor = Colors.COLOR11;
    })


    return (
        <div style={{padding: '0px'}}>
            <TaskOverlay displayRodal={displayRodal} changedOccured={changeOccurred}/>
            <AddButton
                onClick={() => {
                    setDisplayRodal(true)
                    setChangeOccurred(!changeOccurred)//props have to change
                }}>
                <i className="fas fa-plus fa-2x"/>
            </AddButton>
            <Header title='MY TASKS'>
            </Header>
            <TaskList tasks={tasks}/>
            <DoneTaskButton onClick={() => {
                setDoneTaskRodal(true)
            }}>
                View your finished tasks
            </DoneTaskButton>
            {/*Overlay for showing done tasks*/}
            <Rodal height={300} width={400} customStyles={{borderRadius: '20px', padding:'20px'}} visible={doneTaskRodal} closeOnEsc={true} onClose={() => setDoneTaskRodal(false)}>
                <div style={{textAlign:'center', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '7px'}}>
                    Look at what you have already accomplished:</div>
                <DoneTaskList doneTasks={doneTasks}/>
            </Rodal>
        </div>
    )
}